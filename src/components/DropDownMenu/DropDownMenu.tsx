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


const DropDownMenu: React.FC<IDropDownMenu> = memo(({onClick,onClickIndex,menuStyle,style,optionsData,menuWidth,isRichAnimation}) => {

  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [selectedText,setSelectedText] = useState<string>('select...')
  const [selectIndex,setSelectIndex] = useState<number>(-1)
  const [selectExpand,setSelectExpand] = useState<boolean>(false)
  
  const [selectAnimationProgress,setSelectAnimationProgress] = useState<number>(0)
  const [selectExpandAnimate,setSelectExpandAnimate] = useState<boolean>(false)
  const [opacityTransitionIn,setOpacityTransitionIn] = useState<boolean>(false)


  const menuPadding = 6;
  const menuListNum = optionsData.length;
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
    <CustomSelect
      onClick={(e:any)=>{onClickSelect(e)}}
    >
      <CustomSelectedSpan>{selectedText}</CustomSelectedSpan>
      <Icons.SelectArrow></Icons.SelectArrow>
    </CustomSelect>

    {
      selectExpand?
      <DropDownMenuConatiner
      style={{
        ...menuStyle,
        height: `${Math.max(0,(selectIndex === -1 || !isRichAnimation)?
                              (0 + selectAnimationProgress*(menuPadding*2+menuListNum*listHeight - 0))
                              :
                              (20 + selectAnimationProgress*(menuPadding*2+menuListNum*listHeight - 20))  )}px`,
        padding: `${menuPadding*selectAnimationProgress}px 0px`,
        borderWidth: `${selectAnimationProgress}px`,
        transform:`${isRichAnimation?`translate3d(0px,${(selectIndex === -1)?0:selectAnimationProgress*21 -21}px,0px)`:''}`

      }}
      >
        <DropDownBackground
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
                style={{
                  display:`${selectExpand?'block':'none'}`,
                  height:`${listHeight}px`
                }}
                key={index}
                onClick = {()=>{
                  onClickIndex(index,data.value);
                  onClickList(index,data.value)}}
                >
                  <DropDownListBackground>
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
})


const DropDownMenuConatiner = styled.div`
  position:absolute;
  top: 20px;
  left: -1px;
  height:0px;
  border: 1px solid ${p => p.theme.colors.menu_border};
  border-radius:4px;
  overflow:hidden;
  //width:240px;
  //transition:all 0.3s;
  
`

const DropDownBackground = styled.div`
  width:100%;
  height:100%;
  background:${p => p.theme.colors.normal_button_bg};
  backdrop-filter:blur(3px);
  position: absolute;
  top: 0px;
`

const DropDownListContainer = styled.div<{
}>`
  width:300px;
  margin-left: 0px;
  margin-right: 0px;
  position: relative;
  z-index:0;
  cursor:pointer;
  //transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;
  
  // &:hover > div{
  //   background:${p => p.theme.colors.primary};
  // }

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

const DropDownListSpan = styled.span`
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
    height: 20px;
    //width: 240px;
    // min-width:240px;
    position: relative;
    border: 1px solid ${p => p.theme.colors.menu_border};
    border-radius: 4px;
    margin-right: 32px;
    background: ${p => p.theme.colors.normal_button_bg};
`
const CustomSelect = styled.button`
    height: 100%;
    width: 100%;
    position: absolute;
    background: transparent;
    transition:all 0.15s;
    cursor:pointer;
    outline:none;
    border:none;

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
      background: #a4a7a480;
      opacity:0.5;
    }
`

const CustomSelectedSpan = styled.span`
  color:${p => p.theme.colors.text};
  font-family: ${p => p.theme.fonts.headText};
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

export default DropDownMenu