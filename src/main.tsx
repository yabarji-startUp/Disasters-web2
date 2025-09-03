import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.tsx'
import './index.css'

// Enregistrement du Service Worker pour optimisations C2
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker C2 enregistré avec succès:', registration.scope)
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du Service Worker C2:', error)
      })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
