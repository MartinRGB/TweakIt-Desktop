import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IDropDownMenu } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import Icons from '@Assets/icons'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';


const DropDownMenuDevice: React.FC<IDropDownMenu> = memo(({onClick,selectIndex,onClickIndex,menuStyle,style,optionsData,menuWidth,isRichAnimation,enable}) => {

  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [selectedText,setSelectedText] = useState<string>('select...')
  //const [selectIndex,setSelectIndex] = useState<number>(-1)
  const [selectExpand,setSelectExpand] = useState<boolean>(false)
  
  const [selectAnimationProgress,setSelectAnimationProgress] = useState<number>(0)
  const [selectExpandAnimate,setSelectExpandAnimate] = useState<boolean>(false)
  const [opacityTransitionIn,setOpacityTransitionIn] = useState<boolean>(false)

  const menuPadding = 6;
  const listHeight = 20;

  const onClickSelect = (e:any) =>{

    if(onClickListExpandTimeOut){
      clearTimeout(onClickListExpandTimeOut)
    }
    if(onExpandAnimationEndTimeOut){
      clearTimeout(onExpandAnimationEndTimeOut)
    }

    if(!selectExpand){
      isGlobalAnimEnable?setSelectExpandAnimate(true):setSelectAnimationProgress(1)
      setSelectExpand(true)
      setOpacityTransitionIn(true)
    }
    else{
      isGlobalAnimEnable?setSelectExpandAnimate(false):setSelectAnimationProgress(0)
      isGlobalAnimEnable?'':setSelectExpand(false)
      isGlobalAnimEnable?'':setOpacityTransitionIn(false)
    }

  }


  var onClickListExpandTimeOut:any;

  const onClickList = (index:number,value:string) => {

    if(onClickListExpandTimeOut){
      clearTimeout(onClickListExpandTimeOut)
    }
    if(onExpandAnimationEndTimeOut){
      clearTimeout(onExpandAnimationEndTimeOut)
    }

    //setSelectIndex(index)
    setSelectedText(value)

    if(selectExpand){

      if(isGlobalAnimEnable){
        onClickListExpandTimeOut = setTimeout(()=>{
          setSelectExpandAnimate(false)
          clearTimeout(onClickListExpandTimeOut)
        },150)
      }
      else{
        onClickListExpandTimeOut = setTimeout(()=>{
          setSelectAnimationProgress(0);
          setSelectExpand(false)
          setOpacityTransitionIn(false)
          clearTimeout(onClickListExpandTimeOut)
        },200)
      }

    }
  }


  var onExpandAnimationEndTimeOut:any;

  const {listProps} = useSpring({
    listProps: selectExpandAnimate ? 1 : 0,
    config: animationConfig.select_drop_down,
    onStart: () =>{
    },
    onFrame: () =>{
      if(isGlobalAnimEnable) setSelectAnimationProgress(listProps.value);
    },
    onRest: () =>{
      if(!selectExpandAnimate && isGlobalAnimEnable){
        setOpacityTransitionIn(false)
        onExpandAnimationEndTimeOut = setTimeout(()=>{
          setSelectExpand(false)
          clearTimeout(onExpandAnimationEndTimeOut)
        },150)
      }

    }
  })


  return (        
  <CustomSelectWrapper 
  isDeviceEnable={enable} isAnimationEnable={isGlobalAnimEnable} style={{
    ...style,
    width:`${menuWidth}`,
    minWidth:`${menuWidth}`,
    cursor:`${enable?'':'not-allowed'}`,
    opacity:`${enable?'1':'0.2'}`,
  }}>
    <CustomSelect
      onClick={(e:any)=>{onClick();onClickSelect(e)}}
      isExpanded={selectExpand &&(optionsData.length != 0)}
      isAnimationEnable={isGlobalAnimEnable}
      style={{
        pointerEvents:`${enable?'':'none'}`,
        cursor:`${enable?'pointer':''}`,
      }}
    >
      <CustomSelectedSpan isAnimationEnable={isGlobalAnimEnable}>{(selectIndex === -1)?'select...':selectedText}</CustomSelectedSpan>
      <Icons.SelectArrow></Icons.SelectArrow>
    </CustomSelect>

    {
      (selectExpand && optionsData.length!=0)?
      <DropDownMenuConatiner
      isAnimationEnable={isGlobalAnimEnable}
      style={{
        ...menuStyle,
        height: `${Math.max(0,(selectIndex === -1 || !isRichAnimation)?
                              (0 + selectAnimationProgress*(menuPadding*2+optionsData.length*listHeight - 0))
                              :
                              (20 + selectAnimationProgress*(menuPadding*2+optionsData.length*listHeight - 20))  )}px`,
        padding: `${menuPadding*selectAnimationProgress}px 0px`,
        borderWidth: `${selectAnimationProgress}px`,
        transform:`${isRichAnimation?`translate3d(0px,${(selectIndex === -1)?0:selectAnimationProgress*21 -21}px,0px)`:''}`

      }}
      >
        <DropDownBackground
          isAnimationEnable={isGlobalAnimEnable}
          style={{
            opacity:`${opacityTransitionIn?'1':'0'}`,
            transition:`${isGlobalAnimEnable?'all 0.1s':'none'}`
          }}
        ></DropDownBackground>
        <DropDownTransitionDiv
          style={{
            transform:`${(isRichAnimation)?`translate3d(${19*selectAnimationProgress-19}px,${(selectIndex === -1)?0:-selectIndex*listHeight+selectAnimationProgress*(selectIndex*listHeight)}px,0px)`:''}`
          }}
        >
        {
          optionsData.map(function (data:any,index:number) {

            return (
              <DropDownListContainer
                isAnimationEnable={isGlobalAnimEnable}
                style={{
                  display:`${selectExpand?'block':'none'}`,
                  height:`${listHeight}px`
                }}
                key={index}
                onClick = {()=>{
                  onClickIndex(index,data);
                  onClickList(index,data)}}
                >
                  <DropDownListBackground
                    isAnimationEnable={isGlobalAnimEnable}
                    style={{
                    }}
                    >
                    <Icons.CheckMark style={{
                      position: `absolute`,
                      top: `2px`,
                      left: `8px`,
                      transform: `${(selectIndex === index)?`scale3d(1,1,1)`:'scale3d(0,0,0)'}`,
                      opacity: `${(selectIndex === index)?`${selectAnimationProgress}`:'0'}`,
                      transition:`${isGlobalAnimEnable?'all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s':'none'}`
                      }}>
                    </Icons.CheckMark>

                    <DropDownListSpan
                      isAnimationEnable={isGlobalAnimEnable}
                      style={{
                        opacity: `${(selectIndex === index)?'1':''}`,
                        transform: `${(selectIndex === index)?'scale3d(1.2,1.2,1)':''}`,
                        transition:`${isGlobalAnimEnable?'all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s':'none'}`,
                        
                      }}  
                    >{data}</DropDownListSpan> 
                </DropDownListBackground>
              </DropDownListContainer>
            )

          })
        }
        </DropDownTransitionDiv>

      </DropDownMenuConatiner>
      :
      ''
    }

  </CustomSelectWrapper>
  );
})


