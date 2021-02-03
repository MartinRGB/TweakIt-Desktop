import React ,{memo,Suspense,useRef,useState,useEffect,useMemo,useCallback} from 'react'
import { useAspect } from "@react-three/drei/useAspect";
import { extend,Canvas,useFrame,useLoader,ReactThreeFiber,useThree} from 'react-three-fiber'
import {OrbitControls,Plane,Box} from '@react-three/drei'
import * as THREE from 'three'
import nx from '../assets/envmap_citynight/nx.jpg'
import ny from '../assets/envmap_citynight/ny.jpg'
import nz from '../assets/envmap_citynight/nz.jpg'
import px from '../assets/envmap_citynight/px.jpg'
import py from '../assets/envmap_citynight/py.jpg'
import pz from '../assets/envmap_citynight/pz.jpg'
import { Bloom} from 'react-postprocessing'
const cubeUrls = [
    px, nx,
    py, ny,
    pz,nz
];
import realistic_texutre from '../assets/realistic_texture/tex.jpg'
import realistic_metal from '../assets/realistic_texture/metal.jpg'
import realistic_normal from '../assets/realistic_texture/normal.jpg'

import deviceGLB from '../assets/device.glb'
import {useGLTF} from 'drei'
const envTexture = new THREE.CubeTextureLoader().load( cubeUrls );

export interface IFinalMirrorRenderer{
  video:any;
  canvasVideoWidth:number;
  canvasVideoHeight:number;
  pixelRatio:number;
}

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
import { ReflectorInstance } from "three/modified/reflector/ReflectorInstance";
import { DoubleSide, MeshStandardMaterial, TextureLoader } from 'three';

import { EffectComposer } from './three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from './three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from './three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from './three/examples/jsm/shaders/FXAAShader'
import { UnrealBloomPass } from './three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from './three/examples/jsm/postprocessing/FilmPass'
extend({ EffectComposer, RenderPass, ShaderPass,UnrealBloomPass,FilmPass})
import { AdditiveBlendingShader,KawaseDownShader,KawaseUpShader} from './shaders'

const DEFAULT_LAYER = 0
const REFLECTOR_LAYER = 1

function Mirror({width,height}){
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;

  const reflectorRef = useRef();


  return(
    <>

  <ReflectorInstance
    layers={REFLECTOR_LAYER}
    ref={reflectorRef}
    clipBias={0.003}
    textureWidth={WIDTH * window.devicePixelRatio/2}
    textureHeight={HEIGHT * window.devicePixelRatio/2}
    color={0x777777}
    position={[0, -80, 0]} //y*Math.min(ratioW,ratioH)/2
    rotation={[-Math.PI / 2, 0, 0]}
  >
    < planeBufferGeometry args={[50000, 50000,32]} attach="geometry" />
    
  </ReflectorInstance>
  </>
  )
};


function ScreenOnly({video,width,height}) {
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;

  const { gl, scene, camera, size } = useThree()

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
    </>
  );
}

function Ground({width,height}) {
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;

  const repeatX = 512;
  const repeatY = 512;

  const { gl, scene, camera, size } = useThree()

  //scene.background = envTexture;
  scene.environment = envTexture;

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
      position={[0, -80, 0]} //-y*Math.min(ratioW,ratioH)/2+1
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

function PhoneModel({video,width,height}) {

  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;
  const minRatio = Math.min(ratioW,ratioH);

  const { scene, gl, size, camera } = useThree()
  //scene.background = reflectionCube;

  var gltfScene = useGLTF(deviceGLB).scene

  console.log(gltfScene)
  console.log(ratioH)
  console.log(ratioW)

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
        envMap: envTexture,
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
        envMap: envTexture,
      });

      //backface
      const prevMap = children.children[7].material.map;
      children.children[7].material = new THREE.MeshPhongMaterial( {
        emissiveIntensity : 0.400,
        emissive:new THREE.Color('#222222'),
        refractionRatio: 0.28,
        envMap: envTexture,
        shininess: 20, 
        //envMapIntensity:10.9,
        specular: new THREE.Color('#ffffff'), 
        //metalness:0.9,
        reflectivity:0.37,
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
        envMap: envTexture,
        opacity: 0.9,
        transparent: true,
      });
    }
    if(children.name === 'OnePlus_7_Pro_Screen_Glass'){
      console.log(children);
      children.material = new THREE.MeshPhongMaterial( {
        emissiveIntensity : 0.00,
        emissive:new THREE.Color('#000000'),
        shininess: 10, 
        color: new THREE.Color('#000000'), 
        specular: new THREE.Color('#ffffff'), 
        reflectivity:1.5, 
        refractionRatio: 0.98,
        envMap: envTexture,
        opacity: 0.3,
        transparent: true,
      });
    }
  });

  //useFrame(() => (gltfScene.rotation.y += 0.002))
  return (
    <mesh layers={DEFAULT_LAYER}>
     <primitive object={gltfScene} dispose={null} scale={[1,1,1]} position={[0, -80, -20]}/>
    </mesh>
  )
}


