import React, { useEffect, useRef } from 'react'
// C4 - Imports optimisés Three.js
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  DirectionalLight, 
  BoxGeometry, 
  MeshPhongMaterial, 
  Mesh 
} from 'three'
import { throttle } from 'lodash'

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1_000)
    camera.position.z = 30
    
    // C4 - Optimisations avancées RGESN
    const renderer = new WebGLRenderer({ 
      canvas, 
      antialias: false, // Désactiver l'antialiasing pour performance
      powerPreference: "high-performance",
      // C4 - Optimisations supplémentaires
      stencil: false,
      depth: true,
      alpha: false
    })
    renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 480)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // C4: Limiter encore plus
    
    const ambient = new AmbientLight(0xffffff, 0.3)
    scene.add(ambient)
    const dir = new DirectionalLight(0xffffff, 0.8)
    dir.position.set(25, 25, 25)
    scene.add(dir)
    
    // C4 - Optimisations géométrie et matériaux
    const cubes: Mesh[] = []
    
    // Géométrie partagée pour tous les cubes
    const sharedGeometry = new BoxGeometry(1, 1, 1)
    
    // Matériaux partagés (5 couleurs différentes) - C4 optimisé pour visibilité
    const materials = [
      new MeshPhongMaterial({ color: 0x4f46e5, shininess: 30 }), // Indigo
      new MeshPhongMaterial({ color: 0x7c3aed, shininess: 30 }), // Violet
      new MeshPhongMaterial({ color: 0xec4899, shininess: 30 }), // Pink
      new MeshPhongMaterial({ color: 0x10b981, shininess: 30 }), // Emerald
      new MeshPhongMaterial({ color: 0xf59e0b, shininess: 30 })  // Amber
    ]
    
    // C4 - Réduction à 5 cubes pour performance et visibilité optimale
    for (let i = 0; i < 5; i++) {
      const material = materials[i % materials.length]
      const cube = new Mesh(sharedGeometry, material)
      
      // Positionnement optimisé et bien espacé pour visibilité
      const angle = (i / 5) * Math.PI * 2
      const radius = 15 // Rayon plus petit pour meilleure visibilité
      
      cube.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5, // Aplatir légèrement sur Y
        (Math.random() - 0.5) * 10 // Légère variation en Z
      )
      
      // Échelle variée pour chaque cube
      const scale = 1.2 + (i * 0.2) // Échelle croissante
      cube.scale.set(scale, scale, scale)
      
      scene.add(cube)
      cubes.push(cube)
    }
    
    // C4 - Animation conditionnelle et optimisée
    let frameCount = 0
    const animate = () => {
      frameCount++
      
      // Animation conditionnelle : chaque cube a un comportement différent
      cubes.forEach((cube, i) => {
        // Vitesse de rotation différente pour chaque cube
        const baseSpeed = 0.01
        const speedMultiplier = 1 + (i * 0.3)
        
        // Rotation conditionnelle selon l'index
        if (i % 2 === 0) {
          // Cubes pairs : rotation sur X et Y
          cube.rotation.x += baseSpeed * speedMultiplier
          cube.rotation.y += baseSpeed * speedMultiplier * 0.7
        } else {
          // Cubes impairs : rotation sur Y et Z
          cube.rotation.y += baseSpeed * speedMultiplier
          cube.rotation.z += baseSpeed * speedMultiplier * 0.5
        }
        
        // Animation de position subtile pour certains cubes
        if (i === 0 || i === 2) {
          cube.position.y += Math.sin(frameCount * 0.02) * 0.1
        }
      })
      
      // C4 - Rendu optimisé : 30 FPS pour fluidité
      if (frameCount % 2 === 0) { // Rendu à 30 FPS
        renderer.render(scene, camera)
      }
      
      requestAnimationFrame(animate)
    }
    animate()
    
    // C4 - Resize optimisé
    const onResize = throttle(() => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }, 300) // Augmenter le throttle
    
    window.addEventListener('resize', onResize)
    
    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      
      // C4 - Nettoyage optimisé
      sharedGeometry.dispose()
      materials.forEach(material => material.dispose())
    }
  }, [])

  return (
    <div className="three-section">
      <canvas
        ref={canvasRef}
        className="w-full h-[500px] bg-gray-800 rounded-lg border border-white/20 shadow-2xl"
      />
    </div>
  )
} 