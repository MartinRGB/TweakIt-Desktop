import React, {memo,useContext, useEffect,useState,useRef,useImperativeHandle,forwardRef}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';



const ADBNumberInput: React.FC<IADBInput> = memo(({ number,index,id,style,value,min,max,step,isEditable,onChange,onKeyUp,onKeyDown,onBlur,onFocus,isAnimationEnable,cmdTarget,cmdGetStr,cmdSetStr},ref) => {
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

const [mTextValue,setTextValue] = useState<number>(value);

const inputRef = useRef();


useEffect(() => {
  setTextValue(value);
}, [value])


const thisOnChange = (e: React.FormEvent<HTMLInputElement>,i:number) => {
  e.preventDefault();
  var lmtVal = e.target.value.replace(/[^\?\d.]/g,'');
  setTextValue(Math.max(min?min:0,Math.min(max?max:4000,lmtVal)))

  onChange(e,i,Math.max(min?min:0,Math.min(max?max:4000,lmtVal)));
}   

const thisOnKeyUp = (e: React.FormEvent<HTMLInputElement>,i:number) => {
  // PressEnter
  if(e.keyCode ===13){
    e.preventDefault();
    thisOnBlur(e);
    if(inputRef && inputRef.current) inputRef.current.blur();
    onKeyUp(e,i,Math.max(min?min:0,Math.min(max?max:4000,e.target.value)));
  }
}
  return (
          <Input
          id={id}
          type="text" 
          style={style}
          value={mTextValue} 
          ref = {inputRef}
          min={min} 
          max={max} 
          step={step} 
          isEditable={isEditable}
          // onChange={onChange}
          // onKeyUp={onKeyUp}
          highlight={textShouldHighlight}
          focus={textIsOnFocus}
          isAnimationEnable={isAnimationEnable}
          // onChange={(e)=>{onBlur?onBlur(e):'';thisOnFocus(e,index);thisOnChange(e,index)}}
          // onKeyUp={(e)=>{onBlur?onBlur(e):'';thisOnKeyUp(e,index)}}
          onChange={(e)=>{thisOnFocus(e);thisOnChange(e,index)}}
          onKeyUp={(e)=>{thisOnKeyUp(e,index)}}
          onKeyDown={onKeyDown}
          onBlur={(e)=>{onBlur?onBlur(e):'';thisOnBlur(e)}}
          onFocus={(e)=>{onFocus?onFocus(e):'';thisOnFocus(e)}}
          onMouseOver={(e)=>{onMouseHover()}}
          onMouseEnter={(e)=>{onMouseHover()}}
          onMouseLeave={(e)=>{onMouseLeave()}}
          />    
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
  //margin-left:8px;
  width: 28px;
  text-align: center;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
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
  
`;


export default ADBNumberInput
