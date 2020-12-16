import React ,{memo,useState, useContext,useEffect,useRef,useCallback} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import ADBButtonNormal from '@Components/ADBButtonNormal'
//import childProcess from 'child_process';
import Icons from '@Assets/icons'
import animationConfig from '@Config/animation.json';
import cmdList from '@Config/cmd_list';

import theme from 'src/styles/theme.ts';
import DropDownMenu from '@Components/DropDownMenu'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {ADBConnectionContext}  from '@Context/ADBConnectionContext';

const SelectArea: React.FC = memo(({children}) => {
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();

  const {codeBlockIsShow, setCodeBlockIsShow,setTriggerBlocAnim,adbInputCMD,canTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  const adbGetStr = cmdList.adb_get_device;
  const adbBuildStr = cmdList.adb_help;

  const {serialNoDevicesCounts,currentDeviceSelectIndex,serialNoDevicesIsConnectingWifi,serialNoDevicesIsConnectingUSB} = useContext(ADBConnectionContext)


  useEffect( () => {

  }, []);


  const optionsData = [
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Spring",
    "Summer",
    "Autumn",
    "Winter"
  ];

  const getMessageFromDevice = () =>{
    console.log('get')
  }

  const postMessageToDevice = () =>{
    console.log('build')
  }

  const onIndexClicked = (i:any,val:any) =>{
    console.log(i)
    console.log(val)
  }
  
  return (
    <Container isAnimationEnable={isGlobalAnimEnable}>

      <TopLeftContainer>
        <TitleSpan><Trans>Select Animation In Tweakit-Android</Trans></TitleSpan>

        <DropDownMenu 
        onClickIndex={(i,val)=>{onIndexClicked(i,val)}} 
        menuStyle={{left:`-1px`,width:`240px`}}
        optionsData={optionsData} 
        enable={(
          currentDeviceSelectIndex != -1 &&
          serialNoDevicesCounts != 0 &&
          !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
          !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          
        )} 
        menuWidth={`240px`} 
        isRichAnimation={true}></DropDownMenu>
     
        <ADBButtonNormal 
          enable={(            
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          )}
          cmdTriggerAnim={
            ((adbInputCMD === adbGetStr) && canTriggerControlAnim && codeBlockIsShow)
          }
          cmd={adbGetStr}
          isDisableCMDAnim={false}
          //onClick={setTriggerBlocAnim(true)}
          buttonCSS = {
            css`
              margin-left:12px;
              margin-right:12px;
              > button{
                height:20px;
                width:40px;
              }
              > button > span{
                width: 100%;
                line-height:16px;
              }
            `
          }
          onClick={getMessageFromDevice}
          >
            <CustomSpan><Trans>Get</Trans></CustomSpan>
        </ADBButtonNormal>
        <ADBButtonNormal
          enable={(              
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          )}
          cmdTriggerAnim={
            ((adbInputCMD === adbBuildStr) && canTriggerControlAnim && codeBlockIsShow)
          }
          cmd={adbBuildStr}
          isDisableCMDAnim={false}
          //onClick={setTriggerBlocAnim(true)}
          buttonCSS = {
            css`
              margin-right:12px;
              > button{
                height:20px;
                width:40px;
              }
              > button > span{
                width: 100%;
                line-height:16px;
              }
            `
          }
          onClick={postMessageToDevice}
          >
            <CustomSpan><Trans>Build</Trans></CustomSpan>
        </ADBButtonNormal>

      </TopLeftContainer>
    </Container>
  )
})

export default SelectArea

const Container = styled.div<{
  isAnimationEnable:boolean;
}>`
  width:100%;
  height: 56px;
  min-height:56px;
  display: flex;
  flex-direction: column;
  z-index:3;
  transition:${p=>p.isAnimationEnable?'background 0.3s,box-shadow 0.3s':'none'};
  background:${p => p.theme.colors.main_top_bg};
  box-shadow: 0px 1px 0px ${p => p.theme.colors.adb_border};
`

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  float: left;
  padding-left:14px;
`
const TitleSpan = styled.p`
  text-align:left;
  width:201px;
  min-width:201px;
  opacity:0.5;
  font-family: ${props => props.theme.fonts.headText};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  user-select: none;
  margin-right:12px;
  color:${p => p.theme.colors.text};
  z-index:1;
`

const CustomSpan = styled.span`
  text-align: center;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 14px;
  color:${p => p.theme.colors.primary};
`

//  <ADBButtonNormal
//   cmdTriggerAnim={
//     ((adbInputCMD === adbConfig.adb_test) && canTriggerControlAnim && codeBlockIsShow)
//   }
//   cmd={adbConfig.adb_test}
//   buttonCSS = {
//     css`
//       margin-right:12px;
//       > button{
//         height:20px;
//       }
//     `
//   }
//   onClick={postMessageToDevice}
//   // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
//   // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
//   >
//     <Icons.USB></Icons.USB>
// </ADBButtonNormal>