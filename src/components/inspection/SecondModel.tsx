import {
  Environment,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import GlowingContainer from './GlowingContainer'
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";


import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


const SecondModel = () => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco-gltf/");
  const model = useGLTF("/models/P33.glb", dracoLoader);

  return (
 
    <GlowingContainer title='3D model'>
      <Canvas>
     
        <PresentationControls global >
        <primitive object={model.scene} position-y={-1.2}></primitive>
        </PresentationControls>

         
       
      </Canvas>
   
  
    
    </GlowingContainer>

  );
};

export default SecondModel;