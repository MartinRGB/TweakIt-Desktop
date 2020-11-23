import React, { useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { ISVG } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const SVGGraph: React.FC<ISVG> = ({ pathStyle,svgStyle,svgWidth,svgHeight,svgScale,svgData}) => {
//   const [colorMode, setColorMode] = useColorMode()

//   const [bind, { delta, down }] = useGesture()
//   const {size} = useSpring({
//     size: down ? 1.1: 1,
//     immediate: name => down && name === 'x',
//     config:animationConfig.button_pressed
//  })

  return (<CustomSVG 
            width={svgWidth} 
            height={svgHeight} 
            style={svgStyle}
            viewBox ={`0 0 ${svgWidth} ${svgHeight}`}>
            <CustomPathG
              style={{
                ...pathStyle,
                transform:`translate(0,${svgHeight}px) scale(${svgScale},-${svgScale})`,
                strokeWidth:`${svgScale*2.0}`,
              }}
            >
              <CustomPath 
                d={svgData}/>
            </CustomPathG>
        </CustomSVG>)
  ;
}

const CustomSVG = styled.svg`

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
