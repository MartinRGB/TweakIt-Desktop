import React ,{useEffect,useRef,useState} from 'react'
import { render } from 'react-dom'
import styled from '@emotion/styled'
import {PrepareDataClientReact} from './client/PrepareDataClientReact'
import {SocketEventListener} from '../frontend/interfaces/SocketEventListener'
import {FinalMessage} from '../server/interfaces/Message'
import ScrcpyClientInReact from './client/ScrcpyClientInReact'
import {ScrcpyClientReact} from './client/ScrcpyClientReact'
import { ScrcpyStreamParams } from '../frontend/interfaces/ScrcpyStreamParams';
import {SCALE_DOWN_FACTOR,WINDOW_PADDING_TOP} from '../GlobalConstants'
import cursorImg from '@Assets/img/cursor.png'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)
document.body.style.margin = '0px';
document.body.style.maxHeight = '100vh';
document.body.style.overflow = 'hidden';
document.body.style.background = 'black';
//document.body.style.cursor = 'none';
document.body.classList.add("stream");

const deviceWidthInPx = 0;
const deviceHeightInPx = 0;

const App = () => {
  const [scrcpyStreamParams,setScrcpyStreamParams] = useState<any>()

  const scrcpyRef = useRef();
  const idViewRef = useRef();
  const videoContainerRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const cursorRef = useRef();

  useEffect(() => {

    PrepareDataClientReact.start()
    const listener: SocketEventListener = { 
      onSocketOpen:()=>{
      },
      onSocketClose:(e:CloseEvent)=>{
      },
      onSocketMessage:(e:FinalMessage)=>{
        const streamParams:ScrcpyStreamParams = {
          action: 'stream',
          decoder: 'mse',
          ip: `${e.clientMsg.ip}`,
          port: `${e.clientMsg.port}`,
          query: `${e.clientMsg.query}`,
          udid: `${e.clientMsg.udid}`,
        };
        setScrcpyStreamParams(streamParams)

        // ### Method React Client ###
        // if(scrcpyRef && scrcpyRef.current){
        //   scrcpyRef.current.startVideoStream(streamParams)
        // }

        // ### Method TS Client ###
        if(videoContainerRef.current && idViewRef.current && videoRef.current && canvasRef.current){
          document.title = `${streamParams.udid} stream`
          document.body.classList.add("stream");
          videoRef.current.setAttribute('muted', 'muted');
          videoRef.current.setAttribute('autoplay', 'autoplay');
          
          new ScrcpyClientReact(streamParams,videoContainerRef.current,videoRef.current,canvasRef.current,cursorRef.current);

        }
      }
    };

    PrepareDataClientReact.setSocketEventListener(listener)
  }, [])


  return (

    // ### Method IFrame ###
    // <IFrame src="http://localhost:50001/" width={360} height={818}></IFrame>

    // ### Method React Client ###
    // <div>
    //   <ScrcpyClientInReact ref={scrcpyRef} params={scrcpyStreamParams}></ScrcpyClientInReact>
    // </div>

    // ### Method TS Client ###
    <div>
      <IDeviceView style={{transform:`scale(${1/SCALE_DOWN_FACTOR})`,paddingTop:`${WINDOW_PADDING_TOP*SCALE_DOWN_FACTOR}px`,width: `${SCALE_DOWN_FACTOR*100}%`}}>
        <ITextView ref={idViewRef} style={{lineHeight:`${WINDOW_PADDING_TOP*SCALE_DOWN_FACTOR}px`,fontSize:`${(WINDOW_PADDING_TOP-10)}px`}}>{scrcpyStreamParams?scrcpyStreamParams.udid + ` --- (React)`:``}</ITextView>
        <IVideoContainer ref={videoContainerRef} style={{
            width:`${deviceWidthInPx}px`,
            height:`${deviceHeightInPx}px`,}}>
            <IVideo ref={videoRef} muted={true} autoPlay={true} id={'video-layer'} className={'video-layer'}></IVideo>
            <ITouchCanvas ref={canvasRef} id={'touch-canvas'} className={'touch-canvas'}></ITouchCanvas>

        </IVideoContainer>
      </IDeviceView>
      <ICursor style={{backgroundImage: `url(${cursorImg})` }}  ref={cursorRef}></ICursor>
    </div>
  )
}


const IDeviceView = styled.div`
transform-origin:top left;
float:none;
z-index:10;
display:inline-block;
background:black;
`

const ITextView = styled.div`
position:absolute;
color:white;
text-align:center;
left:0px;
top:0px;
width:100%;
font-family:'Futura';
-webkit-app-region:drag;
user-select:none;
box-shadow:0px 3px 14px 0px #00000047;
z-index:10;
`
const IVideo =styled.video`
  position: absolute;
  z-index: 0;
`

const ITouchCanvas =styled.canvas`
  position: absolute;
  z-index: 1;
`


const IVideoContainer = styled.div`
background:black;
cursor:none;
`

const ICursor =styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-size: contain;
  opacity: .6;
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


render(<App />, mainElement)
