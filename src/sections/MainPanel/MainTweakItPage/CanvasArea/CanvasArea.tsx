import React ,{ useContext, useEffect, useState,useRef,useLayoutEffect} from 'react';
import { useSpring, animated, interpolate } from 'react-spring'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { Trans } from 'react-i18next'
import '@Context/i18nContext'
import {ListSelectStateContext} from '@Context/ListSelectContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import InputTree from './InputTree'

import animationConfig from '@Config/animation.json'

import SVGGraph from '@Components/SVGGraph'

import Solver from '@Components/Solver';
import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTemplate_50,SVGTransitionTemplate_100} from '@Components/SVGGraph/SVGUtil'
import { GraphUpdateContext } from '@Context/GraphUpdateContext'

import {PathLine} from 'react-svg-pathline'

class PointObject {
  private x:number;
  private y:number;
  constructor(x:number,y:number){
    this.x = x;
    this.y = y;
  }
}

const CanvasArea: React.FC = ({children}) => {
  
  const { currentAnimName, currentAnimCalculator, currentAnimData,currentSolverData} = useContext(
    AnimatorTypeContext
  ); 

  const {shouldGraphUpdate,setGraphShouldUpdate} = useContext(
    GraphUpdateContext
  );


  const svgWidth = 240;
  const svgHeight = 240;
  const svgScale = 0.75;
  const svgStrokeWidth = 3;
  const svgPointNumber = 50;
  const svgPointScale = 3;
  Solver.setCalculatorSamplePointNumber(svgPointNumber)
  Solver.setCalculatorSampleScale(svgPointScale)
  var stepData = Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentSolverData).getStepArray();
  var valueData = Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentSolverData).getValueArray();


  // ############ Reszie ############
  const sizeRef = useRef(null);
  const [isLayoutRow, setIsLayoutRow] = useState<boolean>(false);
  function updateSize() {
    let height = sizeRef.current.offsetHeight;
    let width  = sizeRef.current.offsetWidth;
    if(width >= 680){
      setIsLayoutRow(true)
    }
    else{
      setIsLayoutRow(false)
    }
  }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => 
      window.removeEventListener("resize", updateSize);
  }, []);

  useEffect( () => {
    if(sizeRef.current){updateSize()}
  }, [sizeRef]);

    // ############ Try Smooth Pathline ############

  
  // var finalPointsObj = [new PointObject(0,0)];

  // for(let i=0;i<stepData.length;i++){
  //   //if(i%2 == 0){
  //     finalPointsObj.push(new PointObject(stepData[i]*svgWidth,valueData[i]*svgWidth))
  //   //}
  // }
  // finalPointsObj.push(new PointObject(svgWidth,svgWidth))

  // const viewBoxWFixed = svgWidth*0.5;
  // const viewBoxHFixed = svgHeight*0.5;

  //console.log(finalPointsObj)


  return (
    <Container
      ref = {sizeRef}
      isLayoutRow = {isLayoutRow}
      >

    {/* <svg
        width={svgWidth} 
        height={svgHeight}
        viewBox ={`0 0 ${svgWidth*1 + viewBoxWFixed} ${svgHeight + viewBoxHFixed}`}
        style={{
          position:`absolute`,
          height:`500px`,

          top:`0`,
          left:`0`
        }}>
        <g
          style={{
            transform:`translate3d(${svgWidth/2 - svgWidth/2*svgScale + viewBoxWFixed/2}px,${svgHeight - (svgHeight/2- svgHeight/2*svgScale) + viewBoxHFixed/2}px,0) scale3d(${1},-${1},1)`
          }}>
        <PathLine 
            points={finalPointsObj} 
            stroke="red" 
            strokeWidth={svgStrokeWidth*0.75}
            fill="none"
            r={3}
            />
        </g>
    </svg> */}

      <GraphContainer
        isLayoutRow={isLayoutRow}>
      <AnimationTitle>
        {currentAnimName? 
          <Trans>{currentAnimName}</Trans>:
          <Trans>select_an_animator</Trans>
        }
      </AnimationTitle>

      <SVGGraph
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        svgScale={svgScale}
        svgStrokeWidth={svgStrokeWidth}
        svgPointNumber={svgPointNumber}
        svgPointScale={svgPointScale}
        // ########### Performance Issue here ###########
        isError={!valueData[0]}
        // currentAnimCalculator={currentAnimCalculator}
        // currentAnimName={currentAnimName}
        // currentSolverData={currentSolverData}
        svgData={SVGTemplate_50(
          stepData,valueData,
          svgWidth,svgHeight,
          1.)}

        svgStyle={{
          height: !isLayoutRow?`${svgHeight}`:`100%`,
          margin: !isLayoutRow?`12px auto`:`0px auto%`,
          position: !isLayoutRow?`relative`:`absolute`,
          left: !isLayoutRow?`0`:`50%`,
          top: !isLayoutRow?`0`:`50%`,
          transform: !isLayoutRow?`translate3d(0, 0, 0px)`:`translate3d(-50%, -50%, 0px)`
        }}/>

      </GraphContainer>
      <InputContainer
        isLayoutRow = {isLayoutRow}>
      {currentAnimName?
          currentAnimData.map(function (data:any,index:number) {
            return (
              <InputTree 
                  name={data[0]}
                  index={index}
                  isLast={index===(currentAnimData.length-1)}
                  defaultVal={data[1].default}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName+index}
                >
              </InputTree>
            )
          }): <InputTree 
          name={'property'}
          index={0}
          isLast={true}
          defaultVal={0.5}
          min={0}
          max={1}
          key={'input_placeholder'}
        >
      </InputTree>
      }
      </InputContainer>
    </Container>
  )
}

export default CanvasArea


const AnimationTitle = styled.p`
  text-align:center;
  opacity:0.5;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 21px;
  padding-top:24px;
  color:${p => p.theme.colors.text};
`


const GraphContainer = styled.div<{
  isLayoutRow:boolean
}>`
  flex: 2;
  height:100%;
  position:relative;
  box-shadow: ${p => p.isLayoutRow?`1px 0px 0px ${p.theme.colors.adb_border},-1px 0px 0px ${p.theme.colors.adb_border}`:'none'}
  
`

const Container = styled.div<{
  isLayoutRow:boolean
}>`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    //padding:24px 0px;
    position: relative;
    flex-direction: ${p => p.isLayoutRow?'row':'column'};
    align-items:${p => p.isLayoutRow?'center':'initial'};
    flex:2;
    min-width:250px;
    // max-width:680px;
    z-index:1;
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`


const InputContainer = styled.div<{
  isLayoutRow:boolean
}>`
  flex: 3;
  padding: 0 ${p => p.isLayoutRow?'24px':'0'};
`

