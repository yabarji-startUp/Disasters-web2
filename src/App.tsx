import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import {
  Activity,
  Cpu,
  Database,
  Globe,
  MemoryStick,
  Timer,
  Zap,
  Layers,
  FileText,
  FilePlus,
  Image,
  Cloud
} from 'lucide-react'

// Lazy loading pour Three.js (RGESN 1.2)
const ThreeScene = lazy(() => import('./components/ThreeScene'))

type Stat = {
  bundle: number
  weight: number
  dom: number
  resources: number
  js: number
  css: number
  img: number
  cache: number
  memory: number
  load: number
  rps: number
  pl: number
}

const limits = {
  weight: [512_000, 1_048_576],
  dom: [1_000, 2_000],
  resources: [50, 100],
  js: [153_600, 307_200],
  css: [51_200, 102_400],
  img: [307_200, 716_800],
  cache: [0.6, 0.4],
  memory: [100, 200], // MB - Vert: < 100MB, Jaune: 100-200MB, Rouge: > 200MB
  load: [50, 80], // % - Vert: < 50%, Jaune: 50-80%, Rouge: > 80%
  rps: [10, 20] // req/s - Vert: < 10, Jaune: 10-20, Rouge: > 20
}

const color = (v: number, [g, y]: number[], inv = false) =>
  inv
    ? v >= g
      ? 'border-green-500/30 bg-green-500/20'
      : v >= y
      ? 'border-yellow-500/30 bg-yellow-500/20'
      : 'border-red-500/30 bg-red-500/20'
    : v <= g
    ? 'border-green-500/30 bg-green-500/20'
    : v <= y
    ? 'border-yellow-500/30 bg-yellow-500/20'
    : 'border-red-500/30 bg-red-500/20'

