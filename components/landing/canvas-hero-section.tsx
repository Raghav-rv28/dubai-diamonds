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

    // Create sparkle particles
    const sparkleGeometry = new THREE.BufferGeometry()
    const sparkleCount = 100
    const sparklePositions = new Float32Array(sparkleCount * 3)
    const sparkleOpacities = new Float32Array(sparkleCount)
    const sparkleSizes = new Float32Array(sparkleCount)

    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 4
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 4
      sparklePositions[i * 3 + 2] = Math.random() * 0.5
      sparkleOpacities[i] = Math.random()
      sparkleSizes[i] = Math.random() * 15 + 5
    }

    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3))
    sparkleGeometry.setAttribute('opacity', new THREE.BufferAttribute(sparkleOpacities, 1))
    sparkleGeometry.setAttribute('size', new THREE.BufferAttribute(sparkleSizes, 1))

    const sparkleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: `
        attribute float opacity;
        attribute float size;
        varying float vOpacity;
        
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = (1.0 - distance * 2.0) * vOpacity * 0.8;
          gl_FragColor = vec4(0.8, 0.9, 1.0, alpha);
        }
      `
    })

    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial)
    scene.add(sparkles)

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
          // For mobile, set the texture directly\
          if(material instanceof THREE.MeshBasicMaterial){
          material.map = texture
          }
          material.needsUpdate = true
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
      const positions = sparkleGeometry.attributes.position?.array as Float32Array
      const opacities = sparkleGeometry.attributes.opacity?.array as Float32Array
      
      for (let i = 0; i < sparkleCount; i++) {
        const i3 = i * 3
        opacities[i] = (Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5) * 0.8
      }
      
      sparkleGeometry.attributes.opacity!.needsUpdate = true
      
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
      
      renderer.dispose()
      sparkleGeometry.dispose()
      sparkleMaterial.dispose()
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
            Illuminate the Extraordinary
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed">
            Discover brilliance that emerges from the shadows, revealing extraordinary diamonds crafted with precision.
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