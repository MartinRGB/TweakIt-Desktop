import React ,{Suspense,useEffect,useRef,useState,useMemo,useLayoutEffect,memo} from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import * as THREE from 'three'
import { extend,Canvas,useFrame,useLoader,ReactThreeFiber,useThree} from 'react-three-fiber'
import { EffectComposer, SMAA ,SSAO ,DepthOfField, Bloom, Noise, Vignette} from 'react-postprocessing'
import { useAspect } from "@react-three/drei/useAspect";
import {OrbitControls,Plane} from '@react-three/drei'
import deviceGLB from '../assets/device.glb'
import {useGLTF} from 'drei'
import nx from '../assets/envmap_citynight/nx.jpg'
import ny from '../assets/envmap_citynight/ny.jpg'
import nz from '../assets/envmap_citynight/nz.jpg'
import px from '../assets/envmap_citynight/px.jpg'
import py from '../assets/envmap_citynight/py.jpg'
import pz from '../assets/envmap_citynight/pz.jpg'

const cubeUrls = [
  px, nx,
  py, ny,
  pz,nz
];

const reflectionCube = new THREE.CubeTextureLoader().load( cubeUrls );

function PhoneModel({video}) {


  const { scene, gl, size, camera } = useThree()
  //scene.background = reflectionCube;

  var gltfScene = useGLTF(deviceGLB).scene

  gltfScene.traverse(function(children){
    if(children.name === 'OnePlus_7_Pro_Screen'){
      const videoTexture = new THREE.VideoTexture( video );
      videoTexture.flipY = false;
      const videoParameters = { color: 0xffffff, map: videoTexture,reflectivity:0.0 };
      let videoMat = new THREE.MeshBasicMaterial( videoParameters );
      children.material = videoMat; 
    }
    if(children.name === 'OnePlus_7_Pro_Cam_Glass'){
      console.log(children)
      children.material = new THREE.MeshPhongMaterial( {
        emissiveIntensity : 1.00,
        emissive:new THREE.Color('#000000'),
        shininess: 10, 
        color: new THREE.Color('#000000'), 
        specular: new THREE.Color('#FFFFFF'), 
        reflectivity:0.2, 
        refractionRatio: 0.98,
        envMap: reflectionCube,
        opacity: 0.2,
        transparent: true,
      });
    }
    if(children.name === 'OnePlus_7_Pro_Body'){
      
      children.children[3].material = new THREE.MeshPhongMaterial( {
        emissiveIntensity : 1.00,
        emissive:new THREE.Color('#000000'),
        shininess: 4, 
        color: new THREE.Color('#000000'), 
        specular: new THREE.Color('#FFFFFF'), 
        reflectivity:0.7, 
        refractionRatio: 0.8,
        envMap: reflectionCube,
      });

      const prevMap = children.children[7].material.map;
      children.children[7].material = new THREE.MeshStandardMaterial( {
        emissiveIntensity : 1.0,
        emissive:new THREE.Color('#000000'),
        refractionRatio: 0.8,
        envMap: reflectionCube,
        envMapIntensity:0,
        metalness:0.9,
        map:prevMap,
        side: THREE.FrontSide,
      
      });
      children.children[8].material = new THREE.MeshPhongMaterial( {
        emissiveIntensity : 1.00,
        emissive:new THREE.Color('#000000'),
        shininess: 4, 
        color: new THREE.Color('#000000'), 
        specular: new THREE.Color('#FFFFFF'), 
        reflectivity:0.2, 
        refractionRatio: 0.38,
        envMap: reflectionCube,
        opacity: 0.9,
        transparent: true,
      });
    }
    if(children.name === 'OnePlus_7_Pro_Screen_Glass'){
      children.material = new THREE.MeshPhongMaterial( {
        emissiveIntensity : 0.00,
        emissive:new THREE.Color('#000000'),
        shininess: 10, 
        color: new THREE.Color('#000000'), 
        specular: new THREE.Color('#ffffff'), 
        reflectivity:1.0, 
        refractionRatio: 0.98,
        envMap: reflectionCube,
        opacity: 0.1,
        transparent: true,
      });
    }
  });


  //useFrame(() => (gltfScene.rotation.y += 0.002))
  return (
    <>
     <primitive object={gltfScene} dispose={null} position={[0, -80, 0]}/>
    </>
  )
}

export interface IFinalModelRenderer{
  pixelRatio:number;
  video:any;
}

import { ReflectorInstance } from "./three/modified/reflector/ReflectorInstance";

function GroundMirror({width,height}){
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;

  return(<ReflectorInstance
    clipBias={0.003}
    textureWidth={1024}
    textureHeight={1024}
    color={0x777777}
    position={[0, -80, 0]}
    rotation={[-Math.PI / 2, 0, 0]}
  >
    <>
    <planeBufferGeometry args={[5000, 5000,32]} attach="geometry">

    <meshStandardMaterial attach="material" color={'blue'} roughness={0.75} metalness={0.5} opacity={0.9}/>
    </planeBufferGeometry>
    </>
    
  </ReflectorInstance>)
};


const FinalModelRenderer: React.FC<FinalModelRenderer> = memo(({pixelRatio,video}) => {

  // const [renderTarget] = useState(new THREE.WebGLCubeRenderTarget(1024, { format: THREE.RGBAFormat, generateMipmaps: true }))
  // const cubeCamera = useRef()
  return (
    <Canvas
      id="screen-canvas"
      pixelRatio={pixelRatio} 
      shadowMap
      colorManagement={false}
      camera={{ position: [0, 0, 100]}}
      gl={{ antialias: true }}
    >
      <pointLight position={[100, 100, 100]} intensity={0.75} color="blue" />
      <pointLight position={[-100, -100, 100]} intensity={0.75} color="red" />
      <pointLight position={[100, 100, 100]} intensity={0.75} color="white" />
      <pointLight position={[-100, -100, 100]} intensity={0.75} color="white" />
      <pointLight position={[100, -100, 100]} intensity={0.75} color="white" />
      <pointLight position={[-100, 100, 100]} intensity={0.75} color="white" />

      <pointLight position={[100, 100, -100]} intensity={0.75} color="white"/>
      <pointLight position={[-100, -100, -100]} intensity={0.75} color="white"/>
      <pointLight position={[100, 100, -100]} intensity={0.75} color="white"/>
      <pointLight position={[-100, -100, -100]} intensity={0.75} color="white"/> 
      <ambientLight intensity={50} />

      <Suspense fallback={null}>
        <PhoneModel video={video}/>
        {/* <GroundMirror width={512} height={512}></GroundMirror> */}
      </Suspense>

      {/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={0.1} height={480} />
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.2} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}
      {/* <Effects></Effects> */}
      <OrbitControls />
    </Canvas>
  )
});

export default FinalModelRenderer;