import React,{memo,useContext,useState} from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import {execCMD,execCMDPromise,simpleRunCMD} from '@Helpers/ADBCommand/ADBCommand'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const ADBButtonToggle: React.FC<IButton> = memo(({ parentStyle,style,children, onClick,onMouseDown,onMouseUp,buttonCSS,cmdTriggerAnim,cmd,active}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(CodeBlockStateContext,);
  const [isScaleUp,SetIsScaleUp] = useState<boolean>(false);
  const [bind, { delta, down }] = useGesture()

  const {stateWatcher} = useSpring({
    stateWatcher: (cmdTriggerAnim) ? 0: 1,
    config:animationConfig.adb_trigger_animtion,
    onRest: () =>{
     if(cmdTriggerAnim){
       setTriggerControlAnim(false)
     }
    }
 })

  const dealADBCommand = () =>{
    //simpleRunCMD(cmd,codeBlockIsShow)
  }

  return (
  <animated.div 
  
    css={buttonCSS}
    {...bind()}
    style={
      { 
      ...parentStyle,
      //transform: `${(isScaleUp || cmdTriggerAnim)? `scale3d(1.1,1.1,1)`:`scale3d(1,1,1)`}`,
      //transition: `${isGlobalAnimEnable?'transform 0.35s cubic-bezier(0.3, 2.5, 0.5, 1) 0s':''}`,
      }
    }>
      <Button
        style={{
          ...style,
          transition: `${isGlobalAnimEnable?'background 0.25s':''}`,
        }}
        active={(active || cmdTriggerAnim)}
        onClick={()=>{
          dealADBCommand();
          onClick();
        }}
        // onMouseDown={()=>{
        //   SetIsScaleUp(true)
        //   onMouseDown
        // }}
        // onMouseUp={()=>{
        //   SetIsScaleUp(false)
        //   onMouseUp
        // }}
        >
        <Trans>{children}</Trans>
      </Button>
  </animated.div>);

})

// twmacro
const Button = styled.button<{
  active:boolean;
}>`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  border-radius:4px;
  padding: 0;
  outline:none;
  margin: 0 auto;
  user-select: none;
  cursor:pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.06);
  padding-left: 4px;
  padding-right: 4px;
  position: relative;
  display: block;
  
  background: ${p => (p.active? p.theme.colors.toggle_button_bg:p.theme.colors.normal_button_bg)};
  
  > svg{
    text-align: center;
    vertical-align: middle;
    fill:${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  > span{
    color:${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  > div{
    color:${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  //background: ${p => p.theme.colors.normal_button_bg};

  // > div{
  //   color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  // }
  // > span{
  //   color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  // }
  // > svg{
  //   fill: ${p => p.theme.colors.text};
  // }

  &:active {
    border-style: double;
    background: ${p => p.theme.colors.normal_button_active};
  }
  &:active  > div{
    color: ${p => p.theme.colors.background};
  }
  &:active  > span{
    color: ${p => p.theme.colors.background};
  }
  &:active > svg{
    fill: ${p => p.theme.colors.background};
  }

`;

export default ADBButtonToggle
