import React ,{useEffect,useContext,useRef,useState} from 'react'
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
// twmacro
import {execCMD, execCMDPromise} from "@Helpers/ADBCommand/ADBCommand"

const { app } = window.require('electron').remote;
var path = require("path");

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localNodePath = appPath + '/node_modules/'

var localDistPath = appPath + '/dist/';

var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
var localScrcpyBinPath = localAssetsPath + 'scrcpy/1.16/bin/';

var localResAssetsPath = path.join(process.resourcesPath, "/assets/");
var resADBPath = localResAssetsPath + 'adb/';
var resScrcpyPath = localResAssetsPath + 'scrcpy/1.16/bin/';

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  const { t ,i18n} = useTranslation()

  const [isRevealScrcpy,setIsRevealScrcpy] = useState<boolean>(false);

  const frameRef = useRef(null);

  function createBrowserWindow() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      width: 360,
      height: 818,
      minHeight: 360,
      minWidth: 818,
      maxHeight:818,
      maxWidth:360,
      //frame: false,
      backgroundColor: '#000000',
      // backgroundColor: '#191622',
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: true
      }
    });
  
    win.loadURL('http://localhost:50001/');
  }

  const triggerScrcpyWindow = () =>{
    createBrowserWindow();
  }

  const triggerNode = () =>{
    execCMD(`lsof -P | grep ':50001' | awk '{print $2}' | xargs kill -9`,'',function(){
      execCMD(`node ${localDistPath}/scrcpy-server/index.js`,'',function(){
      })
    });


  }

  useEffect(() => {
    injectPathEnvironments()

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
              {/* <IFrame src="http://localhost:50001/"
                      ref={frameRef}
                      width="360px"
                      height="780px"
                      scrolling="no"
                      isTrigger = {isRevealScrcpy}
                      id="myId"/> */}
              <TestButton onClick={triggerScrcpyWindow}>In-Browser Scrcpy</TestButton>
              <TestButton style={{left:`600px`}}onClick={triggerNode}>Open Node</TestButton>
            </ADBConnectionProvider>
        </ADBExpandStateProvider>
        </ADBCommandProvider>
        </CodeBlockProvider>
        </GlobalAnimationStateProvider>
      </ThemeProvider>
    </div>
  )
}


const IFrame = styled.iframe<{
  isTrigger:boolean;
}>`
  position: absolute;
  left:${p => p.isTrigger?'0px':'-360px'};
  top: 52px;
  z-index: 10;
  display: block;
  overflow: hidden;
  outline: none;
  border: none;
  background: black;
  transition:all 0.3s;
`
const TestButton = styled.button`
position: absolute;
left: 500px;
top: 61px;
z-index: 10;
display: block;
width: 100px;
height: 30px;
`

render(<App />, mainElement)
