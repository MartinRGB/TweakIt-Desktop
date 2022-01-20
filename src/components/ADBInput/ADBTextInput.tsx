import React, {memo,useContext, useEffect,useState,useRef,useImperativeHandle,forwardRef}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IADBInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import {ADBCommandStateContext}  from '@Context/ADBCommandContext';
const ADBTextInput: React.FC<IADBInput> = memo(({ number,index,id,style,min,max,step,isEditable,onChange,onKeyUp,onKeyDown,onBlur,onFocus,isAnimationEnable,cmdTarget,cmdGetStr,cmdSetStr,cmdTriggerAnim,isDisableCMDAnim},ref) => {
  const [colorMode, setColorMode] = useColorMode()
  const [textIsOnFocus,setTextIsOnFocus] = useState<boolean>(false);
  const [textShouldHighlight,setTextShouldHighlight] = useState<boolean>(false);

  const {cmdWithConsole} =  useContext(ADBCommandStateContext)
  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

 const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,canTriggeBlocAnim,setTriggerControlAnim,setTriggerBlocAnim} = useContext(CodeBlockStateContext);
const {stateWatcher} = useSpring({
  stateWatcher: (cmdTriggerAnim) ? 0: 1,
  config:animationConfig.adb_trigger_animtion,
  onRest: () =>{
   if(cmdTriggerAnim){
     setTriggerControlAnim(false)
     setTextIsOnFocus(false)
     setTextShouldHighlight(false)
   }
  }
})

const initTextValue = 'input here...'

 const thisOnFocus = (e:any) =>{
   if(mTextValue === initTextValue){setTextValue('')} 
  setTextIsOnFocus(true)
  setTextShouldHighlight(true)
}

const thisOnBlur = (e:any) =>{
  if(mTextValue === ''){setTextValue(initTextValue)} 
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

const [mTextValue,setTextValue] = useState<string>(initTextValue);

const inputRef = useRef();


useEffect(() => {
  if(cmdTriggerAnim){
    setTextIsOnFocus(true)
    setTextShouldHighlight(true)
  }

}, [cmdTriggerAnim])


const thisOnChange = (e: React.FormEvent<HTMLInputElement>,i:number) => {
  e.preventDefault();
  setTextValue(e.target.value)
  //onChange(e,i,e.target.value);
}   

const thisOnKeyUp = (e: React.FormEvent<HTMLInputElement>,i:number) => {
  // PressEnter
  if(e.keyCode ===13){
    e.preventDefault();
    thisOnBlur(e);
    if(inputRef && inputRef.current) inputRef.current.blur();
    if(!isDisableCMDAnim) setTriggerBlocAnim(true)

    cmdWithConsole(cmdSetStr.replace(/{target}/g, cmdTarget)+' '+ e.target.value)
    setTextValue(initTextValue)
    //onKeyUp(e,i,e.target.value);
  }
}
  return (
          <div style={{cursor:`${isEditable?'':'not-allowed'}`}}>
          <Input
          id={id}
          type="text" 
          style={{...style,
            pointerEvents:`${isEditable?'':'none'}`
          }}
          value={mTextValue} 
          ref = {inputRef}
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
  //margin-left:8px;
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

  text-align: left;
  text-indent: 8px;
  
`;


export default ADBTextInput
