import React ,{ useContext,useEffect, useState,useRef,useLayoutEffect} from 'react';

import styled from '@emotion/styled';

import SVGGraph from '@Components/SVG/SVGGraph'
import SVGBackground from '@Components/SVG/SVGBackground'
import SVGFakeGraph from '@Components/SVG/SVGFakeGraph'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import BezierInputTree from './BezierInputTree'
import SVGBlurContainer from '@Components/SVG/SVGBlurContainer'

export interface ISVGContainer {
  isLayoutRow:boolean;
  svgWidth: number;
  svgHeight: number;
  svgScale: number;
  svgStrokeWidth: number;
  svgPointNumber: number;
  svgPointScale: number;
  viewBoxWFixed:number;
  viewBoxHFixed:number;
  extendLineScale:number;
  children:any;
}

const CanvasSVG: React.FC<ISVGContainer> = ({
  isLayoutRow, 
  svgWidth,
  svgHeight,
  svgScale,
  svgStrokeWidth, 
  svgPointNumber, 
  svgPointScale,
  viewBoxHFixed,
  viewBoxWFixed,
  extendLineScale,
  children,

}) => {

  const { currentAnimName,currentSolverData ,currentAnimData,currentAnimCalculator} = useContext(
    AnimatorTypeContext
  ); 

  const isBezierCalculator = (currentAnimCalculator === 'CubicBezierCalculator')
  const isDoubleBezierCalculator = (currentAnimCalculator === 'DoubleCubicBezierCalculator')

  // console.log(typeof(currentAnimData[0]))
  // Object.entries(currentAnimData).map(function (data:any,index:number) {
  //   //setCurrentSolverDataByIndex(data[1].default,index)
  //   console.log(data[1][1].editable)
  // })

  return (
    <Container
        isLayoutRow={isLayoutRow}
        svgHeight={svgHeight}
        style={{
          width:`100%`,
        }}
      >

            <SVGBackground
              svgWidth={svgWidth}
              svgHeight={svgHeight}
              svgScale={svgScale}
              svgStrokeWidth={svgStrokeWidth}
              svgPointNumber={svgPointNumber}
              svgPointScale={svgPointScale}
              viewBoxHFixed={viewBoxHFixed}
              viewBoxWFixed={viewBoxWFixed}
              extendLineScale={extendLineScale}
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
              viewBoxHFixed={viewBoxHFixed}
              viewBoxWFixed={viewBoxWFixed}
              extendLineScale={extendLineScale}
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
              viewBoxHFixed={viewBoxHFixed}
              viewBoxWFixed={viewBoxWFixed}
              extendLineScale={extendLineScale}
              svgStyle={{
                position: `absolute`,
                left: `50%`,
                top: `50%`,
                transform: `translate3d(-50%, -50%, 0px)`
              }}></SVGFakeGraph>

            {(isBezierCalculator)?(            
              currentAnimData.map(function (data:any,index:number) {
                console.log(data)

              if(index != currentAnimData.length - 1){
                var p1:any = currentAnimData[index];
                // var p2:any = currentAnimData[1];
                // var p3:any = currentAnimData[2];
                // var p4:any = currentAnimData[3];
                console.log(p1)
                console.log(currentSolverData[index])
                return (
                <BezierInputTree 
                  name={''}
                  index={(index)}
                  isLast={false}
                  defaultVal={[currentSolverData[index]]} //,currentSolverData[1],currentSolverData[2],currentSolverData[3]
                  isDoubleBezier={false}
                  isEditable={currentAnimData[index][1].editable}
                  min={currentAnimData[index][1].min}
                  max={currentAnimData[index][1].max}
                  key={currentAnimName + 0}
                  svgWidth={svgWidth}
                  svgHeight={svgHeight}
                  svgScale={svgScale}
                  svgStrokeWidth={svgStrokeWidth}
                  viewBoxHFixed={viewBoxHFixed}
                  viewBoxWFixed={viewBoxWFixed}
                  style={{
                    width:`100%`,
                    height:`${svgHeight}px`,
                    margin:`0 atuo`,
                    position: `relative`,
                    marginBottom:` 0px`,
                  }}
                  >
                </BezierInputTree>)
              }
            })):''}


          {/* {(isDoubleBezierCalculator)?(            
              currentAnimData.map(function (data:any,index:number) {

              if(index === currentAnimData.length - 2){
                var p1:any = currentAnimData[0];
                var p2:any = currentAnimData[1];
                var p3:any = currentAnimData[2];
                var p4:any = currentAnimData[3];
                return (
                <BezierInputTree 
                  name={''}
                  index={(0)}
                  isLast={false}
                  defaultVal={[currentSolverData[0],currentSolverData[1],currentSolverData[2],currentSolverData[3]]}
                  isDoubleBezier={false}
                  isEditable={p1[1].editable}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName + 0}
                  svgWidth={svgWidth}
                  svgHeight={svgHeight}
                  svgScale={svgScale}
                  svgStrokeWidth={svgStrokeWidth}
                  viewBoxHFixed={viewBoxHFixed}
                  viewBoxWFixed={viewBoxWFixed}
                  style={{
                    width:`100%`,
                    height:`${svgHeight}px`,
                    margin:`0 atuo`,
                    position: `relative`,
                    marginBottom:` 0px`,
                  }}
                  >
                </BezierInputTree>)
              }
            })):''} */}


            <SVGBlurContainer
             svgWidth={svgWidth}
             svgHeight={svgHeight}
            
            ></SVGBlurContainer>
    </Container>)
}

export default CanvasSVG


const Container = styled.div<{
  isLayoutRow:boolean
  svgHeight:number;
}>`
  overflow:hidden;
  z-index:1;
  display:block;
  height: ${p => p.svgHeight}px;
  position: ${p => p.isLayoutRow?'absolute':'relative'};
  left: ${p => p.isLayoutRow?'50%':'0'};
  top: ${p => p.isLayoutRow?'50%':'0'};
  transform: ${p => p.isLayoutRow?'translate3d(-50%, -50%, 0px)':'translate3d(0, 0, 0px)'};
`


