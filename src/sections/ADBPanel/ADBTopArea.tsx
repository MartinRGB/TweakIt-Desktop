import React,{ memo,useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'

// i18n
import '@Context/i18nContext'
import DropDownMenuDevice from '@Components/DropDownMenuDevice'
import Icons from '@Assets/icons'
import ADBButtonSegment from '@Components/ADBButtonSegment'
import ADBExpandSelect from '@Components/ADBExpandSelect'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {getUserHome,SDCardTmpPath} from '@Helpers/GlobalEnvironments/PathEnvironments'

import {ADBConnectionContext}  from '@Context/ADBConnectionContext';
import { useTranslation, Trans} from 'react-i18next'
import {execCMD, execCMDPromise} from "@Helpers/ADBCommand/ADBCommand"
import {WINDOW_PADDING_TOP,SCALE_DOWN_FACTOR,BACKEND_SOCKET_PORT} from '@WSScrcpy/GlobalConstants'
import {startServer} from '@WSScrcpy/server'

const ipcRenderer = require('electron').ipcRenderer

const path = require("path");
const { app } = window.require('electron').remote;
const fs = require("fs");

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localDistRendererPath = appPath + '/dist/renderer/';
var localAssetsPath = appPath + '/assets/';
var appResPath = path.join(process.resourcesPath, "/assets/");

const ADBTopArea: React.FC = memo(({ children }) => {
  const [colorMode, setColorMode] = useColorMode();
  const { t ,i18n} = useTranslation()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {serialNoDeivcesWifiAddrs,serialNoDeivces,serialNoDevicesCounts,currentDeviceSelectIndex,setCurrentDeviceSelectIndex,setSerialNoDevicesModeByIndex,serialNoDevicesMode,serialNoDevicesTargets,startCurrentDeviceWifiConnection,serialNoDevicesIsConnectingWifi,serialNoDevicesIsRemovedUSB,serialNoDevicesIsConnectingUSB,serialNoDevicesDisplayInfos} = useContext(ADBConnectionContext)

  // segment
  const segmentIconStr = ["USB","Wifi",];
  const [segmentActiveStr,setSegmentActiveStr] = useState<string>(segmentIconStr[0])
  

  const onDropDownClick = () =>{
  }

  const onDeviceIndexClicked = (i:any,val:any) =>{
    setCurrentDeviceSelectIndex(i)
    if(serialNoDevicesMode[i] === 'WIFI'){
      setSegmentActiveStr(segmentIconStr[1])
    }
    else{
      setSegmentActiveStr(segmentIconStr[0])
    }
    setCastSelectIndex(0);
    setScreenshotSelectIndex(0);
    setRecordSelectIndex(0);
  }

  const onSegementIndexClicked = (i:any,val:any,cmd:any) =>{
    if(i === 0){
      setSegmentActiveStr(segmentIconStr[0])
      setSerialNoDevicesModeByIndex("USB",currentDeviceSelectIndex);
    }
    if(i === 1){
      setSegmentActiveStr(segmentIconStr[1])
      setSerialNoDevicesModeByIndex("WIFI",currentDeviceSelectIndex);
      startCurrentDeviceWifiConnection(serialNoDeivces[currentDeviceSelectIndex],currentDeviceSelectIndex);
    }
  }
  

  const [timeTag,setTimeTag]  = useState<string>(getFormateTime());

  // cast
  const castIconStr:any = "Cast";
  const [castSelectIndex,setCastSelectIndex] = useState<number>(0);
  const onCastIndexClickded= (i:any,val:any) =>{
    setCastSelectIndex(i);
  }

  // screenshot
  const screenshotIconStr:any = "Screenshot";
  const [screenshotSelectIndex,setScreenshotSelectIndex] = useState<number>(0);
  const onScreenshotIndexClickded= (i:any,val:any) =>{
    setScreenshotSelectIndex(i);
  }



  const recordIconStr = "Record";
  const [recordSelectIndex,setRecordSelectIndex] = useState<number>(0);
  const onRecordIndexClickded= (i:any,val:any) =>{
    setRecordSelectIndex(i);
  }

  useEffect(() => {
    execCMDPromise(`lsof -P | grep ':${BACKEND_SOCKET_PORT}' | awk '{print $2}' | xargs kill -9`)

    console.log(path.join(__dirname, '/scrcpy-server/index.js'));

  }, [])


  // Soft rendering
  const [hasTriggerServer,setHasTriggerServer] = useState<boolean>(false);
  const [currentProcess,setCurrentProcess] = useState<any>();
  const [isSoftRender,setIsSoftRender] = useState<boolean>(true);

  const startScrcpyByMSEReact = () =>{

    const deviceId = `${serialNoDevicesTargets[currentDeviceSelectIndex]}`;

    if(deviceId != null && deviceId != undefined) {      
      const isWifi = serialNoDevicesTargets[currentDeviceSelectIndex].includes('.');
      const deviceUuId = serialNoDeivces[currentDeviceSelectIndex];

      const ip = isWifi?`${deviceId.split(':')[0]}`:'localhost';
      const port = isWifi?8886:BACKEND_SOCKET_PORT; //isReactPreviewer?50002:50001)
      const query = isWifi?``:`?action=proxy&remote=tcp%3A8886&udid=${deviceId}`;
      const udid = isWifi?`${deviceUuId}`:`${deviceId}`;

      if(deviceId != null && deviceId != undefined) {
          const process = startServer(`${ip}`,port,`${query}`,`${udid}`);
          const sizeStr = "counter=`adb -s {target} shell wm size | grep 'Override' | wc -l`; if [ $counter -eq 1 ]; then adb -s {target} shell wm size | grep 'Override' | grep -Eo '[0-9]{1,4}'; else adb -s {target} shell wm size | grep 'Physical' | grep -Eo '[0-9]{1,4}';fi";
          execCMDPromise(sizeStr.replace(/{target}/g, deviceId),function(val:any){
            const width=Number(val.split('\n')[0])/SCALE_DOWN_FACTOR;
            const height=Number(val.split('\n')[1])/SCALE_DOWN_FACTOR + WINDOW_PADDING_TOP;
            ipcRenderer.send('createReactPreviewerWindow',width,height);
          })
      }
    }
  }


  const triggerScrcpyServerReact = () =>{
    // execCMDPromise(`lsof -P | grep ':${BACKEND_SOCKET_PORT}' | awk '{print $2}' | xargs kill -9;`,(e) =>{
    //   startScrcpyByMSEReact();
    // });
    startScrcpyByMSEReact();
  }


  return (
      <Container isAnimationEnable={isGlobalAnimEnable}>
        <DropDownMenuDevice 
          onClick={()=>{onDropDownClick()}}
          style={{zIndex:`1`}} 
          menuStyle={{zIndex:`1`,left:`-1px`,width:`calc(100% + 3px)`}} 
          optionsData={serialNoDeivces} 
          enable={
            serialNoDevicesCounts !=0 && 
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          } 
          menuWidth={`calc(100%)`} 
          isRichAnimation={true}
          onClickIndex={(i:any,val:any)=>{onDeviceIndexClicked(i,val)}} 
          selectIndex={currentDeviceSelectIndex}
        ></DropDownMenuDevice>

        <RadioGroupContainer
          enable = {(
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          )}
          >
          <RadioContainer 
          isAnimationEnable={isGlobalAnimEnable}
          enable = {(
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          )}
          style={{marginRight:`6px`}} onClick = {()=>{setIsSoftRender(true)}}><input style={{filter:`hue-rotate(260deg)`}}type="radio" checked={isSoftRender} onChange={e => {}} value="Soft" /><p style={{display:`inline-block`,marginLeft:`5px`}}><Trans>Software rendering</Trans></p></RadioContainer>
          <RadioContainer 
          isAnimationEnable={isGlobalAnimEnable}
          enable = {(
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          )}
          onClick = {()=>{setIsSoftRender(false)}}><input style={{filter:`hue-rotate(260deg)`}} type="radio" checked={!isSoftRender} onChange={e => {}} value="Hardware"  /><p style={{display:`inline-block`,marginLeft:`5px`}}><Trans>Hardware rendering</Trans></p></RadioContainer>
        </RadioGroupContainer>


        {/* <ADBDebugPannel>
          <li>{`snDevices                `   + serialNoDeivces.toString()}</li>
          <li>{`selectIndex              `   + currentDeviceSelectIndex.toString()}</li>
          <li>{`snDevicesCounts          `   + serialNoDevicesCounts.toString()}</li>
          <li>{`target                   `   + serialNoDevicesTargets.toString()}</li>
          <li>{`serialNoDeivcesWifiAddrs `   + serialNoDeivcesWifiAddrs.toString()}</li>
          <li>{`isConnectingWifi         `   + serialNoDevicesIsConnectingWifi.toString()}</li>
          <li>{`isConnectingUSB          `   + serialNoDevicesIsConnectingUSB.toString()}</li>
          <li>{`connectingMode           `   + serialNoDevicesMode.toString()}</li>
          <li>{`isRemovedUSB             `   + serialNoDevicesIsRemovedUSB.toString()}</li>
          <li>{`displayInfo              `   + serialNoDevicesDisplayInfos.toString()}</li>
        </ADBDebugPannel> */}

        <ADBButtonSegment
          style={{    
            bottom: `18px`,
            position: `absolute`
          }}
          iconArray = {segmentIconStr}
          active = {segmentActiveStr}
          enable = {(
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]

          )}
          onSegementClickIndex={(i:any,val:any,cmd:any)=>{onSegementIndexClicked(i,val,cmd)}}
          disableIndex={(serialNoDevicesIsRemovedUSB[currentDeviceSelectIndex])?
            [true,true]:
            [false,((serialNoDeivces[currentDeviceSelectIndex] && serialNoDeivces[currentDeviceSelectIndex].includes('emulator')) || isSoftRender)?true:false]}
        >

        </ADBButtonSegment>


        <ScreenContainer>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={castIconStr}
            cmdStr={
              isSoftRender?``:`scrcpy --display ${castSelectIndex} -s ${serialNoDevicesTargets[currentDeviceSelectIndex]}`
            }
            enable={(
              currentDeviceSelectIndex != -1 &&
              serialNoDevicesCounts != 0 &&
              !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
              !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
            )}
            cmdKeyword={'scrcpy --display'}
            optionsData={serialNoDevicesDisplayInfos[currentDeviceSelectIndex]}
            onMenuClickIndex={(i:any,val:any) =>{onCastIndexClickded(i,val)}}
            menuSelectIndex={castSelectIndex}
            onClick={()=>{
              isSoftRender?triggerScrcpyServerReact():``}}
            currentTopSelectIndex={currentDeviceSelectIndex}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={screenshotIconStr}
            cmdStr={
              `adb -s ${serialNoDevicesTargets[currentDeviceSelectIndex]} shell screencap -d ${screenshotSelectIndex} -p ${SDCardTmpPath()}/screen.png;adb -s ${serialNoDevicesTargets[currentDeviceSelectIndex]} pull ${SDCardTmpPath()}/screen.png ${getUserHome()}/Desktop/${'capture_' + timeTag}.png;adb -s ${serialNoDevicesTargets[currentDeviceSelectIndex]} shell rm ${SDCardTmpPath()}/screen.png`
            }
            cmdKeyword={'screencap'}
            enable={(
              currentDeviceSelectIndex != -1 &&
              serialNoDevicesCounts != 0 &&
              !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
              !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex] &&
              !(serialNoDeivces[currentDeviceSelectIndex] && serialNoDeivces[currentDeviceSelectIndex].includes('emulator'))

            )}
            optionsData={serialNoDevicesDisplayInfos[currentDeviceSelectIndex]}
            onMenuClickIndex={(i:any,val:any) =>{onScreenshotIndexClickded(i,val)}}
            menuSelectIndex={screenshotSelectIndex}
            onClick={()=>{setTimeTag(getFormateTime())}}
            currentTopSelectIndex={currentDeviceSelectIndex}
          >
          </ADBExpandSelect>
          <ADBExpandSelect
            iconStr={recordIconStr}
            cmdStr={
              `scrcpy --display ${recordSelectIndex} -s ${serialNoDevicesTargets[currentDeviceSelectIndex]} --record ${getUserHome()}/Desktop/${'record_' + timeTag}.mp4`
            }
            cmdKeyword={'record'}
            enable={
              currentDeviceSelectIndex != -1 &&
              serialNoDevicesCounts != 0 &&
              !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
              !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex] && 
              !isSoftRender
            }
            optionsData={serialNoDevicesDisplayInfos[currentDeviceSelectIndex]}
            onMenuClickIndex={(i:any,val:any) =>{onRecordIndexClickded(i,val)}}
            menuSelectIndex={recordSelectIndex}
            onClick={()=>{setTimeTag(getFormateTime())}}
            currentTopSelectIndex={currentDeviceSelectIndex}
          >

          </ADBExpandSelect>
        </ScreenContainer>

      </Container>
  );
})

