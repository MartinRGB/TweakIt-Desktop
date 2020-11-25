import React, { useContext, useEffect,useState,useCallback}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { ISVG } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import { AnimatorTypeContext } from '@Context/AnimatorTypeContext'

import Solver from '@Components/Solver';
import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTransitionTemplate_100} from '@Components/SVGGraph/SVGUtil'
import { GraphUpdateContext } from '@Context/GraphUpdateContext'


const SVGGraph: React.FC<ISVG> = ({ 
  pathStyle,
  svgStyle,
  svgWidth,
  svgHeight,
  svgScale,
  svgStrokeWidth,
  svgPointNumber,
  svgPointScale,
  svgData,
  isError,
  // currentAnimCalculator,
  // currentAnimName,
  // currentSolverData,
  // svgData
  }) => {



  // const {shouldGraphUpdate,setGraphShouldUpdate} = useContext(
  //   GraphUpdateContext
  // );

  // const { currentAnimName, currentAnimCalculator, currentAnimData,currentSolverData} = useContext(
  //   AnimatorTypeContext
  // ); //currentSolverData

  // const {shouldGraphUpdate} = useContext(
  //   GraphUpdateContext
  // );

  // Solver.setCalculatorSamplePointNumber(svgPointNumber?svgPointNumber:200)
  // Solver.setCalculatorSampleScale(svgPointScale?svgPointScale:3)

  const viewBoxWFixed = svgWidth*0.5;
  const viewBoxHFixed = svgHeight*0.5;
  const extendLineScale = 1.25

  //console.log(svgData.includes('NaN'))


  return (<CustomSVG 
            width={svgWidth} 
            height={svgHeight} 
            style={{
              ...svgStyle,
              // width:`${svgWidth}`,
              height:`${svgHeight}`,
            
            }}
            viewBox ={`0 0 ${svgWidth*1 + viewBoxWFixed} ${svgHeight + viewBoxHFixed}`}>

            {/* <CustomBGG
              style={{transform:`translate3d(${viewBoxWFixed/4}px,${svgHeight + (svgHeight/2 - viewBoxHFixed/4)}px,0) scale3d(${svgScale},-${svgScale},1)`,
              opacity:`0.05`,}}>
              <rect x="0" y="0" width={svgWidth/svgScale + viewBoxWFixed} height={svgHeight/svgScale + viewBoxHFixed}/>
            </CustomBGG> */}

            {/* Graph Background */}
            <g
              style={{
                transform:`translate3d(${svgWidth/2 - svgWidth/2*svgScale + viewBoxWFixed/2}px,${svgHeight - (svgHeight/2- svgHeight/2*svgScale) + viewBoxHFixed/2}px,0) scale3d(${svgScale},-${svgScale},1)`,
              }}
            >
              <CustomBGRect 
                isError={isError}
                x="0" 
                y="0" 
                width={svgWidth} 
                height={svgHeight}
                style={{
                  opacity:`0.15`,
                }}
                />

              <CustomBorderline x1={-viewBoxWFixed/4}
                    y1={svgHeight}
                    x2={svgWidth+viewBoxWFixed/4} 
                    y2={svgHeight}   
                    strokeWidth={svgStrokeWidth/2}/>
              <CustomBorderline x1={-viewBoxWFixed/4}
                      y1='0'
                      x2={svgWidth+viewBoxWFixed/4} 
                      y2='0'
                      strokeWidth={svgStrokeWidth/2}/>
              <CustomBorderline x1='0'
                    y1={-viewBoxHFixed/4}
                    x2='0'
                    y2={svgHeight+viewBoxHFixed/4} 
                    strokeWidth={svgStrokeWidth/2}/>
              <CustomBorderline x1={svgWidth}
                    y1={-viewBoxHFixed/4}
                    x2={svgWidth}
                    y2={svgHeight+viewBoxHFixed/4} 
                    strokeWidth={svgStrokeWidth/2}/>
            </g>
            
            <CustomGraphG
              style={{
                ...pathStyle,
                transform:`translate3d(${svgWidth/2 - svgWidth/2*svgScale + viewBoxWFixed/2}px,${svgHeight - (svgHeight/2- svgHeight/2*svgScale) + viewBoxHFixed/2}px,0) scale3d(${svgScale},-${svgScale},1)`,
                strokeWidth:`${svgStrokeWidth}`,
              }}
            >
              <CustomPath 
                // d={SVGTemplate(
                //   Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentSolverData).getStepArray(),
                //   Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentSolverData).getValueArray(),
                //   svgWidth,svgHeight,
                //   1.)}
                d={svgData}
                />
            </CustomGraphG>
        </CustomSVG>)
  ;
}

const CustomSVG = styled.svg`
// width: 400px;
// height: 400px;
// position: absolute;
// left: 50%;
// transform: translate3d(-50%, 50%, 0px);
  margin:12px auto;
  min-height: 160px;
  display: block;

`

const CustomGraphG = styled.g`
  position: relative;
  stroke:${p => p.theme.colors.primary};
  stroke-linecap:round;
  stroke-linejoin:round;
  fill:none;
`

const CustomBGRect = styled.rect<{
  isError?:boolean
}>`
  position: relative;
  fill:${p => p.isError?'red':p.theme.colors.text_input_bg};
  //opacity:0.15;
`

const CustomBorderline = styled.line`
  position: relative;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke:${p => p.theme.colors.adb_border};
`

const CustomPath = styled.path`
`

export default SVGGraph
