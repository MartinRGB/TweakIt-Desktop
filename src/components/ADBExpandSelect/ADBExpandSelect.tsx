import React,{memo,useContext,useState,useRef} from 'react'
import { useColorMode,jsx} from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBExpandSelect } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';

import {execCMD,execCMDPromise,simpleRunCMD} from '@Helpers/ADBCommand/ADBCommand'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import Icons from '@Assets/icons'
import ADBButtonToggle from '@Components/ADBButtonToggle'
import ADBButtonNormal from '@Components/ADBButtonNormal'
import DropDownMenuSimple from '@Components/DropDownMenuSimple'

const ADBExpandSelect: React.FC<IADBExpandSelect> = memo(({ style,children , onClick,onArrowClick,onMouseDown,onMouseUp,conatinerCSS,cmdTriggerAnim,cmdStr,iconStr,onADBExpandSelect}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,setADBInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(CodeBlockStateContext,);

  const {stateWatcher} = useSpring({
    stateWatcher: ((cmdStr === adbInputCMD) && canTriggerControlAnim && codeBlockIsShow) ? 0: 1,
    config:animationConfig.adb_trigger_animtion,
    onRest: () =>{
     if((cmdStr+currentScreen === adbInputCMD && canTriggerControlAnim && codeBlockIsShow)){
      
     }
    }
  })

  const dealADBCommand = (cmd:any) =>{
    simpleRunCMD(cmd,codeBlockIsShow)
  }

  var ExpandSelectIcon;
  ExpandSelectIcon = Icons[(iconStr.replace(/\s/g, "")!)];

  const dropdownRef = useRef();
  const optionsData = [
    { value: "1", label: "Spring" },
    { value: "2", label: "Summer" },
    { value: "3", label: "Autumn" },
    { value: "4", label: "Winter" },
    { value: "5", label: "Spring" },
    { value: "6", label: "Summer" },
    { value: "7", label: "Autumn" },
  ];

  const [currentScreen,setCurrentScreen] = useState<string>('2');

  return (
  <Container
    css={conatinerCSS}
    style={
      {...style,}
    }>
    <ClipContainer isAnimationEnable={isGlobalAnimEnable}>
    <LeftSide>
      <ADBButtonNormal 
        cmdTriggerAnim={
          ((adbInputCMD === cmdStr) && canTriggerControlAnim && codeBlockIsShow)
        }
        cmd={cmdStr} //+currentScreen
        buttonCSS = {
          css`
            
            > button{
              height:22px;  
              border-radius:0px;
              top:-1px;
            }
            >span{
              width:16px;
              line-height:22px;
              top:-1px;
            }
          `
        }
        parentStyle={{
          transform:'none',
        }}
        onClick={()=>{
          //onClick()
        }}
        >
        <ExpandSelectIcon></ExpandSelectIcon>
        <NumContainer>{currentScreen}</NumContainer>
      </ADBButtonNormal>
    </LeftSide>
    <Divide isAnimationEnable={isGlobalAnimEnable}></Divide>
    <ADBButtonNormal 
        buttonCSS = {
          css`
            > button{
              height:22px;  
              width:16px;
              border-radius:0px;
              >svg{
                position: absolute;
                top: 2px;
                left: -1px;
              }
            }
          `
        }
        parentStyle={{
          transform:'none',
        }}
        onClick={(e)=>{
          //onClick()
          dropdownRef.current.clickExpandSelect(e)
          
        }}
        >
        <Icons.DownSelect></Icons.DownSelect>
      </ADBButtonNormal>
      </ClipContainer>

      <DropDownMenuSimple ref={dropdownRef} onClickIndex ={(i,val)=>{ 
        setCurrentScreen(val)

      }} menuStyle={{left:`-1px`,width:`150px`}} optionsData={optionsData} menuWidth={`150px`}></DropDownMenuSimple>
  </Container>);

})

const Divide = styled.div<{
  isAnimationEnable:boolean;
}>`
height:22px;
width:1px;
background:${p=>p.theme.colors.menu_border};
transition:${p=>p.isAnimationEnable?'background 0.3s':'none'};
`


const Container = styled.div`
height: 22px;
position:relative;
`
const ClipContainer = styled.div<{
  isAnimationEnable:boolean;
}>`
display: inline-flex;
flex-direction: row;
height:22px;
border-radius: 4px;
position:relative;
border: 1px solid;
border-color:${p => p.theme.colors.menu_border};
transition:${p=>p.isAnimationEnable?'border-color 0.3s':'none'};
overflow:hidden;
`

const NumContainer = styled.span`
line-height:22px;
width:10px;
text-align:right;
`

const LeftSide = styled.div`

`

export default ADBExpandSelect