function Effect({}){

  const {scene,gl, size,camera} = useThree()
  const reflectorRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const reflectorComposer = useRef()
  const finalComposer = useRef()
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])

  const blurRef1 = useRef();
  const blurRef2 = useRef();
  const blurRef3 = useRef();
  const blurRef4 = useRef();
  const blurRef5 = useRef();
  const blurRef6 = useRef();


  useEffect(() => {
    reflectorComposer.current.setSize(size.width, size.height)
    finalComposer.current.setSize(size.width, size.height)


    if(blurRef1.current) blurRef1.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef2.current) blurRef2.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef3.current) blurRef3.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef4.current) blurRef4.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef5.current) blurRef5.current.uniforms.resolution.value = [size.width,size.height];
    if(blurRef6.current) blurRef6.current.uniforms.resolution.value = [size.width,size.height];
 
  }, [size])


  useFrame(() => {
    camera.layers.set(REFLECTOR_LAYER)
    reflectorComposer.current.render()
    camera.layers.set(DEFAULT_LAYER)
    finalComposer.current.render()
  }, 1)

  return(
    <>
    <effectComposer ref={reflectorComposer} args={[gl, reflectorRenderTarget]} renderToScreen={false}>
    <renderPass attachArray="passes" args={[scene, camera]} />
    <unrealBloomPass attachArray="passes" args={[aspect, 1, 0.5, 0.16]} renderToScreen={false}/>
    <shaderPass ref={blurRef1} attachArray="passes" args={[KawaseDownShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false}/>
    <shaderPass ref={blurRef2} attachArray="passes" args={[KawaseDownShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false}/>
    <shaderPass ref={blurRef3} attachArray="passes" args={[KawaseDownShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false}/>
    <shaderPass ref={blurRef4} attachArray="passes" args={[KawaseUpShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false}/>
    <shaderPass ref={blurRef5} attachArray="passes" args={[KawaseUpShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false}/>
    <shaderPass ref={blurRef6} attachArray="passes" args={[KawaseUpShader]} uniforms-resolution-value={[size.width,size.height]} renderToScreen={false}/>
    </effectComposer>
    <effectComposer ref={finalComposer} args={[gl]} renderToScreen={true}>
      <renderPass attachArray="passes" args={[scene,camera]}/>
      <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tReflector-value={reflectorRenderTarget.texture}/>
      <shaderPass
          attachArray="passes"
          args={[FXAAShader]}
          material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
          renderToScreen
        />
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

  const lightGroupBIntensity = 0.25;

  return(
    <>

    <ambientLight intensity={0.2} />
    <spotLight castShadow intensity={0.5} color={'rgb(145, 200, 255)'} position={[12*45, 6*45, -10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

    <spotLight castShadow intensity={0.5} color={'rgb(255, 220, 180)'} position={[-12*45, 6*45, -10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

    <spotLight castShadow intensity={0.25} color={'blue'} position={[12*45, 6*45, 10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

  <spotLight castShadow intensity={0.25} color={'red'} position={[-12*45, 6*45, 10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

    <pointLight position={[100, 500, 100]} intensity={lightGroupBIntensity} color="blue" />
    <pointLight position={[-100, 500, 100]} intensity={lightGroupBIntensity} color="red" />
    <pointLight position={[100, 100, 100]} intensity={lightGroupBIntensity/2} color="white" />
    <pointLight position={[-100, 100, 100]} intensity={lightGroupBIntensity/2} color="white" />

    {/* <pointLight position={[100, 500, -100]} intensity={lightGroupBIntensity} color="white"/>
    <pointLight position={[-100, 500, -100]} intensity={lightGroupBIntensity} color="white"/>
    <pointLight position={[100, 100, -100]} intensity={lightGroupBIntensity/2} color="white"/>
    <pointLight position={[-100, 100, -100]} intensity={lightGroupBIntensity/2} color="white"/>  */}

    <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={75}
        near={1}
        far={23000}
        position={[0, 0, 100]}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera.current && (
          <>
          <Suspense fallback={null}>
            <Mirror width={canvasVideoWidth} height={canvasVideoHeight}/>
          </Suspense>
          <Effect/>
          <Suspense fallback={null}>
            {/* <ScreenOnly video={video} width={canvasVideoWidth} height={canvasVideoHeight}  /> */}
            <PhoneModel video={video} width={canvasVideoWidth} height={canvasVideoHeight}></PhoneModel>
            <Ground width={canvasVideoWidth} height={canvasVideoHeight}/>
          </Suspense>
          <OrbitControls/>
          </>
      )}
    </>
  )
}

const FinalMirrorRenderer: React.FC<IFinalMirrorRenderer> = ({video,canvasVideoWidth,canvasVideoHeight,pixelRatio}) => {

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

export default FinalMirrorRenderer;