import React, {memo,useContext, useEffect,useState,useRef,forwardRef,useImperativeHandle}from 'react'
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


const DropDownMenuSimple: React.FC<IDropDownMenu> = (forwardRef(({onClick,onClickIndex,menuStyle,style,optionsData,menuWidth}, ref) => {

  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [selectedText,setSelectedText] = useState<string>('')
  const [selectIndex,setSelectIndex] = useState<number>(-1)
  const [selectExpand,setSelectExpand] = useState<boolean>(false)
  
  const [selectAnimationProgress,setSelectAnimationProgress] = useState<number>(0)
  const [selectExpandAnimate,setSelectExpandAnimate] = useState<boolean>(false)
  const [opacityTransitionIn,setOpacityTransitionIn] = useState<boolean>(false)


  const menuPadding = 6;
  const menuListNum = optionsData.length;
  const listHeight = 20;

  useImperativeHandle(ref, () => ({

    clickExpandSelect(e:any) {
      onClickSelect(e)
    },
    selectText(){
      return selectedText;
    }

  }));

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
      console.log('here')
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

    setSelectIndex(index)
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
  <CustomSelectWrapper style={{...style,width:`${menuWidth}`,minWidth:`${menuWidth}`}}>

    {
      selectExpand?
      <DropDownMenuConatiner
      isAnimationEnable={isGlobalAnimEnable}
      style={{
        ...menuStyle,
        height: `${Math.max(0,(0 + selectAnimationProgress*(menuPadding*2+menuListNum*listHeight - 0)))}px`,
        padding: `${menuPadding*selectAnimationProgress}px 0px`,
        borderWidth: `${selectAnimationProgress}px`,

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
                  onClickIndex(index,data.value);
                  onClickList(index,data.value)}}
                >
                  <DropDownListBackground
                    style={{
                    }}
                    >
                    <Icons.CheckMark style={{
                      position: `absolute`,
                      top: `4px`,
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
                    >{data.value}</DropDownListSpan> 
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
}))


const DropDownMenuConatiner = styled.div<{
  isAnimationEnable:boolean;
}>`
  position:absolute;
  top: 20px;
  left: -1px;
  height:0px;
  border: 1px solid;
  border-color:${p => p.theme.colors.menu_border};
  transition:${p=>p.isAnimationEnable?'border-color 0.3s':'none'};
  border-radius:4px;
  overflow:hidden;
  //width:240px;
  //transition:all 0.3s;
  
`

const DropDownBackground = styled.div<{
  isAnimationEnable:boolean;
}>`
  width:100%;
  height:100%;
  background:${p => p.theme.colors.normal_button_bg};
  transition:${p=>p.isAnimationEnable?'background 0.3s':'none'};
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
    transition:${p=>p.isAnimationEnable?'fill 0.3s':'none'};
  }
`

const DropDownTransitionDiv = styled.div`
`

const DropDownListBackground = styled.div`
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

const CustomSelectWrapper = styled.div`
    position: absolute;
    top:6px;
    right:-1px;
    z-index:1;
`


export default DropDownMenuSimple
