import React ,{ useContext, useEffect,useState,forwardRef, useRef, useImperativeHandle } from 'react';

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

export interface IAnimationBox{
  property:string;
}

const AnimationBox = forwardRef(({...IAnimationBox}, ref) =>{

  const {selectTransition,durationData,currentSolverData,currentAnimCalculator,currentAnimPlatform,currentAnimName} = useContext(
    AnimatorTypeContext
  );

  const [cssAnimationProgress,setCSSAnimationProgress] = useState<number>(0)

  const svgHeight = initState.svgHeight;

  const property = IAnimationBox.property;

  var startAnimator:any,endAnimator:any;
  var currSolver:any,currSolverValueData:any,currDuration:any;

  const startAnimate = () => {

    //if(startAnimator && startAnimator.isAnimating())(startAnimator.stop())
    if(endAnimator && endAnimator.isAnimating())(endAnimator.stop())

    currSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    currSolverValueData = currSolver.getValueArray()
    currDuration = (durationData != -1)?durationData:currSolver.duration;

    // TODO Change to Progress Animation && Reset()
    // if(startAnimator && startAnimator.isAnimating())(startAnimator.reset())

    startAnimator = new DataDrivenAnimator(currSolverValueData);
    startAnimator.setFromToDuration(cssAnimationProgress,1,currDuration*1000)
    startAnimator.start();
    startAnimator.setOnFrameCallback(()=>{
      setCSSAnimationProgress(startAnimator.getValueProgress());
    })
    startAnimator.setOnEndCallback(()=>{
    })

  }

  const endAnimate = () =>{

    if(startAnimator && startAnimator.isAnimating())(startAnimator.stop())

    currSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    currSolverValueData = currSolver.getValueArray()
    currDuration = (durationData != -1)?durationData:currSolver.duration;

    endAnimator = new DataDrivenAnimator(currSolverValueData);
    endAnimator.setFromToDuration(cssAnimationProgress,0,currDuration*1000)
    endAnimator.start();
    endAnimator.setOnFrameCallback(()=>{
      setCSSAnimationProgress(endAnimator.getValueProgress());
    })
    endAnimator.setOnEndCallback(()=>{
    })
  }

  useImperativeHandle(ref, () => ({

    startAnimation(boo:boolean) {
      if(boo){
        startAnimate()
      }
      else{
        console.log('end')
        endAnimate()
      }
    }
  }));


  return (
      <BoxContainer
        style={{
          height:`${svgHeight}px`
        }}>
        <Box
          id="box"
          style={{          
            transform:`${(property === 'rotate')?
                          `rotate(${cssAnimationProgress*360}deg)`
                          :
                          (property === 'scale')?
                            `scale(${1+cssAnimationProgress*0.5})`
                            :
                            `translate3d(0,${cssAnimationProgress*-150}px,0px)`}`,
          
          }}
          
          >

        </Box>
      </BoxContainer>
  )
})

export default AnimationBox



const BoxContainer = styled.div`
  width:100%;
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