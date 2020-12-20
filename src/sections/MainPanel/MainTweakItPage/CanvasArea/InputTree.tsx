import ReactDOM from 'react-dom'
import React, { memo, useState, useRef, useEffect, useContext } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import animationConfig from '@Config/animation.json'
import ResizeObserver from 'resize-observer-polyfill'
//import styled from 'styled-components'
import { IInputTree } from "@Types";
// import * as Icons from './ListIcon'

import {execCMD} from '@Helpers/ADBCommand/ADBCommand'

import { useColorMode, jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import { css } from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'



import Icons from '@Assets/icons'

import RangeInput from '@Components/RangeInput'
import TextInput from '@Components/TextInput'
import DescText from '@Components/DescText'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import { GraphUpdateContext } from '@Context/GraphUpdateContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {DurationDataContext} from'@Context/DurationDataContext'

import Solver from '@Helpers/Solver';
import DataDrivenAnimator from '@Helpers/Animator/DataDrivenAnimator'

import {TweakItConnectionContext} from'@Context/TweakItConnectionContext'

const InputTree: React.FC<IInputTree> = memo(({ 
  style,
  isLast,
  isEditable,
  index,
  name,
  //calculator,
  defaultVal,
  min,
  max,
  visible,
}) => {

  //setDurationData,
  const {listDurationData,previousDataRange,currentDataRange,setCurrentSolverDataByIndex,currentSolverData,previousDataMin,currentAnimCalculator,previousSolverData} = useContext(
    AnimatorTypeContext
  );

  const {deviceName,activeActivity,isTweakItAndroidExist,setSelectObjIndex,selectObjIndex,setIsTweakItAndoridExist,setJSONData,jsonData} = useContext(TweakItConnectionContext)

  const {shouldGraphUpdate,setGraphShouldUpdate,triggredIndex,setTriggeredIndex} = useContext(
    GraphUpdateContext
  );
  const {setDurationData} = useContext(DurationDataContext)
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  
  var inputVis;
  if(visible != undefined){
    inputVis = visible;
  }
  else{
    inputVis = true;
  }

  const [rangeValue, setRangeValue] = useState<any>(defaultVal);
  // TODO
  //(previousSolverData[index] === undefined)?0:previousSolverData[index] -> current
  // 0 -> default
  // prev range
  // console.log('============= Input Tree ' + index + '============')
  // console.log('prev SolvData  ---- ' + previousSolverData)
  // console.log('curr SolvData ----' + currentSolverData)
  // console.log('default Value ----' + defaultVal)
  // console.log('prev DataRange  ---- ' + previousDataRange)
  // console.log('curr DataRange ----' + currentDataRange)
  const prevSolverData = (previousSolverData[index] === undefined)?min:(Array.isArray(previousSolverData[index])?previousSolverData[index][0]:previousSolverData[index]);
  const currSolverData = (currentSolverData[index]  === undefined)?defaultVal:currentSolverData[index];
  const prevSolverRange = (previousDataRange[index] === undefined)?1:(Array.isArray(previousDataRange[index])?previousDataRange[index][0]:previousDataRange[index]);
  const prevSolverMin = (previousDataMin[index] === undefined)?0:(Array.isArray(previousDataMin[index])?previousDataMin[index][0]:previousDataMin[index])
  // Not Work for fling
  const transedPrevSolverData = min + (prevSolverData - prevSolverMin)/prevSolverRange*(max-min);
  const [previousRangeValue,setPreviousRangeValue] = useState<number>(min + transedPrevSolverData);
  const [targetRangeValue,setTargetRangeValue] = useState<number>(currSolverData);
  const [isRangeAnimTriggered,setRangeAnimTriggered] = useState<boolean>(false);

  const [textValue,setTextValue] = useState<number>(defaultVal);
  const [textPreviousValue,setTextPreviousValue] = useState<number>(defaultVal);
  const [isTextBlurred,setTextBlur] = useState<boolean>(true);


  //console.log('input tree rerender')
 
  useEffect(() => {

    // pass init duration data to animationBox
    if(name === 'Duration'){
      setDurationData(Math.min(max,Math.max(Number(defaultVal),min)));
    }

    setTriggeredIndex(-1)
    // Maybe Cause Bug
    setCurrentSolverDataByIndex(defaultVal,index);
  }, [])


  //console.log('rerender')

  // 2 Group Control -> 4 Time Spring
  const { sliderProgress } = useSpring({
    from:{sliderProgress:previousRangeValue},
    to:{sliderProgress:isRangeAnimTriggered?targetRangeValue:previousRangeValue},
    config: animationConfig.slider_drag,
    onFrame: () =>{

      if(isGlobalAnimEnable){
        var value = sliderProgress.value.toFixed(2);
        setRangeValue(Math.min(max,Math.max(Number(value),min)))

        if(triggredIndex === index){
    
          setCurrentSolverDataByIndex(Math.min(max,Math.max(Number(value),min)),index);
          var fps_60 = Math.round((new Date().getTime() - sliderProgress.startTime)/16);
          if(fps_60 %2 ==0){
            setGraphShouldUpdate(false)
            //console.log('odd' + fps_60);
          }
          else{
            setGraphShouldUpdate(true)

            //console.log('even' + fps_60);
          }

          // THIS IS KEY BUG ,sth still need update duration the animation should put here
          if(rangeValue === targetRangeValue){
            setTriggeredIndex(-1)
            // if(name === 'Duration'){
            //   setDurationData(Math.min(max,Math.max(Number(value),min)));
            // }
          }
        }
      }

    },
    onRest: () => {
      if(isGlobalAnimEnable){
        setPreviousRangeValue(rangeValue)
        setRangeAnimTriggered(false)
      }
    }
  })




  const handleRangeChange = (e:any) => {



    
    // Put int FinishChange


    if(isGlobalAnimEnable){
      setPreviousRangeValue(rangeValue);
      setTargetRangeValue(Math.min(max,Math.max(e.target.value,min)))
      setTriggeredIndex(index)
      setRangeAnimTriggered(true)
      setGraphShouldUpdate(true)
      if(rangeValue === targetRangeValue){
        if(name === 'Duration'){
          setDurationData(Math.min(max,Math.max(Number(e.target.value),min)));
        }
      }
    }
    else{
      setPreviousRangeValue(rangeValue);
      setTargetRangeValue(Math.min(max,Math.max(Number(e.target.value),min)))
      setTriggeredIndex(index)
      setRangeValue(Math.min(max,Math.max(Number(e.target.value),min)))
      setCurrentSolverDataByIndex(Math.min(max,Math.max(Number(e.target.value),min)),index);
      setGraphShouldUpdate(!shouldGraphUpdate)

      if(rangeValue === targetRangeValue){
        if(name === 'Duration'){
          setDurationData(Math.min(max,Math.max(Number(e.target.value),min)));
        }
      }
      
      setPreviousRangeValue(rangeValue)
    }
    
    //update text
    setTextValue(Math.min(max,Math.max(e.target.value,min)))
  }

  const handleRangeBlur = (e:any) =>{
      setTriggeredIndex(-1)
      console.log('range blur');

      setValueToAndroid(e.target.value);

  }

  const setValueToAndroid = (e:any) =>{
    var newJsonData = jsonData;
      
    newJsonData['animator_list'][selectObjIndex]['animation_data'][name].default = e;

    execCMD(`adb -s ${deviceName} shell content call --uri content://${activeActivity}.tweakit/tweak_call --method "anim_set" --arg "${JSON.stringify(newJsonData)}"`)
  }

  const handleTextChange = (e:any) => {

    // . 0~9
    var lmtVal = e.target.value.replace(/[^\?\d.]/g,'');
    // Hold the CharaPostion
    var target = e.target;
    var position = target.selectionStart; // Capture initial position
    var shouldFoward = (lmtVal === target.value)

    //console.log(target.selectionEnd)

    // only 1 . in Input Area
    if((lmtVal.split(".").length - 1) > 1){
      lmtVal=textPreviousValue
      shouldFoward = false;
    }
    else{
      
    }

    if(isGlobalAnimEnable){
      setPreviousRangeValue(rangeValue);
      setTargetRangeValue(Math.min(max,Math.max(Number(lmtVal),min)))
      setTriggeredIndex(index)
      setRangeAnimTriggered(true)
      setGraphShouldUpdate(true)
      if(rangeValue === targetRangeValue){
        if(name === 'Duration'){
          setDurationData(Math.min(max,Math.max(Number(lmtVal),min)));
        }
      }
    }
    else{
      setPreviousRangeValue(rangeValue);
      setTargetRangeValue(Math.min(max,Math.max(Number(lmtVal),min)))
      setTriggeredIndex(index)
      setRangeValue(Math.min(max,Math.max(Number(lmtVal),min)))
      setCurrentSolverDataByIndex(Math.min(max,Math.max(Number(lmtVal),min)),index);
      setGraphShouldUpdate(!shouldGraphUpdate)
      setTriggeredIndex(-1)
      if(rangeValue === targetRangeValue){
        if(name === 'Duration'){
          setDurationData(Math.min(max,Math.max(Number(lmtVal),min)));
        }
      }
      setPreviousRangeValue(rangeValue)

    }

    setTextBlur(false)
    setTextValue(lmtVal)
    setTextPreviousValue(lmtVal);

    target.value = lmtVal.replace(/\s/g, '');  // This triggers the cursor to move.
    target.selectionEnd = shouldFoward?position:position-1;
  }


  const handleTextBlur = (e:any) => {
    setTextValue(Math.min(max,Math.max(e.target.value,min)))
    console.log('text blur');
    setValueToAndroid(Math.min(max,Math.max(e.target.value,min)));
  }
  
  const handleTextFocus = (e:any) => {
    console.log('focus')
    setTextBlur(false)
  }

  return (
    <Frame>
      <InputContainer
        visible={inputVis}
        isLast={isLast}
      > 
        <DescText
        style={{
          width:'86px',
          lineHeight: '16px'
        }}
        >{name}</DescText>
        <TextInput 
        value={textValue}
        isAnimationEnable={isGlobalAnimEnable}
        // min={min} 
        // max={max} 
        isEditable={isEditable}
        step={0.01} 

        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          e.preventDefault();
          isEditable?handleTextChange(e):''
        }}   

        onKeyUp={(e: React.FormEvent<HTMLInputElement>) => {
          // PressEnter
          if(e.keyCode ===13){
            e.preventDefault();
            isEditable?handleTextBlur(e):''
          }
        }}
        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
          // Out of Focus
          e.preventDefault();
          isEditable?handleTextBlur(e):''
        }}

        onFocus={(e: React.FormEvent<HTMLInputElement>) => {
          // Out of Focus
          e.preventDefault();
          isEditable?handleTextFocus(e):''
        }

        }/>

        <RangeInput 
          style={{
            marginLeft:'12px',
          }}
          value={rangeValue} 
          isEditable={isEditable}
          min={min} 
          isAnimationEnable={isGlobalAnimEnable}
          max={max} 
          step={0.01} 
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            e.preventDefault();
            isEditable?handleRangeChange(e):''
          }}

          onKeyUp={(e: React.FormEvent<HTMLInputElement>) => {
            e.preventDefault();
            isEditable?handleRangeBlur(e):''
          }}
          onBlur={(e: React.FormEvent<HTMLInputElement>) => {

            e.preventDefault();
            isEditable?handleRangeBlur(e):''
          }}

          />
      </InputContainer>
    </Frame>
  )
})


export default InputTree;

// Styles

const InputContainer = styled.div<
  {
    isLast:boolean;
    visible:boolean;
  }
>`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding-left: 28px;
  padding-right: 28px;
  height: 16px;
  display:  ${p => (p.visible)?'flex':'none'};
  flex-direction: row;
  margin-bottom:  ${p => p.isLast?'0px':'16px'};
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
