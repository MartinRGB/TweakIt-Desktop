import React, { useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { ISVG } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import Solver from '@Components/Solver';
//import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';

import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTransitionTemplate_100} from '@Components/SVGGraph/SVGUtil'

const SVGGraph: React.FC<ISVG> = ({ pathStyle,svgStyle,svgWidth,svgHeight,svgScale,svgStrokeWidth,svgPointScale,svgPointNumber,svgCalculator,svgAnimName,svgSolverData}) => {

  Solver.setCalculatorSamplePointNumber(svgPointNumber?svgPointNumber:200)
  Solver.setCalculatorSampleScale(svgPointScale?svgPointScale:3)
  const realSVGScale = svgScale;

  // const { currentAnimName, currentAnimCalculator, currentAnimData,currentSolverData} = useContext(
  //   AnimatorTypeContext
  // );

  return (<CustomSVG 
            width={svgWidth} 
            height={svgHeight} 
            style={svgStyle}
            viewBox ={`0 0 ${svgWidth} ${svgHeight}`}>
            <CustomPathG
              style={{
                ...pathStyle,
                transform:`translate(${svgWidth/2 - svgWidth/2*svgScale}px,${svgHeight - (svgHeight/2- svgHeight/2*svgScale)}px) scale(${svgScale},-${svgScale})`,
                strokeWidth:`${svgStrokeWidth}`,
              }}
            >
              <CustomPath 
                d={SVGTemplate(
                  Solver.CreateSolverByString(svgCalculator,svgAnimName,svgSolverData).getStepArray(),
                  Solver.CreateSolverByString(svgCalculator,svgAnimName,svgSolverData).getValueArray(),
                  svgWidth,svgHeight,
                  1.)}/>
            </CustomPathG>
        </CustomSVG>)
  ;
}

const CustomSVG = styled.svg`
width: 400px;
height: 400px;
position: absolute;

/* bottom: 50%; */
left: 50%;
transform: translate3d(-50%, 50%, 0px);

`

const CustomPathG = styled.g`
  position: relative;
  stroke:${p => p.theme.colors.primary};
  stroke-linecap:round;
  stroke-linejoin:round;
  fill:none;
`

const CustomPath = styled.path`
`

export default SVGGraph
