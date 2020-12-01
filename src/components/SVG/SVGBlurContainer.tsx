import React, {useContext,memo,useEffect,useState}from 'react'
import styled from '@emotion/styled';
import { ISVG } from "@Types";
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext'

import { ListSelectStateContext } from '@Context/ListSelectStateContext'

const SVGBlurContainer: React.FC<ISVG> = memo(({ 
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

    const { selectTransition} = useContext(
      AnimatorTypeContext
    );

    // const [animValue,setAnimValue] = useState<number>(0);
  
    // var t = 0;

    // if(selectTransition){

    //   var animInterval = setInterval(()=>{
    //     t += 1;
    //     if(t >= 60){
    //       setAnimValue(0);
    //       clearInterval(animInterval)
    //     }
    //     else{
    //       setAnimValue(t/60)
    //     }
    //   } ,5)
    // }

  return (<Container
            style={{
              height:`${svgHeight}px`,
            }}
  >
      <BlurDiv
        style={{
          backdropFilter: `${selectTransition?`blur(3px)`:'blur(0px)'}`,
          zIndex:`${selectTransition?`0`:'-10px'}`,
        }}
      >

      </BlurDiv>
  </Container>)
})

const Container = styled.div`
    width:100%;
    transform: translate3d(-50%, -50%, 0px) scale3d(0.95, 1.5, 1);
    position: absolute;
    left: 50%;
    top: 50%;
    pointer-events:none;
`

const BlurDiv = styled.div`
    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.main_top_bg_blur};
    transition: all 0.5s cubic-bezier(0, 0, 0, 1.0)
`


export default SVGBlurContainer
