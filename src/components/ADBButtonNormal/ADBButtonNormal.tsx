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
const ADBButtonNormal: React.FC<IButton> = memo(({isDisableCMDAnim,parentStyle,style,children , onClick,onMouseDown,onMouseUp,buttonCSS,cmdTriggerAnim,cmd,enable}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,canTriggeBlocAnim,setTriggerControlAnim,setTriggerBlocAnim} = useContext(CodeBlockStateContext);
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


  const [isAnimate,setIsAnimate] = useState<boolean>(false);

  const dealADBCommand = () =>{
    cmdWithConsole(cmd)

  }


  return (
  <animated.div 
    
    css={buttonCSS}
    {...bind()}
    style={
      { 
      transform: `${(isScaleUp || cmdTriggerAnim)? `scale3d(1.1,1.1,1)`:`scale3d(1,1,1)`}`,
      transition: `${isGlobalAnimEnable?'transform 0.35s cubic-bezier(0.3, 2.5, 0.5, 1) 0s':''}`,
      ...parentStyle,
      cursor:`${(enable)?(isAnimate?'progress':''):'not-allowed'}`,
      }
    }>
      <Button
        style={{
          ...style,
          transition: `${isGlobalAnimEnable?'all 0.2s':''}`,
          pointerEvents:`${(enable && !isAnimate)?'':'none'}`,
          opacity:`${enable?'1':'0.2'}`,
        }}
        active={(isScaleUp || cmdTriggerAnim)}
        isAnimationEnable={isGlobalAnimEnable}
        onClick={()=>{

          setIsAnimate(true)
          var animTimeout = setTimeout(()=>{
            if(!isDisableCMDAnim) setTriggerBlocAnim(true)
            setIsAnimate(false)
            clearTimeout(animTimeout)
          },350)
          cmd?dealADBCommand():'';
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
  active:boolean;
  isAnimationEnable:boolean;
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
  display: flex;
  flex-direction: row;

  background: ${p => (p.active? p.theme.colors.normal_button_active:p.theme.colors.normal_button_bg)};
  transition:${p => p.isAnimationEnable?'all 0.2s':''};

  > div{
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  > span{
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
    font-size: 11px;
    line-height: 16px;
    word-break: keep-all;
    position: relative;
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }
  > svg{
    position: relative;
    text-align: center;
    vertical-align: middle;
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
    fill: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  &:hover {
    background: ${p => p.theme.colors.toggle_button_hover_bg};
    > span{
      opacity:0.9;
    }
    > svg{
      opacity:0.9;
    }
  }

  &:active {
    border-style: double;
    background: ${p => p.theme.colors.normal_button_active};

    > div{
      color: ${p => (p.active? p.theme.colors.text:p.theme.colors.background)};
    }
    > span{
      color: ${p => (p.active? p.theme.colors.background:p.theme.colors.background)};
    }
    > svg{
      fill: ${p => (p.active? p.theme.colors.background:p.theme.colors.background)};
    }
  }
`;

export default ADBButtonNormal
