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

import Icons from '@Assets/icons'

import RangeInput from '@Components/RangeInput'
import TextInput from '@Components/TextInput'
import DescText from '@Components/DescText'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';

const InputTree: React.FC<IInputTree> = memo(({ 
  style,
  index,
  name,
  defaultVal,
  min,
  max,
}) => {

  const {setCurrentSolverDataByIndex} = useContext(
    AnimatorTypeContext
  );

  const { t, i18n } = useTranslation()
  const [colorMode] = useColorMode();

  const [rangeValue, setRangeValue] = useState<number>(defaultVal);
  const [previousRangeValue,setPreviousRangeValue] = useState<number>(0);
  const [targetRangeValue,setTargetRangeValue] = useState<number>(0);
  const [isRangeAnimTriggered,setRangeAnimTriggered] = useState<boolean>(false);

  const [textValue,setTextValue] = useState<number>(defaultVal);
  const [isTextBlurred,setTextBlur] = useState<boolean>(true);

  const { revealProgress } = useSpring({
    from:{revealProgress:previousRangeValue},
    to:{revealProgress:isRangeAnimTriggered?targetRangeValue:previousRangeValue},
    config: animationConfig.slider_drag,
    onFrame: () =>{
      // console.log(previousRangeValue)
      // console.log(targetRangeValue)
      // console.log(revealProgress)
      var value = revealProgress.value.toFixed(2);
      setCurrentSolverDataByIndex(value,index);
      setRangeValue(Math.min(max,Math.max(Number(value),min)))

    },
    onRest: () => {
      setPreviousRangeValue(rangeValue)
      setRangeAnimTriggered(false)
    }
  })

  const handleRangeChange = (e:any) => {
    setPreviousRangeValue(rangeValue);
    setTargetRangeValue(Math.min(max,Math.max(e.target.value,min)))
    setRangeAnimTriggered(true)

    //update text
    setTextValue(Math.min(max,Math.max(e.target.value,min)))
  }

  const handleTextChange = (e:any) => {

    // - . 0~9
    var lmtVal = e.target.value.replace(/[^\-?\d.]/g,'')

    if(lmtVal != '-'){
      setPreviousRangeValue(rangeValue);
      setTargetRangeValue(Math.min(max,Math.max(Number(lmtVal),min)))
      setRangeAnimTriggered(true)
    }

    setTextBlur(false)
    setTextValue(lmtVal)

  }

  const handleTextBlur = (e:any) => {
    setTextBlur(true)
    setTextValue(Math.min(max,Math.max(e.target.value,min)))
  }
  
  const handleTextFocus = (e:any) => {
    setTextBlur(false)
  }
  

  return (
    <Frame>
      <InputContainer> 
        <DescText
        style={{
          width:'66px',
          lineHeight: '16px'
        }}
        >{name}</DescText>
        <TextInput 
        value={textValue}
        // min={min} 
        // max={max} 
        step={0.01} 

        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          e.preventDefault();
          handleTextChange(e)
        }}   

        onKeyUp={(e: React.FormEvent<HTMLInputElement>) => {
          // PressEnter
          if(e.keyCode ===13){
            e.preventDefault();
            handleTextBlur(e)
          }
        }}
        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
          // Out of Focus
          e.preventDefault();
          handleTextBlur(e)
          }
        }

        onFocus={(e: React.FormEvent<HTMLInputElement>) => {
          // Out of Focus
          e.preventDefault();
          handleTextFocus(e)
          }

        }/>

        <RangeInput 
          style={{
            marginLeft:'12px',
          }}
          value={rangeValue} 
          min={min} 
          max={max} 
          step={0.01} 
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            handleRangeChange(e)
          }} />
      </InputContainer>
    </Frame>
  )
})


export default InputTree;

// Styles

const InputContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding-left: 28px;
  padding-right: 28px;
  height: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
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
