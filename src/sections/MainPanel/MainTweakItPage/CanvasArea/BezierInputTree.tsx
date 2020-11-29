import ReactDOM from 'react-dom'
import React, { memo, useState, useRef, useEffect, useContext } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
//import styled from 'styled-components'
import { IInputTree } from "@Types";
// import * as Icons from './ListIcon'

import { useColorMode, jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import { css } from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

import animationConfig from '@Config/animation.json'


import TextInput from '@Components/TextInput'
import DescText from '@Components/DescText'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import { GraphUpdateContext } from '@Context/GraphUpdateContext'
import Draggable from 'react-draggable';

export interface IBezierInputTree{
  style?:any;
  svgHeight:number;
  svgWidth:number;
  svgScale:number;
  svgStrokeWidth:number;
  viewBoxWFixed:number;
  viewBoxHFixed:number;
  extendLineScale:number;
  isBezier:boolean;
  index:number;
  isLast?:boolean;
  isDoubleBezier?:boolean;
  isEditable?:boolean;
  name: string;
  calculator?:string
  defaultVal: any;
  min: any;
  max: any;
}

const BezierInputTree: React.FC<IBezierInputTree> = memo(({ 
  style,
  isLast,
  isDoubleBezier,
  isEditable,
  index,
  name,
  defaultVal,
  svgHeight,
  svgWidth,
  svgScale,
  svgStrokeWidth,
  viewBoxWFixed,
  isBezier,
  viewBoxHFixed,
}) => {

  const {selectTransition,currentSolverData,setCurrentSolverDataByIndex} = useContext(
    AnimatorTypeContext
  );

  const {setBezierTriggeredIndex,bezierTriggeredIndex,setGraphShouldUpdate,shouldGraphupdate} = useContext(
    GraphUpdateContext
  );

  const boxWidth = svgWidth*(svgWidth/(svgWidth+viewBoxWFixed))*svgScale;
  const boxHeight = svgHeight*(svgHeight/(svgHeight+viewBoxHFixed))*svgScale;
  const boxPadding = 40;
  const circleRadius = 8;

  const { t, i18n } = useTranslation()
  const [colorMode] = useColorMode();

  const [prev1,setPrev1] = useState<any>(currentSolverData[index][0]);
  const [target1,setTarget1] = useState<any>(currentSolverData[index][0]);
  const [isStart1,setStart1] = useState<boolean>(false);

  const [prev2,setPrev2] = useState<any>(currentSolverData[index][1]);
  const [target2,setTarget2] = useState<any>(currentSolverData[index][1]);
  const [isStart2,setStart2] = useState<boolean>(false);

  const [prev3,setPrev3] = useState<any>(currentSolverData[index][2]);
  const [target3,setTarget3] = useState<any>(currentSolverData[index][2]);
  const [isStart3,setStart3] = useState<boolean>(false);

  const [prev4,setPrev4] = useState<any>(currentSolverData[index][3]);
  const [target4,setTarget4] = useState<any>(currentSolverData[index][3]);
  const [isStart4,setStart4] = useState<boolean>(false);

  const [isStartAnimation,setStartAnimation] = useState<boolean>(false);

  const [textValue,setTextValue] = useState<any>(defaultVal);
  const [textPreviousValue,setTextPreviousValue] = useState<any>(defaultVal);
  const [isTextBlurred,setTextBlur] = useState<boolean>(true);



  //console.log('input tree rerender')
  useEffect(() => {
    setBezierTriggeredIndex(-1)
  }, [])

  const {progress1}  = useSpring({
    from:{progress1:prev1},
    to:{progress1:(isStart1)?target1:prev1},
    config: animationConfig.bezier_input,
    onFrame: () =>{
      var value = progress1.value.toFixed(2);
      //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+0);
    },
    onRest: () => {
      setPrev1(target1)
      setStart1(false)
    }
  })

  const {progress2}  = useSpring({
    from:{progress2:prev2},
    to:{progress2:(isStart2)?target2:prev2},
    config: animationConfig.bezier_input,
    //duration: 0,
    onFrame: () =>{
      var value = progress2.value.toFixed(2);
      //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+1);
    },
    onRest: () => {
      setPrev2(target2)
      setStart2(false)
    }
  })

  const {progress3}  = useSpring({
    from:{progress3:prev3},
    to:{progress3:(isStart3)?target3:prev3},
    config: animationConfig.bezier_input,
    //duration: 0,
    onFrame: () =>{
      var value = progress3.value.toFixed(2);
      //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+2);
    },
    onRest: () => {
      setPrev3(target3)
      setStart3(false)
    }
  })

  const {progress4}  = useSpring({
    from:{progress4:prev4},
    to:{progress4:(isStart4)?target4:prev4},
    config: animationConfig.bezier_input,
    //duration: 0,
    onFrame: () =>{
      var value = progress4.value.toFixed(2);
      //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+3);
    },
    onRest: () => {
      setPrev4(target4)
      setStart4(false)
    }
  })


  const {renderProgress}  = useSpring({
    from:{renderProgress:0},
    to:{renderProgress:(isStartAnimation)?1:0},
    config: animationConfig.bezier_input,
    //duration: 0,
    onFrame: () =>{
      if(bezierTriggeredIndex != -1){
        console.log([progress1.value.toFixed(2),progress2.value.toFixed(2),progress3.value.toFixed(2),progress4.value.toFixed(2)])
        setCurrentSolverDataByIndex([progress1.value.toFixed(2),progress2.value.toFixed(2),progress3.value.toFixed(2),progress4.value.toFixed(2)],index);
        var fps_60 = Math.round((new Date().getTime() - progress1.startTime)/16);
        if(fps_60 %2 ==0){setGraphShouldUpdate(false)}
        else{setGraphShouldUpdate(true)}
      }
    },
    onRest: () => {
      // Maybe Bugs Here
      setBezierTriggeredIndex(-1)
      setGraphShouldUpdate(false)
      setStartAnimation(false)
    }
  })

  const charLocation = (substring:string,string:string) => {
    var a=[0],i=-1;
    while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
    return a;
  }

  const handleBezierTextChange = (e:any) => {
    // Hold the CharaPostion
    var target = e.target;
    var lmtVal = target.value.replace(/[^\?\d,.]/g,'')
    var position = target.selectionStart; // Capture initial position
    
    var shouldFoward = (lmtVal === target.value)

    if((lmtVal.toString().split(".").length - 1) > 4 || (lmtVal.toString().split(",").length - 1) > 3){
      lmtVal=textPreviousValue
      shouldFoward = false;
    }

    if((lmtVal.toString().split(".").length - 1) == 4 && (lmtVal.toString().split(",").length - 1) == 3){
      var dotLocation = charLocation(",",lmtVal.toString());
      var cursorLocation = shouldFoward?position:position-1;
  
      setPrev1(Number(lmtVal.toString().split(",")[0]))
      setTarget1(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[0]),0)))
      setPrev2(Number(lmtVal.toString().split(",")[1]))
      setTarget2(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[1]),0)))
      setPrev3(Number(lmtVal.toString().split(",")[2]))
      setTarget3(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[2]),0)))
      setPrev4(Number(lmtVal.toString().split(",")[3]))
      setTarget4(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[3]),0)))

      setBezierTriggeredIndex(10)
      setGraphShouldUpdate(true)
      setTextPreviousValue(lmtVal);
      setStartAnimation(true)
      setStart1(true)
      setStart2(true)
      setStart3(true)
      setStart4(true)
    }

    setTextBlur(false)
    setTextValue(lmtVal);
    target.value = lmtVal.toString().replace(/\s/g, '');  // This triggers the cursor to move.
    target.selectionEnd = shouldFoward?position:position-1;

  }

  const handleBezierTextBlur = (e:any) => {
    setTextBlur(true)
    var lmtVal = e.target.value.replace(/[^\?\d,.]/g,'')
    if((lmtVal.toString().split(".").length - 1) != 4 && (lmtVal.toString().split(",").length - 1) != 3){
        lmtVal=textPreviousValue
        setTextValue(lmtVal)
        setTextPreviousValue(lmtVal);
    }
  }
  

  const handleBezierTextFocus = (e:any) => {
    setTextBlur(false)
  }
  
  const [transitionScale,setTransitionScale] = useState<number>(0);

  const {transInProgress} = useSpring({
    transInProgress:selectTransition?0:1,
    config: animationConfig.bezier_dragger,
    onFrame: () =>{
      setTransitionScale(transInProgress.value)
    },
  })

  const handleStart=(e:any,ui:any)=>{
  }
  const handleStop=(e:any,ui:any)=>{
    setPrev1(currentSolverData[index][0])
    setPrev2(currentSolverData[index][1])
    setPrev3(currentSolverData[index][2])
    setPrev4(currentSolverData[index][3])
    setTarget1(currentSolverData[index][0])
    setTarget2(currentSolverData[index][1])
    setTarget3(currentSolverData[index][2])
    setTarget4(currentSolverData[index][3])
  }



  const handleDragLeft = (e:any,ui:any) =>{
    var p1V = ui.x/boxWidth;
    var p2V = (boxHeight -  ui.y)/boxHeight
    //setCurrentSolverDataByIndex(Number(p1V.toFixed(2)),index*4+0);
    //setCurrentSolverDataByIndex(Number(p2V.toFixed(2)),index*4+1)
    console.log(Number(p1V.toFixed(2)))
    console.log(Number(p2V.toFixed(2)))
    setCurrentSolverDataByIndex([Number(p1V.toFixed(2)),Number(p2V.toFixed(2)),Number(currentSolverData[index][2]),Number(currentSolverData[index][3])],index)
    setBezierTriggeredIndex(-1)
    setStartAnimation(false)
    setGraphShouldUpdate(!shouldGraphupdate)
   

    setTextValue(
      p1V.toFixed(2) + `,` + p2V.toFixed(2) + `,` + currentSolverData[index][2] + `,` + currentSolverData[index][3]
    )

  }

  const handleDragRight = (e:any,ui:any) =>{
    var p3V = ui.x/boxWidth;
    var p4V = (boxHeight -  ui.y)/boxHeight
   
    // setCurrentSolverDataByIndex(Number(p3V.toFixed(2)),index*4+2);
    // setCurrentSolverDataByIndex(Number(p4V.toFixed(2)),index*4+3)
    setCurrentSolverDataByIndex([Number(currentSolverData[index][0]),Number(currentSolverData[index][1]),Number(p3V.toFixed(2)),Number(p4V.toFixed(2))],index)
    setBezierTriggeredIndex(-1)
    setStartAnimation(false)
    setGraphShouldUpdate(!shouldGraphupdate)

    setTextValue(
      currentSolverData[index][0] + `,` + currentSolverData[index][1] + `,` + p3V.toFixed(2) + `,` + p4V.toFixed(2)
    )

  }



  return (
    <div>
        <CustomSVG
          canShow = {!selectTransition}
          width={boxWidth + boxPadding} 
          height={boxHeight + boxPadding} 
          
          >
          <g
          >
            <CustomBorderline
              isEditable={isEditable}
              x1={boxPadding/2}
              y1={boxPadding/2}
              x2={boxWidth*currentSolverData[index][0]*transitionScale+boxPadding/2} 
              y2={boxHeight*currentSolverData[index][1]*transitionScale+boxPadding/2}   
              strokeWidth={svgStrokeWidth/2}
            />
            <CustomBorderline
              isEditable={isEditable}
              x1={boxWidth*(1-transitionScale) + boxWidth*currentSolverData[index][2]*transitionScale+boxPadding/2}
              y1={boxHeight*(1-transitionScale) + boxHeight*currentSolverData[index][3]*transitionScale+boxPadding/2}
              x2={boxWidth+boxPadding/2} 
              y2={boxHeight+boxPadding/2}   
              strokeWidth={svgStrokeWidth/2}
            />
          </g>
        </CustomSVG>
        {isEditable?<DraggableContainer
          canShow={!selectTransition}
          style={{
            width:`${boxWidth}px`,
            height:`${boxHeight}px`,
            transform:`translate3d(-50%,-50%,0) scale3d(1,1,1)`
          }}
        >

          <Draggable
            axis="both"
            handle=".handle"
            position={{x: boxWidth*currentSolverData[index][0]*transitionScale, y: boxHeight - boxHeight*currentSolverData[index][1]*transitionScale}}
            // position={{x:isDragInit?(boxWidth*currentSolverData[0]*transitionScale):null,y:isDragInit?(boxHeight - boxHeight*currentSolverData[1]*transitionScale):null}}
            scale={1}
            bounds={{top: -boxHeight/2, left: 0, right: boxWidth, bottom: boxHeight+boxHeight/2}}
            // position={null}
            onStart={handleStart}
            onDrag={handleDragLeft}
            onStop={handleStop}
            >
              <DraggableCircle
                className="handle"
                canShow={!selectTransition}
                isEditable={isEditable}
                radius={circleRadius}
                onMouseDown={()=>{
                  //addDragEvent(document.getElementById('draggable_1'),true)
                }}
                style={{
                  // left:`${boxWidth*currentSolverData[0]*transitionScale}px`,
                  // top:`${boxHeight - boxHeight*currentSolverData[1]*transitionScale}px`,
                  // transform:`translate3d(${-circleRadius/2}px,${-circleRadius/2}px,0) scale3d(${transitionScale},${transitionScale},1)`
                  width:`${transitionScale*circleRadius}px`,
                  height:`${transitionScale*circleRadius}px`,
                  left:`${-circleRadius/2*transitionScale}px`,
                  top:`${-circleRadius/2*transitionScale}px`
                }}
              ></DraggableCircle>
          </Draggable>


          <Draggable
            axis="both"
            handle=".handle"
            position={{x:  boxWidth*(1- transitionScale) + boxWidth*currentSolverData[index][2]*transitionScale, y:boxHeight*(1 - currentSolverData[index][3])*transitionScale}}
            // position={{x:isDragInit?(boxWidth*currentSolverData[0]*transitionScale):null,y:isDragInit?(boxHeight - boxHeight*currentSolverData[1]*transitionScale):null}}
            scale={1}
            bounds={{top: -boxHeight/2, left: 0, right: boxWidth, bottom: boxHeight + boxHeight/2}}
            // position={null}
            onStart={handleStart}
            onDrag={handleDragRight}
            onStop={handleStop}
            >
              <DraggableCircle
                className="handle"
                canShow={!selectTransition}
                radius={circleRadius}
                isEditable={isEditable}
                onMouseDown={()=>{
                  //addDragEvent(document.getElementById('draggable_1'),true)
                }}
                style={{
                  // left:`${boxWidth*currentSolverData[0]*transitionScale}px`,
                  // top:`${boxHeight - boxHeight*currentSolverData[1]*transitionScale}px`,
                  // transform:`translate3d(${-circleRadius/2}px,${-circleRadius/2}px,0) scale3d(${transitionScale},${transitionScale},1)`
                  width:`${transitionScale*circleRadius}px`,
                  height:`${transitionScale*circleRadius}px`,
                  left:`${-circleRadius/2*transitionScale}px`,
                  top:`${-circleRadius/2*transitionScale}px`
                }}
              ></DraggableCircle>
          </Draggable>


        </DraggableContainer>:<DraggableContainer
          canShow={!selectTransition}
          style={{
            width:`${boxWidth}px`,
            height:`${boxHeight}px`,
            transform:`translate3d(-50%,-50%,0) scale3d(1,1,1)`
          }}
        >

              <DraggableCircle
                canShow={!selectTransition}
                isEditable={isEditable}
                radius={circleRadius}
                onMouseDown={()=>{
                  //addDragEvent(document.getElementById('draggable_1'),true)
                }}
                style={{
                  left:`${boxWidth*currentSolverData[index][0]*transitionScale}px`,
                  top:`${boxHeight - boxHeight*currentSolverData[index][1]*transitionScale}px`,
                  transform:`translate3d(${-circleRadius/2}px,${-circleRadius/2}px,0) scale3d(${transitionScale},${transitionScale},1)`,
                  width:`${transitionScale*circleRadius}px`,
                  height:`${transitionScale*circleRadius}px`,
                }}
              ></DraggableCircle>

              <DraggableCircle
                canShow={!selectTransition}
                radius={circleRadius}
                isEditable={isEditable}
                onMouseDown={()=>{
                  //addDragEvent(document.getElementById('draggable_1'),true)
                }}
                style={{
                  left:`${boxWidth*(1- transitionScale) + boxWidth*currentSolverData[index][2]*transitionScale}px`,
                  top:`${boxHeight*(1 - currentSolverData[index][3])*transitionScale}px`,
                  transform:`translate3d(${-circleRadius/2}px,${-circleRadius/2}px,0) scale3d(${transitionScale},${transitionScale},1)`,
                  width:`${transitionScale*circleRadius}px`,
                  height:`${transitionScale*circleRadius}px`,
                }}
              ></DraggableCircle>


        </DraggableContainer>
        }
        <TextInput 
        id={'bezier_input'}
        value={textValue}
        isEditable={isEditable}
        step={0.01} 

        style={{
          width:'100%',
          height:'auto',
          marginLeft:'0px',
          background:'transparent',
          border:'none',
          fontSize:'12px',
          position:'absolute',
          bottom:'42px',
        }}

        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          e.preventDefault();
          isEditable?handleBezierTextChange(e):''
          //handleBezierDragInput([0.5,0.2,1.0,1.0])
        }}   

        onKeyUp={(e: React.FormEvent<HTMLInputElement>) => {
          // PressEnter
          if(e.keyCode ===13){
            e.preventDefault();
            isEditable?handleBezierTextBlur(e):''
          }
        }}
        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
          // Out of Focus
          e.preventDefault();
          isEditable?handleBezierTextBlur(e):''
        }}

        onFocus={(e: React.FormEvent<HTMLInputElement>) => {
          // Out of Focus
          e.preventDefault();
          isEditable?handleBezierTextFocus(e):''
        }

        }/>
      </div>
  )
})


