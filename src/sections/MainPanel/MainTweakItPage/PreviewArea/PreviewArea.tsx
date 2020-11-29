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
import MainButtonNormal from '@Components/MainButtonNormal';
import Solver from '@Components/Solver';
import DataDrivenAnimator from './DataDrivenAnimator'

const PreviewArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  const {selectTransition,durationData,currentSolverData,currentAnimCalculator,currentAnimPlatform,currentAnimName} = useContext(
    AnimatorTypeContext
  );

  const {triggredIndex,bezierTriggeredIndex} = useContext(
    GraphUpdateContext
  );

  const [animProperty,setAnimProerty] = useState<string>('scale')
  // strange bug here
  const [cssAnimationProgress,setCSSAnimationProgress] = useState<number>(0)
  const setScale = () =>{setAnimProerty('scale')}
  const setTrans = () =>{setAnimProerty('translationY')}
  const setRot = () =>{setAnimProerty('rotate')}

  const svgHeight = initState.svgHeight;


  const currSolver:any = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
  const currSolverValueData = currSolver.getValueArray()
  const currDuration = (durationData != -1)?durationData:currSolver.duration;

  var startAnimator:any,endAnimator:any;

  const startAnimate = () => {

    // TODO RESET
    if(startAnimator && startAnimator.isAnimating())(startAnimator.reset())
    if(endAnimator && endAnimator.isAnimating())(endAnimator.reset())

    startAnimator = new DataDrivenAnimator(currSolverValueData);
    startAnimator.setFromToDuration(0,1.,currDuration*1000)
    startAnimator.start();
    startAnimator.setOnFrameCallback(()=>{
      setCSSAnimationProgress(startAnimator.getProgress());
    })
    startAnimator.setOnEndCallback(()=>{
      endAnimator = new DataDrivenAnimator(currSolverValueData);
      endAnimator.setFromToDuration(0,1,currDuration*1000)
      endAnimator.start();
      endAnimator.setOnFrameCallback(()=>{
        setCSSAnimationProgress(1. - endAnimator.getProgress());
      })
      endAnimator.setOnEndCallback(()=>{
      })
    })
  }

  return (
    <Container>
      <PaddingTopBox></PaddingTopBox>
      <BoxContainer
        style={{
          height:`${svgHeight}px`
        }}>
        <Box
          id="box"
          style={{
          
          transform:`${(animProperty === 'rotate')?
                        `rotate(${cssAnimationProgress*360}deg)`
                        :
                        (animProperty === 'scale')?
                          `scale(${1+cssAnimationProgress*0.5})`
                          :
                          `translate3d(0,${cssAnimationProgress*-150}px,0px)`}`,
          
          }}
          
          >

        </Box>
      </BoxContainer>
      <BtnContainer>
        <MainButtonNormal style={{
          cursor:`${(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?'initial':'not-allowed'}`,
          opacity:`${(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?'1':'0.5'}`,
        }} onClick={() =>{setScale();(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?startAnimate():'';}}><Trans>Scale</Trans></MainButtonNormal>
        <MainButtonNormal style={{
          cursor:`${(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?'initial':'not-allowed'}`,
          opacity:`${(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?'1':'0.5'}`,
        }}onClick={() =>{setTrans();(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?startAnimate():'';}}><Trans>Trans</Trans></MainButtonNormal>
        <MainButtonNormal style={{
          cursor:`${(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?'initial':'not-allowed'}`,
          opacity:`${(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?'1':'0.5'}`,
        }} onClick={() =>{setRot();(triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine'))?startAnimate():'';}}><Trans>Rot</Trans></MainButtonNormal>
      </BtnContainer>
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
  height: 16px;
  flex: 1;
`


const Container = styled.div`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
`
