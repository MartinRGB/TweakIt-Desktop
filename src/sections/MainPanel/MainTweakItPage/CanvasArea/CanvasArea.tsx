import React ,{ useEffect, useState,useRef,useLayoutEffect} from 'react';

import styled from '@emotion/styled';

import CanvasTitle from './CanvasTitle'
import CanvasInput from './CanvasInput'
import CanvasSVG from './CanvasSVG'
import initState from '@Config/init_state.json'

const CanvasArea: React.FC = ({children}) => {
  
  const svgWidth = initState.svgWidth;
  const svgHeight = initState.svgHeight;
  const svgScale = initState.svgScale;
  const svgStrokeWidth = initState.svgStrokeWidth;
  const svgPointNumber = initState.svgPointNumber;
  const svgPointScale = initState.svgPointScale;
  const viewBoxHFixed = svgHeight * initState.viewBoxFixedScale;
  const viewBoxWFixed = svgWidth * initState.viewBoxFixedScale;
  const extendLineScale = initState.extendLineScale;


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

  return (
    <Container
      ref = {sizeRef}
      isLayoutRow = {isLayoutRow}
      >

      <GraphContainer
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
}

export default CanvasArea


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

