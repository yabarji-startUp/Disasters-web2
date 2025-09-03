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
    
    // Matériaux partagés (3 couleurs différentes) - C4 optimisé
    const materials = [
      new MeshPhongMaterial({ color: 0x4f46e5, shininess: 30 }), // Indigo
      new MeshPhongMaterial({ color: 0x7c3aed, shininess: 30 }), // Violet
      new MeshPhongMaterial({ color: 0xec4899, shininess: 30 })  // Pink
    ]
    
    // C4 - Réduction à 15 cubes pour performance
    for (let i = 0; i < 15; i++) {
      const material = materials[i % materials.length]
      const cube = new Mesh(sharedGeometry, material)
      
      // Positionnement optimisé
      cube.position.set(
        (Math.random() - 0.5) * 40, // Réduire l'espacement
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      )
      
      // Échelle optimisée
      const scale = 0.8 + Math.random() * 1.2
      cube.scale.set(scale, scale, scale)
      
      scene.add(cube)
      cubes.push(cube)
    }
    
    // C4 - Animation ultra-optimisée
    let frameCount = 0
    const animate = () => {
      frameCount++
      
      // Animation optimisée avec moins de calculs
      cubes.forEach((cube, i) => {
        const speed = 0.008 + (i * 0.003) // Réduire la vitesse
        cube.rotation.x += speed
        cube.rotation.y += speed * 0.5
      })
      
      // C4 - Rendu ultra-optimisé : 20 FPS au lieu de 30
      if (frameCount % 3 === 0) { // Rendu à 20 FPS
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
        className="w-full h-64 bg-gray-800 rounded-lg"
      />
      <div className="mt-2 text-center text-sm text-gray-400">
        🚀 C4: 3D optimisé - 15 cubes, 20 FPS, optimisations avancées
      </div>
    </div>
  )
} 