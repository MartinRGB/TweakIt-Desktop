import React ,{ useContext, useEffect, useState} from 'react';
import { useSpring, animated, interpolate } from 'react-spring'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {ListSelectStateContext} from '@Context/ListSelectContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import InputTree from './InputTree'

import animationConfig from '@Config/animation.json'
import Solver from '@Components/Solver';
import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTransitionTemplate_100,} from './SVGUtil'

const CanvasArea: React.FC = ({children}) => {
  
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();
  const { currentAnimationItem, selectAnimationItem} = useContext(
    ListSelectStateContext
  );

  const currentAnimationName = currentAnimationItem.split("_").pop();

  const { currentAnimName, currentAnimCalculator, currentAnimData} = useContext(
    AnimatorTypeContext
  );

  // DataUtil
  const svgPointNumber = 200;
  const svgScale = 3;
  const svgWidth:number = 800;
  const svgHeight:number = 800;

  Solver.setCalculatorSamplePointNumber(svgPointNumber)
  Solver.setCalculatorSampleScale(svgScale)

  const calc = new Solver.HorizontalLineCalculator;
  // need new arr
  //var calc2 = new Solver.FramerDHOSpring(50,2,1,0);
  var calc2 = new Solver.EaseInOut;

  var newSVGData = SVGTemplate(calc2.getStepArray(),calc2.getValueArray(),svgWidth,svgHeight,1.);
  const [isTriggered,setIsTriggered] = useState<boolean>(true);


  const { revealProgress } = useSpring({
    from:{revealProgress:0},
    to:{revealProgress:isTriggered?1:0},
    config: animationConfig.graph_trasition,
    onFrame: () => {
      var progress:number = revealProgress.value.toFixed(2);
      newSVGData = SVGTransitionTemplate(calc.getStepArray(),calc.getValueArray(),calc2.getStepArray(),calc2.getValueArray(),svgWidth,svgHeight,progress);
      document.getElementById('pathEl').setAttribute('d', newSVGData);
    },
    onRest: () => {
      setIsTriggered(false)
    }
  })

  // //M0 0C280 50 320 50 420 420
  const triggerChange = () =>{
    setIsTriggered(true)
  }

  //calc2 = new Solver.AndroidSpring(1500,0.5,0);
  // calc2 = new Solver.CustomFunctionInterpolator(
  //   (x:number)=>{
  //         return 0.5;
  //   }

  // )
  //newSVGData = SVGTemplate(calc2.getStepArray(),calc2.getValueArray(),svgWidth,svgHeight,1.);
  const triggerSlide = (e:any) =>{
    newSVGData = SVGTemplate(new Solver.AndroidSpring(1500,e.target.value,0).getStepArray(),new Solver.AndroidSpring(1500,e.target.value,0).getValueArray(),svgWidth,svgHeight,e.target.value);
    console.log(e.target.value)
    document.getElementById('pathEl').setAttribute('d', newSVGData);
  }




  return (
    <Container>

      <svg 
        width={svgWidth} 
        height={svgHeight} 
        key={'svg_test'} 
        viewBox ={`0 0 ${svgWidth} ${svgHeight}`}
        style={
        {
        }
      }>
        <SVGPathG
          style={{
            transform:`translate(0,${svgHeight}px) scale(0.25,-0.25)`
          }}
        >
        <path id="pathEl"
          fill="none" 
          strokeWidth="16" 
          strokeLinecap="round"
          strokeLinejoin="round"
          d={newSVGData}/>
      </SVGPathG>
      </svg>

      <button onClick={triggerChange}></button>
        <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          defaultValue="0.15"
          onChange={e => triggerSlide(e)}
        />
      
      <AnimationTitle><Trans>{currentAnimName}</Trans></AnimationTitle>
      {
          Object.entries(currentAnimData).map(function (data:any,index:number) {
            return (
              <InputTree 
                  name={data[0]}
                  defaultVal={data[1].default}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName+index}
                >
              </InputTree>
            )
          })
      }
    </Container>
  )
}

export default CanvasArea


const SVGPathG = styled.g`
  position: relative;
  stroke:${p => p.theme.colors.primary};
`


const AnimationTitle = styled.p`
  text-align:center;
  opacity:0.5;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  padding-top:24px;
  color:${p => p.theme.colors.text};
`

const Container = styled.div`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    flex:2;
    min-width:250px;
    z-index:1;
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`
