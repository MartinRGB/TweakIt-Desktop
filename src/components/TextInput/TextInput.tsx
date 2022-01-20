import React, {memo,useContext, useEffect,useState,useRef}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const TextInput: React.FC<IInput> = memo(({ id,style,value,min,max,step,isEditable,onChange,onKeyUp,onKeyDown,onBlur,onFocus,isAnimationEnable,parentStyle}) => {
  const [colorMode, setColorMode] = useColorMode()
  const [textIsOnFocus,setTextIsOnFocus] = useState<boolean>(false);
  const [textShouldHighlight,setTextShouldHighlight] = useState<boolean>(false);

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })
 const mIsEditable = isEditable?isEditable:true;

 const inputRef = useRef();
 const thisOnFocus = (e:any) =>{
  setTextIsOnFocus(true)
  setTextShouldHighlight(true)
}

const thisOnBlur = (e:any) =>{
  setTextIsOnFocus(false)
  setTextShouldHighlight(false)
}

const onMouseHover = () =>{
  setTextShouldHighlight(true)
}

const onMouseLeave = () =>{
  if(!textIsOnFocus){
    setTextShouldHighlight(false)
  }
}

const thisOnChange = (e: React.FormEvent<HTMLInputElement>) => {
}

const thisOnKeyup = (e: React.FormEvent<HTMLInputElement>) => {
  if(e.keyCode ===13){
    thisOnBlur(e)
    if(inputRef && inputRef.current) inputRef.current.blur();
  }
}

  return (
    <div style={{
      width:`40px`,
      ...parentStyle,
      cursor:`${isEditable?'':'not-allowed'}`,
      height:`100%`,
      
      position:`relative`
    }}>
      
    <Input
    id={id}
    ref={inputRef}
    type="text" 
    style={{...style,
      pointerEvents:`${isEditable?'':'none'}`
    }}
    value={value} 
    min={min} 
    max={max} 
    step={step} 
    isEditable={isEditable}
    highlight={textShouldHighlight}
    focus={textIsOnFocus}
    isAnimationEnable={isAnimationEnable}
    onChange={(e)=>{onChange(e);thisOnFocus(e)}}
    onKeyUp={(e)=>{onKeyUp(e);thisOnKeyup(e)}}
    onKeyDown={onKeyDown}
    onBlur={(e)=>{onBlur(e);thisOnBlur(e)}}
    onFocus={(e)=>{onFocus(e);thisOnFocus(e)}}
    onMouseOver={(e)=>{onMouseHover()}}
    onMouseEnter={(e)=>{onMouseHover()}}
    onMouseLeave={(e)=>{onMouseLeave()}}
    />
  </div>
  )
  
})

const Input = styled.input<{
  isEditable:boolean;
  highlight:boolean;
  focus:boolean;
  isAnimationEnable:boolean;
}>`
  //background: ${props => props.theme.colors.text_input_bg};
  border: 1px solid ${props => props.theme.colors.text_input_border};
  color: ${props => props.theme.colors.text_input_text};
  border-radius: 3px;
  height:100%;
  width: 40px;
  text-align: center;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  outline: none;
  cursor: ${p => p.isEditable?`${p.focus?'text':'pointer'}`:'not-allowed'};
  opacity: ${p => p.isEditable?'1':'0.3'};
  background:${p=>p.isEditable?(p.highlight?p.theme.colors.primary_middle_opacity:p.theme.colors.text_input_bg):p.theme.colors.text_input_bg};
  transition: ${p => p.isAnimationEnable?'all 0.2s':''};

  user-select: ${p => p.focus?'text':'none'};
  &: active{
    background:${p=>p.isEditable?p.theme.colors.primary_dark_1_opacity:''};
  }
  position:absolute;
  top:0px;
  left:0px;
  
`;


export default TextInput