export default function App() {
  const [stats, setStats] = useState<Stat>({
    bundle: 0,
    weight: 0,
    dom: 0,
    resources: 0,
    js: 0,
    css: 0,
    img: 0,
    cache: 0,
    memory: 0,
    load: 0,
    rps: 0,
    pl: 0
  })
  const [ready, setReady] = useState(false)
  const [show3D, setShow3D] = useState(false)

  const injectedRef = useRef(false)
  const intervalRef = useRef<number>()

  // RGESN 2.2 : Optimisation du rendu 3D - Chargement différé
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow3D(true)
    }, 2000) // Retarde le chargement 3D de 2 secondes

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (injectedRef.current) return
    injectedRef.current = true
    const loadAssets = () => {
      const h = document.head
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://disasters-web2.onrender.com/static/big.css'
      h.appendChild(link)
      const script = document.createElement('script')
      script.src = 'https://disasters-web2.onrender.com/static/big.js'
      script.crossOrigin = 'anonymous'
      h.appendChild(script)
    }
    document.readyState === 'complete'
      ? loadAssets()
      : window.addEventListener('load', loadAssets, { once: true })
  }, [])

  useEffect(() => {
    const startTime = performance.now();

    const computeStats = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      if (!nav) return;

      const totalWeight = nav.transferSize + resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const jsWeight = resources.filter(r => r.initiatorType === 'script').reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const cssWeight = resources.filter(r => r.initiatorType === 'link').reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const imgWeight = resources
        .filter(
          r =>
            r.initiatorType === 'img' ||
            r.initiatorType === 'css' ||
            /\.(jpg|jpeg|png|gif|webp)$/i.test(r.name)
        )
        .reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const totalEncoded = nav.encodedBodySize + resources.reduce((sum, r) => sum + (r.encodedBodySize || 0), 0);
      const cacheRatio = totalEncoded ? 1 - totalWeight / totalEncoded : 0;

      // Mesure correcte du temps de chargement
      const loadTime = Math.round(performance.now() - startTime);

      setStats(s => ({
        ...s,
        bundle: nav.transferSize,
        weight: totalWeight,
        dom: document.getElementsByTagName('*').length,
        resources: resources.length,
        js: jsWeight,
        css: cssWeight || s.css,
        img: imgWeight || s.img,
        cache: cacheRatio,
        pl: loadTime
      }));
      setReady(true);
    };

    if (document.readyState === 'complete') {
      computeStats();
    } else {
      window.addEventListener('load', computeStats, { once: true });
    }
  }, []);

  useEffect(() => {
    const po = new PerformanceObserver(list => {
      const res = list.getEntries() as PerformanceResourceTiming[]
      const added = res.reduce((a, b) => a + (b.transferSize || 0), 0)
      const jsAdd = res.filter(r => r.initiatorType === 'script').reduce((a, b) => a + (b.transferSize || 0), 0)
      const cssAdd = res.filter(r => r.initiatorType === 'link' || /\.css$/i.test(r.name)).reduce((a, b) => a + (b.transferSize || 0), 0) 
      const isImg = (r: PerformanceResourceTiming) => r.initiatorType === 'img' || r.initiatorType === 'css' || /\.(avif|jpe?g|png|gif|webp|svg)$/i.test(r.name);
      const imgAdd = res.filter(isImg).reduce((a, b) => a + (b.transferSize || 0), 0);
      const encAdd = res.reduce((a, b) => a + (b.encodedBodySize || 0), 0)
      setStats(s => {
        const weight = s.weight + added
        const enc = (1 - s.cache) * s.weight + encAdd
        const cache = enc ? 1 - weight / enc : s.cache
        return { ...s, weight, js: s.js + jsAdd, css: s.css + cssAdd, img: s.img + imgAdd, cache }
      })
    })
    po.observe({ type: 'resource', buffered: true })
    return () => po.disconnect()
  }, [])

  useEffect(() => {
    if (intervalRef.current) return

    intervalRef.current = window.setInterval(async () => {
      for (let i = 0; i < 2; i++) {
        fetch(`https://disasters-web2.onrender.com/api/payload?${Date.now()}_${i}`)
      }

      try {
        const { memory, load, rps } = await fetch('https://disasters-web2.onrender.com/api/server', {
          cache: 'no-store'
        }).then(r => r.json())

        setStats(s => ({
          ...s,
          memory: Math.ceil(memory / 1_048_576),
          load,
          rps
        }))
      } catch (err) {
        console.warn('Erreur lors du fetch des stats serveur', err)
      }
    }, 1_000)

    return () => clearInterval(intervalRef.current)
  }, [])

  // Enregistrement du Service Worker pour cache offline (C4)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker enregistré:', registration.scope)
          
          // Vérifier les mises à jour
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 Nouvelle version du Service Worker disponible')
                }
              })
            }
          })
        })
        .catch(error => {
          console.warn('⚠️ Erreur enregistrement Service Worker:', error)
        })
    }
  }, [])

  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="text-center">
          <div className="animate-spin h-24 w-24 rounded-full border-b-2 border-white mx-auto mb-6" />
          <p className="text-white text-xl font-semibold">Chargement…</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <img src="https://disasters-web2.onrender.com/static/large.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-pulse">
            EcoTraining Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">Plateforme d'entraînement avancée pour l'optimisation web et l'éco-conception</p>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          <Card icon={<Database className="w-8 h-8 text-purple-400" />} title="Poids HTML" value={`${(stats.bundle / 1_024).toFixed(0)} kB`} tone={color(stats.bundle, limits.weight)} tip="transferSize du document" />
          <Card icon={<Globe className="w-8 h-8 text-blue-400" />} title="Poids page" value={`${(stats.weight / 1_024).toFixed(0)} kB`} tone={color(stats.weight, limits.weight)} tip="somme transferSize" />
          <Card icon={<Layers className="w-8 h-8 text-teal-400" />} title="DOM" value={stats.dom} tone={color(stats.dom, limits.dom)} tip="nombre de nœuds" />
          <Card icon={<Activity className="w-8 h-8 text-green-400" />} title="Ressources" value={stats.resources} tone={color(stats.resources, limits.resources)} tip="entries PerformanceResourceTiming" />
          <Card icon={<FileText className="w-8 h-8 text-fuchsia-400" />} title="JS" value={`${(stats.js / 1_024).toFixed(0)} kB`} tone={color(stats.js, limits.js)} />
          <Card icon={<FilePlus className="w-8 h-8 text-sky-400" />} title="CSS" value={`${(stats.img / 1024).toFixed(1)} kB`} tone={color(stats.css, limits.css)} />
          <Card icon={<Image className="w-8 h-8 text-amber-400" />} title="Images" value={`${(stats.img / 1_024).toFixed(0)} kB`} tone={color(stats.img, limits.img)} />
          <Card icon={<Cloud className="w-8 h-8 text-emerald-400" />} title="Cache hit" value={`${Math.round(stats.cache * 100)} %`} tone={color(stats.cache, limits.cache, true)} />
          <Card icon={<MemoryStick className="w-8 h-8 text-red-400" />} title="RAM serveur" value={`${stats.memory} MB`} tone={color(stats.memory, limits.memory)} />
          <Card icon={<Cpu className="w-8 h-8 text-indigo-400" />} title="CPU" value={`${stats.load} %`} tone={color(stats.load, limits.load)} />
          <Card icon={<Activity className="w-8 h-8 text-lime-400" />} title="RPS" value={stats.rps} tone={color(stats.rps, limits.rps)} />
          <Card icon={<Timer className="w-8 h-8 text-yellow-400" />} title="Load page" value={`${stats.pl} ms`} tone="bg-white/10 border-white/20" />
        </section>
        <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Visualisation 3D</h2>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={
              <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-white" />
              </div>
            }>
              {show3D && <ThreeScene />}
            </Suspense>
          </div>
          <p className="text-slate-300 text-center mt-4">20 cubes optimisés en temps réel (RGESN 2.2)</p>
        </section>
      </div>
    </div>
  )
}

function Card({ icon, title, value, tone, tip }: { icon: React.ReactNode; title: string; value: string | number; tone: string; tip?: string }) {
  return (
    <div className={`backdrop-blur-lg rounded-2xl p-8 border hover:bg-white/15 hover:scale-105 transition ${tone}`} title={tip || ''}>
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  )
}