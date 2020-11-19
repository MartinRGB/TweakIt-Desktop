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

import { ListSelectStateContext } from '@Context/ListSelectContext';
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';

const InputTree: React.FC<IInputTree> = memo(({ 
  style,
  name,
  defaultVal,
  min,
  max,
}) => {

  const { t, i18n } = useTranslation()
  const [colorMode] = useColorMode();

  const { setCurrentAnimName, setCurrentAnimCalculator, setCurrentAnimData} = useContext(
    AnimatorTypeContext
  );


  const [inputValue, setInputValue] = useState<number>(defaultVal);

  const [previousValue,setPreviousValue] = useState<number>(0);
  const [targetValue,setTargetValue] = useState<number>(0);

  const [isTriggered,setTriggered] = useState<boolean>(false);

  const [mainValue,setMainValue] = useState<number>(defaultVal);

  const { revealProgress } = useSpring({
    from:{revealProgress:previousValue},
    to:{revealProgress:isTriggered?targetValue:previousValue},
    //duration: 250,
    config: animationConfig.slider_drag,
    onFrame: () =>{
      var value = revealProgress.value.toFixed(2);
      setInputValue(Math.min(max,Math.max(Number(value),min)))

    },
    onRest: () => {
      setPreviousValue(inputValue)
      setTriggered(false)
    }
  })

  const handleRangeChange = (e:any) => {
    setPreviousValue(inputValue);
    setTargetValue(Math.min(max,Math.max(e.target.value,min)))
    setTriggered(true)

    //update text
    setMainValue(Math.min(max,Math.max(e.target.value,min)))
  }

  const handleTextChange = (e:any) => {

    setPreviousValue(inputValue);
    setTargetValue(Math.min(max,Math.max(e.target.value,min)))
    setTriggered(true)

    setMainValue(Math.min(max,Math.max(e.target.value,min)))
  }

  const handleTextBlur = (e:any) => {
    // setPreviousValue(inputValue);
    // setTargetValue(Math.min(max,Math.max(e.target.value,min)))
    // setTriggered(true)

    //setMainValue(Math.min(max,Math.max(e.target.value,min)))
  }
  

  return (
    <Frame>
      <div> 
        <p>{name}</p>
        <input type="text" 
          value={mainValue}
          min={min} 
          max={max} 
          step={0.01} 

          onChange={e => {
            e.preventDefault();
            handleTextChange(e)
          }}   

          onKeyUp={e => {
            // PressEnter
            if(e.keyCode ===13){
              e.preventDefault();
              handleTextBlur(e)
            }
          }}
          onBlur={e => {
            // Out of Focus
            e.preventDefault();
            handleTextBlur(e)
            }
          }
        />

        <input 
          type="range" 
          value={inputValue} 
          min={min} 
          max={max} 
          step={0.01} 
          onChange={e => {
            handleRangeChange(e)
          }
          }/>

          {/* <animated.div
              style={{
                transform: interpolate([revealProgress], (r) => `translate3d(${r/200 * 150}px,0px,0px)`)
              }}>
              <Icons.CollapsedArrow />
          </animated.div> */}
      </div>
    </Frame>
  )
})


export default InputTree;

// Styles

const Frame = styled('div')`
  position: relative;
  padding: 1px 0px 1px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color:  ${p => p.theme.colors.text};
  fill: ${p => p.theme.colors.text};
`

const LiTitle = styled.span<{
  isSelected: boolean;
}>`
  vertical-align: middle;
  user-select:none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 11px;
  margin-left: 25px;
  color:${p => (p.isSelected ? p.theme.colors.primary : p.theme.colors.text)};
`

const UlTitle = styled('span')`
  vertical-align: middle;
  user-select:none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 21px;
`
const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed ${p => p.theme.colors.title_background_bottom};
  overflow: hidden;
`

const Toggle = css`
  cursor:pointer
`
