import React ,{ useContext,useEffect, useState,useRef,useLayoutEffect} from 'react';

import styled from '@emotion/styled';

import SVGGraph from '@Components/SVG/SVGGraph'
import SVGBackground from '@Components/SVG/SVGBackground'
import SVGFakeGraph from '@Components/SVG/SVGFakeGraph'

export interface ISVGContainer {
  isLayoutRow:boolean;
  svgWidth: number;
  svgHeight: number;
  svgScale: number;
  svgStrokeWidth: number;
  svgPointNumber: number;
  svgPointScale: number;
}

const CanvasSVG: React.FC<ISVGContainer> = ({
  isLayoutRow, 
  svgWidth,
  svgHeight,
  svgScale,
  svgStrokeWidth, 
  svgPointNumber, 
  svgPointScale

}) => {

  return (
    <Container
        isLayoutRow={isLayoutRow}
        svgHeight={svgHeight}
      >

            <SVGBackground
              svgWidth={svgWidth}
              svgHeight={svgHeight}
              svgScale={svgScale}
              svgStrokeWidth={svgStrokeWidth}
              svgPointNumber={svgPointNumber}
              svgPointScale={svgPointScale}
              svgStyle={{
                position: `absolute`,
                left: `50%`,
                top: `50%`,
                transform: `translate3d(-50%, -50%, 0px)`
              }}
              />

            <SVGGraph
              svgWidth={svgWidth}
              svgHeight={svgHeight}
              svgScale={svgScale}
              svgStrokeWidth={svgStrokeWidth}
              svgPointNumber={svgPointNumber}
              svgPointScale={svgPointScale}
              svgStyle={{
                position: `absolute`,
                left: `50%`,
                top: `50%`,
                transform: `translate3d(-50%, -50%, 0px)`
              }}
            />
            <SVGFakeGraph
              svgWidth={svgWidth}
              svgHeight={svgHeight}
              svgScale={svgScale}
              svgStrokeWidth={svgStrokeWidth}
              svgPointNumber={svgPointNumber}
              svgPointScale={svgPointScale}
              svgStyle={{
                position: `absolute`,
                left: `50%`,
                top: `50%`,
                transform: `translate3d(-50%, -50%, 0px)`
              }}></SVGFakeGraph>
    </Container>)
}

export default CanvasSVG


const Container = styled.div<{
  isLayoutRow:boolean
  svgHeight:number;
}>`
  display:block;
  height: ${p => p.svgHeight}px;
  position: ${p => p.isLayoutRow?'absolute':'relative'};
  left: ${p => p.isLayoutRow?'50%':'0'};
  top: ${p => p.isLayoutRow?'50%':'0'};
  transform: ${p => p.isLayoutRow?'translate3d(-50%, -50%, 0px)':'translate3d(0, 0, 0px)'};
`


