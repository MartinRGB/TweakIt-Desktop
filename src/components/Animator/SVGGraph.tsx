import React, {useContext,useEffect}from 'react'
import styled from '@emotion/styled';
import { ISVG } from "@Types";
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext'
import { GraphUpdateContext } from '@Context/GraphUpdateContext'
import Solver from '@Components/Solver';
import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTemplate_50,SVGTransitionTemplate_100,SVGTransitionTemplate_50} from '@Components/SVG/SVGUtil'

const SVGGraph: React.FC<ISVG> = ({ 
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
  }) => {

  useContext(GraphUpdateContext);


  const { selectTransition,currentAnimName, currentAnimCalculator,currentSolverData,previousAnimName, previousAnimCalculator, previousSolverData} = useContext(
    AnimatorTypeContext
  );


  Solver.setCalculatorSamplePointNumber(svgPointNumber?svgPointNumber:50)
  Solver.setCalculatorSampleScale(svgPointScale?svgPointScale:3)


  const currStepData = Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentSolverData).getStepArray();
  const currValueData = Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentSolverData).getValueArray();
  
  const viewBoxWFixed = svgWidth*0.5;
  const viewBoxHFixed = svgHeight*0.5;
  const mIsError = !currValueData[0];
  var mSVGData:any;


  // if(selectTransition){
  //   console.log(previousAnimName)
    // const prevStepData = Solver.CreateSolverByString(previousAnimCalculator,previousAnimName,previousSolverData).getStepArray();
    // const prevValueData = Solver.CreateSolverByString(previousAnimCalculator,previousAnimName,previousSolverData).getStepArray();
  //   mSVGData  = mIsError?`M0,0`:SVGTransitionTemplate_50(prevStepData,prevValueData,currStepData,currValueData,svgWidth,svgHeight,selectTransitionProgress)
  // }
  // else{
  //   mSVGData  = mIsError?`M0,0`:SVGTemplate_50(currStepData,currValueData,svgWidth,svgHeight,1.)
  // }


//  prevStepData = Solver.CreateSolverByString(previousAnimCalculator,previousAnimName,previousSolverData).getStepArray();
//  prevValueData = Solver.CreateSolverByString(previousAnimCalculator,previousAnimName,previousSolverData).getStepArray();


  if(selectTransition){
    mSVGData=`M0,240`
  }
  else{
    mSVGData  = mIsError?`M0,0`:SVGTemplate_50(currStepData,currValueData,svgWidth,svgHeight,1.)
  }
  

  
  // ############ Try Smooth Pathline ############


  // const { selectTransitionProgress } = useSpring({
  //   from:{selectTransitionProgress:0},
  //   to:{selectTransitionProgress:1},
  //   config: animationConfig.graph_trasition,
  //   onFrame: () =>{
      
  //     var value = selectTransitionProgress.value.toFixed(2);

  //   },
  //   onRest: () => {
  //     //console.log('bezier stop')
  //   }
  // })
  
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

  //console.log("canvas re render")

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
              <CustomErrorBG 
                isError={mIsError}
                x="0" 
                y="0" 
                width={svgWidth} 
                height={svgHeight}
                />
              <CustomPath 
                strokeWidth ={svgStrokeWidth}
                d={mSVGData}
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

const CustomErrorBG = styled.rect<{
  isError?:boolean
}>`
  position: relative;
  fill:${p => p.isError?'red':p.theme.colors.text_input_bg};
  opacity:0.15;
`

const CustomPath = styled.path`
`

export default SVGGraph
