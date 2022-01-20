import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';
import styled from '@emotion/styled';


const Orange: React.FC = memo(({children}) => {
  const [colorMode, setColorMode] = useColorMode()


  return (
    <Span>{children}</Span> 
    );
})

const Span = styled.p`
  color:#ff9f0f; //orange
  display: inline-block;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`
export default Orange
