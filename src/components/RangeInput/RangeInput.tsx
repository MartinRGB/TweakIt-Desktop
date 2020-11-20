import React, { useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const RangeInput: React.FC<IInput> = ({  style,value,min,max,step,onChange}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

  return (<Input
    type="range" 
    style={style}
    value={value} 
    min={min} 
    max={max} 
    step={step} 
    onChange={onChange}
  />)
  ;
}

const Input = styled.input`
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
      background: ${props => props.theme.colors.text_input_bg};;
      height: 2px;
      cursor: pointer;
      
    }

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      height:16px;
      width:16px;
      background:${props => props.theme.colors.range_input_thumb};
      cursor: pointer;
      border-radius: 2px;
      box-shadow: 0px 0px 3px ${props => props.theme.colors.text_input_text};
      margin-top: -7px;
      transition:all 0.2s;
    }

    ::-webkit-slider-thumb:hover {
      background:${props => props.theme.colors.range_input_thumb_active};
    }

`;


export default RangeInput
