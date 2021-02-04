import React ,{memo,Suspense,useRef,useState,useEffect,useMemo,useCallback} from 'react'
import { useAspect } from "@react-three/drei/useAspect";
import { extend,Canvas,useFrame,useLoader,ReactThreeFiber,useThree} from 'react-three-fiber'
import {OrbitControls,Plane,Box,useHelper} from '@react-three/drei'
//import * as THREE from './three/src/Three'
import * as THREE from 'three'
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { TextureAreaLightUniformsLib } from './three/modified/textureAreaLightUniformsLib/TextureAreaLightUniformsLib'
import { ReflectorInstance } from "three/modified/reflector/ReflectorInstance";
import { DoubleSide, TextureLoader } from 'three';
//import {ModifiedThree} from './modifiedThree/ModifiedThree'
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
import realistic_texutre from '../assets/realistic_texture/tex.jpg'
import realistic_metal from '../assets/realistic_texture/metal.jpg'
import realistic_normal from '../assets/realistic_texture/normal.jpg'
import lightmap_texture from '../assets/lightmap_texture/stone.jpg'
import test_tex from '../assets/test_tex.png'

import dl_diffuse from '../assets/downloaded/diffuse.jpg'
import dl_normal from '../assets/downloaded/normal.jpg'
import dl_bump from '../assets/downloaded/bump.jpg'
import dl_ao from '../assets/downloaded/ambientocclusion.jpg'
import dl_roughness from '../assets/downloaded/reflectiveocclusion.jpg'
import dl_metal from '../assets/downloaded/metallic.jpg'


const envTexture = new THREE.CubeTextureLoader().load( cubeUrls );
const screenWidth = 108;
const screenHeight = 234;

export interface IPureScreen{
  video:any;
  canvasVideoWidth:number;
  canvasVideoHeight:number;
  pixelRatio:number;
}

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//console.log(ModifiedThree)

function Ground({envTexture,videoTexture,width,height}) {
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;

  const repeatX = 1;
  const repeatY = 1;
  const groundRef = useRef();


  var realisticNormal = useLoader(TextureLoader,realistic_normal);
  realisticNormal.anisotropy = 4;
  realisticNormal.wrapS = realisticNormal.wrapT = THREE.RepeatWrapping;
  realisticNormal.repeat.set(repeatX, repeatX);

  var realisticTex = useLoader(TextureLoader,realistic_texutre);
  realisticTex.anisotropy = 4;
  realisticTex.wrapS = realisticTex.wrapT = THREE.RepeatWrapping;
  realisticTex.repeat.set(repeatX, repeatY); //4

  var lightMapTex = useLoader(TextureLoader,lightmap_texture);
  lightMapTex.anisotropy = 4;
  lightMapTex.wrapS = lightMapTex.wrapT = THREE.RepeatWrapping;
  lightMapTex.repeat.set(repeatX, repeatY); //4

  var dlNorm = useLoader(TextureLoader,dl_normal);
  dlNorm.anisotropy = 4;
  dlNorm.wrapS = dlNorm.wrapT = THREE.RepeatWrapping;
  dlNorm.repeat.set(repeatX, repeatX);

  var dlDiff = useLoader(TextureLoader,dl_diffuse);
  dlDiff.anisotropy = 4;
  dlDiff.wrapS = dlDiff.wrapT = THREE.RepeatWrapping;
  dlDiff.repeat.set(repeatX, repeatY); //4

  var dlBump = useLoader(TextureLoader,dl_bump);
  dlBump.anisotropy = 4;
  dlBump.wrapS = dlBump.wrapT = THREE.RepeatWrapping;
  dlBump.repeat.set(repeatX, repeatY); //4

  var dlAO = useLoader(TextureLoader,dl_ao);
  dlAO.anisotropy = 4;
  dlAO.wrapS = dlAO.dlAO = THREE.RepeatWrapping;
  dlAO.repeat.set(repeatX, repeatY); //4

  var dlRoughness = useLoader(TextureLoader,dl_roughness);
  dlRoughness.anisotropy = 4;
  dlRoughness.wrapS = dlRoughness.dlAO = THREE.RepeatWrapping;
  dlRoughness.repeat.set(repeatX, repeatY); //4

  var dlMetal = useLoader(TextureLoader,dl_metal);
  dlMetal.anisotropy = 4;
  dlMetal.wrapS = dlMetal.dlAO = THREE.RepeatWrapping;
  dlMetal.repeat.set(repeatX, repeatY); //4

  const [hasSetTex,SetHasSetTex] = useState<boolean>(false);

  useEffect(() => {
    if(groundRef.current && !hasSetTex){
      groundRef.current.material = new THREE.MeshStandardMaterial( { 
        color: 0x444444,
        map:dlDiff,
        aoMap:dlAO,
        aoMapIntensity:0.5, 
        bumpMap: dlBump, 
        // metalnessMap:dlMetal,
        // metalness:0.05,
        bumpScale: 5.5,
        normalMap:dlNorm,
        normalScale: new THREE.Vector2(0.5,0.5),
        roughnessMap:dlRoughness,
        roughness: 0.5,
        // reflectivity: 0.8,
        // envMap:envTexture,
        // envMapIntensity:10,
        transparent: true,
        opacity: 1.0

      } ) 

      groundRef.current.material.onBeforeCompile = function (shader) {

        if( shader.uniforms.areaLightTexture.value === null){
          shader.uniforms.areaLightTexture.value = videoTexture;
        }
        // shader.uniforms.myVector = material.userData.myVector;
   
        // shader.fragmentShader = 'uniform vec3 myVector;\n' + shader.fragmentShader;
        // shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>',
        // `
        // // some other code here
   
        // // If I comment this out, the shader runs
        // float result = dot(vNormal, myVector);
   
   
        // `)
      }


      console.log(groundRef.current);
      SetHasSetTex(true);

    }
  }, [groundRef])


  return (
    <>
    <mesh 
      ref={groundRef}
      position={[0, -50, 0]} //-y*Math.min(ratioW,ratioH)/2
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      >
      <planeBufferGeometry args={[1000, 1000,32]} attach="geometry" />
      {/* <meshPhongMaterial
       attach="material"
       color={0xffffff}
       specular={0xffffff}
       map={realisticTex}
       bumpMap={lightMapTex}
       bumpScale={0.105}
      ></meshPhongMaterial> */}
      
      {/* <meshStandardMaterial
          attach="material"
          color={0xffffff}
          map={realisticTex}
          bumpMap={lightMapTex}
          bumpScale={10.11}
          // roughnessMap={realisticTex}
          // normalMap={realisticNormal}
          // metalness={0.5}
          roughness= {0.15}
          reflectivity={0.9}
          transparent={true}
          opacity={1.0}
          >    
      </meshStandardMaterial> */}

      {/* <meshStandardMaterial
          attach="material"
          color={0xffffff}
          map={realisticTex}
          bumpMap={realisticTex}
          roughnessMap={realisticTex}
          normalMap={realisticNormal}
          bumpScale={0.11}
          metalness={0.5}
          roughness= {0.15}
          reflectivity={0.9}
          transparent={true}
          opacity={1.0}
          >    
      </meshStandardMaterial> */}

    </mesh>

    </>
  );
}

