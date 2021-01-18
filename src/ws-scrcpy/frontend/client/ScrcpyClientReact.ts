// import MseDecoder from '../decoder/MseDecoder';
// import Decoder from '../decoder/Decoder';

import MseDecoder from '../decoder/MseDecoder';
import Decoder from '../decoder/Decoder';

import { BaseClient } from '../client/BaseClient';
import { ScrcpyStreamParams } from '../interfaces/ScrcpyStreamParams';
import VideoSettings from '../info/VideoSettings';
import Size from '../utils/Size';
import { ControlMessage } from '../controlMessage/ControlMessage';
import { StreamReceiver } from '../client/StreamReceiver';
import { CommandControlMessage } from '../controlMessage/CommandControlMessage';
import TouchHandler from '../event/TouchHandler';
import Util from '..//utils/Util';
import ScreenInfo from '../info/ScreenInfo';
import { TouchControlMessage } from '..//controlMessage/TouchControlMessage';
import {SCALE_DOWN_FACTOR,WINDOW_PADDING_TOP} from '../../GlobalConstants'
//import { KeyEventListener, KeyInputHandler } from '../KeyInputHandler';
//import { KeyCodeControlMessage } from '../controlMessage/KeyCodeControlMessage';

// Try get High Resolution
// TODO set Resolution
const deviceWidthInPx = 1080;
const deviceHeightInPx = 2340;

export class ScrcpyClientReact extends BaseClient<never> {
    public static ACTION = 'stream';
    private hasTouchListeners = false;
    private deviceName = '';
    private clientId = -1;
    private clientsCount = -1;
    private requestedVideoSettings?: VideoSettings;
    private readonly streamReceiver: StreamReceiver;
    private cursor?:HTMLDivElement;
    
    constructor(params: ScrcpyStreamParams,videoContainer:HTMLDivElement,video:HTMLVideoElement,canvas:HTMLCanvasElement,cursor:HTMLDivElement) {
        super();
        this.streamReceiver = new StreamReceiver(params.ip, params.port, params.query);
        this.startStream(params.udid,videoContainer,video,canvas);
        this.setBodyClass('stream');
        this.setTitle(`${params.udid} stream`);
        this.cursor = cursor;
    }

    public startStream(udid: string,videoContainer:HTMLDivElement,video:HTMLVideoElement,canvas:HTMLCanvasElement): void {
        if (!udid) {
            return;
        }

        // const decoder = new MseDecoder(udid);
        const decoder = new MseDecoder(udid,video,canvas);
        this.setTouchListeners(decoder);

        decoder.setParent(videoContainer);
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

        // const element = decoder.getTouchableElement();
        // element.style.position = 'absolute';
        // element.style.zIndex = '1';
        // element.id="touch-canvas";

        const streamReceiver = this.streamReceiver;

        streamReceiver.on('video', (data) => {
            const STATE = Decoder.STATE;
            if (decoder.getState() === STATE.PAUSED) {
                decoder.play();
            }
            if (decoder.getState() === STATE.PLAYING) {
                console.log('push Frame')
                decoder.pushFrame(new Uint8Array(data));
            }
        });
        streamReceiver.on('clientsStats', (stats) => {
            this.deviceName = stats.deviceName;
            this.clientId = stats.clientId;
            this.clientsCount = stats.clientsCount;
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
                //decoder.setVideoSettings(videoSettings, videoSettings.equals(this.requestedVideoSettings));
            }
            if (!oldInfo) {
                //const bounds = oldSettings.bounds;
                const bounds = new Size(screenInfo.contentRect.right, screenInfo.contentRect.bottom);
                const videoSize: Size = screenInfo.videoSize;
                const onlyOneClient = this.clientsCount === 0;
                const smallerThenCurrent =
                    bounds && (bounds.width < videoSize.width || bounds.height < videoSize.height);
                if (onlyOneClient || smallerThenCurrent) {
                    min = oldSettings;
                }
            }

            videoContainer.style.width = screenInfo.contentRect.right + 'px';
            videoContainer.style.height = screenInfo.contentRect.bottom + 'px';

            decoder.resizeVideoElement(screenInfo);

            if (!min.equals(videoSettings) || !playing) {
                this.sendNewVideoSetting(min);
            }
        });
        console.log(decoder.getName(), udid);

    }

    public sendEvent(e: ControlMessage): void {
        this.streamReceiver.sendEvent(e);
    }

    public getDeviceName(): string {
        return this.deviceName;
    }

    public sendNewVideoSetting(videoSettings: VideoSettings): void {
        this.requestedVideoSettings = videoSettings;
        this.sendEvent(CommandControlMessage.createSetVideoSettingsCommand(videoSettings));
    }

    public getClientId(): number {
        return this.clientId;
    }

    public getClientsCount(): number {
        return this.clientsCount;
    }

    private setTouchListeners(decoder: Decoder): void {
        if (!this.hasTouchListeners) {
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
                            this.sendEvent(event);
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
                if(this.cursor){
                    this.cursor.style.width = '40px'
                    this.cursor.style.height = '40px'
                    this.cursor.style.opacity = '1'
                }

            });
            element.addEventListener('mouseup', (e: MouseEvent): void => {
                onMouseEvent(e);
                down--;
                if(this.cursor){
                    this.cursor.style.width = '60px'
                    this.cursor.style.height = '60px'
                    this.cursor.style.opacity = '.6'
                }
            });
            element.addEventListener('mousemove', (e: MouseEvent): void => {
                onMouseEvent(e);
               

                var x = e.clientX;
                var y = e.clientY;
                if(this.cursor){
                    this.cursor.style.left = x + 'px';
                    this.cursor.style.top = y + 'px';
                }
            });

            element.addEventListener('mouseover', (e: MouseEvent): void => {
                if(this.cursor){
                    this.cursor.style.display = 'block'
                }
            });

            element.addEventListener('mouseout', (e: MouseEvent): void => {
                if(this.cursor){
                    this.cursor.style.display = 'none'
                }
            });

            this.hasTouchListeners = true;
        }
    }
}
