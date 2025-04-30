// src/Scene.tsx
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import GlowingContainer from './GlowingContainer'

import * as THREE from 'three'


import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./public/draco');
dracoLoader.setDecoderConfig({type: 'js'}); // (Optional) Override detection of WASM support.



// Note that since Three release 148, you will find the Draco libraries in the `.\node_modules\three\examples\jsm\libs\draco\` folder.
// const draco = new DRACOLoader()
// draco.setDecoderPath('/js/libs/dracos/')
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// const dracoLoader = new DRACOLoader();
// // dracoLoader.setDecoderPath( '../../../node_modules/three/examples/js/libs/draco/gltf/' ); // use a full url path
// dracoLoader.setDecoderPath( './threejs/js/libs/draco/' );

// type GLTFResult = GLTF & {
//   nodes: {
//     // Define your nodes here if you know the structure
//   };
//   materials: {
//     // Define your materials here if you know the structure
//   };
// };

// const Model: React.FC = () => {
//   const dracoLoader = new DRACOLoader();
//   dracoLoader.setDecoderPath('/draco/')
//   const { scene } = useGLTF('/models/P33.glb', dracoLoader);
//   return <primitive object={scene} />;
// };

type Props = {
  modelFile: string
}




// const Model = ({modelFile}: Props) => {
//   const { scene } = useGLTF('/models/P33.glb' );
//   return <primitive object={scene} />;
// };

const ThreeDModel = ({modelFile}: Props) => {

  console.log('MODEL => ', modelFile)
  const { scene } = useGLTF(`/models/${modelFile}.glb` );

  // Center the model and adjust vertical position
  useEffect(() => {
    if (scene) {
      // Center the model in the container
      scene.position.x = -0.5
      scene.position.y = -1.2
      scene.position.z = -0.2
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
        {/* <Model /> */}
      </Suspense>
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
    </Canvas>
    </GlowingContainer>
  );
};

export default ThreeDModel;