export default BezierInputTree;

// Styles

const DraggableContainer = styled.div<
  {
    canShow:boolean;
  }
>`
position:absolute;
left:50%;
top:50%;
display:${p => p.canShow?'block':'none'};
background:transparent;
`

const DraggableCircle = styled.div<
  {
    canShow:boolean;
    radius:number;
    isEditable:boolean;
  }
>`
left:0px;
top:0px;
width:${p => p.radius}px;
height:${p => p.radius}px;
position:absolute;
border-radius:${p => p.radius/2}px;
display:${p => p.canShow?'block':'none'};
background:${p => p.isEditable? p.theme.colors.range_input_thumb:p.theme.colors.range_input_thumb_unactive};
cursor: ${p => p.isEditable?'move':'not-allowed'};
border-radius: ${p => p.radius/2}px;
box-shadow: ${p => p.isEditable?`0px 0px 3px ${p.theme.colors.text_input_text}`:'none'};

:hover {
  background:${p => p.isEditable? p.theme.colors.range_input_thumb_active:p.theme.colors.range_input_thumb_unactive};
}

`

const CustomSVG = styled.svg<{
  canShow:boolean;
}>`
  transform:translate3d(-50%,-50%,0) scale3d(1,-1,1);
  position:absolute;
  left:50%;
  top:50%;
  display:${p => p.canShow?'block':'none'};
  overflow:inherit;
`
const CustomBorderline = styled.line<{
  isEditable:boolean;
}>`
  position: relative;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke:${p => p.isEditable? p.theme.colors.range_input_thumb:p.theme.colors.slider_input_thumb_unactive};
`