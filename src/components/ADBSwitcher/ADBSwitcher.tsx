import React,{memo,useContext,useState,useEffect} from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBSwitcher } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {ADBCommandStateContext}  from '@Context/ADBCommandContext';

const ADBSwitcher: React.FC<IADBSwitcher> = memo(({ isDisableCMDAnim,switcherON,switcherOFF,parentStyle,style, onClick,onMouseDown,onMouseUp,buttonCSS,cmdTriggerAnimON,cmdTriggerAnimOFF,isAnimationEnable,cmdSetStr,enable,cmdTarget}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,setTriggerControlAnim,setTriggerBlocAnim} = useContext(CodeBlockStateContext,);
  const [isScaleUp,SetIsScaleUp] = useState<boolean>(false);
  const [bind, { delta, down }] = useGesture()

  const {cmdWithConsole} =  useContext(ADBCommandStateContext)

  const {stateWatcher} = useSpring({
    stateWatcher: (cmdTriggerAnimOFF || cmdTriggerAnimON) ? 0: 1,
    config:animationConfig.adb_trigger_animtion,
    onRest: () =>{
     if(cmdTriggerAnimON || cmdTriggerAnimOFF){
       setTriggerControlAnim(false)
     }
    }
 })

  const dealADBCommand = () =>{
    cmdSetStr?cmdWithConsole(cmdSetStr.replace(/{target}/g, cmdTarget)+' '+(!active?switcherON:switcherOFF)):''
  }

  useEffect(() => {
    if(cmdTriggerAnimON){
      setActive(true)
    }

    if(cmdTriggerAnimOFF){
      setActive(false)
    }
  }, [cmdTriggerAnimON,cmdTriggerAnimOFF])


  const [active,setActive] = useState<boolean>(false);

  return (
  <animated.div 
  
    css={buttonCSS}
    {...bind()}
    style={
      { 
      ...parentStyle,
      cursor:`${enable?'':'not-allowed'}`,
      }
    }>
      <Button
        style={{
          ...style,
          pointerEvents:`${enable?'':'none'}`,
          //opacity:`${enable?'1':'0.2'}`,
        }}
        isActive={(active)}
        isMouseActive={isScaleUp}
        isEditable={enable}
        isAnimationEnable={isAnimationEnable}
        onClick={(e)=>{
          e.preventDefault;
          if(!isDisableCMDAnim) setTriggerBlocAnim(true)
          dealADBCommand();
          onClick();
          setActive(!active)
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
          <SwithcerThumb
            isActive={(active)}
            isEditable={enable}
            isMouseActive={isScaleUp}
            isAnimationEnable={isAnimationEnable}
          ></SwithcerThumb>
      </Button>
  </animated.div>);

})

const SwithcerThumb = styled.div<{
  isActive:boolean;
  isAnimationEnable:boolean;
  isMouseActive:boolean;
  isEditable:boolean;
}>`
height:14px;
width:14px;
position:absolute;
left:${p => p.isActive?'13px':'-1px'};
top:-1px;
//margin-top: -1px;

background:${p => p.isEditable? (p.isActive?p.theme.colors.range_input_thumb_active:p.theme.colors.range_input_thumb):p.theme.colors.range_input_thumb_unactive};


cursor: ${p => p.isEditable?'pointer':'not-allowed'};
border-radius: 2px;
box-shadow: ${p => p.isEditable?`0px 0px 3px ${p.theme.colors.text_input_text}`:'none'};
transition: ${p => p.isAnimationEnable?'background 0.2s,transform 0.2s,box-shadow 0.2s,left 0.25s cubic-bezier(0.3, 1.25, 0.5, 1) 0s':''};

&:hover {
  background:${p => p.isEditable? (p.isMouseActive?p.theme.colors.range_input_thumb_active:p.theme.colors.primary_light_1):p.theme.colors.range_input_thumb_unactive};
}

&:active {
  //background:${p => p.isEditable? p.theme.colors.range_input_thumb_active:''};
  transform:${p => p.isEditable? 'scale3d(1.25,1.25,1)':''};
}

`

// twmacro
const Button = styled.button<{
  isActive:boolean;
  isAnimationEnable:boolean;
  isMouseActive:boolean;
  isEditable:boolean;
}>`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  border-radius:2px;
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
  
  background: ${p => p.isEditable?(!p.isActive? p.theme.colors.text_input_bg:p.theme.colors.primary_middle_opacity):p.theme.colors.text_input_bg_unactive};
  transition:${p => p.isAnimationEnable?'all 0.2s':''};

  &:hover {
    background:${p => (p.isMouseActive?p.theme.colors.primary_dark_1_opacity:p.theme.colors.primary_middle_opacity)};
  }


`;

export default ADBSwitcher
