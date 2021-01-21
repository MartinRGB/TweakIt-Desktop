import React ,{Suspense,useEffect,useRef,useState,useMemo,useLayoutEffect} from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import {PrepareDataClientReact} from './client/PrepareDataClientReact'
import {ScrcpyClientReact} from './client/ScrcpyClientReact'
import { ScrcpyStreamParams } from '../frontend/interfaces/ScrcpyStreamParams';
import {SocketEventListener} from '../frontend/interfaces/SocketEventListener'
import {ScrcpyEventListener} from '../frontend/interfaces/ScrcpyEventListener'
import {FinalMessage} from '../server/interfaces/Message'
import {SCALE_DOWN_FACTOR,WINDOW_PADDING_TOP} from '../GlobalConstants'
import cursorImg from './assets/cursor.png'
import MseDecoder from './decoder/MseDecoder';
import VideoSettings from './info/VideoSettings'
import Size from './utils/Size'
import * as THREE from 'three'
import { extend,apply,Canvas,useFrame,useLoader,useRender,ReactThreeFiber,useThree} from 'react-three-fiber'
import { EffectComposer, SMAA ,SSAO } from 'react-postprocessing'
import { useAspect } from "@react-three/drei/useAspect";
import { RoundedBox } from "@react-three/drei"
import Controls from './Controls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import testGlb from './assets/device.glb'
import {useGLTF} from 'drei'
import nx from './assets/cubemap/nx.jpg'
import ny from './assets/cubemap/ny.jpg'
import nz from './assets/cubemap/nz.jpg'
import px from './assets/cubemap/px.jpg'
import py from './assets/cubemap/py.jpg'
import pz from './assets/cubemap/pz.jpg'
import OnePlus_Diffuse from './assets/OnePlus_7_Diffuse.jpg'


function Swarm({ count, mouse }) {
  const mesh = useRef()
  const [dummy] = useState(() => new THREE.Object3D())


  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -20 + Math.random() * 40
      const yFactor = -20 + Math.random() * 40
      const zFactor = -20 + Math.random() * 40
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.max(1.5, Math.cos(t) * 5)
      particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.02
      particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.02
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]} castShadow receiveShadow>
        <sphereBufferGeometry args={[1, 32, 32]} />
        <meshPhongMaterial />
      </instancedMesh>
    </>
  )
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)
document.body.style.margin = '0px';
document.body.style.maxHeight = '100vh';
document.body.style.overflow = 'hidden';
document.body.style.background = 'black';
document.body.classList.add("stream");


// const DEFAULT_LAYER = 0

