import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import styled from '@emotion/styled';


const Green: React.FC = memo(({children}) => {
  const [colorMode, setColorMode] = useColorMode()


  return (
    <Span>{children}</Span> 
    );
})

const Span = styled.p`
  color:${p=>p.theme.colors.primary}; //green
  display: inline-block;
  word-break: break-all;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`
export default Green
