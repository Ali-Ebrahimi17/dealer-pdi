
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import GlowingContainer from './GlowingContainer'

type Props = {
  modelFile: string
}

const ThreeDModel = ({modelFile}: Props) => {

  const { scene } = useGLTF(`/models/${modelFile}.glb`, '/draco/' )

  useEffect(() => {
    if (scene) {
      // Center the model in the container
      scene.position.x = -0.2
      scene.position.y = -1.8
      scene.position.z = -1
    }
  }, [scene])


  return (
    <GlowingContainer title='3D model'>
      
    <Canvas>
      <ambientLight intensity={1.5} />
      <directionalLight  intensity={4} />
      <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={38} near={0.1} far={1500} />
      <Suspense fallback={null}>
      <primitive object={scene} />
      </Suspense>
      <OrbitControls
        target={[0, -0.5, 0]}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
    </GlowingContainer>
  )
}

export default ThreeDModel;
