"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

interface DiamondRevealProps {
  imageUrl?: string
}

export default function Component({ 
  imageUrl = "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_White_Full.png?v=1747429316" 
}: DiamondRevealProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>(null)
  const rendererRef = useRef<THREE.WebGLRenderer>(null)
  const diamondMeshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false)

  // Inline SVG as data URL
  const sparkleDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg fill="#ffffff" width="100" height="100" viewBox="0 0 750 750" xmlns="http://www.w3.org/2000/svg">
      <path d="M587.54,369.5c.03,10.91-5.43,16.63-16.87,17.19-24.14,1.2-47.66,5.43-70.69,12.9-27.43,8.89-47.33,25.72-58.1,52.78-8.4,21.11-16.5,42.36-25.41,63.25-5.47,12.82-11.6,25.47-18.67,37.47-3.64,6.18-9.33,11.69-15.26,15.86-9.2,6.48-19.12,3.51-23.72-6.83-2.6-5.85-3.57-12.53-4.64-18.94-2.6-15.51-4.36-31.17-7.3-46.6-10.71-56.23-45.39-90.27-99.85-104.33-20.21-5.22-41.25-7.24-61.9-10.79-4.3-.74-8.56-1.7-12.8-2.74-6.39-1.57-9.44-6.09-9.84-12.33-.4-6.2,2.05-11.2,7.82-13.94,3.13-1.49,6.52-2.53,9.87-3.48,71.73-20.5,129.09-60.82,170.33-123.36,3.13-4.74,5.97-9.67,8.88-14.56,3.12-5.25,6.25-10.14,3.45-17.08-1.21-3.01,.19-7.86,1.89-11.08,3.39-6.41,9.22-7.06,13.65-1.29,6.89,9,18.09,15.47,17.11,29.46-.23,3.33,3.19,7.02,5.22,10.37,31.3,51.75,74.28,90.17,130.41,113.34,13.71,5.66,27.74,10.55,41.7,15.59,10,3.61,14.69,9.46,14.72,19.16Zm-80.92,1.25c-3.28-2.02-5-3.32-6.91-4.24-27.84-13.36-50.78-32.97-68.9-57.56-14.5-19.67-26.86-40.91-40.11-61.5-2.47-3.84-4.64-7.88-7.87-13.4-3.67,5.5-5.88,9.15-8.42,12.56-9.4,12.63-18.22,25.77-28.51,37.62-20.23,23.31-44.3,42.23-70.47,58.55-3.76,2.34-9.04,3.51-10.19,9.6,50.44,11.92,79.34,45.91,95.47,92.54,5.28,15.26,8.96,31.06,13.36,46.62,1.25,4.41,2.45,8.84,4.48,16.17,4.19-6.21,6.92-9.95,9.34-13.88,12.16-19.75,23.73-39.88,36.47-59.24,17.54-26.65,41.24-46.22,71.02-58.19,3.47-1.4,6.71-3.37,11.24-5.67Z" />
    </svg>
  `)}`

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
    camera.position.z = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create sparkle particles using inline SVG texture
    const sparkleCount = 100
    const sparkles: THREE.Mesh[] = []
    
    // Load sparkle SVG texture from data URL
    const sparkleTextureLoader = new THREE.TextureLoader()
    
    sparkleTextureLoader.load(
      sparkleDataUrl,
      (sparkleTexture) => {
        sparkleTexture.minFilter = THREE.LinearFilter
        sparkleTexture.magFilter = THREE.LinearFilter
        
        // Create individual sparkle meshes
        for (let i = 0; i < sparkleCount; i++) {
          // Random size between 0.02 and 0.08
          const size = Math.random() * 0.06 + 0.02
          const geometry = new THREE.PlaneGeometry(size, size)
          
          const material = new THREE.MeshBasicMaterial({
            map: sparkleTexture,
            transparent: true,
            opacity: Math.random() * 0.8 + 0.2,
            blending: THREE.AdditiveBlending
          })
          
          const sparkle = new THREE.Mesh(geometry, material)
          
          // Random position
          sparkle.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            Math.random() * 0.5
          )
          
          // Store animation properties
          sparkle.userData = {
            baseSize: size,
            animationOffset: Math.random() * Math.PI * 2,
            animationSpeed: Math.random() * 2 + 1,
            baseOpacity: material.opacity
          }
          
          sparkles.push(sparkle)
          scene.add(sparkle)
        }
      },
      (progress) => {
        console.log('Loading sparkle texture:', progress)
      },
      (error) => {
        console.error('Error loading sparkle SVG:', error)
        // Fallback: create simple white squares if SVG fails to load
        for (let i = 0; i < sparkleCount; i++) {
          const size = Math.random() * 0.06 + 0.02
          const geometry = new THREE.PlaneGeometry(size, size)
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: Math.random() * 0.8 + 0.2
          })
          
          const sparkle = new THREE.Mesh(geometry, material)
          sparkle.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            Math.random() * 0.5
          )
          
          sparkle.userData = {
            baseSize: size,
            animationOffset: Math.random() * Math.PI * 2,
            animationSpeed: Math.random() * 2 + 1,
            baseOpacity: material.opacity
          }
          
          sparkles.push(sparkle)
          scene.add(sparkle)
        }
      }
    )

    // Create spotlight material for diamond reveal (desktop) or simple material (mobile)
    const createMaterial = (isMobileView: boolean) => {
      if (isMobileView) {
        // Simple material for mobile - just shows the texture
        return new THREE.MeshBasicMaterial({
          transparent: true,
          map: null
        })
      } else {
        // Spotlight material for desktop
        return new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            uTexture: { value: null },
            uMouse: { value: new THREE.Vector2(-10, -10) },
            uSpotlightRadius: { value: 0.3 },
            uAspect: { value: 1.0 }
          },
          vertexShader: `
            varying vec2 vUv;
            
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform vec2 uMouse;
            uniform float uSpotlightRadius;
            uniform float uAspect;
            varying vec2 vUv;
            
            void main() {
              // Use UV coordinates directly without aspect ratio adjustment
              // This ensures the spotlight follows the actual mouse position
              float distance = length(vUv - uMouse);
              float spotlight = 1.0 - smoothstep(0.0, uSpotlightRadius, distance);
              
              vec4 textureColor = texture2D(uTexture, vUv);
              
              // Add glow effect
              float glow = exp(-distance * 8.0) * 0.3;
              vec3 finalColor = textureColor.rgb + vec3(glow * 0.5, glow * 0.7, glow);
              
              gl_FragColor = vec4(finalColor, textureColor.a * spotlight);
            }
          `
        })
      }
    }

    let material = createMaterial(isMobile)

    // Load diamond texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "anonymous"
    
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        
        // Original image dimensions: 3539 × 981
        const imageAspectRatio = 3539 / 981 // ≈ 3.61
        
        // Calculate size based on screen and mobile state
        const baseWidth = isMobile ? 1.2 : 1.8  // Reduced size, smaller on mobile
        const width = baseWidth
        const height = width / imageAspectRatio
        
        if (isMobile) {
          // For mobile, set the texture directly - fix the TypeScript error
          if (material instanceof THREE.MeshBasicMaterial) {
            material.map = texture
            material.needsUpdate = true
          }
        } else {
          // For desktop, set the texture in the shader uniform
          if (material instanceof THREE.ShaderMaterial && material.uniforms.uTexture) {
            material.uniforms.uTexture.value = texture
          }
        }
        
        // Create diamond plane with correct aspect ratio
        const geometry = new THREE.PlaneGeometry(width, height)
        const diamondMesh = new THREE.Mesh(geometry, material)
        
        // Position the diamond to the right side
        const screenAspect = window.innerWidth / window.innerHeight
        const rightOffset = isMobile ? 0 : screenAspect * 0.3  // Center on mobile, right-aligned on desktop
        diamondMesh.position.x = rightOffset
        diamondMesh.position.y = isMobile ? -0.2 : 0  // Slightly lower on mobile
        
        scene.add(diamondMesh)
        diamondMeshRef.current = diamondMesh
        
        setIsLoaded(true)
        console.log('Diamond texture loaded successfully')
      },
      (progress) => {
        console.log('Loading progress:', progress)
      },
      (error) => {
        console.error('Error loading diamond texture:', error)
      }
    )

    // Mouse move handler (only for desktop)
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return  // Skip mouse handling on mobile
      
      const rect = mountRef.current?.getBoundingClientRect()
      if (!rect) return

      // Convert mouse position to UV coordinates (0-1 range)
      const uvX = (event.clientX - rect.left) / rect.width
      const uvY = 1.0 - (event.clientY - rect.top) / rect.height  // Flip Y for UV space
      
      mouseRef.current = { x: uvX, y: uvY }
      
      // Update mouse position for cursor indicator
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      })
      
      if (material instanceof THREE.ShaderMaterial && material.uniforms.uMouse) {
        material.uniforms.uMouse.value.set(uvX, uvY)
      }
    }

    // Mouse leave handler (only for desktop)
    const handleMouseLeave = () => {
      if (isMobile) return  // Skip mouse handling on mobile
      
      setIsMouseInCanvas(false)
      setMousePosition({ x: -1000, y: -1000 })
      
      if (material instanceof THREE.ShaderMaterial && material.uniforms.uMouse) {
        material.uniforms.uMouse.value.set(-10, -10)
      }
    }

    // Mouse enter handler
    const handleMouseEnter = () => {
      if (isMobile) return
      setIsMouseInCanvas(true)
    }

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer) return
      
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      const aspect = width / height
      
      camera.left = -aspect
      camera.right = aspect
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
      
      if (material instanceof THREE.ShaderMaterial && material.uniforms.uAspect) {
        material.uniforms.uAspect.value = aspect
      }

      // Update diamond position on resize
      if (diamondMeshRef.current) {
        const rightOffset = isMobile ? 0 : aspect * 0.3
        diamondMeshRef.current.position.x = rightOffset
      }
    }

    // Add event listeners (only add mouse events for desktop)
    if (!isMobile) {
      mountRef.current.addEventListener('mousemove', handleMouseMove)
      mountRef.current.addEventListener('mouseleave', handleMouseLeave)
      mountRef.current.addEventListener('mouseenter', handleMouseEnter)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Animate sparkles
      const time = Date.now() * 0.001
      
      sparkles.forEach((sparkle) => {
        const userData = sparkle.userData
        
        // Animate size - randomly grow and shrink
        const sizeMultiplier = 0.5 + Math.sin(time * userData.animationSpeed + userData.animationOffset) * 0.5
        const newSize = userData.baseSize * (0.3 + sizeMultiplier * 0.7)
        sparkle.scale.setScalar(newSize / userData.baseSize)
        
        // Animate opacity - twinkling effect
        const opacityMultiplier = 0.3 + Math.sin(time * userData.animationSpeed * 1.5 + userData.animationOffset) * 0.7
        if (sparkle.material instanceof THREE.MeshBasicMaterial) {
          sparkle.material.opacity = userData.baseOpacity * opacityMultiplier
        }
        
        // Slight rotation for extra sparkle effect
        sparkle.rotation.z = time * 0.5 + userData.animationOffset
      })
      
      renderer.render(scene, camera)
    }

    // Initial resize and start animation
    handleResize()
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      if (!isMobile) {
        mountRef.current?.removeEventListener('mousemove', handleMouseMove)
        mountRef.current?.removeEventListener('mouseleave', handleMouseLeave)
        mountRef.current?.removeEventListener('mouseenter', handleMouseEnter)
      }
      window.removeEventListener('resize', handleResize)
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      // Dispose sparkles
      sparkles.forEach(sparkle => {
        sparkle.geometry.dispose()
        if (sparkle.material instanceof THREE.MeshBasicMaterial) {
          sparkle.material.dispose()
        }
        scene.remove(sparkle)
      })
      
      renderer.dispose()
      material.dispose()
    }
  }, [imageUrl, isMobile])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Three.js mount point */}
      <div 
        ref={mountRef} 
        className={`absolute inset-0 w-full h-full ${isMobile ? '' : 'cursor-none'}`}
        style={{ touchAction: 'none' }}
      />

      {/* Custom mouse cursor indicator for desktop */}
      {!isMobile && isMouseInCanvas && (
        <div 
          className="absolute pointer-events-none z-20 transition-all duration-75 ease-out"
          style={{
            left: mousePosition.x - 15,
            top: mousePosition.y - 15,
            transform: 'translate(0, 0)'
          }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10">
            <div className="w-full h-full rounded-full border border-white/60 animate-pulse">
              <div className="w-2 h-2 bg-white/80 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white/60 text-sm animate-pulse">Loading diamond...</div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex items-start min-h-screen pointer-events-none">
        <div className="max-w-2xl space-y-8 mt-20">
          <div className="inline-block rounded-lg bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-white/60 border border-white/10">
            💎 Hidden in the darkness
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Explore the Legacy of Diamonds
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed">
            Best in class service and diamonds provided in Ontario,Canada. Explore our collection or book a meeting!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 pointer-events-auto">
            <Link href="/search" className="px-8 py-4 text-black bg-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-white/10">
              Discover More
            </Link>
            <Link target="_blank" href="https://calendly.com/dubai-diamonds103/30min" className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-200">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
};