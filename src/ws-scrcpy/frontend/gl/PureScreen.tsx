import React ,{memo,Suspense,useRef,useState,useEffect,useMemo,useCallback} from 'react'
import { useAspect } from "@react-three/drei/useAspect";
import { extend,apply,Canvas,useFrame,useLoader,useRender,ReactThreeFiber,useThree} from 'react-three-fiber'
import {OrbitControls,Plane,Box} from '@react-three/drei'
import * as THREE from 'three'
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

import realistic_texutre from '../assets/realistic_texutre/tex.jpg'
import realistic_metal from '../assets/realistic_texutre/metal.jpg'
import realistic_normal from '../assets/realistic_texutre/normal.jpg'


export interface IPureScreen{
  video:any;
  canvasVideoWidth:number;
  canvasVideoHeight:number;
  pixelRatio:number;
}

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
import { ReflectorInstance } from "./reflector/ReflectorInstance";
import { DoubleSide, MeshStandardMaterial, TextureLoader } from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
extend({ EffectComposer, RenderPass, ShaderPass,UnrealBloomPass,FilmPass})
import { AdditiveBlendingShader, VolumetricLightShader,noise, TestShader,KawaseDownShader,KawaseUpShader} from './shaders'

const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1

function MirrorScene({video,width,height}){
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;


  const reflectorRef = useRef();


  return(
    <>

  <ReflectorInstance
    layers={OCCLUSION_LAYER}
    ref={reflectorRef}
    clipBias={0.003}
    textureWidth={WIDTH * window.devicePixelRatio/2}
    textureHeight={HEIGHT * window.devicePixelRatio/2}
    color={0x777777}
    position={[0, -y*Math.min(ratioW,ratioH)/2, 0]}
    rotation={[-Math.PI / 2, 0, 0]}
  >
    < planeBufferGeometry args={[50000, 50000,32]} attach="geometry" />
    
  </ReflectorInstance>

  {/* <mesh 
      layers={DEFAULT_LAYER}
      rotation={[0,0,0]}
      scale={[x*Math.min(ratioW,ratioH), y*Math.min(ratioW,ratioH), 1]} 
      position={[0, 0, 0]} 
      castShadow 
      receiveShadow>
        <planeBufferGeometry args={[1, 1,1]} attach="geometry" />
        <meshBasicMaterial side={DoubleSide}>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
  </mesh> */}
  </>
  )
};