// function Mirror({width,height}){
//   const [x, y] = useAspect("cover", width, height);
//   const canvas = document.getElementById('screen-canvas')
//   const ratioW = width/canvas.offsetWidth;
//   const ratioH = height/canvas.offsetHeight;

//   return(
//   <>
//     <ReflectorInstance
//       clipBias={0.003}
//       textureWidth={WIDTH * window.devicePixelRatio/2}
//       textureHeight={HEIGHT * window.devicePixelRatio/2}
//       color={0x777777}
//       position={[-250, -50, 0]} //y*Math.min(ratioW,ratioH)/2
//       rotation={[-Math.PI / 2, 0, 0]}
//       >
//       < planeBufferGeometry args={[500, 500,32]} attach="geometry" />
//     </ReflectorInstance>
//   </>
//   )
// };

//RectAreaLightUniformsLib.init()

function AreaLight({videoTexture,width,height}){
  const [x, y] = useAspect("cover", width, height);
  const canvas = document.getElementById('screen-canvas')
  const ratioW = width/canvas.offsetWidth;
  const ratioH = height/canvas.offsetHeight;
  const rectAreaLightRef = useRef();
  const meshRef = useRef();
  const {scene,gl,camera} = useThree();
  //useHelper(rectAreaLightRef, RectAreaLightHelper, 'white')
  const [hasCreate,setHasCreate] = useState<boolean>(false)
  const [areaLightProxy,setAreaLightProxy] = useState<THREE.AreaLightProxy>();
  const [areaLight,setAreaLight] = useState<THREE.TextureAreaLight>();

  // const testTex = useLoader(TextureLoader,test_tex);
  // testTex.anisotropy = 16;
  // testTex.wrapS = testTex.wrapT = THREE.RepeatWrapping;
  // testTex.repeat.set(1, 1);


  useFrame(() => {
  
  })

  useEffect(() => {
    
    if(meshRef.current && ratioW && ratioH && !hasCreate ){
        RectAreaLightUniformsLib.init();
        //TextureAreaLightUniformsLib.init(testTex);

        const width = 50;
        const height = 100;

        // var realisticTex = useLoader(TextureLoader,realistic_texutre);
        // realisticTex.anisotropy = 16;
        // realisticTex.wrapS = realisticTex.wrapT = THREE.RepeatWrapping;
        // realisticTex.repeat.set(4, 4);

        const areaLight = new THREE.TextureAreaLight( 0xffffff, 4,screenWidth,screenHeight, videoTexture , gl );

        areaLight.position.set( 0, 0, 0 );
        //areaLight.rotation.set( Math.PI, 0, 0 );
        meshRef.current.add( areaLight );

        console.log('1')
        // const rectLightHelper0 = new RectAreaLightHelper( rectLight0 );
        // rectLightHelper0.position.set(0, (128-50), 0 );
        // meshRef.current.add( rectLightHelper0 );
        //console.log(rectLightHelper0);

				// const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 2, width,height);
        // rectLight2.position.set( width*1.5, 0, 0 );
        // rectLight2.rotation.set( Math.PI, 0, 0 );
        // meshRef.current.add( rectLight2 );
        // const rectLightHelper2 = new RectAreaLightHelper( rectLight2 );
        // rectLightHelper2.position.set(width*1.5, 0, 0 );
        // meshRef.current.add( rectLightHelper2 );

				// const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 2, width,height);
        // rectLight3.position.set(width*-1.5, 0, 0 );
        // rectLight3.rotation.set( Math.PI, 0, 0 );
        // meshRef.current.add( rectLight3 );
        // const rectLightHelper3 = new RectAreaLightHelper( rectLight3 );
        // rectLightHelper3.position.set(width*-1.5, 0, 0 );
        // meshRef.current.add( rectLightHelper3 );
        
    }
    if(areaLight){
      // console.log(areaLightProxy)
      // console.log(areaLight)


      //setAreaLightProxy(new THREE.AreaLightProxy(areaLight,gl));

    }

  }, [meshRef,ratioW,ratioH,areaLight]);



  const liftHeight = 20;
  return(
  <>
  <mesh position={[0,screenHeight/2-50 + liftHeight,0]}>

    <planeBufferGeometry args={[screenWidth, screenHeight,32]}  attach="geometry" />
      <meshBasicMaterial side={DoubleSide} map={videoTexture}>
      </meshBasicMaterial>
  </mesh>
  <mesh
    position={[0,screenHeight/2-50 + liftHeight,0]}
    ref={meshRef}
    rotation={[0,0.,0.]} //-Math.PI
    >
      
    {/* <rectAreaLight
      ref={rectAreaLightRef}
      intensity={10}
      position={[0, 0, 0]}
      visible={true}
      width={x*Math.min(ratioW,ratioH)}
      height={y*Math.min(ratioW,ratioH)}
      color={'white'}
    /> */}
  </mesh>
  </>
  )
};


