import React from 'react'
import styled from '@emotion/styled';
import { ISVG } from "@Types";


const SVGBackground: React.FC<ISVG> = ({ 
  pathStyle,
  svgStyle,
  svgWidth,
  svgHeight,
  svgScale,
  svgStrokeWidth,
  svgPointNumber,
  svgPointScale,
  // svgData,
  isError,
  // currentAnimCalculator,
  // currentAnimName,
  // currentSolverData,
  // svgData
  }) => {



  const viewBoxWFixed = svgWidth*0.5;
  const viewBoxHFixed = svgHeight*0.5;
  const extendLineScale = 1.25
  const mIsError = isError?isError:false;

  //console.log("canvas background re render")

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
                isError={mIsError}
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
export default SVGBackground
