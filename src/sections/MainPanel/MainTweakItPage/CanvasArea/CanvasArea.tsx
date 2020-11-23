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
import CreateSolverByString2 from '@Components/Solver'

import {SVGTransitionTemplate,SVGTemplate,SVGTemplate_100,SVGTransitionTemplate_100} from '@Components/SVGGraph/SVGUtil'
import SVGGraph from '@Components/SVGGraph'

const CanvasArea: React.FC = ({children}) => {
  
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();
  const { currentAnimationItem, selectAnimationItem} = useContext(
    ListSelectStateContext
  );
  const { currentAnimName, currentAnimCalculator, currentAnimData} = useContext(
    AnimatorTypeContext
  );

  const currentAnimationName = currentAnimationItem.split("_").pop();


  // DataUtil
  const svgPointNumber = 200;
  const svgPointScale = 3;
  const svgWidth:number = 200;
  const svgHeight:number = 200;
  const svgScale:number = 1; 

  Solver.setCalculatorSamplePointNumber(svgPointNumber)
  Solver.setCalculatorSampleScale(svgPointScale)

  const calc = new Solver.HorizontalLineCalculator;

  // need new arr
  //var calc2 = new Solver.FramerDHOSpring(50,2,1,0);
  
  //var calc2 = new Solver.EaseInOut;
  var calc2 = Solver.CreateSolverByString(currentAnimCalculator,currentAnimName,currentAnimData);
  //console.log(calc2);

  //var newSVGData = SVGTemplate(calc2.getStepArray(),calc2.getValueArray(),svgWidth,svgHeight,1.);
  const [isBtnTriggered,setIsBtnTriggered] = useState<boolean>(false);
  const [isSliderTriggered,setIsSliderTriggered] = useState<boolean>(false);
  const [newSVGData,setNewSVGData] = useState<any>();


  const { revealProgress } = useSpring({
    from:{revealProgress:0},
    to:{revealProgress:isBtnTriggered?1:0},
    config: animationConfig.graph_trasition,
    onFrame: () => {
      if(!isSliderTriggered){
        var progress:number = revealProgress.value.toFixed(2);
        setNewSVGData(SVGTransitionTemplate(calc.getStepArray(),calc.getValueArray(),calc2.getStepArray(),calc2.getValueArray(),svgWidth,svgHeight,progress));
      }
    },
    onRest: () => {
      //setIsTriggered(false)
    }
  })

  const triggerBtn = () =>{
    setIsBtnTriggered(!isBtnTriggered)
  }

  // const triggerSlider = (e:any) =>{
  //   setIsBtnTriggered(true);
  //   setNewSVGData(SVGTemplate(new Solver.AndroidSpring(1500,e.target.value,0).getStepArray(),new Solver.AndroidSpring(1500,e.target.value,0).getValueArray(),svgWidth,svgHeight,e.target.value))
  // }

  // const blurSlider = (e:any) =>{
  //   setIsBtnTriggered(false);
  // }

  return (
    <Container>

      <SVGGraph
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        svgScale={svgScale}
        svgData={newSVGData}
        ></SVGGraph>

      <button onClick={triggerBtn}></button>
        
      <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          defaultValue="0.15"
          onChange={e => triggerSlider(e)}
          onBlur={e => blurSlider(e)}
      />
      
      <AnimationTitle>
        {currentAnimName? 
          <Trans>{currentAnimName}</Trans>:
          <Trans>select_an_animator</Trans>
        }
      </AnimationTitle>
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
