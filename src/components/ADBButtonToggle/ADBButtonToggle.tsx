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

import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {ADBCommandStateContext}  from '@Context/ADBCommandContext';

const ADBButtonToggle: React.FC<IButton> = memo(({ parentStyle,style,children, onClick,onMouseDown,onMouseUp,buttonCSS,cmdTriggerAnim,cmd,active,enable}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(CodeBlockStateContext,);
  const [isScaleUp,SetIsScaleUp] = useState<boolean>(false);
  const [bind, { delta, down }] = useGesture()

  const {cmdWithConsole} =  useContext(ADBCommandStateContext)

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
    cmd?cmdWithConsole(cmd):''
  }

  return (
  <animated.div 
  
    css={buttonCSS}
    {...bind()}
    style={
      { 
      ...parentStyle,
      cursor:`${enable?'':'not-allowed'}`,
      //transform: `${(isScaleUp || cmdTriggerAnim)? `scale3d(1.1,1.1,1)`:`scale3d(1,1,1)`}`,
      //transition: `${isGlobalAnimEnable?'transform 0.35s cubic-bezier(0.3, 2.5, 0.5, 1) 0s':''}`,
      }
    }>
      <Button
        style={{
          ...style,
          pointerEvents:`${enable?'':'none'}`,
          opacity:`${enable?'1':'0.2'}`,
        }}
        isActive={(active || cmdTriggerAnim)}
        isMouseActive={isScaleUp}
        isAnimationEnable={isGlobalAnimEnable}
        onClick={(e)=>{
          e.preventDefault;
          dealADBCommand();
          onClick();
        }}
        onMouseDown={()=>{
          SetIsScaleUp(true)
          onMouseDown
        }}
        onMouseUp={()=>{
          SetIsScaleUp(false)
          onMouseUp
        }}
        onMouseOut={()=>{
          SetIsScaleUp(false)
          onMouseUp
        }}
        onMouseLeave={()=>{
          SetIsScaleUp(false)
          onMouseUp
        }}
        >
        <Trans>{children}</Trans>
      </Button>
  </animated.div>);

})

// twmacro
const Button = styled.button<{
  isActive:boolean;
  isAnimationEnable:boolean;
  isMouseActive:boolean;
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
  
  background: ${p => p.isActive? p.theme.colors.toggle_button_bg:p.theme.colors.normal_button_bg};
  transition:${p => p.isAnimationEnable?'all 0.2s':''};
  > svg{
    text-align: center;
    vertical-align: middle;
    position: relative;
    fill:${p => (p.isActive? p.theme.colors.background:p.theme.colors.text)};
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
  }

  > span{
    color:${p => (p.isActive? p.theme.colors.background:p.theme.colors.text)};
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
  }

  > div{
    font-size: 11px;
    line-height: 16px;
    word-break: keep-all;
    position: relative;
    color:${p => (p.isActive? p.theme.colors.background:p.theme.colors.text)};
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
  }

  &:active {
    border-style: double;
    > div{
      color: ${p => p.theme.colors.background};
    }
    > span{
      color: ${p => p.theme.colors.background};
    }
    // > svg{
    //   fill: ${p => p.theme.colors.background};
    // }
  }


  &:hover {
    background: ${p => p.isMouseActive?p.theme.colors.normal_button_active:(p.isActive?p.theme.colors.toggle_button_bg:p.theme.colors.toggle_button_hover_bg)};
    > span{
      color: ${p =>  p.isMouseActive?p.theme.colors.background:''};
      opacity:0.9;
    }
    > svg{
      fill: ${p => p.isMouseActive?p.theme.colors.background:''};
      opacity:0.9;
    }
  }


`;

export default ADBButtonToggle
