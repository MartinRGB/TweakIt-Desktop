import ReactDOM from 'react-dom'
import React, { memo, useState, useRef, useEffect, useContext } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
//import styled from 'styled-components'
import { IInputTree } from "@Types";
// import * as Icons from './ListIcon'

import { useColorMode, jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import { css } from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

import animationConfig from '@Config/animation.json'


import RangeInput from '@Components/RangeInput'
import TextInput from '@Components/TextInput'
import DescText from '@Components/DescText'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import { GraphUpdateContext } from '@Context/GraphUpdateContext'

export interface IBezierDragger{
  style:any;
  //isEditable:any;
  svgHeight:number;
  svgWidth:number;
  svgScale:number;
  svgStrokeWidth:number;
  viewBoxWFixed:number;
  viewBoxHFixed:number;
  extendLineScale:number;
  isBezier:boolean;
}

const SVGBezierDragger: React.FC<IBezierDragger> = ({ 
  style,
  //isEditable,
  svgHeight,
  svgWidth,
  svgScale,
  svgStrokeWidth,
  viewBoxWFixed,
  isBezier,
  viewBoxHFixed,
}) => {


  const { currentAnimData,selectTransition,currentAnimName, currentAnimCalculator,currentSolverData,previousAnimName, previousAnimCalculator, previousSolverData} = useContext(
    AnimatorTypeContext
  );


  const [colorMode] = useColorMode();


  const boxWidth = svgWidth*(svgWidth/(svgWidth+viewBoxWFixed))*svgScale;
  const boxHeight = svgHeight*(svgHeight/(svgHeight+viewBoxHFixed))*svgScale;
  const boxPadding = 40;
  
  const [transitionScale,setTransitionScale] = useState<number>(0);

  const {transInProgress} = useSpring({
    transInProgress:selectTransition?0:1,
    config: animationConfig.bezier_dragger,
    onFrame: () =>{
      setTransitionScale(transInProgress.value)
    },
  })

  return isBezier?(
    <DragContainer
      canShow = {!selectTransition}
      style={{
        width:`${boxWidth}px`,
        height:`${boxHeight}px`,
        ...style
      }}>
        <svg
          width={boxWidth + boxPadding} 
          height={boxHeight + boxPadding} 
          
          style={{
            transform:`translate3d(${-boxPadding/2}px,${-boxPadding/2}px,0) scale3d(1,-1,1)`,
          }}
          >
          <g
          >
            {/* <CustomCircle 
              cx={boxWidth*currentSolverData[0]*transitionScale+boxPadding/2} 
              cy={boxHeight*currentSolverData[1]*transitionScale+boxPadding/2} 
              r={svgStrokeWidth*1.5*transitionScale}
              /> */}
            <CustomBorderline
              x1={boxPadding/2}
              y1={boxPadding/2}
              x2={boxWidth*currentSolverData[0]*transitionScale+boxPadding/2} 
              y2={boxHeight*currentSolverData[1]*transitionScale+boxPadding/2}   
              strokeWidth={svgStrokeWidth/2*transitionScale}
            />

            {/* <CustomCircle 
              cx={boxWidth*(1-transitionScale) + boxWidth*currentSolverData[2]*transitionScale+boxPadding/2} 
              cy={boxHeight*(1-transitionScale) + boxHeight*currentSolverData[3]*transitionScale+boxPadding/2}
              r={svgStrokeWidth*1.5*transitionScale}
              /> */}
            <CustomBorderline
              x1={boxWidth*(1-transitionScale) + boxWidth*currentSolverData[2]*transitionScale+boxPadding/2}
              y1={boxHeight*(1-transitionScale) + boxHeight*currentSolverData[3]*transitionScale+boxPadding/2}
              x2={boxWidth+boxPadding/2} 
              y2={boxHeight+boxPadding/2}   
              strokeWidth={svgStrokeWidth/2*transitionScale}
            />
          </g>
        </svg>
    </DragContainer>
  ):''
    //isBezier?

  //:''
}


export default SVGBezierDragger;

// Styles


const DragContainer = styled('div')<{
  isBezier:boolean;
  canShow:boolean;
}>`
  background:transparent;
  display:${p => p.canShow?'block':'none'};
  // opacity:0.15
`
const CustomBorderline = styled.line`
  position: relative;
  stroke-linecap:round;
  stroke-linejoin:round;
  //stroke:${p => p.theme.colors.adb_border};
  stroke:red;
`

const CustomCircle = styled.circle`
  position: relative;
  //stroke:${p => p.theme.colors.adb_border};
  fill:red;
`