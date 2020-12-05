import React,{memo,useContext} from 'react'
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


const ADBButtonNormal: React.FC<IButton> = memo(({ parentStyle,style,children , onClick,onMouseDown,onMouseUp,buttonCSS,triggerAnim,cmd}) => {
  const [colorMode, setColorMode] = useColorMode()

  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
     size: (down || triggerAnim) ? 1.1: 1,
     immediate: name => down && name === 'x',
     config:animationConfig.button_pressed,
     onRest: () =>{
      console.log(triggerAnim)
      if(triggerAnim){
        setTriggerControlAnim(false)
      }
     }
  })

  const dealADBCommand = () =>{
    simpleRunCMD(cmd,codeBlockIsShow)
  }


  return (
  <animated.div 
  
    css={buttonCSS}
    {...bind()} 
    style={
      { 
      ...parentStyle,
      transform: interpolate([size], (s) => `scale(${s})`),
      filter: interpolate([size], (s) => `invert(${(s-1)*10})`)
      }
    }>
      <Button
        style={style}
        onClick={()=>{
          dealADBCommand();
          onClick();
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        >
        <Trans>{children}</Trans>
      </Button>
  </animated.div>);

})

// twmacro
const Button = styled.button`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  border-radius:4px;
  padding: 0;
  outline:none;
  margin: 0 auto;
  user-select: none;
  cursor:pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.06);


  background: ${p => p.theme.colors.normal_button_bg};
  > div{
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }
  > span{
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }
  > svg{
    fill: ${p => p.theme.colors.text};
  }
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

export default ADBButtonNormal
