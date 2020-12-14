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
import {ADBConnectContext}  from '@Context/ADBConnectContext';
import {getUserHome,SDCardTmpPath} from '@Helpers/GlobalEnvironments/PathEnvironments'
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';
import {ADBSelectContext} from '@Context/ADBSelectContext'

const ADBTopArea: React.FC = memo(({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {realConnectedDevice,isReUpdate,updateData,isWifiDeviceRemoved,isWifiOnConnect,connectedDevice,connectedDeviceCounts,displayInfo,deviceWifi,startWifiConnection,startUSBConnection,wifiIsConnecting} = useContext(ADBConnectContext)

  //const [currentSelectIndex,setCurrentSelectIndex] = useState<number>(-1)
  const {currentSelectDeviceId,currentSelectIndex,setCurrentSelectIndex,setCurrentSelectDeviceId,cmdTarget,setCMDTarget} = useContext(ADBSelectContext)

  // segment
  const segmentIconStr = ["USB","Wifi",];
  const [segmentActiveStr,setSegmentActiveStr] = useState<string>(segmentIconStr[0])
  

  const onDropDownClick = () =>{
    //updateData()
    if(isWifiOnConnect && isWifiOnConnect[currentSelectIndex]){

      //if(isWifiOnConnect[currentSelectIndex][0] === true) updateData()
      
    }
  }

  const onDeviceIndexClicked = (i:any,val:any) =>{
    setCurrentSelectIndex(i)
    setCurrentSelectDeviceId(connectedDevice[i])
    setSegmentActiveStr(segmentIconStr[0])
    setCastSelectIndex(0);
    setScreenshotSelectIndex(0);
    setRecordSelectIndex(0);

    // setWifi Icon
    if(isWifiDeviceRemoved[i]){
      setSegmentActiveStr(segmentIconStr[1])
    }
  }

  const onSegementIndexClicked = (i:any,val:any,cmd:any) =>{
    if(i === 0){
      startUSBConnection(currentSelectDeviceId,currentSelectIndex)
      setCurrentSelectDeviceId(connectedDevice[currentSelectIndex])
      setSegmentActiveStr(segmentIconStr[0])

      //TODO
      if(isWifiDeviceRemoved[currentSelectIndex] && isWifiOnConnect && isWifiOnConnect[currentSelectIndex]){
        setCMDTarget(isWifiOnConnect[currentSelectIndex][2])
      }
      else{
        setCMDTarget(currentSelectDeviceId)
      }
    }
    if(i === 1){
      startWifiConnection(currentSelectDeviceId,currentSelectIndex)
      setCurrentSelectDeviceId(deviceWifi[currentSelectIndex])
      setSegmentActiveStr(segmentIconStr[1])

      //TODO
      if(isWifiDeviceRemoved[currentSelectIndex] && isWifiOnConnect && isWifiOnConnect[currentSelectIndex]){
        setCMDTarget(isWifiOnConnect[currentSelectIndex][2])
      }
      else{
        setCMDTarget(currentSelectDeviceId)
      }
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
    console.log('Do something after counter has changed');
    if(isReUpdate && currentSelectIndex != -1 && connectedDeviceCounts!=0 ){
      setCurrentSelectIndex(0)
      console.log(connectedDevice)
      console.log(realConnectedDevice)
      setCurrentSelectDeviceId(realConnectedDevice[0])
      setSegmentActiveStr(segmentIconStr[0])
      setCastSelectIndex(0);
      setScreenshotSelectIndex(0);
      setRecordSelectIndex(0);
    }
  }, [isReUpdate]);

  //const [cmdTarget,setCMDTarget] = useState<string>(currentSelectDeviceId)
  useEffect(() => {
    if(isWifiDeviceRemoved[currentSelectIndex] && isWifiOnConnect && isWifiOnConnect[currentSelectIndex]){
      setCMDTarget(isWifiOnConnect[currentSelectIndex][2])
    }
    else{
      setCMDTarget(currentSelectDeviceId)
    }

  }, [currentSelectDeviceId,isWifiDeviceRemoved[currentSelectIndex]]);


  return (
      <Container isAnimationEnable={isGlobalAnimEnable}>
        <DropDownMenuDevice 
          onClick={()=>{onDropDownClick()}}
          style={{zIndex:`1`}} 
          menuStyle={{zIndex:`1`,left:`-1px`,width:`calc(100% + 3px)`}} 
          optionsData={connectedDevice} 
          enable={
            connectedDeviceCounts!=0 
            && !wifiIsConnecting
          } 
          menuWidth={`calc(100%)`} 
          isRichAnimation={true}
          onClickIndex={(i:any,val:any)=>{onDeviceIndexClicked(i,val)}} 
          selectIndex={currentSelectIndex}
          //selectedText={connectedDevice[currentSelectIndex]}
        ></DropDownMenuDevice>

        {/* <div onClick={()=>{}}style={{position:`absolute`,left:`0`,top:`0`}}>
          {cmdTarget}
        </div> */}

        <ADBButtonSegment
          style={{    
            bottom: `18px`,
            position: `absolute`
          }}
          iconArray = {segmentIconStr}
          active = {segmentActiveStr}
          enable = {(
            currentSelectIndex != -1 && 
            connectedDeviceCounts!=0 &&
            !wifiIsConnecting 
          )}
          disableIndex={(isWifiDeviceRemoved[currentSelectIndex] && (isWifiOnConnect && isWifiOnConnect[currentSelectIndex] && isWifiOnConnect[currentSelectIndex][0] === true))?[true,true]:[false,((deviceWifi[currentSelectIndex] != '' && (connectedDevice && connectedDevice[currentSelectIndex] && !connectedDevice[currentSelectIndex].includes('emulator')))?false:true)]}
          onSegementClickIndex={(i:any,val:any,cmd:any)=>{onSegementIndexClicked(i,val,cmd)}}
        >

        </ADBButtonSegment>

        <ScreenContainer>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={castIconStr}
            // cmdStr={
            //   isWifiDeviceRemoved[currentSelectIndex]?
            //   `scrcpy --display ${castSelectIndex} -s ${isWifiOnConnect && isWifiOnConnect[currentSelectIndex] && isWifiOnConnect[currentSelectIndex][2]}`
            //   :
            //   `scrcpy --display ${castSelectIndex} -s ${currentSelectDeviceId}`
            // }
            cmdStr={
              `scrcpy --display ${castSelectIndex} -s ${cmdTarget}`
            }
            enable={(
              currentSelectIndex != -1 && 
              !wifiIsConnecting &&
              connectedDeviceCounts!=0 
            )}
            cmdKeyword={'scrcpy --display'}
            optionsData={displayInfo[currentSelectIndex]}
            onMenuClickIndex={(i:any,val:any) =>{onCastIndexClickded(i,val)}}
            menuSelectIndex={castSelectIndex}
            currentTopSelectIndex={currentSelectIndex}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={screenshotIconStr}
            // cmdStr={
            //   isWifiDeviceRemoved[currentSelectIndex]?
            //   `adb -s ${isWifiOnConnect && isWifiOnConnect[currentSelectIndex] && isWifiOnConnect[currentSelectIndex][2]} shell screencap -d ${screenshotSelectIndex} -p ${SDCardTmpPath()}/screen.png;adb -s 00d4fe2f pull ${SDCardTmpPath()}/screen.png ${getUserHome()}/Desktop/${'capture_' + timeTag}.png;adb -s ${isWifiOnConnect && isWifiOnConnect[currentSelectIndex] && isWifiOnConnect[currentSelectIndex][2]} shell rm ${SDCardTmpPath()}/screen.png`
            //   :
            //   `adb -s ${currentSelectDeviceId} shell screencap -d ${screenshotSelectIndex} -p ${SDCardTmpPath()}/screen.png;adb -s 00d4fe2f pull ${SDCardTmpPath()}/screen.png ${getUserHome()}/Desktop/${'capture_' + timeTag}.png;adb -s ${currentSelectDeviceId} shell rm ${SDCardTmpPath()}/screen.png`
            // }
            cmdStr={
              `adb -s ${cmdTarget} shell screencap -d ${screenshotSelectIndex} -p ${SDCardTmpPath()}/screen.png;adb -s ${cmdTarget} pull ${SDCardTmpPath()}/screen.png ${getUserHome()}/Desktop/${'capture_' + timeTag}.png;adb -s ${cmdTarget} shell rm ${SDCardTmpPath()}/screen.png`
            }
            cmdKeyword={'screencap'}
            enable={(
              currentSelectIndex != -1 && 
              // TODO (currentSelectDeviceId && !currentSelectDeviceId.includes('emulator')) && 
              (connectedDevice[currentSelectIndex] && !connectedDevice[currentSelectIndex].includes('emulator')) && 
              !wifiIsConnecting &&
              connectedDeviceCounts!=0 
            )}
            optionsData={displayInfo[currentSelectIndex]}
            onMenuClickIndex={(i:any,val:any) =>{onScreenshotIndexClickded(i,val)}}
            menuSelectIndex={screenshotSelectIndex}
            onClick={()=>{setTimeTag(getFormateTime())}}
            currentTopSelectIndex={currentSelectIndex}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            iconStr={recordIconStr}
            // cmdStr={
            //   isWifiDeviceRemoved[currentSelectIndex]?
            //   `scrcpy --display ${recordSelectIndex} -s ${isWifiOnConnect && isWifiOnConnect[currentSelectIndex] && isWifiOnConnect[currentSelectIndex][2]} --record ${getUserHome()}/Desktop/${'record_' + timeTag}.mp4`
            //   :
            //   `scrcpy --display ${recordSelectIndex} -s ${currentSelectDeviceId} --record ${getUserHome()}/Desktop/${'record_' + timeTag}.mp4`
            // }
            cmdStr={
              `scrcpy --display ${recordSelectIndex} -s ${cmdTarget} --record ${getUserHome()}/Desktop/${'record_' + timeTag}.mp4`
            }
            cmdKeyword={'record'}
            enable={
              currentSelectIndex != -1 && 
              !wifiIsConnecting &&
              connectedDeviceCounts!=0 
            }
            optionsData={displayInfo[currentSelectIndex]}
            onMenuClickIndex={(i:any,val:any) =>{onRecordIndexClickded(i,val)}}
            menuSelectIndex={recordSelectIndex}
            onClick={()=>{setTimeTag(getFormateTime())}}
            currentTopSelectIndex={currentSelectIndex}
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
