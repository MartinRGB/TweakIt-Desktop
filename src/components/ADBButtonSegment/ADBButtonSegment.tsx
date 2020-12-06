import React,{memo,useContext,useState} from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBSegment } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';

import {execCMD,execCMDPromise,simpleRunCMD} from '@Helpers/ADBCommand/ADBCommand'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import Icons from '@Assets/icons'
import ADBButtonToggle from '@Components/ADBButtonToggle'


const ADBButtonSegment: React.FC<IADBSegment> = memo(({ style,children , onClick,onMouseDown,onMouseUp,buttonCSS,cmdTriggerAnim,cmdArray,iconArray,active,onSegementClickIndex}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,setADBInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(CodeBlockStateContext,);
  const [isScaleUp,SetIsScaleUp] = useState<boolean>(false);
  const [currentActiveADBItem,setCurrentActiveADBItem] = useState<string>(active)

  const {stateWatcher} = useSpring({
    stateWatcher: (cmdArray.includes(adbInputCMD) && canTriggerControlAnim && codeBlockIsShow) ? 0: 1,
    config:animationConfig.adb_trigger_animtion,
    onRest: () =>{
     if((cmdArray.includes(adbInputCMD) && canTriggerControlAnim && codeBlockIsShow)){
       console.log(adbInputCMD)
        setCurrentActiveADBItem(adbInputCMD)
     }
    }
 })

  const dealADBCommand = (cmd:any) =>{
    simpleRunCMD(cmd,codeBlockIsShow)
  }

  var SegmentIcon;
  return (
  <Container
    css={buttonCSS}
    style={
      {...style,}
    }>
    {
      iconArray.map(function (data:any,index:number) {
        SegmentIcon = Icons[(iconArray[index].replace(/\s/g, "")!)];
        return (
          <ADBButtonToggle
            key={index}
            style={{
              border:`none`,
            }}
            cmdTriggerAnim={
              ((adbInputCMD === cmdArray[index]) && canTriggerControlAnim && codeBlockIsShow)
            }
            cmd={cmdArray[index]}
            onClick={()=>{
              dealADBCommand(cmdArray[index])
              setCurrentActiveADBItem(cmdArray[index])
              onSegementClickIndex(index,iconArray[index],cmdArray[index])
            }}
            buttonCSS = {
              css`
                > button{
                  height:20px;
                  border-radius:0px;
                }
              `
            }
            active = {currentActiveADBItem === cmdArray[index]}
            >
              <SegmentIcon></SegmentIcon>
          </ADBButtonToggle>
        )
      })
    }
  </Container>);

})

{/* <ADBButtonToggle
cmdTriggerAnim={
  ((adbInputCMD === adbConfig.adb_test) && canTriggerControlAnim && codeBlockIsShow)
}
cmd={adbConfig.adb_test}
buttonCSS = {
  css`
    > button{
      height:20px;
      border-radius:0px;
    }
  `
}
onClick={postMessageToDevice}
// onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
// onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
>
  <Icons.USB></Icons.USB>
</ADBButtonToggle>
<ADBButtonToggle
cmdTriggerAnim={
  ((adbInputCMD === adbConfig.adb_test) && canTriggerControlAnim && codeBlockIsShow)
}
cmd={adbConfig.adb_test}
buttonCSS = {
  css`
    margin-right:12px;
    > button{
      height:20px;
      border-radius:0px;
    }
  `
}
onClick={postMessageToDevice}
// onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
// onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
>
  <Icons.Wifi></Icons.Wifi>
</ADBButtonToggle> */}

const Container = styled.div`
display: inline-flex;
flex-direction: row;

border-radius: 4px;
overflow:hidden;
border: 1px solid ${p => p.theme.colors.menu_border}
`

export default ADBButtonSegment