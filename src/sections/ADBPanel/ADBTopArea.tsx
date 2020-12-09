import React,{ memo,useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'

// i18n
import '@Context/i18nContext'
import DropDownMenu from '@Components/DropDownMenu'
import Icons from '@Assets/icons'
import adbConfig from '@Config/adb_cmd_list.json';
import ADBButtonSegment from '@Components/ADBButtonSegment'
import ADBExpandSelect from '@Components/ADBExpandSelect'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {ADBConnectContext}  from '@Context/ADBConnectContext';

const ADBTopArea: React.FC = memo(({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();

  const defaultActivie = adbConfig.adb_b;
  const segmentIconStr = ["USB","Wifi",];
  const segmentCMDStr = [adbConfig.adb_b,adbConfig.adb_test];

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {setCurrentSelectId,currentSelectId,connectedDevice,connectedDeviceLength,displayInfo,deviceWifi,startWifiConnection} = useContext(ADBConnectContext)

  const castIconStr:any = "Cast";
  const screenshotIconStr = "Screenshot";
  const recordIconStr = "Record";
  const [castCMDStr,setCastCMDStr] = useState<string>(adbConfig.adb_1);
  const screenshotCMDStr = adbConfig.adb_2;
  const recordCMDStr= adbConfig.adb_3;


  const [currentSelectIndex,setCurrentSelectIndex] = useState<number>(0);

  useEffect( () => {

  }, []);


  
  const onDeviceIndexClicked = (i:any,val:any) =>{
    console.log(i)
    console.log(val)
    setCurrentSelectId(val)
    setCurrentSelectIndex(i)
    console.log(deviceWifi)
  }

  const onSegementIndexClicked = (i:any,val:any,cmd:any) =>{
    console.log(i)
    console.log(cmd)
    console.log(val)
    // /setCurrentSelectId(deviceWifi[currentSelectIndex])
    if(i == 1){
      startWifiConnection(currentSelectId)
    }
  }

  const onCastIndexClickded= (i:any,val:any) =>{
    console.log(i)
    console.log(val)
    setCastCMDStr(`${adbConfig.adb_1} -s ${currentSelectId}`)
  }


  return (
      <Container isAnimationEnable={isGlobalAnimEnable}>
        <DropDownMenu 
          onClickIndex={(i,val)=>{onDeviceIndexClicked(i,val)}} 
          style={{zIndex:`1`}} 
          menuStyle={{zIndex:`1`,left:`-1px`,width:`calc(100% + 3px)`}} 
          optionsData={connectedDevice} 
          enable={connectedDeviceLength!=0} 
          menuWidth={`calc(100%)`} 
          isRichAnimation={false}
        ></DropDownMenu>

        <div style={{
            position: `absolute`,
            top: `0`,
            left: `0`,
        }}>{deviceWifi[0]}</div>

        <ADBButtonSegment
          style={{    
            bottom: `18px`,
            position: `absolute`
          }}
          cmdArray = {segmentCMDStr}
          iconArray = {segmentIconStr}
          active = {segmentCMDStr[0]}
          enable = {(currentSelectId != '')}
          disableIndex = {(deviceWifi[0] != '')?-1:1}
          onSegementClickIndex={(i,val,cmd)=>{onSegementIndexClicked(i,val,cmd)}}
        >

        </ADBButtonSegment>

        <ScreenContainer>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={castIconStr}
            cmdStr={castCMDStr}
            enable={(currentSelectId != '')}
            optionsData={displayInfo}
            onMenuClickIndex={(i,val) =>{onCastIndexClickded(i,val)}}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={screenshotIconStr}
            cmdStr={screenshotCMDStr}
            enable={(currentSelectId != '')}
            optionsData={displayInfo}
            onMenuClickIndex={() =>{}}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            iconStr={recordIconStr}
            cmdStr={recordCMDStr}
            enable={(currentSelectId != '')}
            optionsData={displayInfo}
            onMenuClickIndex={() =>{}}
          >

          </ADBExpandSelect>
        </ScreenContainer>

      </Container>
  );
})

export default ADBTopArea

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
