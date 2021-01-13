import MseDecoder from '../decoder/MseDecoder';
import { BaseClient } from './BaseClient';
import Decoder from '../decoder/Decoder';
import { ScrcpyStreamParams } from '../interfaces/ScrcpyStreamParams';
import VideoSettings from '../info/VideoSettings';
import Size from '../utils/Size';
import { ControlMessage } from '../controlMessage/ControlMessage';
import { StreamReceiver } from './StreamReceiver';
import { CommandControlMessage } from '../controlMessage/CommandControlMessage';
import TouchHandler from '../event/TouchHandler';
import Util from '../utils/Util';
import ScreenInfo from '../info/ScreenInfo';
import { TouchControlMessage } from '../controlMessage/TouchControlMessage';
import {SCALE_DOWN_FACTOR,WINDOW_PADDING_TOP} from '../../GlobalConstants'
import React,{ memo,useContext, useEffect, useState,useRef} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'
//import { KeyEventListener, KeyInputHandler } from '../KeyInputHandler';
//import { KeyCodeControlMessage } from '../controlMessage/KeyCodeControlMessage';

// Try get High Resolution
const deviceWidthInPx = 720;
const deviceHeightInPx = 720;


// export interface IScrcpyClient {
//     params: ScrcpyStreamParams;
// }
  
export interface IScrcpyClient {
    params: ScrcpyStreamParams;
}
  
