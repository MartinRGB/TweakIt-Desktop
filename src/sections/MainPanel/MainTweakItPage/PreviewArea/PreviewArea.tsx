import React ,{ useContext, useEffect,useState} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import initState from '@Config/init_state.json'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import { GraphUpdateContext } from '@Context/GraphUpdateContext';
import MainButtonNormal from '@Components/MainButtonNormal'

const PreviewArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  const {currentSolverData,currentAnimCalculator} = useContext(
    AnimatorTypeContext
  );

  const {setGraphShouldUpdate,triggredIndex,setTriggeredIndex} = useContext(
    GraphUpdateContext
  );

  const [animProperty,setAnimProerty] = useState<string>('scale')

  //console.log(currentSolverData)
  const svgHeight = initState.svgHeight;

  const setScale = () =>{setAnimProerty('scale')}
  const setTrans = () =>{setAnimProerty('translationY')}
  const setRot = () =>{setAnimProerty('rotate')}
  const startAnimate = () => {}

  return (
    <Container>
      <PaddingTopBox></PaddingTopBox>
      <BoxContainer
        style={{
          height:`${svgHeight}px`
        }}>
        <Box></Box>
      </BoxContainer>
      <BtnContainer>
        <MainButtonNormal onClick={setScale}><Trans>Scale</Trans></MainButtonNormal>
        <MainButtonNormal onClick={setTrans}><Trans>Trans</Trans></MainButtonNormal>
        <MainButtonNormal onClick={setRot}><Trans>Rot</Trans></MainButtonNormal>
        
      </BtnContainer>
      <RunContainer>
        <MainButtonNormal onClick={startAnimate}><Trans>Run</Trans></MainButtonNormal>
      </RunContainer>
    </Container>
  )
}

export default PreviewArea


const PaddingTopBox = styled.div`
  width:100%;
  height:45px;
`


const BoxContainer = styled.div`
  width:100%;
  height:345px;
  display:flex;
  align-items:center;
`

const Box = styled.div`
  width:45px;
  height:45px;
  background: linear-gradient(180deg, #77FBAD 0%, #47BBAC 100%);
  opacity: 0.5;
  border-radius: 8px;
  margin: 0 auto;
`

const BtnContainer = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  flex-direction: row;
  padding: 0 28px;
  height: 24px;
`

const RunContainer = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  flex-direction: row;
  padding: 0 28px;
  flex: 1;
}
`


const Container = styled.div`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
`
