import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import _ from 'lodash'

interface OptimizedThreeJSProps {
  className?: string
  enabled?: boolean
  cubeCount?: number
}

export const OptimizedThreeJS: React.FC<OptimizedThreeJSProps> = ({
  className = '',
  enabled = true,
  cubeCount = 5 // Réduit de 20 à 5 cubes
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !enabled) return

    // Intersection Observer pour détecter la visibilité
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: false, // Désactivé pour améliorer les performances
      powerPreference: 'high-performance'
    })
    renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 480)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limite le pixel ratio
    rendererRef.current = renderer

    // Éclairage optimisé
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 0.6)
    dir.position.set(25, 25, 25)
    scene.add(dir)

    // Création des cubes optimisée
    const geometry = new THREE.BoxGeometry(1, 1, 1) // Géométrie partagée
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff6b6b, shininess: 50 }),
      new THREE.MeshPhongMaterial({ color: 0x4ecdc4, shininess: 50 }),
      new THREE.MeshPhongMaterial({ color: 0x45b7d1, shininess: 50 }),
      new THREE.MeshPhongMaterial({ color: 0x96ceb4, shininess: 50 }),
      new THREE.MeshPhongMaterial({ color: 0xfeca57, shininess: 50 })
    ]

    const cubes: THREE.Mesh[] = []
    for (let i = 0; i < cubeCount; i++) {
      const material = materials[i % materials.length]
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      )
      scene.add(cube)
      cubes.push(cube)
    }

    // Animation optimisée avec throttling
    const animate = () => {
      if (!isVisible) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }

      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01 * (index + 1)
        cube.rotation.y += 0.015 * (index + 1)
      })

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Gestion du redimensionnement optimisée
    const onResize = _.throttle(() => {
      if (!canvas || !camera || !renderer) return
      
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }, 300)

    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      if (renderer) {
        renderer.dispose()
      }

      // Nettoyage des ressources
      geometry.dispose()
      materials.forEach(material => material.dispose())
      
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose()
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose())
              } else {
                object.material.dispose()
              }
            }
          }
        })
      }
    }
  }, [enabled, cubeCount, isVisible])

  if (!enabled) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-800 rounded-xl border border-gray-600`}>
        <p className="text-gray-400">Visualisation 3D désactivée pour optimiser les performances</p>
      </div>
    )
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={`${className} rounded-xl border border-white/20 shadow-2xl`}
      style={{ width: '100%', height: '384px' }}
    />
  )
} 