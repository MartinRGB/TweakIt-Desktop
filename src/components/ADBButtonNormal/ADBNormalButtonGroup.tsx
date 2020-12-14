import React, {memo,useContext, useEffect,useState,useRef,createRef}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBNormalButtonGroup } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';
import ADBButtonNormal from './ADBButtonNormal'
import {ADBCommandStateContext}  from '@Context/ADBCommandContext';
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import Icons from '@Assets/icons'

const ADBNormalButtonGroup: React.FC<IADBNormalButtonGroup> = memo(({cmdTriggerAnim,style,enable,isAnimationEnable,cmdTarget,cmdSetStrArray,keywordArray,iconStrArray,isDisableCMDAnim}) => {
  const [colorMode, setColorMode] = useColorMode()

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
    }
    }
  })


  // Icons[(platform.replace(/\s/g, "")!)];
  // animationList.map(function (data:any,index:number) {


const {cmdWithConsole} =  useContext(ADBCommandStateContext)
  return (
    <InputContainer>
    {
      iconStrArray.map(function (data:any,index:number) {
        const CurrentIcon = Icons[(iconStrArray[index].replace(/\s/g, "")!)]; 
        return (
          <ADBButtonNormal
            enable={enable}
            key={index}
            isDisableCMDAnim={isDisableCMDAnim}
            onClick={()=>{}}
            cmdTriggerAnim={
              ((adbInputCMD.includes(keywordArray[index])) && canTriggerControlAnim && codeBlockIsShow)
            }
            cmd={cmdSetStrArray[index].replace(/{target}/g, cmdTarget)}
            buttonCSS = {
              css`
                margin-left:4px;
                > button{
                  height:16px;
                  width:28px;
                }
                > button > svg{
                  position: absolute;
                  top: -1px;
                  height: 16px;
                  width: 16px;
                  left: 5px;
                  left: 5px;
                  transform: scale3d(0.9,0.9,1);
                }
              `
            }
          >
            <CurrentIcon></CurrentIcon>
          </ADBButtonNormal>
        )
      })
    }

    </InputContainer>
  )
})



const InputContainer = styled.div<{
}>`
  position: absolute;
  right: 0px;
  height: 20px;
  top: 2px;
  display: flex;
  flex-direction: row-reverse;
  padding: 2px;
  border-radius:2px;
`

export default ADBNormalButtonGroup
