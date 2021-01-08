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
//import { KeyEventListener, KeyInputHandler } from '../KeyInputHandler';
//import { KeyCodeControlMessage } from '../controlMessage/KeyCodeControlMessage';

// Try get High Resolution
const deviceWidthInPx = 2340;
const deviceHeightInPx = 2340;

export class ScrcpyClient extends BaseClient<never> {
    public static ACTION = 'stream';
    private hasTouchListeners = false;
    private deviceName = '';
    private clientId = -1;
    private clientsCount = -1;
    private requestedVideoSettings?: VideoSettings;
    private readonly streamReceiver: StreamReceiver;
    
    constructor(params: ScrcpyStreamParams) {
        super();
        this.streamReceiver = new StreamReceiver(params.ip, params.port, params.query);
        this.startStream(params.udid);
        this.setBodyClass('stream');
        this.setTitle(`${params.udid} stream`);
    }

    public startStream(udid: string): void {
        if (!udid) {
            return;
        }
        const decoder = new MseDecoder(udid);
        this.setTouchListeners(decoder);

        const deviceView = document.createElement('div');
        deviceView.className = 'device-view';
        deviceView.style.transform = `scale(${1/SCALE_DOWN_FACTOR})`;
        deviceView.style.transformOrigin = 'top left';
        deviceView.style.float = 'none';
        deviceView.style.zIndex = '1';
        deviceView.style.display = 'inline-block';
        deviceView.style.paddingTop = WINDOW_PADDING_TOP*SCALE_DOWN_FACTOR+'px';
        deviceView.style.background = 'black';

        const idView = document.createElement('div');
        idView.style.position = 'absolute';
        idView.style.lineHeight = WINDOW_PADDING_TOP*SCALE_DOWN_FACTOR + 'px'
        idView.style.fontSize = WINDOW_PADDING_TOP + 'px';
        idView.style.color = 'white';
        idView.style.textAlign = 'center';
        idView.style.left = '0px';
        idView.style.top = '0px';
        idView.style.width = '100%';
        idView.style.fontFamily = 'Futura'
        idView.style["-webkit-app-region"] = 'drag';
        idView.style.userSelect = 'none';
        idView.style.boxShadow = '0px 3px 14px 0px #00000047';
        idView.style.zIndex = '10';

        deviceView.appendChild(idView);

        const video = document.createElement('div');
        video.className = 'video';
        video.style.width = deviceWidthInPx + 'px';
        video.style.height = deviceHeightInPx + 'px';
        video.style.background = 'black';

        deviceView.appendChild(video);
        decoder.setParent(video);
        decoder.pause();

        document.body.appendChild(deviceView);
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

        const streamReceiver = this.streamReceiver;

        streamReceiver.on('video', (data) => {
            const STATE = Decoder.STATE;
            if (decoder.getState() === STATE.PAUSED) {
                decoder.play();
            }
            if (decoder.getState() === STATE.PLAYING) {
                decoder.pushFrame(new Uint8Array(data));
            }
        });
        streamReceiver.on('clientsStats', (stats) => {
            this.deviceName = stats.deviceName;

            idView.innerHTML = stats.deviceName + ' - ' +udid;
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

            video.style.width = screenInfo.contentRect.right + 'px';
            video.style.height = screenInfo.contentRect.bottom + 'px';

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
            });
            element.addEventListener('mouseup', (e: MouseEvent): void => {
                onMouseEvent(e);
                down--;
            });
            element.addEventListener('mousemove', (e: MouseEvent): void => {
                onMouseEvent(e);
            });
            this.hasTouchListeners = true;
        }
    }
}
