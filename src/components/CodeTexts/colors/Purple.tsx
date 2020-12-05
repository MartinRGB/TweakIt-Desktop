import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import styled from '@emotion/styled';


const Purple: React.FC = memo(({children}) => {
  const [colorMode, setColorMode] = useColorMode()


  return (
    <Span>{children}</Span> 
    );
})

const Span = styled.p`
  color:#6e41d1; //purple
  display: inline-block;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`
export default Purple