export default ADBTopArea

const RadioGroupContainer = styled.div<{
  enable:boolean;
}>`
  margin-top:8px;
  cursor:${p => p.enable?'':'not-allowed'};
`

const RadioContainer = styled.div<{
  enable:boolean;
  isAnimationEnable:boolean;
}>`
display: inline-block;
width: calc(50% - 3px);
padding-left: 6px;
font-family: ${p => p.theme.fonts.numberInput};
font-style: normal;
font-weight: bold;
font-size: 10px;
color: ${p => p.theme.colors.text};
border-radius: 4px;
overflow: hidden;
border: 1px solid;
border-color: ${p=>p.theme.colors.menu_border};
background: ${p=>p.theme.colors.normal_button_bg};
height: 20px;
line-height: 19px;
pointer-events: ${p => p.enable?'':'none'};
cursor:${p => p.enable?'pointer':''};
opacity:${p => p.enable?'1':'0.2'};
transition:${p=>p.isAnimationEnable?'all 0.3s':'none'};
`

const getFormateTime = () =>{
  return new Date().getUTCFullYear() +
    ("0" + (new Date().getUTCMonth()+1)).slice(-2) +
    ("0" + new Date().getUTCDate()).slice(-2) + "_" +
    ("0" + new Date().getUTCHours()).slice(-2) +
    ("0" + new Date().getUTCMinutes()).slice(-2) +
    ("0" + new Date().getUTCSeconds()).slice(-2)
}

const ADBDebugPannel =styled.div`
    list-style: none;
    font-size: 12px;
    position: fixed;
    left: 0px;
    top: 0px;
    background: #ffffffeb;
    padding: 20px;
`

const Container = styled.div<{
  isAnimationEnable:boolean;
}>`
  width:100%;
  height:130px;
  padding: 18px 38px;
  background:${p=>p.theme.colors.adb_top_background};
  border-bottom:1px solid ${p => p.theme.colors.adb_border};
  position: relative;
  transition:${p=>p.isAnimationEnable?'background 0.3s,border-bottom 0.3s':'none'};
  
`

const ScreenContainer = styled.div`
bottom: 18px;
position: absolute;
right:0px;
display:flex;
flex-direction:row;
right:38px;
`