const DropDownMenuConatiner = styled.div<{
  isAnimationEnable:boolean;
}>`
  position:absolute;
  top: 20px;
  left: -1px;
  height:0px;
  border: 1px solid ;
  border-color:${p => p.theme.colors.menu_border};
  transition:${p=>p.isAnimationEnable?'border-color 0.2s':'none'};
  border-radius:4px;
  overflow:hidden;
  //width:240px;
  //transition:all 0.2s;
  z-index:3;
  
`

const DropDownBackground = styled.div<{
  isAnimationEnable:boolean;
}>`
  width:100%;
  height:100%;
  background:${p => p.theme.colors.normal_button_bg};
  transition:${p=>p.isAnimationEnable?'background 0.2s':'none'};
  backdrop-filter:blur(3px);
  position: absolute;
  top: 0px;
`

const DropDownListContainer = styled.li<{
  isAnimationEnable:boolean;
}>`
  width:300px;
  margin-left: 0px;
  margin-right: 0px;
  position: relative;
  z-index:0;
  cursor:pointer;
  //transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;
  
  > div{
    transition:${p=>p.isAnimationEnable?'background 0.15s':'none'};
  }

  &:hover > div{
    background:${p => p.theme.colors.primary_middle_opacity};
  }

  &:active > div{
    background:${p => p.theme.colors.primary_dark_1_opacity};
  }

  // &:hover > div > svg {
  //   fill:${p => p.theme.colors.background};
  // }

  &:hover > div > span{
    transform:scale3d(1.2,1.2,1);
    opacity:1;
    //color:${p => p.theme.colors.background};
  }

  &:active > div > span{
    transform:scale3d(1,1,1);
    opacity:1;
  }

  > div > svg {
    fill: ${p => p.theme.colors.text};
    transition:${p=>p.isAnimationEnable?'fill 0.2s':'none'};
  }
`

