import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';
import styled from '@emotion/styled';

import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const Green: React.FC = memo(({children}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  return (
    <Span isAnimationEnable={isGlobalAnimEnable}>{children}</Span> 
    );
})

const Span = styled.p<{
  isAnimationEnable:boolean;
}>`
  color:${p=>p.theme.colors.primary}; //green
  display: inline-block;

  transition:${p=>p.isAnimationEnable?'color 0.3s':'none'};
  word-break: break-all;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`
export default Green
