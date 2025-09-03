import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { throttle } from 'lodash'

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1_000)
    camera.position.z = 30
    
    // Optimisation RGESN 2.2 : Réduction de la charge GPU
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: false, // Désactiver l'antialiasing pour performance
      powerPreference: "high-performance"
    })
    renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 480)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limiter le pixel ratio
    
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(25, 25, 25)
    scene.add(dir)
    
    // Optimisation RGESN 2.2 : Garder 20 cubes mais optimiser le rendu
    const cubes: THREE.Mesh[] = []
    
    // Géométrie partagée pour tous les cubes
    const sharedGeometry = new THREE.BoxGeometry(1, 1, 1)
    
    // Matériaux partagés (3 couleurs différentes)
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x4f46e5, shininess: 50 }), // Indigo
      new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 50 }), // Violet
      new THREE.MeshPhongMaterial({ color: 0xec4899, shininess: 50 })  // Pink
    ]
    
    // Garder 20 cubes mais avec géométrie et matériaux partagés
    for (let i = 0; i < 20; i++) {
      const material = materials[i % materials.length]
      const cube = new THREE.Mesh(sharedGeometry, material)
      
      // Positionnement optimisé
      cube.position.set(
        (Math.random() - 0.5) * 50, // Garder l'espacement original
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      )
      
      // Échelle aléatoire pour variété
      const scale = 0.5 + Math.random() * 1.5
      cube.scale.set(scale, scale, scale)
      
      scene.add(cube)
      cubes.push(cube)
    }
    
    // Optimisation RGESN 2.2 : Animation plus efficace
    let frameCount = 0
    const animate = () => {
      frameCount++
      
      // Animation optimisée avec moins de calculs
      cubes.forEach((cube, i) => {
        const speed = 0.01 + (i * 0.005)
        cube.rotation.x += speed
        cube.rotation.y += speed * 0.7
      })
      
      // Rendu conditionnel pour économiser les ressources
      if (frameCount % 2 === 0) { // Rendu à 30 FPS au lieu de 60
        renderer.render(scene, camera)
      }
      
      requestAnimationFrame(animate)
    }
    animate()
    
    const onResize = throttle(() => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }, 200)
    window.addEventListener('resize', onResize)
    
    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      
      // Nettoyage optimisé RGESN 2.2
      sharedGeometry.dispose()
      materials.forEach(material => material.dispose())
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="rounded-xl border border-white/20 shadow-2xl w-full h-96" 
    />
  )
} 