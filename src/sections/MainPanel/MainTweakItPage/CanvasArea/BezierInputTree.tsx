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


import RangeInput from '@Components/RangeInput'
import TextInput from '@Components/TextInput'
import BezierTextInput from '@Components/BezierTextInput'
import DescText from '@Components/DescText'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import { GraphUpdateContext } from '@Context/GraphUpdateContext'

const BezierInputTree: React.FC<IInputTree> = memo(({ 
  style,
  isLast,
  isEditable,
  index,
  name,
  defaultVal,
}) => {

  const {setCurrentSolverDataByIndex} = useContext(
    AnimatorTypeContext
  );

  const {shouldGraphUpdate,setGraphShouldUpdate,triggredIndex,setTriggeredIndex} = useContext(
    GraphUpdateContext
  );


  const { t, i18n } = useTranslation()
  const [colorMode] = useColorMode();

  const [bezierRangeValue, setBezierRangeValue] = useState<any>(defaultVal);
  const [bezierPreviousRangeValue,setBezierPreviousRangeValue] = useState<any>(0);
  const [bezierTargetRangeValue,setBezierTargetRangeValue] = useState<any>(0);
  const [isBezierRangeAnimTriggered,setBezierRangeAnimTriggered] = useState<boolean>(false);


  const [textValue,setTextValue] = useState<number>(defaultVal);
  const [textPreviousValue,setTextPreviousValue] = useState<number>(defaultVal);
  const [isTextBlurred,setTextBlur] = useState<boolean>(true);

  //console.log('input tree rerender')
  
  useEffect(() => {
    setTriggeredIndex(-1)
  }, [])

  const {bezierFakeSliderProgress}  = useSpring({
    from:{bezierFakeSliderProgress:bezierPreviousRangeValue},
    to:{bezierFakeSliderProgress:(isBezierRangeAnimTriggered)?bezierTargetRangeValue:bezierPreviousRangeValue},
    config: animationConfig.bezier_input,
    //easings:easings.easeExpOut(4),
    //duration:16,
    onFrame: () =>{

      var value = bezierFakeSliderProgress.value.toFixed(2);
      setBezierRangeValue(Math.min(1,Math.max(Number(value),0)))
      //console.log('bezier trigger')
    },
    onRest: () => {
      setBezierPreviousRangeValue(bezierTargetRangeValue)
      setBezierRangeAnimTriggered(false)
    }
  })

  const { bezierCurveProgress } = useSpring({
    from:{bezierCurveProgress:bezierPreviousRangeValue},
    to:{bezierCurveProgress:(shouldGraphUpdate && isBezierRangeAnimTriggered)?bezierTargetRangeValue:bezierPreviousRangeValue},
    config: animationConfig.graph_trasition,
    onFrame: () =>{
      
      var value = bezierFakeSliderProgress.value.toFixed(2);
      if(triggredIndex !=-1){
        setCurrentSolverDataByIndex(value,triggredIndex);
      }
      var fps_60 = Math.round((new Date().getTime() - bezierCurveProgress.startTime)/16);
      if(fps_60 %2 ==0){
        setGraphShouldUpdate(false)
      }
      else{
        setGraphShouldUpdate(true)
      }

    },
    onRest: () => {
      //console.log('bezier stop')
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
  
  
      if(cursorLocation<=dotLocation[1]){
        setBezierPreviousRangeValue(Number(textValue.toString().split(",")[0]))
        setBezierTargetRangeValue(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[0]),0)))
        setTriggeredIndex(0)
        setBezierRangeAnimTriggered(true)
        setGraphShouldUpdate(true)
      }
      else if (cursorLocation > dotLocation[1] && cursorLocation<=dotLocation[2]){
        setBezierPreviousRangeValue(Number(textValue.toString().split(",")[1]))
        setBezierTargetRangeValue(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[1]),0)))
        setTriggeredIndex(1)
        setBezierRangeAnimTriggered(true)
        setGraphShouldUpdate(true)
      }
      else if (cursorLocation > dotLocation[2] && cursorLocation<=dotLocation[3]){
        setBezierPreviousRangeValue(Number(textValue.toString().split(",")[2]))
        setBezierTargetRangeValue(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[2]),0)))
        setTriggeredIndex(2)
        setBezierRangeAnimTriggered(true)
        setGraphShouldUpdate(true)
      }
      else{
        setBezierPreviousRangeValue(Number(textValue.toString().split(",")[3]))
        setBezierTargetRangeValue(Math.min(1,Math.max(Number(lmtVal.toString().split(",")[3]),0)))
        setTriggeredIndex(3)
        setBezierRangeAnimTriggered(true)
        setGraphShouldUpdate(true)
      } 

      setTextPreviousValue(lmtVal);
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


  return (
    <Frame>
      <InputContainer
        isLast={isLast}
      > 
        <DescText
        style={{
          width:'66px',
          lineHeight: '16px'
        }}
        >{name}</DescText>
        <TextInput 
        value={textValue}
        isEditable={isEditable}
        step={0.01} 

        style={{
          width:'100%',
          marginLeft:'12px',
          background:'transparent',
          border:'none',
          fontSize:'12px',
        }}

        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          e.preventDefault();
          isEditable?handleBezierTextChange(e):''
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
      </InputContainer>
    </Frame>
  )
})


export default BezierInputTree;

// Styles

const InputContainer = styled.div<
  {
    isLast:boolean;
  }
>`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding-left: 28px;
  padding-right: 28px;
  height: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom:  ${p => p.isLast?'0px':'24px'};
`

const Frame = styled('div')`
  position: relative;
  padding: 1px 0px 1px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color:  ${p => p.theme.colors.text};
  fill: ${p => p.theme.colors.text};
`
