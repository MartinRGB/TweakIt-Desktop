import React ,{ useContext, useEffect, useState,useRef} from 'react';
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

const CanvasArea: React.FC = ({children}) => {
  
  const { currentAnimName, currentAnimCalculator, currentAnimData,currentSolverData} = useContext(
    AnimatorTypeContext
  );


  return (
    <Container>

      <SVGGraph
        svgWidth={400}
        svgHeight={400}
        svgScale={0.25}
        svgStrokeWidth={6}
        svgPointNumber={200}
        svgPointScale={3}
        svgCalculator={currentAnimCalculator}
        svgAnimName={currentAnimName}
        svgSolverData={currentSolverData}
        ></SVGGraph>

      <AnimationTitle>
        {currentAnimName? 
          <Trans>{currentAnimName}</Trans>:
          <Trans>select_an_animator</Trans>
        }
      </AnimationTitle>

      {currentAnimData?
          currentAnimData.map(function (data:any,index:number) {
            return (
              <InputTree 
                  name={data[0]}
                  index={index}
                  defaultVal={data[1].default}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName+index}
                >
              </InputTree>
            )
          }):<div></div>
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
    position: relative;
    flex-direction: column;
    flex:2;
    min-width:250px;
    z-index:1;
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`
