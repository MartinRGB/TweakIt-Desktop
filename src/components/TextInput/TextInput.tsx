import React, { useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IInput } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const TextInput: React.FC<IInput> = ({  style,value,min,max,step,onChange,onKeyUp,onKeyDown,onBlur,onFocus}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

  return (<Input
    type="text" 
    style={style}
    value={value} 
    min={min} 
    max={max} 
    step={step} 
    onChange={onChange}
    onKeyUp={onKeyUp}
    onKeyDown={onKeyDown}
    onBlur={onBlur}
    onFocus={onFocus}
  />)
  ;
}

const Input = styled.input`
  background: ${props => props.theme.colors.text_input_bg};
  border: 1px solid ${props => props.theme.colors.text_input_border};
  color: ${props => props.theme.colors.text_input_text};
  border-radius: 3px;
  height:100%;
  width: 40px;
  text-align: center;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  outline: none;
`;


export default TextInput
