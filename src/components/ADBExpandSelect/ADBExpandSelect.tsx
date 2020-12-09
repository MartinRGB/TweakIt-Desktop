import React,{memo,useContext,useState,useRef} from 'react'
import { useColorMode,jsx} from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IADBExpandSelect } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';

import {CodeBlockStateContext} from '@Context/CodeBlockContext'

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import Icons from '@Assets/icons'
import ADBButtonNormal from '@Components/ADBButtonNormal'
import DropDownMenuSimple from '@Components/DropDownMenuSimple'

const ADBExpandSelect: React.FC<IADBExpandSelect> = memo(({ style,children , onClick,onMouseDown,onMouseUp,conatinerCSS,cmdTriggerAnim,cmdStr,iconStr,onADBExpandSelect,enable,optionsData,onMenuClickIndex,menuSelectIndex}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow,adbInputCMD,setADBInputCMD,canTriggerControlAnim,setTriggerControlAnim} = useContext(CodeBlockStateContext,);


  var ExpandSelectIcon;
  ExpandSelectIcon = Icons[(iconStr.replace(/\s/g, "")!)];

  const dropdownRef = useRef();

  const [currentScreen,setCurrentScreen] = useState<string>('-');
  const [selectIndex,setSelectIndex] = useState<number>(menuSelectIndex);

  return (
  <Container
    css={conatinerCSS}
    style={
      {...style,
        cursor:`${enable?'':'not-allowed'}`,
        opacity:`${enable?'':'0.5'}`,
      }
    }>
    <ClipContainer isDeviceEnable={enable} isAnimationEnable={isGlobalAnimEnable}>
    <LeftSide>
      <ADBButtonNormal 
        onClick={()=>{onClick?onClick():''}}
        enable={enable}
        cmdTriggerAnim={
          ((adbInputCMD === cmdStr) && canTriggerControlAnim && codeBlockIsShow)
        }
        cmd={cmdStr} //+currentScreen
        buttonCSS = {
          css`
            
            > button{
              height:22px;  
              border-radius:0px;
              top:-1px;
            }
            >button >svg{
              left: -2px;
              top:2px;
            }
            >button >span{
              width:14px;
              top:-1px;
              line-height:22px;
              width: 14px;
              font-size:9px;
              text-align: center;
              font-weight: 600;
            }
          `
        }
        parentStyle={{
          transform:'none',
        }}
        >
        <ExpandSelectIcon></ExpandSelectIcon>
        <NumContainer>{'#'+(menuSelectIndex+1)}</NumContainer>
      </ADBButtonNormal>
    </LeftSide>
    <Divide isDeviceEnable={enable} isAnimationEnable={isGlobalAnimEnable}></Divide>
    <ADBButtonNormal 
        enable={enable}
        buttonCSS = {
          css`
            > button{
              height:22px;  
              width:16px;
              border-radius:0px;
              >svg{
                position: absolute;
                top: 2px;
                left: -1px;
              }
            }
          `
        }
        parentStyle={{
          transform:'none',
        }}
        onClick={(e)=>{
          //onClick()
          dropdownRef.current.clickExpandSelect(e)
        }}
        >
        <Icons.DownSelect></Icons.DownSelect>
      </ADBButtonNormal>
      </ClipContainer>

      {enable?
      <DropDownMenuSimple 
        ref={dropdownRef} 
        prefix={iconStr}
        onClickIndex ={(i,val)=>{ 
          setSelectIndex(i)
          onMenuClickIndex(i,val)
        }} 
        selectIndex ={menuSelectIndex}
        menuStyle={{left:`-1px`,width:`300px`}} 
        optionsData={optionsData} 
        menuWidth={`300px`}>
      </DropDownMenuSimple>
      :
      ''}
  </Container>);

})

const Divide = styled.div<{
  isAnimationEnable:boolean;
  isDeviceEnable:boolean;
}>`
height:22px;
width:1px;
isDeviceEnable:boolean;
background:${p => p.isDeviceEnable?p.theme.colors.menu_border:p.theme.colors.menu_border_half_alpha};
transition:${p=>p.isAnimationEnable?'background 0.3s':'none'};
`


const Container = styled.div`
height: 22px;
position:relative;
`
const ClipContainer = styled.div<{
  isAnimationEnable:boolean;
  isDeviceEnable:boolean;
}>`
display: inline-flex;
flex-direction: row;
height:22px;
border-radius: 4px;
position:relative;
border: 1px solid;
border-color:${p => p.isDeviceEnable?p.theme.colors.menu_border:p.theme.colors.menu_border_half_alpha};
transition:${p=>p.isAnimationEnable?'border-color 0.3s':'none'};
overflow:hidden;
`

const NumContainer = styled.span`
font-family: ${p => p.theme.fonts.numberInput};
`

const LeftSide = styled.div`

`

export default ADBExpandSelect
