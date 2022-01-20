import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IInput } from "@Types";
import { useTranslation, Trans, Translation } from 'react-i18next'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
export interface IADBInfo{
  childen:any;
  isClickable:boolean;
  height:number;
}

const ADBInfo: React.FC<IADBInfo> = memo(({height,isClickable,children}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  return (<Info 
    isAnimationEnable={isGlobalAnimEnable}
    isClickable={isClickable}
    height={height} >
      {children}
  </Info>)
  ;
})

const Info = styled.span<{
  isAnimationEnable:boolean;
  height:number;
  isClickable:boolean;
}>`
font-family: ${props => props.theme.fonts.numberInput};
font-style: normal;
font-weight: 300;
font-size: 10px;
opacity:${p => (p.isClickable ?'0.7':'0.3')};
line-height: ${p=>p.height}px;
color:${p => p.theme.colors.text};
transition:${p=>p.isAnimationEnable?'all 0.25s':''};
user-select:none;
position: absolute;
right:0px;
top:0px;
`


export default ADBInfo
