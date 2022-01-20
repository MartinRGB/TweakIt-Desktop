import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';
import styled from '@emotion/styled';


const Red: React.FC = memo(({children}) => {
  const [colorMode, setColorMode] = useColorMode()


  return (
    <Span>{children}</Span> 
    );
})

const Span =styled.p`
  color:#F50579; //red
  display: inline-block;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`

export default Red
