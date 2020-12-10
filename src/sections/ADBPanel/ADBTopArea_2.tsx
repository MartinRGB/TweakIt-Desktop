import React,{ memo,useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'

// i18n
import '@Context/i18nContext'
import DropDownMenuDevice from '@Components/DropDownMenuDevice'
import Icons from '@Assets/icons'
import adbConfig from '@Config/adb_cmd_list.json';
import ADBButtonSegment from '@Components/ADBButtonSegment'
import ADBExpandSelect from '@Components/ADBExpandSelect'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {ADBConnectContext}  from '@Context/ADBConnectContext';
import {getUserHome,SDCardTmpPath} from '@Helpers/GlobalEnvironments/PathEnvironments'

const ADBTopArea: React.FC = memo(({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {currentSelectIndex,setCurrentSelectIndex,setCurrentSelectDeviceId,currentSelectDeviceId,deviceArray,deviceCounts,deviceDisplayInfo,deviceWifi,startWifiConnection,deviceIsOnConnect,setDeviceIsOnConnet} = useContext(ADBConnectContext)

  // segment
  const segmentIconStr = ["USB","Wifi",];
  const [segmentActiveStr,setSegmentActiveStr] = useState<string>(segmentIconStr[0])
  
  const onDeviceIndexClicked = (i:any,val:any) =>{
    setCurrentSelectIndex(i)
    setCurrentSelectDeviceId(deviceArray[i])
    setSegmentActiveStr(segmentIconStr[0])
    setCastSelectIndex(0);
    setScreenshotSelectIndex(0);
    setRecordSelectIndex(0);
  }

  const onSegementIndexClicked = (i:any,val:any,cmd:any) =>{
    if(i === 0){
      setDeviceIsOnConnet(true)
      setCurrentSelectDeviceId(deviceArray[currentSelectIndex])
      setSegmentActiveStr(segmentIconStr[0])
    }
    if(i === 1){
      setDeviceIsOnConnet(false)
      startWifiConnection(currentSelectDeviceId,currentSelectIndex)
      setCurrentSelectDeviceId(deviceWifi[currentSelectIndex])
      setSegmentActiveStr(segmentIconStr[1])
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


  console.log(deviceArray)
  console.log(deviceCounts)
  console.log(deviceDisplayInfo)
  console.log(deviceWifi)

  return (
      <Container isAnimationEnable={isGlobalAnimEnable}>
        <DropDownMenuDevice 
          style={{zIndex:`1`}} 
          menuStyle={{zIndex:`1`,left:`-1px`,width:`calc(100% + 3px)`}} 
          optionsData={deviceArray} 
          enable={deviceCounts!=0 && deviceIsOnConnect} 
          menuWidth={`calc(100%)`} 
          isRichAnimation={true}
          onClickIndex={(i,val)=>{onDeviceIndexClicked(i,val)}} 
          selectIndex={currentSelectIndex}
        ></DropDownMenuDevice>

        <ADBButtonSegment
          style={{    
            bottom: `18px`,
            position: `absolute`
          }}
          iconArray = {segmentIconStr}
          active = {segmentActiveStr}
          enable = {(currentSelectDeviceId != '')}
          disableIndex = {(deviceWifi[currentSelectIndex] != '')?-1:1}
          onSegementClickIndex={(i,val,cmd)=>{onSegementIndexClicked(i,val,cmd)}}
        >

        </ADBButtonSegment>

        <ScreenContainer>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={castIconStr}
            cmdStr={
              `scrcpy --display ${castSelectIndex} -s ${currentSelectDeviceId}`
            }
            enable={(
              currentSelectDeviceId != '' && 
              deviceIsOnConnect && 
              deviceCounts!=0)}
            optionsData={deviceDisplayInfo[currentSelectIndex]}
            onMenuClickIndex={(i,val) =>{onCastIndexClickded(i,val)}}
            menuSelectIndex={castSelectIndex}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={screenshotIconStr}
            cmdStr={
              `adb -s ${currentSelectDeviceId} shell screencap -d ${screenshotSelectIndex} -p ${SDCardTmpPath()}/screen.png;adb -s 00d4fe2f pull ${SDCardTmpPath()}/screen.png ${getUserHome()}/Desktop/${'capture_' + timeTag}.png;adb -s ${currentSelectDeviceId} shell rm ${SDCardTmpPath()}/screen.png`
            }
            enable={(
              (currentSelectDeviceId != '' && !currentSelectDeviceId.includes('emulator') )&& 
              deviceIsOnConnect && 
              deviceCounts!=0)}
            optionsData={deviceDisplayInfo[currentSelectIndex]}
            onMenuClickIndex={(i,val) =>{onScreenshotIndexClickded(i,val)}}
            menuSelectIndex={screenshotSelectIndex}
            onClick={()=>{setTimeTag(getFormateTime())}}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            iconStr={recordIconStr}
            cmdStr={
              `scrcpy --display ${recordSelectIndex} -s ${currentSelectDeviceId} --record ${getUserHome()}/Desktop/${'record_' + timeTag}.mp4`
            }
            enable={(currentSelectDeviceId != '' && deviceIsOnConnect && deviceCounts!=0)}
            optionsData={deviceDisplayInfo[currentSelectIndex]}
            onMenuClickIndex={(i,val) =>{onRecordIndexClickded(i,val)}}
            menuSelectIndex={recordSelectIndex}
            onClick={()=>{setTimeTag(getFormateTime())}}
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
