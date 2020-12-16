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

const ADBTopArea: React.FC = memo(({ children }) => {
  const [colorMode, setColorMode] = useColorMode();
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
          disableIndex={(serialNoDevicesIsRemovedUSB[currentDeviceSelectIndex])?[true,true]:[false,(serialNoDeivces[currentDeviceSelectIndex] && serialNoDeivces[currentDeviceSelectIndex].includes('emulator'))?true:false]}
        >

        </ADBButtonSegment>

        <ScreenContainer>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={castIconStr}
            cmdStr={
              `scrcpy --display ${castSelectIndex} -s ${serialNoDevicesTargets[currentDeviceSelectIndex]}`
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
              !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
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
  height:90px;
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
