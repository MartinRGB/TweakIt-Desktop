import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';
import styled from '@emotion/styled';


const Grey: React.FC = memo(({children}) => {
  const [colorMode, setColorMode] = useColorMode()


  return (
    <Span>{children}</Span> 
    );
})

const Span =styled.p`
  color:#9D9DB2; //grey
  display: inline-block;
  line-height:10px;
  font-size: 10px;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`

export default Grey