function ScreenScene({video,width,height}) {
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;

  const { gl, scene, camera, size } = useThree()

  const envTexture = new THREE.CubeTextureLoader().load( cubeUrls );
  //scene.background = envTexture;
  scene.environment = envTexture;


  const repeatX = 512;
  const repeatY = 512;

  var realisticNormal = useLoader(TextureLoader,realistic_normal);
  realisticNormal.anisotropy = repeatY;
  realisticNormal.wrapS = realisticNormal.wrapT = THREE.RepeatWrapping;
  realisticNormal.repeat.set(repeatX, repeatY);

  var realisticTex = useLoader(TextureLoader,realistic_texutre);
  realisticTex.wrapS = realisticTex.wrapT = THREE.RepeatWrapping;
  realisticTex.repeat.set(repeatX, repeatY);


  return (
    <>
    <mesh 
      layers={DEFAULT_LAYER}
      rotation={[0,0,0]}
      scale={[x*Math.min(ratioW,ratioH), y*Math.min(ratioW,ratioH), 1]} 
      position={[0, 0, 0]} 
      castShadow 
      receiveShadow>
        <planeBufferGeometry args={[1, 1,1]} attach="geometry" />
        <meshBasicMaterial side={DoubleSide}>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
    </mesh>


    <mesh 
      layers={DEFAULT_LAYER}
      position={[0, -y*Math.min(ratioW,ratioH)/2+1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeBufferGeometry args={[50000, 50000,32]} attach="geometry" />

      <meshStandardMaterial
          attach="material"
          color={0xffffff}
          map={realisticTex}
          bumpMap={realisticTex}
          roughnessMap={realisticTex}
          normalMap={realisticNormal}
          bumpScale={0.11}
          metalness={0.75}
          roughness= {0.15}
          reflectivity={0.9}
          transparent={true}
          opacity={0.85}
          ></meshStandardMaterial>

    </mesh>

    </>
  );
}

function Effect({}){

  const {scene,gl, size,camera} = useThree()
  const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const occlusionComposer = useRef()
  const composer = useRef()
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])

  const blurRef1 = useRef();
  const blurRef2 = useRef();
  const blurRef3 = useRef();
  const blurRef4 = useRef();


  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height)
    composer.current.setSize(size.width, size.height)
  }, [size])




  useFrame(() => {

    camera.layers.set(OCCLUSION_LAYER)
    occlusionComposer.current.render()
    camera.layers.set(DEFAULT_LAYER)
    composer.current.render()

    if(blurRef1.current) blurRef1.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef2.current) blurRef2.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef3.current) blurRef3.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef4.current) blurRef4.current.uniforms.resolution.value = [size.width,size.height];
 
  }, 16)

  return(
    <>
    <effectComposer ref={occlusionComposer} args={[gl, occlusionRenderTarget]} renderToScreen={false}>
    <renderPass attachArray="passes" args={[scene, camera]} />
    <unrealBloomPass attachArray="passes" args={[aspect, 1/3, 0.5/3, 0]} renderToScreen={false}/>
    <shaderPass ref={blurRef1} attachArray="passes" args={[KawaseDownShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false} />
    <shaderPass ref={blurRef2} attachArray="passes" args={[KawaseDownShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false} />
    <shaderPass ref={blurRef3} attachArray="passes" args={[KawaseUpShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false} />
    <shaderPass ref={blurRef4} attachArray="passes" args={[KawaseUpShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={true} />
  
    </effectComposer>
    <effectComposer ref={composer} args={[gl]} renderToScreen={true}>
      <renderPass attachArray="passes" args={[scene,camera]}/>
      <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} />
      
      {/* <shaderPass attachArray="passes" args={[TestShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} /> */}
    </effectComposer>
    </>
  )
}

function Content({video,canvasVideoWidth,canvasVideoHeight}){
  const camera = useRef();
  const { size, setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(camera.current), [camera]);
  useFrame(() => camera.current.updateMatrixWorld())
  const envTexture = new THREE.CubeTextureLoader().load( cubeUrls );

  return(
    <>

    <ambientLight intensity={0.2} />
    <spotLight castShadow intensity={0.25} color={'rgb(145, 200, 255)'} position={[6*45, 8*45, -20*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

    <spotLight castShadow intensity={0.25} color={'rgb(255, 220, 180)'} position={[-12*45, 6*45, -10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

    <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={45}
        near={1}
        far={23000}
        position={[0, 0, 100]}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera.current && (
          <>
          <Suspense fallback={null}>

            <ScreenScene video={video} width={canvasVideoWidth} height={canvasVideoHeight}  />

            <MirrorScene video={video} width={canvasVideoWidth} height={canvasVideoHeight} ></MirrorScene>
            <OrbitControls/>
          </Suspense>
          <Effect/>
          </>
      )}
      
    </>
  )
}

const PureScreen: React.FC<IPureScreen> = ({video,canvasVideoWidth,canvasVideoHeight,pixelRatio}) => {

  return (
    <Canvas
    id="screen-canvas"
    pixelRatio={pixelRatio} 
    shadowMap
    colorManagement={false}
    gl={{ antialias: true }}
  >
    <Content 
      video={video} 
      canvasVideoWidth={canvasVideoWidth} 
      canvasVideoHeight={canvasVideoHeight}>
    </Content>
  </Canvas>
  )
};

export default PureScreen;