const DropDownTransitionDiv = styled.div`
`

const DropDownListBackground = styled.div<{
  isAnimationEnable:boolean;
}>`
  width:100%;
  height:100%;

  &:hover {
    //background: ${p => p.theme.colors.primary};
    opacity:1;
  }

  &:hover > span {
    //color: ${p => p.theme.colors.background};
    //filter:drop-shadow(2px 4px 6px black);
  }

  &:hover > svg {
    //fill: ${p => p.theme.colors.background};
  }
`

const DropDownListSpan = styled.span<{
  isAnimationEnable:boolean;
}>`
  color:${p => p.theme.colors.text};
  transition:${p=>p.isAnimationEnable?'color 0.2s':'none'};
  font-family: ${p => p.theme.fonts.headText};
  font-size: 10px;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  left: 28px;
  top: 0px;
  user-select:none;
  //transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;
  transform-origin: left center;
  opacity:0.6;
`

const CustomSelectWrapper = styled.div<{
  isAnimationEnable:boolean;
  isDeviceEnable:boolean;
}>`
    height: 20px;
    //width: 240px;
    // min-width:240px;
    position: relative;
    border: 1px solid;
    border-color:${p => p.isDeviceEnable?p.theme.colors.menu_border:p.theme.colors.menu_border_half_alpha};
    transition:${p=>p.isAnimationEnable?'opacity 0.2s,border-color 0.2s,background 0.2s':'none'};
    border-radius: 4px;
    margin-right: 32px;
    background: ${p => p.theme.colors.normal_button_bg};
`
const CustomSelect = styled.button<{
  isExpanded:boolean;
  isAnimationEnable:boolean;
  isEnable:boolean;
}>`
    height: 100%;
    width: 100%;
    position: absolute;
    background: ${p=>p.isExpanded?p.theme.colors.primary_middle_opacity:'transparent'};
    transition:${p=>p.isAnimationEnable?'all 0.15s':'none'};
    //cursor:pointer;
    outline:none;
    border:none;

    &:hover {
      background:${p=>p.isExpanded?'':p.theme.colors.primary_middle_opacity};
    }

    >svg{
      fill: ${p => p.theme.colors.text};
      position: absolute;
      right: 1px;
      top: 1px;
      //transition:all 0.15s;
      z-index:1;
    }

    &:active  > span{
      //color: ${p => p.theme.colors.background};
    }
  
    &:active  > svg{
      //fill: ${p => p.theme.colors.background};
    }

    &:active {
      background: ${p=>p.theme.colors.primary_dark_1_opacity};
      //opacity:0.8;
    }
`

const CustomSelectedSpan = styled.span<{
  isAnimationEnable:boolean;
}>`
  color:${p => p.theme.colors.text};
  font-family: ${p => p.theme.fonts.headText};
  transition:${p=>p.isAnimationEnable?'color 0.2s':'none'};
  font-size: 10px;
  transform:scale3d(1.2,1.2,1);
  transform-origin:left center;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  left: 8px;
  top: -1px;
  user-select:none;
`

export default DropDownMenuDevice
