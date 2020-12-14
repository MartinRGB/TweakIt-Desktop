import React, {memo,useContext, useEffect,useState,useRef,createRef}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';
import ADBNumberInput from './ADBNumberInput'
import {ADBCommandStateContext}  from '@Context/ADBCommandContext';
import {CodeBlockStateContext} from '@Context/CodeBlockContext'

const ADBNumberInputGroup: React.FC<IADBInput> = memo(({ number,id,style,value,min,max,step,isEditable,onChange,onKeyUp,onKeyDown,onBlur,onFocus,isAnimationEnable,cmdTarget,cmdGetStr,cmdSetStr,cmdDivide,cmdTriggerAnim,isDisableCMDAnim,cmdKeyWord}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })
 const mIsEditable = isEditable?isEditable:true;
const [mTextValue,setTextValue] = useState<string[]>(value);

const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,canTriggerControlAnim,canTriggeBlocAnim,setTriggerControlAnim,setTriggerBlocAnim} = useContext(CodeBlockStateContext);
const {stateWatcher} = useSpring({
  stateWatcher: (cmdTriggerAnim) ? 0: 1,
  config:animationConfig.adb_trigger_animtion,
  onRest: () =>{
   if(cmdTriggerAnim){
     setTriggerControlAnim(false)
   }
  }
})


//const inputRef = value.map((data:any,i:number) => useRef());


useEffect(() => {
  setTextValue(value);
}, [value])

const {cmdWithConsole} =  useContext(ADBCommandStateContext)
  return (
    <InputContainer
      cmdTriggerAnim={cmdTriggerAnim}
      style={{
        transition: `${isAnimationEnable?'background 0.2s':''}`,
      }}
    >
    {value.map(function (data:any,index:number) {
          return (
            <ADBNumberInput
            id={id}
            key={"ADBInput" + index}
            type="text" 
            style={{
              ...style,
              marginRight:`${(index === 0 && value.length > 1)?8:0}px`,
            }}
            value={mTextValue[index] || ''} 
            min={min} 
            max={max} 
            step={step} 
            index={index}
            isEditable={isEditable}
            onChange={(e: React.FormEvent<HTMLInputElement>,index:number,val:any) => {
              console.log(value)
              e.preventDefault();
              var mArray = mTextValue;
              mArray[index] = val;
              setTextValue(mArray);
            }}   
    
            onKeyUp={(e: React.FormEvent<HTMLInputElement>,index:number,val:any) => {
              if(e.keyCode ===13){
                e.preventDefault();
                //if(!isDisableCMDAnim) setTriggerBlocAnim(true)
                var textStr = ``;
                for(var i=0;i<value.length;i++){
                  textStr += (i != value.length-1)?mTextValue[i].toString()+cmdDivide:mTextValue[i].toString();
                }
                // execCMDPromise(cmdSetStr.replace(/{target}/g, cmdTarget) + ' ' + textStr,function(val:any){
                // })

                cmdWithConsole(cmdSetStr.replace(/{target}/g, cmdTarget) + ' ' + textStr)
              }
            }}
            onBlur={(e: React.FormEvent<HTMLInputElement>) => {
              e.preventDefault();
              if(!isDisableCMDAnim) setTriggerBlocAnim(true)
              var textStr = ``;
              for(var i=0;i<value.length;i++){
                textStr += (i != value.length-1)?mTextValue[i].toString()+cmdDivide:mTextValue[i].toString();
              }
              // execCMDPromise(cmdSetStr.replace(/{target}/g, cmdTarget) + ' ' + textStr,function(val:any){
              // })
              cmdWithConsole(cmdSetStr.replace(/{target}/g, cmdTarget) + ' ' + textStr)
            }}
    
            onFocus={(e: React.FormEvent<HTMLInputElement>) => {
              e.preventDefault();
            }}
            isAnimationEnable={isAnimationEnable}
            />
          )

      })
    }
    {value.length === 0?
    <NullPlaceHolder isAnimationEnable={isAnimationEnable}>-</NullPlaceHolder>
    :
    ''
    }
    </InputContainer>
  )
})

const NullPlaceHolder = styled.span<{
  isAnimationEnable?:boolean;
}>`
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 22px;
  color:${p => p.theme.colors.text};
  transition:${p=>p.isAnimationEnable?'all 0.2s':''};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  right: 0px;
  top:0px;
`


const InputContainer = styled.div<{
  cmdTriggerAnim:boolean;
}>`
  background:${p => p.cmdTriggerAnim?p.theme.colors.primary_middle_opacity:''};
  position: absolute;
  right: 0px;
  height: 20px;
  top: 2px;
  display: flex;
  flex-direction: row;
  padding: 2px;
  border-radius:2px;
`

export default ADBNumberInputGroup