// function ScreenOnly({video,width,height}) {
//   const [x, y] = useAspect("cover", width, height);
//   const canvas = document.getElementById('screen-canvas')
//   const ratioW = width/canvas.offsetWidth;
//   const ratioH = height/canvas.offsetHeight;


//   return (
//   <>
//     <mesh 
//       rotation={[0,0,0]}
//       scale={[x*Math.min(ratioW,ratioH), y*Math.min(ratioW,ratioH), 1]} 
//       position={[0, 0, 0]} 
//       castShadow 
//       receiveShadow>
//         <planeBufferGeometry args={[1, 1,1]} attach="geometry" />
//         <meshBasicMaterial side={DoubleSide}>
//           <videoTexture attach="map" args={[video]} />
//         </meshBasicMaterial>
//     </mesh>
//   </>
//   );
// }

function Content({video,canvasVideoWidth,canvasVideoHeight}){
  const camera = useRef();
  const { size, setDefaultCamera,scene} = useThree();
  useEffect(() => void setDefaultCamera(camera.current), [camera]);
  useFrame(() => camera.current.updateMatrixWorld())

  scene.background = envTexture;
  scene.environment = envTexture;

  const videoTexture = new THREE.VideoTexture( video );
  videoTexture.wrapS = videoTexture.wrapT = THREE.ClampToEdgeWrapping;

  return(
    <>

    <ambientLight intensity={0.05} />
    {/* <spotLight castShadow intensity={0.5} color={'rgb(145, 200, 255)'} position={[12*45, 6*45, -10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} />

    <spotLight castShadow intensity={0.5} color={'rgb(255, 220, 180)'} position={[-12*45, 6*45, -10*20]} shadow-mapSize-width={4096} shadow-mapSize-height={4096} /> */}

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
            {/* <ScreenOnly video={video} width={canvasVideoWidth} height={canvasVideoHeight}  /> */}
            <AreaLight videoTexture={videoTexture} width={canvasVideoWidth} height={canvasVideoHeight}></AreaLight>
            {/* <Mirror width={canvasVideoWidth} height={canvasVideoHeight}/> */}
            <Ground envTexture={envTexture} videoTexture={videoTexture} width={canvasVideoWidth} height={canvasVideoHeight}/>
          </Suspense>
          <OrbitControls/>
          </>
      )}
    </>
  )
}

const SceneTest: React.FC<IPureScreen> = ({video,canvasVideoWidth,canvasVideoHeight,pixelRatio}) => {

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

export default SceneTest;