const ScrcpyClientReact: React.FC<IScrcpyClient> = memo(({params}) => {
    const ACTION = 'stream';
    const [hasTouchListeners,setHasTouchListeners] = useState<boolean>(false)
    const [deviceName,setDeviceName] = useState<string>('')
    const [clientId,setClientId] = useState<number>(-1)
    const [clientsCount,setClientsCount] = useState<number>(-1)
    //var requestedVideoSettings: VideoSettings;
    //var streamReceiver: StreamReceiver;
    const [hasCreate,setHasCreate] = useState<boolean>(false)
    const videoContainerRef = useRef();
    const idViewRef = useRef();
    useEffect(() => {
        if(params) {
            if(!hasCreate){
                console.log(params)
                startStream(params.udid,new StreamReceiver(params.ip, params.port, params.query))
                setHasCreate(true)
            }
            
        }
    }, [params])
  
    const startStream = (udid: string,streamReceiver:StreamReceiver): void => {
        if (!udid) {
            return;
        }
        const decoder = new MseDecoder(udid);
        setTouchListeners(streamReceiver,decoder);

        if(videoContainerRef){
            const videoElement:HTMLDivElement = videoContainerRef.current;
            console.log(videoElement)
            decoder.setParent(videoElement);
            decoder.pause();
    
            const current = decoder.getVideoSettings();
    
            //TODO
            const bounds = new Size(deviceWidthInPx, deviceHeightInPx); //this.getMaxSize();
            const { bitrate, maxFps, iFrameInterval, lockedVideoOrientation, sendFrameMeta } = current;
            const newVideoSettings = new VideoSettings({
                bounds,
                bitrate,
                maxFps,
                iFrameInterval,
                lockedVideoOrientation,
                sendFrameMeta,
            });
            decoder.setVideoSettings(newVideoSettings, false);
    
            const element = decoder.getTouchableElement();
            element.style.position = 'absolute';
            element.style.zIndex = '1';
            element.id="touch-canvas";
    
            streamReceiver.on('video', (data:any) => {
                const STATE = Decoder.STATE;
                if (decoder.getState() === STATE.PAUSED) {
                    decoder.play();
                }
                if (decoder.getState() === STATE.PLAYING) {
                    decoder.pushFrame(new Uint8Array(data));
                }
            });
            streamReceiver.on('clientsStats', (stats:any) => {
                setDeviceName(stats.deviceName)
                setClientId(stats.clientId);
                setClientsCount(stats.clientsCount)
                if(idViewRef.current) idViewRef.current.innerHTML = stats.deviceName + ' --- ' +udid +'(React)';
            });
            streamReceiver.on('videoParameters', ({ screenInfo, videoSettings }) => {
                let min: VideoSettings = VideoSettings.copy(videoSettings) as VideoSettings;
                let playing = false;
                const STATE = Decoder.STATE;
                if (decoder.getState() === STATE.PAUSED) {
                    decoder.play();
                }
                if (decoder.getState() === STATE.PLAYING) {
                    playing = true;
                }
                const oldInfo = decoder.getScreenInfo();
                if (!screenInfo.equals(oldInfo)) {
                    decoder.setScreenInfo(screenInfo);
                }
    
                const oldSettings = decoder.getVideoSettings();
                if (!videoSettings.equals(oldSettings)) {
                    const bounds = new Size(screenInfo.contentRect.right, screenInfo.contentRect.bottom); 
                    const { bitrate, maxFps, iFrameInterval, lockedVideoOrientation, sendFrameMeta } = current;
                    const newVideoSettings = new VideoSettings({
                        bounds,
                        bitrate,
                        maxFps,
                        iFrameInterval,
                        lockedVideoOrientation,
                        sendFrameMeta,
                    });
                    decoder.setVideoSettings(newVideoSettings, false);
                }
                if (!oldInfo) {
                    //const bounds = oldSettings.bounds;
                    const bounds = new Size(screenInfo.contentRect.right, screenInfo.contentRect.bottom);
                    const videoSize: Size = screenInfo.videoSize;
                    const onlyOneClient = clientsCount === 0;
                    const smallerThenCurrent =
                        bounds && (bounds.width < videoSize.width || bounds.height < videoSize.height);
                    if (onlyOneClient || smallerThenCurrent) {
                        min = oldSettings;
                    }
                }
    
                videoElement.style.width = screenInfo.contentRect.right + 'px';
                videoElement.style.height = screenInfo.contentRect.bottom + 'px';
    
                decoder.resizeVideoElement(screenInfo);
    
                if (!min.equals(videoSettings) || !playing) {
                    sendNewVideoSetting(streamReceiver,min);
                }
            });
            console.log(decoder.getName(), udid);
        }
    }

    const sendEvent = (streamReceiver:StreamReceiver,e: ControlMessage):void => {
        streamReceiver.sendEvent(e);
    }
    const sendNewVideoSetting = (streamReceiver:StreamReceiver,videoSettings: VideoSettings):void => {
        //requestedVideoSettings = videoSettings;
        sendEvent(streamReceiver,CommandControlMessage.createSetVideoSettingsCommand(videoSettings));
    }

    const getDeviceName = (): string => {
        return deviceName;
    }

    const getClientId = (): number => {
        return clientId;
    }

    const getClientsCount = (): number => {
        return clientsCount;
    }

    const setTouchListeners = (streamReceiver:StreamReceiver,decoder: Decoder): void =>{
        if (!hasTouchListeners) {
            TouchHandler.init();
            let down = 0;
            const supportsPassive = Util.supportsPassive();
            const onMouseEvent = (e: MouseEvent | TouchEvent) => {
                const tag = decoder.getTouchableElement();
                if (e.target === tag) {
                    const screenInfo: ScreenInfo = decoder.getScreenInfo() as ScreenInfo;
                    if (!screenInfo) {
                        return;
                    }
                    let events: TouchControlMessage[] | null = null;
                    let condition = true;
                    if (e instanceof MouseEvent) {
                        condition = down > 0;
                        events = TouchHandler.buildTouchEvent(e, screenInfo);
                    } else if (e instanceof TouchEvent) {
                        events = TouchHandler.formatTouchEvent(e, screenInfo, tag);
                    }
                    if (events && events.length && condition) {
                        events.forEach((event) => {
                            sendEvent(streamReceiver,event);
                        });
                    }
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    e.stopPropagation();
                }
            };

            var element = decoder.getTouchableElement();

            const options = supportsPassive ? { passive: false } : false;
            element.addEventListener(
                'touchstart',
                (e: TouchEvent): void => {
                    onMouseEvent(e);
                },
                options,
            );
            element.addEventListener(
                'touchend',
                (e: TouchEvent): void => {
                    onMouseEvent(e);
                },
                options,
            );
            element.addEventListener(
                'touchmove',
                (e: TouchEvent): void => {
                    onMouseEvent(e);
                },
                options,
            );
            element.addEventListener(
                'touchcancel',
                (e: TouchEvent): void => {
                    onMouseEvent(e);
                },
                options,
            );
            element.addEventListener('mousedown', (e: MouseEvent): void => {
                down++;
                onMouseEvent(e);
            });
            element.addEventListener('mouseup', (e: MouseEvent): void => {
                onMouseEvent(e);
                down--;
            });
            element.addEventListener('mousemove', (e: MouseEvent): void => {
                onMouseEvent(e);
            });
            setHasTouchListeners(true);
        }
    }

    return (
        <DeviceView style={{transform:`scale(${1/SCALE_DOWN_FACTOR})`,paddingTop:`${WINDOW_PADDING_TOP*SCALE_DOWN_FACTOR}px`}}>
            <IDView ref={idViewRef} style={{lineHeight:`${WINDOW_PADDING_TOP*SCALE_DOWN_FACTOR}px`,fontSize:`${(WINDOW_PADDING_TOP-10)}px`}}></IDView>
            <VideoContainer ref={videoContainerRef} style={{width:`${deviceWidthInPx}px`,height:`${deviceHeightInPx}px`}}></VideoContainer>
        </DeviceView>
    );
  })
  
export default ScrcpyClientReact
  
  
const DeviceView = styled.div`
transform-origin:top left;
float:none;
z-index:1;
display:inline-block;
background;black
`

const IDView = styled.div`
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
z-index10;
`
const VideoContainer = styled.div`
background:black;
`