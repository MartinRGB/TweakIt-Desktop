import React ,{ memo,useContext, useEffect} from 'react';


import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import ListArea from './ListArea'
import CanvasArea from './CanvasArea'
import PreviewArea from './PreviewArea';
import SelectArea from './SelectArea';
import CodeArea from './CodeArea';
import ListSelectStateProvider from '@Context/ListSelectStateContext'
import AnimatorTypeProvider from '@Context/AnimatorTypeContext'
import GraphUpdateProvider from '@Context/GraphUpdateContext'
import DurationDataProvider from '@Context/DurationDataContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

import  TweakItConnectionContextProvider from '@Context/TweakItConnectionContext';

const MainTweakItPage: React.FC = memo(({children}) => {

  //const { t, i18n } = useTranslation()
  //const [colorMode] = useColorMode();
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  return (
    <Container>
      <AnimatorTypeProvider>

        <ListSelectStateProvider>
          <GraphUpdateProvider>
          <TweakItConnectionContextProvider>
          <SelectArea></SelectArea>
          <TopContainer isAnimationEnable={isGlobalAnimEnable}>
            <ListArea></ListArea>
            <DurationDataProvider>
              <CanvasArea></CanvasArea>
              <PreviewArea></PreviewArea>
            </DurationDataProvider>
          </TopContainer>
          </TweakItConnectionContextProvider>
          <CodeArea></CodeArea>
          </GraphUpdateProvider>
        </ListSelectStateProvider>
      </AnimatorTypeProvider>
    </Container>
  )
})

export default MainTweakItPage

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`

const TopContainer = styled.div<{
  isAnimationEnable:boolean;
}>`
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow:hidden;
    //flex:7;
    //min-height:528px;
    background:${p => p.theme.colors.main_top_bg};
    transition:${p=>p.isAnimationEnable?'background 0.3s':'none'};
`
