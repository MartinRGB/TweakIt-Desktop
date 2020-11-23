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
import AnimatorTypeProvider from '@Context/AnimatorTypeContext'


const MainTweakItPage: React.FC = ({children}) => {

  return (
    <Container>
      <AnimatorTypeProvider>
        <SelectArea></SelectArea>
        <TopContainer>


          <ListSelectStateProvider>
              <ListArea></ListArea>
              <CanvasArea></CanvasArea>
          </ListSelectStateProvider>
          <PreviewArea></PreviewArea>

        </TopContainer>
        <CodeArea></CodeArea>
      </AnimatorTypeProvider>
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
    min-height:350px;
`
