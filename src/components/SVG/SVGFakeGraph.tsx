import React, {memo,useContext,useEffect}from 'react'
import styled from '@emotion/styled';
import { ISVG } from "@Types";
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext'

import Solver from '@Components/Solver';
import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTemplate_50,SVGTransitionTemplate_100,SVGTransitionTemplate_50} from '@Components/SVG/SVGUtil'
import { ListSelectStateContext } from '@Context/ListSelectStateContext'

const SVGFakeGraph: React.FC<ISVG> = memo(({ 
  pathStyle,
  svgStyle,
  svgWidth,
  svgHeight,
  svgScale,
  svgStrokeWidth,
  svgPointNumber,
  svgPointScale,
  isVisable,
  svgData,
  isError,
  viewBoxWFixed,
  viewBoxHFixed,
  extendLineScale,
  }) => {

    useContext(ListSelectStateContext)

    const { currentAnimPlatform,previousAnimPlatform,currentAnimName, currentAnimCalculator,currentSolverData,previousAnimName, previousAnimCalculator, previousSolverData,selectTransition,setSelectTransition} = useContext(
      AnimatorTypeContext
    );
  
    Solver.setCalculatorSamplePointNumber(svgPointNumber?svgPointNumber:50)
    Solver.setCalculatorSampleScale(svgPointScale?svgPointScale:3);
  
    const currStepData = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData).getStepArray();
    const currValueData = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData).getValueArray();

    var mSVGData;
    
    var t = 0;
    if(selectTransition){

      const prevStepData = Solver.CreateSolverByString(previousAnimCalculator,previousAnimPlatform,previousAnimName,previousSolverData).getStepArray();
      const prevValueData = Solver.CreateSolverByString(previousAnimCalculator,previousAnimPlatform,previousAnimName,previousSolverData).getValueArray();

      const springValueData = new Solver.Android.Spring(800,0.5,0).getValueArray();
      var animInterval = setInterval(()=>{
        t += 1;
        if(t >= currValueData.length){
          setSelectTransition(false)
          mSVGData = `M0,0`
          document.getElementById('pathEl')?.setAttribute('d',mSVGData)
          clearInterval(animInterval)
        }
        else{
          mSVGData = SVGTransitionTemplate_50(prevStepData,prevValueData,currStepData,currValueData,svgWidth,svgHeight,springValueData[t]);
          document.getElementById('pathEl')?.setAttribute('d',mSVGData)
        }
      } ,10)
    }

  return (<CustomSVG
          width={svgWidth} 
          height={svgHeight} 
          style={{
            ...svgStyle,
            // width:`${svgWidth}`,
            height:`${svgHeight}`,
          
          }}
          viewBox ={`0 0 ${svgWidth*1 + viewBoxWFixed} ${svgHeight + viewBoxHFixed}`}>

            <CustomGraphG
              style={{
                ...pathStyle,
                transform:`translate3d(${svgWidth/2 - svgWidth/2*svgScale + viewBoxWFixed/2}px,${svgHeight - (svgHeight/2- svgHeight/2*svgScale) + viewBoxHFixed/2}px,0) scale3d(${svgScale},-${svgScale},1)`,
              }}
            >
              <CustomPath
                id="pathEl" 
                d={`M0,0`}
                strokeWidth ={svgStrokeWidth}
                />
            </CustomGraphG>
          </CustomSVG>)
})

const CustomSVG = styled.svg`
// width: 400px;
// height: 400px;
// position: absolute;
// left: 50%;
// transform: translate3d(-50%, 50%, 0px);
  // margin:12px auto;
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

const CustomPath = styled.path`
`


export default SVGFakeGraph
