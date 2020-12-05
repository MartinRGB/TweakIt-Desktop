import React ,{memo,useState, useContext,useEffect,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import MainButtonNormal from '@Components/MainButtonNormal'
import ADBButtonNormal from '@Components/ADBButtonNormal'
//import childProcess from 'child_process';
import Icons from '@Assets/icons'
import animationConfig from '@Config/animation.json';
import adbConfig from '@Config/adb_cmd_list';

import theme from 'src/styles/theme.ts';
import DropDownMenu from '@Components/DropDownMenu'
import {ADBConnectStateContext} from '@Context/ADBConnectContext'
import {execCMD,execCMDPromise,simpleRunCMD} from '@Helpers/ADBCommand/ADBCommand'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'


const SelectArea: React.FC = memo(({children}) => {
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();

  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );

  const getMessageFromDevice = () =>{
    //simpleRunCMD(adbConfig.adb_get_device,codeBlockIsShow)
  }

  const postMessageToDevice = () =>{
    
    //simpleRunCMD(adbConfig.adb_help,codeBlockIsShow)

  }

  const optionsData = [
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
  ];
  


  return (
    <Container>

      <TopLeftContainer>
        <TitleSpan><Trans>Select Animation In Tweakit-Android</Trans></TitleSpan>

        <DropDownMenu optionsData={optionsData} menuWidth={240} isRichAnimation={true}></DropDownMenu>
     
        <ADBButtonNormal 
          triggerAnim={
            ((adbInputCMD === adbConfig.adb_get_device) && canTriggerControlAnim && codeBlockIsShow)
          }
          cmd={adbConfig.adb_get_device}
          buttonCSS = {
            css`
              margin-left:12px;
              margin-right:12px;
              height:20px;
              margin-top:-6px;
              > button{
                display:inline-block;
                height:20px;
                width:40px;
              }
            `
          }
          onClick={getMessageFromDevice}
          // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Get</Trans></CustomSpan>
        </ADBButtonNormal>
        <ADBButtonNormal
          triggerAnim={
            ((adbInputCMD === adbConfig.adb_help) && canTriggerControlAnim && codeBlockIsShow)
          }
          cmd={adbConfig.adb_help}
          buttonCSS = {
            css`
              margin-right:12px;
              height:20px;
              margin-top:-6px;
              > button{
                display:inline-block;
                height:20px;
                width:40px;
              }
            `
          }
          onClick={postMessageToDevice}
          // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Build</Trans></CustomSpan>
        </ADBButtonNormal>


      </TopLeftContainer>
    </Container>
  )
})

export default SelectArea

const Container = styled.div`
  width:100%;
  height: 56px;
  min-height:56px;
  display: flex;
  flex-direction: column;
  z-index:2;
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