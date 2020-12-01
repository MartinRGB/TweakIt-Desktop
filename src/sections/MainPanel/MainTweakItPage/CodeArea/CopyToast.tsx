import React ,{memo,useContext, useEffect,useState,forwardRef, useRef, useImperativeHandle } from 'react';

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
import DataDrivenAnimator from '@Components/Animator/DataDrivenAnimator'
import Icons from '@Assets/icons'

const CopyToast = memo(forwardRef((props,ref) =>{


  const [cssAnimationProgress,setCSSAnimationProgress] = useState<number>(0)


  var solver:any;
  var animation:any;

  const startAnimate = () => {

    //if(startAnimator && startAnimator.isAnimating())(startAnimator.stop())
    if(animation && endAnimator.animation())(animation.stop())

    solver = new Solver.Android.Spring(400,0.78,0);
    animation = new DataDrivenAnimator(solver.getValueArray())
    animation.setFromToDuration(0,1,solver.duration*1000)
    animation.setOnFrameCallback(()=>{
      setCSSAnimationProgress(animation.getValueProgress())
    })
    animation.start();

  }

  const endAnimate = () =>{

    if(animation && animation.isAnimating())(animation.stop())

    if(animation === undefined){
      solver = new Solver.Android.Spring(400,0.78,0);
      animation = new DataDrivenAnimator(solver.getValueArray())
    }
    animation.setFromToDuration(1,0,solver.duration*1000)
    animation.setOnFrameCallback(()=>{
      setCSSAnimationProgress(animation.getValueProgress())
    })
    animation.start()
  }

  useImperativeHandle(ref, () => ({

    startAnimation(boo:boolean) {
      if(boo){
        startAnimate()
      }
      else{
        endAnimate()
      }
    }
  }));


  return (
      <ToastDiv
      style={{            
        top:`${cssAnimationProgress*(-15)+30}px`,
        opacity: `${cssAnimationProgress*1.}`}}
      >
      <ToastArrow></ToastArrow>
      <Icons.Done style={{marginRight:`3px`,}}></Icons.Done>
      <p>copied</p>
    </ToastDiv>
  )
}))

export default CopyToast



const ToastArrow = styled.div`
    width: 5px;
    height: 5px;
    background: ${p => p.theme.colors.toast_background_bottom};
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate3d(-50%,-50%, 0px) rotate(45deg);
    z-index: -10;
`

const ToastDiv = styled.div`
    position: absolute;
    top: 15px;
    z-index: 2;
    width: 52px;
    text-align: center;
    left: 100px;
    background: linear-gradient(180deg,${p => p.theme.colors.toast_background_top} 0%,${p => p.theme.colors.toast_background_bottom} 100%);
    color: ${p => p.theme.colors.background};
    padding: 2px 4px;
    border-radius: 4px;
    text-align: center;
    font-family: ${p => p.theme.fonts.numberInput};
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 15px;
    display: flex;
    flex-direction: row;
    width: 61px;
    left:37px;
    box-shadow: 0px 1px 6px ${p => p.theme.colors.text_input_text};
    > svg{
      fill:${p => p.theme.colors.background};
    }

`