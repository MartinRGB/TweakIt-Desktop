import React ,{memo, useEffect, useState,useRef,useLayoutEffect,useContext} from 'react';

import styled from '@emotion/styled';

import CanvasTitle from './CanvasTitle'
import CanvasInput from './CanvasInput'
import CanvasSVG from './CanvasSVG'
import initState from '@Config/init_state.json'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

import {useSpring, animated,interpolate} from 'react-spring'
import { ADBExpandStateContext } from '@Context/ADBExpandContext';
import animationConfig from '@Config/animation.json';

const CanvasArea: React.FC = memo(({children}) => {
  
  const svgWidth = initState.svgWidth;
  const svgHeight = initState.svgHeight;
  const svgScale = initState.svgScale;
  const svgStrokeWidth = initState.svgStrokeWidth;
  const svgPointNumber = initState.svgPointNumber;
  const svgPointScale = initState.svgPointScale;
  const viewBoxHFixed = svgHeight * initState.viewBoxFixedScale;
  const viewBoxWFixed = svgWidth * initState.viewBoxFixedScale;
  const extendLineScale = initState.extendLineScale;

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  // ############ Reszie ############
  const sizeRef = useRef(null);
  const [isLayoutRow, setIsLayoutRow] = useState<boolean>(false);
  const [isTitleShow, setIsTitlteShow] = useState<boolean>(true);
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


  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );

  const {widthProps} = useSpring({
    widthProps: adbIsExpand ? 320 : 0,
    config: animationConfig.panel_slide,
    onFrame:() =>{
      updateSize();
    }
  })


  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => 
      window.removeEventListener("resize", updateSize);
  }, []);

  useEffect( () => {
    if(sizeRef.current){updateSize()}
  }, [sizeRef]);

  return (
    <Container
      ref = {sizeRef}
      isLayoutRow = {isLayoutRow}
      isAnimationEnable = {isGlobalAnimEnable}
      >

      <GraphContainer
        isAnimationEnable = {isGlobalAnimEnable}
        isLayoutRow={isLayoutRow}>
          <CanvasTitle></CanvasTitle>
          <CanvasSVG
            isLayoutRow={isLayoutRow} 
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            svgScale={svgScale}
            svgStrokeWidth={svgStrokeWidth} 
            svgPointNumber={svgPointNumber}
            svgPointScale={svgPointScale}
            viewBoxHFixed={viewBoxHFixed}
            viewBoxWFixed={viewBoxWFixed}
            extendLineScale={extendLineScale}
          
          ></CanvasSVG>
      </GraphContainer>
      
      <InputContainer
          isLayoutRow = {isLayoutRow}>
          <CanvasInput></CanvasInput>
      </InputContainer>
    </Container>
  )
})

export default CanvasArea


const GraphContainer = styled.div<{
  isLayoutRow:boolean;
  isAnimationEnable:boolean;
}>`
  flex: 2;
  height:100%;
  position:relative;
  transition:${p=>p.isAnimationEnable?'box-shadow 0.3s':'none'};
  box-shadow: ${p => p.isLayoutRow?`1px 0px 0px ${p.theme.colors.adb_border},-1px 0px 0px ${p.theme.colors.adb_border}`:'none'}
  
`

const Container = styled.div<{
  isLayoutRow:boolean;
  isAnimationEnable:boolean;
}>`
    height: 100%;
    //background:${p => p.theme.colors.main_top_bg};
    display: flex;
    //padding:24px 0px;
    position: relative;
    flex-direction: ${p => p.isLayoutRow?'row':'column'};
    align-items:${p => p.isLayoutRow?'center':'initial'};
    flex:2;
    min-width:250px;
    // max-width:680px;
    z-index:1;
    transition:${p=>p.isAnimationEnable?'box-shadow 0.3s':'none'};
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`

// const SVGContainer = styled.div<{
//   isLayoutRow:boolean
//   svgHeight:number;
// }>`
//   display:block;
//   height: ${p => p.svgHeight}px;
//   position: ${p => p.isLayoutRow?'absolute':'relative'};
//   left: ${p => p.isLayoutRow?'50%':'0'};
//   top: ${p => p.isLayoutRow?'50%':'0'};
//   transform: ${p => p.isLayoutRow?'translate3d(-50%, -50%, 0px)':'translate3d(0, 0, 0px)'};
// `


const InputContainer = styled.div<{
  isLayoutRow:boolean
}>`
  z-index:10;
  flex: 3;
  padding: 0 ${p => p.isLayoutRow?'24px':'0'};
`

