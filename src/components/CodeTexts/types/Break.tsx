import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';
import styled from '@emotion/styled';
import Blue from'@Components/CodeTexts/colors/Blue'

const Break: React.FC = memo(({}) => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <BreakElement/>
    );
})


const BreakElement = styled.br`
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`

export default Break
