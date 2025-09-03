import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 5001

// --- RPS Middleware (doit être AVANT routes/static) ---
const rpsWindow = new Array(10).fill(0) // 10 "tranches" de 100ms = 1s
let rpsIndex = 0

setInterval(() => {
  rpsIndex = (rpsIndex + 1) % rpsWindow.length
  rpsWindow[rpsIndex] = 0
}, 100)

app.use((req, res, next) => {
  rpsWindow[rpsIndex]++
  next()
})

app.use((_, res, next) => {
  res.set('Timing-Allow-Origin', '*')
  next()
})

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      fontSrc: ["'self'", "data:", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      mediaSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  }
}))
app.use(cors())
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false
    }
    return compression.filter(req, res)
  }
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --- Static assets avec CORS, COEP et cache intelligent ---
app.use(
  '/static',
  (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    res.set('Cross-Origin-Opener-Policy', 'same-origin')
    res.set('Cross-Origin-Embedder-Policy', 'require-corp')
    
    // Cache intelligent basé sur le type de fichier
    const filePath = req.path
    if (filePath.endsWith('.webp') || filePath.endsWith('.jpg') || filePath.endsWith('.png')) {
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable') // 24h pour images
    } else if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate') // 1h pour assets
    } else {
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate') // 5min pour autres
    }
    
    // Headers de compression et validation
    res.setHeader('Vary', 'Accept-Encoding')
    res.setHeader('ETag', `"${Date.now()}-${filePath}"`)
    
    next()
  },
  express.static(path.join(__dirname, 'static'), {
    extensions: ['js', 'css', 'jpg', 'webp'],
    maxAge: 86400000, // 24 heures de cache
    etag: true,
    lastModified: true
  })
)

// --- API server ---
app.get('/api/server', (_, res) => {
  res.set('Cache-Control', 'no-store')
  const rps = rpsWindow.reduce((a, b) => a + b, 0)
  res.json({
    memory: process.memoryUsage().rss,
    load: +os.loadavg()[0].toFixed(2),
    rps
  })
})

// --- API payload ---
app.get('/api/payload', (_, res) => {
  const block = 'x'.repeat(1_024)
  const big = Array(1_024).fill(block)
  res.json({ data: big, ts: Date.now() })
})

// --- Serve frontend static files ---
const distPath = path.join(__dirname, '..', 'dist')
console.log('🔍 Dist path:', distPath)
console.log('🔍 Dist exists:', require('fs').existsSync(distPath))
console.log('🔍 Dist contents:', require('fs').readdirSync(distPath))

app.use(express.static(distPath, {
  maxAge: 86400000, // 24 heures de cache
  etag: true,
  lastModified: true
}))

// --- Catch-all route for SPA ---
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html')
  console.log('🔍 Index path:', indexPath)
  console.log('🔍 Index exists:', require('fs').existsSync(indexPath))
  
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.status(404).send('Frontend not found. Check build process.')
  }
})

app.listen(PORT, () => console.log(`backend on :${PORT}`))