function PhoneModel({video}) { // layer = DEFAULT_LAYER
  //const group = useRef()
  const { nodes,materials,scene } = useGLTF(testGlb)
  // console.log(nodes)
  // console.log(materials)
  // console.log(scene)
  // const material = useMemo(() => {
  //   if (layer === DEFAULT_LAYER) return new THREE.MeshStandardMaterial({ color: new THREE.Color('#2a2a2a'), roughness: 1, metalness: 0.9 })
  //   else return new THREE.MeshBasicMaterial({ color: new THREE.Color('black') })
  // }, [layer])

  //useFrame(() => (group.current.rotation.y += 0.004))

  // return (
  //   <group ref={group}>
  //     <group rotation={[-1.5707963267948963, 0, 0]} position={[0, 2, 0]}>
  //       <mesh geometry={nodes.mesh_0.geometry} material={material} layers={layer} receiveShadow castShadow></mesh>
  //       <mesh geometry={nodes.mesh_1.geometry} material={material} layers={layer} receiveShadow castShadow></mesh>
  //       <mesh geometry={nodes.mesh_2.geometry} material={material} layers={layer} receiveShadow castShadow></mesh>
  //     </group>
  //   </group>
  // )

  const cubeUrls = [
      px, nx,
      py, ny,
      pz,nz
  ];

  const reflectionCube = new THREE.CubeTextureLoader().load( cubeUrls );


  
  console.log(scene)

  scene.traverse(function(children){
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
        emissiveIntensity : 0.400,
        emissive:new THREE.Color('#ffffff'),
        refractionRatio: 0.8,
        envMap: reflectionCube,
        envMapIntensity:15,
        metalness:0.2,
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

  useFrame(() => (scene.rotation.y += 0.002))

  return (
    <primitive object={scene} dispose={null} position={[0, -80, 0]}/>
  )
}


function Screen({video,width,height,canvasEl}) {
  //console.log(viewport.width, viewport.height);
  const [x, y] = useAspect("cover", width, height);
  //(WINDOW_PADDING_TOP/height)
  // console.log(canvasEl.offsetWidth);
  // console.log(canvasEl.offsetHeight);
  // console.log(width)
  // console.log(height)

  console.log(width/canvasEl.offsetWidth)
  console.log(height/canvasEl.offsetHeight)
  const ratioW = width/canvasEl.offsetWidth;
  const ratioH = height/canvasEl.offsetHeight;
  console.log(x)
  console.log(y)

  return (
    <mesh scale={[x*Math.min(ratioW,ratioH), y*Math.min(ratioW,ratioH), 1]} position={[0, 0, 0]} castShadow receiveShadow>
      <planeBufferGeometry args={[1,1]} />
      <meshBasicMaterial >
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}

const App = () => {
  const [scrcpyStreamParams,setScrcpyStreamParams] = useState<any>()
  const [modelName,setModelName] = useState<any>()
  const [videoScale,setVideoScale] = useState<number>(1/SCALE_DOWN_FACTOR);
  const [canvasVideoWidth,setCanvasVideoWidth] = useState<number>(0);
  const [canvasVideoHeight,setCanvasVideoHeight] = useState<number>(0);
  const [canvasVideoPixelRatio,setCanvasVideoPixelRatio] = useState<number>(2);
  const [isThreeRenderer,setIsThreeRenderer] = useState<boolean>(true);
  const [videoElement,setVideoElement] = useState<HTMLVideoElement>(document.createElement('video'));


  const idViewRef = useRef();
  const videoContainerRef = useRef();
  const videoRef = useRef();
  const touchCanvasRef = useRef();
  const cursorRef = useRef();
  const threeCanvasRef = useRef();


  useEffect(() => {

    PrepareDataClientReact.start()

    const scrcpyListener:ScrcpyEventListener ={
      onVideoParametersPrepared(width:number,height:number){
        updateSize()
      }
    }

    const socketListener: SocketEventListener = { 
      onSocketOpen:()=>{
      },
      onSocketClose:(e:CloseEvent)=>{
      },
      onSocketMessage:(e:FinalMessage)=>{
        console.log(e)
        const streamParams:ScrcpyStreamParams = {
          action: 'stream',
          decoder: 'mse',
          ip: `${e.clientMsg.ip}`,
          port: `${e.clientMsg.port}`,
          query: `${e.clientMsg.query}`,
          udid: `${e.clientMsg.udid}`,
        };
        setScrcpyStreamParams(streamParams)

        for(var i=0;i < e.data.length;i++){
          console.log(e.data[i])
          if(e.data[i].udid === streamParams.udid){
            setModelName(e.data[i]['product.model'])
          }
        }

        // ### Method React Client ###
        // if(scrcpyRef && scrcpyRef.current){
        //   scrcpyRef.current.startVideoStream(streamParams)
        // }

        // ### Method TS Client ###
        // if(isThreeRenderer){
        //   if(videoContainerRef.current && idViewRef.current && touchCanvasRef.current){
        //     document.title = `${streamParams.udid} stream`
        //     document.body.classList.add("stream");
        //     videoElement.muted = true;
        //     videoElement.autoplay = true;
        //     videoElement.setAttribute('muted', 'muted');
        //     videoElement.setAttribute('autoplay', 'autoplay');
        //     videoElement.className = 'video-layer';
        //     videoElement.id = 'video-layer';

        //     ScrcpyClientReact.createInstance(
        //       streamParams,
        //       videoContainerRef.current,
        //       videoElement,
        //       touchCanvasRef.current,
        //       cursorRef.current,
        //     )
        //     ScrcpyClientReact.getInstance().setScrcpyEventListener(scrcpyListener);

        //   }
        // }
        // else{
        //   if(videoContainerRef.current && idViewRef.current && videoRef.current && touchCanvasRef.current){
        //     document.title = `${streamParams.udid} stream`
        //     document.body.classList.add("stream");
        //     videoRef.current.setAttribute('muted', 'muted');
        //     videoRef.current.setAttribute('autoplay', 'autoplay');
  
        //     ScrcpyClientReact.createInstance(
        //       streamParams,
        //       videoContainerRef.current,
        //       videoRef.current,
        //       touchCanvasRef.current,
        //       cursorRef.current,
        //     )
        //     ScrcpyClientReact.getInstance().setScrcpyEventListener(scrcpyListener);
        //   }
        // }

        if(videoContainerRef.current && idViewRef.current && videoRef.current && touchCanvasRef.current){
          document.title = `${streamParams.udid} stream`
          document.body.classList.add("stream");
          videoRef.current.setAttribute('muted', 'muted');
          videoRef.current.setAttribute('autoplay', 'autoplay');

          ScrcpyClientReact.createInstance(
            streamParams,
            videoContainerRef.current,
            videoRef.current,
            touchCanvasRef.current,
            cursorRef.current,
          )
          ScrcpyClientReact.getInstance().setScrcpyEventListener(scrcpyListener);
          //if(isThreeRenderer) ScrcpyClientReact.getInstance().setIsHiddenvideo(true)
        }

      }
    };

    PrepareDataClientReact.setSocketEventListener(socketListener)
  }, [])

    // ############ Reszie ############
    const sizeRef = useRef(null);
    function updateSize() {
      let height = document.body.clientHeight - WINDOW_PADDING_TOP;
      let width  = document.body.clientWidth;
      let videoWidth = Number(videoContainerRef.current.style.width.split('px')[0]);
      let videoHeight = Number(videoContainerRef.current.style.height.split('px')[0]);
      let wRatio = width/videoWidth;
      let hRatio = height/videoHeight;
      setVideoScale(Math.min(wRatio,hRatio))
      if(ScrcpyClientReact.getInstance()){
        ScrcpyClientReact.getInstance().setScaleFactor(1/Math.min(wRatio,hRatio))
      }

      console.log(Math.min(wRatio,hRatio))

      setCanvasVideoWidth(videoWidth*Math.min(wRatio,hRatio))
      setCanvasVideoHeight(videoHeight*Math.min(wRatio,hRatio))
    }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => 
      window.removeEventListener("resize", updateSize);
  }, []);

  useEffect( () => {
    if(sizeRef.current && videoContainerRef.current){updateSize()}
  }, [sizeRef]);

  const setPercentage = (fac:number) => {
    const decoder:MseDecoder = ScrcpyClientReact.getInstance().getCurrentDecoder();
    if(decoder && decoder instanceof MseDecoder){
      const vs:VideoSettings = decoder.getVideoSettings();
      const bounds = new Size(vs.bounds.width*fac,vs.bounds.height*fac); 
      const { bitrate, maxFps, iFrameInterval, lockedVideoOrientation, sendFrameMeta } = vs;
      const newVideoSettings = new VideoSettings({
            bounds,
            bitrate,
            maxFps,
            iFrameInterval,
            lockedVideoOrientation,
            sendFrameMeta,
      });
      ScrcpyClientReact.getInstance().getCurrentDecoder().setVideoSettings(newVideoSettings, false);
      ScrcpyClientReact.getInstance().sendNewVideoSetting(newVideoSettings);
      setCanvasVideoPixelRatio(2*fac)
    }
  }

  const setSoftRendering = () =>{
    setIsThreeRenderer(!isThreeRenderer)
  }


  return (

    // ### Method IFrame ###
    // <IFrame src="http://localhost:50001/" width={360} height={818}></IFrame>

    // ### Method React Client ###
    // <div>
    //   <ScrcpyClientInReact ref={scrcpyRef} params={scrcpyStreamParams}></ScrcpyClientInReact>
    // </div>

    // ### Method TS Client ###
    <div ref={sizeRef}>
      <TitleContainer style={{height:`${WINDOW_PADDING_TOP}px`}}>
        <ITitleTextView ref={idViewRef} id={'text-view'} style={{lineHeight:`${WINDOW_PADDING_TOP}px`,fontSize:`${(10)}px`}}>{(modelName?modelName:``) + ' - ' + (scrcpyStreamParams?scrcpyStreamParams.udid :``)}</ITitleTextView>
        <button onClick={()=>{setPercentage(1)}}>1</button>
        <button onClick={()=>{setPercentage(0.8)}}>0.8</button>
        <button onClick={()=>{setPercentage(0.6)}}>0.6</button>
        <button onClick={()=>{setPercentage(0.4)}}>0.4</button>
        <button onClick={()=>{setPercentage(0.2)}}>0.2</button>
        <button onClick={()=>{setSoftRendering()}}>Soft Rendering</button>
      </TitleContainer>
      

      <IDeviceView style={{transform:`scale(${videoScale})`,paddingTop:`${WINDOW_PADDING_TOP*(1/videoScale)}px`,width: `${(1/videoScale)*100}%`}}>
        <IVideoContainer 
            ref={videoContainerRef}
            id ={'video-container'}
            style={{
            width:`${0}px`,
            height:`${0}px`,}}>
            <IVideo ref={videoRef} muted={true} autoPlay={true} id={'video-layer'} className={'video-layer'}></IVideo>
            <IVideoMask isThree={isThreeRenderer}></IVideoMask>
        </IVideoContainer>
      </IDeviceView>

      {/* style={{width:`${canvasVideoWidth}px`,height:`${canvasVideoHeight}px`}} */}
      {isThreeRenderer?<IThreeContainer>
        <IThreeCanvasContainer
          style={{
            height: `calc(100% - ${WINDOW_PADDING_TOP}px)`,
            transform: `translate3d(0px, ${WINDOW_PADDING_TOP}px, 0px)`,
          }}
          ref = {threeCanvasRef}
          
        >
          <Canvas
            pixelRatio={canvasVideoPixelRatio} 
            // orthographic
            shadowMap
            colorManagement={false}
            camera={{ position: [0, 0, 100]}}
            //camera={{ position: [0, 0, 12], fov: 50 }}
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
            <pointLight position={[100, 100, -100]} intensity={0.75} color="red"/>
            <pointLight position={[-100, -100, -100]} intensity={0.75} color="blue"/>

            <ambientLight intensity={50} />

            {/* <Screen video={videoRef.current} width={canvasVideoWidth} height={canvasVideoHeight} canvasEl={threeCanvasRef.current} /> */}


            <Suspense fallback={null}>
              <PhoneModel video={videoRef.current}/>

            </Suspense>

            
            {/* <EffectComposer multisampling={0}>
              <SSAO samples={31} radius={20} intensity={40} luminanceInfluence={0.1} color="black" />
            </EffectComposer> */}
            <Controls />
          </Canvas>
        </IThreeCanvasContainer>
      </IThreeContainer>:''}


      <ITouchCanvasContainer isThree={isThreeRenderer} style={{paddingTop:`${WINDOW_PADDING_TOP}px`}}>
        <ITouchCanvas style={{width:`${canvasVideoWidth}px`,height:`${canvasVideoHeight}px`}} ref={touchCanvasRef} id={'touch-canvas'} className={'touch-canvas'}>
        </ITouchCanvas>
      </ITouchCanvasContainer>
      <ICursor style={{backgroundImage: `url(${cursorImg})` }} ref={cursorRef}></ICursor>
    </div>
  )
}

const ILoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  left: 0;
  top: 0;
`

const ILoadingText = styled.p`
  font-size: 14px;
  color: white;
  transform: translate3d(-50%, calc(-50%), 0px);
  position: absolute;
  top: calc(50% - 38px);
  left: 50%;
  font-family: 'Futura';
`


const IDeviceView = styled.div`
  transform-origin:top left;
  float:none;
  z-index:10;
  display:inline-block;
`

const TitleContainer = styled.div`
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  -webkit-app-region:drag;
  box-shadow:0px 3px 14px 0px #00000047;
  z-index:10;
  background: black; //black
`

const ITitleTextView = styled.div`
  color:white;
  text-align:center;
  width:100%;
  font-family:'Futura';
  user-select:none;
`

const IVideoContainer = styled.div`
  cursor:none;
  margin:0 auto;
`

const IVideo =styled.video`
  position: absolute;
  z-index: 0;
  display:none;
`

const IVideoMask = styled.div<{
  isThree:boolean;
}>`
  background:black;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display:${p => p.isThree?'block':'none'};
`


const IThreeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`
const IThreeCanvasContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const ITouchCanvasContainer = styled.div<{
  isThree:boolean;
}>`
  width:100%;
  height:100%;
  position: absolute;
  top: 0px;
  left: 0px;
  // left: 50%;
  // transform: translate3d(-50%, 0, 0);
  display:${p => p.isThree?'none':'block'};
`

const ITouchCanvas =styled.canvas`
  z-index: 10;
  display: block;
  margin: 0 auto;
  transform-origin: top left;
  cursor: none;
`


const ICursor =styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-size: contain;
  opacity: .6;
  left:-40px;
  top:-100px;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width .3s, height .3s, opacity .3s;
  z-index:5;
`

const IFrame =styled.iframe`
  outline: none;
  border: none;
`


ReactDOM.render(<App />, mainElement)
