import React ,{useEffect,useContext} from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from '@Styles/GlobalStyle'
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import tw from 'twin.macro'

//import Button from './components/Button'
import TitleBar from '@Sections/TitleBar';
import ADBPanel from '@Sections/ADBPanel';
import MainPanel from '@Sections/MainPanel';

// theme-ui
import { ThemeProvider, useColorMode } from 'theme-ui'
import theme from '@Styles/theme'

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'

import ADBExpandStateProvider from "@Context/ADBExpandContext";
import ADBCommandProvider from "@Context/ADBCommandContext";
import CodeBlockProvider from "@Context/CodeBlockContext";
import GlobalAnimationStateProvider from "@Context/GlobalAnimationContext";
import {injectPathEnvironments} from '@Helpers/GlobalEnvironments/PathEnvironments'
import ADBConnectionProvider from "@Context/ADBConnectionContext";

import Scrcpy from '@Helpers/ScrcpyClient/ScrcpyClient'
import MseDecoder from '@Helpers/ScrcpyClient/MseDecoder'
import Decoder from '@Helpers/ScrcpyClient/Decoder/Decoder'
import Size from '@Helpers/ScrcpyClient/Decoder/Size'
import VideoSettings from '@Helpers/ScrcpyClient/Decoder/VideoSettings'

//const Scrcpy = require('scrcpy-client');

// twmacro
const Button = styled.button`
  ${tw`mt-4 p-2 text-white bg-blue-600`}
`;

// pure tw
const Input = () => <input tw="mt-4 p-2 text-white bg-red-600" />
//const Buttons = () => <Button tw="mt-4 p-2 text-white bg-blue-600">click</Button>

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)


let buffer: ArrayBuffer | undefined;
const NoPts = BigInt(-1);


  const decoder = new MseDecoder('00d4fe2f');



const App = () => {
  const { t ,i18n} = useTranslation()
  //console.log(animatorList)

  useEffect(() => {
    injectPathEnvironments()

    const scrcpy = new Scrcpy('');


  const deviceView = document.createElement('div');
  deviceView.className = 'device-view';
  deviceView.style.transform = 'scale(0.33)';
  deviceView.style.transformOrigin = 'top left';
  deviceView.style.float = 'none';
  deviceView.style.position = 'absolute';
  deviceView.style.left = '0px';
  deviceView.style.top = '0px';
  const video = document.createElement('div');
  video.className = 'video';
  video.style.width ="1080px";
  video.style.height = "2340px";

  deviceView.appendChild(video);
  decoder.setParent(video);
  decoder.pause();
  document.body.appendChild(deviceView);
  const current = decoder.getVideoSettings();

  const bounds = new Size(1080, 2340); //this.getMaxSize();
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
  const STATE = Decoder.STATE;

    scrcpy.on('data', (pts:any, data:any) => 
    {
    
      console.log(`[${pts}] Data: ${data.length}b`);
  
    if (pts === NoPts) {
        buffer = data;
    }

    let array: Uint8Array;
    if (buffer) {
        array = new Uint8Array(buffer.byteLength + data!.byteLength);
        array.set(new Uint8Array(buffer));
        array.set(new Uint8Array(data!), buffer.byteLength);
        buffer = undefined;
    } else {
        array = new Uint8Array(data!);
    }
    console.log(array);

    if (decoder.getState() === STATE.PAUSED) {
        decoder.play();
    }
    if (decoder.getState() === STATE.PLAYING) {
        decoder.pushFrame(new Uint8Array(array));
    }

    
    });

    scrcpy.start()
      .then((info:any) => console.log(`Started -> ${info.name} at ${info.width}x${info.height}`))
      .catch((e:any) => console.error('Impossible to start', e));


  }, [])
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <GlobalAnimationStateProvider>
        <CodeBlockProvider>
        <ADBCommandProvider>
        <ADBExpandStateProvider>
            <ADBConnectionProvider>
            <TitleBar>TWEAKIT</TitleBar>
            <ADBPanel></ADBPanel>
            <MainPanel></MainPanel>
            </ADBConnectionProvider>
        </ADBExpandStateProvider>
        </ADBCommandProvider>
        </CodeBlockProvider>
        </GlobalAnimationStateProvider>
      </ThemeProvider>
    </div>
  )
}



render(<App />, mainElement)
