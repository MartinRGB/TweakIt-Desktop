import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IDescText } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

const DescText: React.FC<IDescText> = memo(({ style,children}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

  return (
    <Text style={style} ><Trans>{children}</Trans></Text>);
})

const Text  = styled.span<{
  isEditable:boolean
}>`
  font-family: ${props => props.theme.fonts.normalText};
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  align-items: center;
  color:${props => props.theme.colors.text};
  opacity:0.5;
  text-align: left;
  display: inline-block;
  user-select: none;
`;


export default DescText
