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
import FinalRenderer from './gl/FinalRenderer'
import PureScreen from './gl/PureScreen'
import modelVideo from './assets/model.mp4'


const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)
document.body.style.margin = '0px';
document.body.style.maxHeight = '100vh';
document.body.style.overflow = 'hidden';
document.body.style.background = 'black';
document.body.classList.add("stream");

const App = () => {
  const [scrcpyStreamParams,setScrcpyStreamParams] = useState<any>()
  const [modelName,setModelName] = useState<any>()
  const [videoScale,setVideoScale] = useState<number>(1/SCALE_DOWN_FACTOR);
  const [canvasVideoWidth,setCanvasVideoWidth] = useState<number>(0);
  const [canvasVideoHeight,setCanvasVideoHeight] = useState<number>(0);
  const [canvasPixelRatio,setCanvasPixelRatio] = useState<number>(2);
  const [isThreeRenderer,setIsThreeRenderer] = useState<boolean>(true);

  const idViewRef = useRef();
  const videoContainerRef = useRef();
  const videoRef = useRef();
  const videoRef2 = useRef();
  const touchCanvasRef = useRef();
  const cursorRef = useRef();
  const threeCanvasContainerRef = useRef();


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

        if(videoContainerRef.current && idViewRef.current && videoRef.current && touchCanvasRef.current){
          document.title = `${streamParams.udid} stream`
          document.body.classList.add("stream");
          videoRef.current.setAttribute('muted', 'muted');
          videoRef.current.setAttribute('autoplay', 'autoplay');

          if(videoRef2.current){
            videoRef2.current.setAttribute('muted', 'muted');
            videoRef2.current.setAttribute('autoplay', 'autoplay');
            videoRef2.current.setAttribute('loop', 'loop');
          }

          ScrcpyClientReact.createInstance(
            streamParams,
            videoContainerRef.current,
            videoRef.current,
            touchCanvasRef.current,
            cursorRef.current,
          )
          ScrcpyClientReact.getInstance().setScrcpyEventListener(scrcpyListener);
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
      const currentVideoSetting:VideoSettings = decoder.getVideoSettings();
      const bounds = new Size(currentVideoSetting.bounds.width*fac,currentVideoSetting.bounds.height*fac); 
      const { bitrate, maxFps, iFrameInterval, lockedVideoOrientation, sendFrameMeta } = currentVideoSetting;
   
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
      setCanvasPixelRatio(2*fac)
    }
  }

  const setSoftRendering = () =>{
    setIsThreeRenderer(!isThreeRenderer)
  }

  return (

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
      
          

      {/* <IVideo2 crossOrigin="anonymous" width={608} height={1080} ref={videoRef2} muted={true} autoPlay={true} id={'video-layer-2'} className={'video-layer-2'} >
              <source src={modelVideo} type="video/mp4"/>
      </IVideo2> */}

      {isThreeRenderer?<IThreeContainer>
        <IThreeCanvasContainer
          style={{
            height: `calc(100% - ${WINDOW_PADDING_TOP}px)`,
            transform: `translate3d(0px, ${WINDOW_PADDING_TOP}px, 0px)`,
          }}
          ref={threeCanvasContainerRef} 
        >
          {/* <FinalRenderer video={videoRef2.current} pixelRatio={canvasPixelRatio}></FinalRenderer> */}
          <PureScreen video={videoRef.current} canvasVideoWidth={canvasVideoWidth} canvasVideoHeight={canvasVideoHeight} pixelRatio={canvasPixelRatio}></PureScreen>
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

const IVideo2 =styled.video`
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


ReactDOM.render(<App />, mainElement)
