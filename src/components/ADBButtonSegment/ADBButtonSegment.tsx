import React,{memo,useContext,useState} from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBSegment } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';
import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import Icons from '@Assets/icons'
import ADBButtonToggle from '@Components/ADBButtonToggle'


const ADBButtonSegment: React.FC<IADBSegment> = memo(({ style,children , onClick,onMouseDown,onMouseUp,conatinerCSS,cmdTriggerAnim,cmdArray,iconArray,active,onSegementClickIndex,enable,disableIndex}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,setADBInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(CodeBlockStateContext,);
  const [isScaleUp,SetIsScaleUp] = useState<boolean>(false);
  const [currentActiveADBItem,setCurrentActiveADBItem] = useState<string>(active)

  
  const {stateWatcher} = useSpring({
    stateWatcher: (cmdArray?cmdArray.includes(adbInputCMD):'' && canTriggerControlAnim && codeBlockIsShow) ? 0: 1,
    config:animationConfig.adb_trigger_animtion,
    onRest: () =>{
     if((cmdArray?cmdArray.includes(adbInputCMD):'' && canTriggerControlAnim && codeBlockIsShow)){
       console.log(adbInputCMD)
        setCurrentActiveADBItem(adbInputCMD)
     }
    }
 })


  var SegmentIcon;
  return (
  <Container
    isAnimationEnable={isGlobalAnimEnable}
    isDeviceEnable={enable}
    css={conatinerCSS}
    style={
      {...style,
       cursor:`${enable?'':'not-allowed'}`,
       opacity:`${enable?'':'0.5'}`,
      }
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
            enable={disableIndex === index?false:enable}
            cmdTriggerAnim={
              (cmdArray?(adbInputCMD === cmdArray[index]):'' && canTriggerControlAnim && codeBlockIsShow)
            }
            cmd={cmdArray?cmdArray[index]:''}
            active = {cmdArray?active === cmdArray[index]:active === iconArray[index]}
            onClick={()=>{
              setCurrentActiveADBItem(cmdArray?cmdArray[index]:iconArray[index])
              onSegementClickIndex(index,iconArray[index],cmdArray?cmdArray[index]:'')
            }}
            buttonCSS = {
              css`
                > button{
                  height:20px;
                  border-radius:0px;
                }
              `
            }
           
            >
              <SegmentIcon></SegmentIcon>
          </ADBButtonToggle>
        )
      })
    }
  </Container>);

})


const Container = styled.div<{
  isAnimationEnable:boolean;
  isDeviceEnable:boolean;
}>`
display: inline-flex;
flex-direction: row;

border-radius: 4px;
overflow:hidden;
border: 1px solid;
border-color:${p => p.isDeviceEnable?p.theme.colors.menu_border:p.theme.colors.menu_border_half_alpha};
transition:${p=>p.isAnimationEnable?'border-color 0.3s':'none'};
`

export default ADBButtonSegment
