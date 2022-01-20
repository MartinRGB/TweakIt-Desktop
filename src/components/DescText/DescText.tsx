import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IDescText } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const DescText: React.FC<IDescText> = memo(({ style,children}) => {
  const [colorMode, setColorMode] = useColorMode()

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

  return (
    <Text isAnimationEnable={isGlobalAnimEnable} style={style} ><Trans>{children}</Trans></Text>);
})

const Text  = styled.span<{
  isEditable:boolean
  isAnimationEnable:boolean;
}>`
  font-family: ${props => props.theme.fonts.normalText};
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  align-items: center;
  color:${props => props.theme.colors.text};
  transition:${p=>p.isAnimationEnable?'color 0.3s':'none'};
  opacity:0.5;
  text-align: left;
  display: inline-block;
  user-select: none;
`;


export default DescText
