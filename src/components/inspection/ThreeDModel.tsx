import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stage, useGLTF, Stars } from '@react-three/drei'
import { PointLight, AmbientLight, DirectionalLight } from 'three'
import GlowingContainer from './GlowingContainer'
import * as THREE from 'three'

type Props = {
  modelFile: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(`/models/${url}.glb`, '/draco/')
  const isFullScreen = false
  const isDarkMode = true
  const modelRef = useRef<THREE.Group>(null)

  // Center the model and adjust vertical position
  useEffect(() => {
    if (scene) {
      // Center the model in the container
      // scene.position.y = -0.7
      scene.position.x = -0.2
      scene.position.y = -1.2
      scene.position.z = -1
    }
  }, [scene])

  useFrame(() => {
    if (modelRef.current) {
      // Slow rotation
      modelRef.current.rotation.y += 0.002
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={isFullScreen ? [5, 2, 5] : [5, 2, 5]} fov={isFullScreen ? 35 : 40} />
      <primitive ref={modelRef} object={scene} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={3}
        maxDistance={12}
        target={[0, -0.5, 0]}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  )
}
function SparkleEffect() {
  return <Stars radius={50} depth={50} count={500} factor={4} saturation={0.5} fade speed={0.5} />
}
function GridFloor() {
  const isDarkMode = true
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <gridHelper
        args={[20, 20, isDarkMode ? '#333333' : '#666666', isDarkMode ? '#222222' : '#444444']}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <meshStandardMaterial color={isDarkMode ? '#111111' : '#eeeeee'} transparent opacity={0.3} />
    </mesh>
  )
}

const ThreeDModel = ({ modelFile }: Props) => {
  const { scene } = useGLTF(`/models/${modelFile}.glb`, '/draco/')
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene) {
      // Center the model in the container
      scene.position.x = -0.2
      scene.position.y = -2.1
      scene.position.z = -1
    }
  }, [scene])

  return (
    <GlowingContainer title='3D model'>
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={4} />
        <PerspectiveCamera makeDefault position={[5, 1, 7]} fov={40} near={0.1} far={1500} />
        <Suspense fallback={null}>
          <SparkleEffect />
          {/* <GridFloor /> */}
          {/* <primitive object={scene} /> */}
          <Model url={modelFile} />
        </Suspense>
        <OrbitControls target={[0, -0.5, 0]} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
    </GlowingContainer>
  )
}

export default ThreeDModel
