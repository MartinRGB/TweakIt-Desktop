import React ,{ useContext, useEffect} from 'react';


import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import ListArea from './ListArea'
import CanvasArea from './CanvasArea'
import PreviewArea from './PreviewArea';
import SelectArea from './SelectArea';
import CodeArea from './CodeArea';
import ListSelectStateProvider from '@Context/ListSelectContext'


const MainTweakItPage: React.FC = ({children}) => {

  const [colorMode] = useColorMode();


  return (
    <Container>
      <ListSelectStateProvider>
        <SelectArea></SelectArea>
        <TopContainer>
          <ListArea></ListArea>
          <CanvasArea></CanvasArea>
          <PreviewArea></PreviewArea>
        </TopContainer>
        <CodeArea></CodeArea>
      </ListSelectStateProvider>
    </Container>
  )
}

export default MainTweakItPage

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const TopContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    //flex:7;
    min-height:300px;
`
