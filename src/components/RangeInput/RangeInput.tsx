import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const RangeInput: React.FC<IInput> = memo(({  style,value,min,max,step,onChange,onBlur,onKeyUp,isEditable,isAnimationEnable}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

 const mIsEditable = isEditable?isEditable:true;
  return (<Input
    type="range" 
    style={style}
    value={value} 
    min={min} 
    max={max} 
    step={step} 
    isEditable={isEditable}
    onChange={onChange}
    onBlur={onBlur}
    onMouseUp={onKeyUp}
    isAnimationEnable={isAnimationEnable}
  />)
  ;
})

const Input = styled.input<{
  isEditable:boolean
  isAnimationEnable:boolean;
}>`
    padding: 0;
    height: 100%;
    margin: 0px;
    flex: 1;
    width: 100%;
    -webkit-appearance: none;
    background:transparent;
    outline:none;
    position: relative;
    display: block;

    ::-webkit-slider-runnable-track {
      height: 16px;
      width: 16px;
      background: ${p => p.isEditable?p.theme.colors.text_input_bg:p.theme.colors.text_input_bg_unactive};
      height: 2px;
      cursor: ${p => p.isEditable?'pointer':'not-allowed'};

      opacity: ${p => p.isEditable?'1':'0.4'}
      transition: ${p => p.isAnimationEnable?'all 0.2s':''};
      
    }

    ::-webkit-slider-runnable-track:hover {
      background: ${p => p.isEditable?p.theme.colors.primary_middle_opacity:''};
    }


    &: active {
      ::-webkit-slider-runnable-track {

        background: ${p => p.isEditable?p.theme.colors.primary_dark_1_opacity:''};
      }
      
    }


    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      height:16px;
      width:16px;
      background:${p => p.isEditable? p.theme.colors.range_input_thumb:p.theme.colors.range_input_thumb_unactive};
      cursor: ${p => p.isEditable?'pointer':'not-allowed'};
      border-radius: 2px;
      box-shadow: ${p => p.isEditable?`0px 0px 3px ${p.theme.colors.text_input_text}`:'none'};
      margin-top: -7px;
      transition: ${p => p.isAnimationEnable?'all 0.2s':''};
    }

    ::-webkit-slider-thumb:hover {
      background:${p => p.isEditable? p.theme.colors.primary_light_1:p.theme.colors.range_input_thumb_unactive};
    }

    ::-webkit-slider-thumb:active {
      background:${p => p.isEditable? p.theme.colors.range_input_thumb_active:''};
      // height:${p => p.isEditable? '20px':''};
      // width:${p => p.isEditable? '20px':''};
      // margin-top: ${p => p.isEditable? '-9px':''};
      transform:${p => p.isEditable? 'scale3d(1.25,1.25,1)':''};

    }

`;


export default RangeInput
