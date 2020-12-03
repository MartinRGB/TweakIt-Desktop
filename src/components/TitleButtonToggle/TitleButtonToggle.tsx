import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const TitleButtonToggle: React.FC<IButton> = memo(({buttonCSS,parentStyle, style,children , onClick, active }) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

  return (
    <animated.div 
      css={buttonCSS}
      {...bind()} 
      style={
        { 
          ...parentStyle,
          transform: interpolate([size], (s) => `scale(${s})`),
        }
      }>
        <Button
          style={{
            ...style,
            }
          }
          onClick={onClick}
          //css={buttonCSS}
          active={active}>
          {children}
        </Button>
    </animated.div>);
})

// twmacro
const Button = styled.button<
{ 
  active:boolean;
}
>`
  padding: 0;
  outline:none;
  position:absolute;
  top:0;
  left:0;
  user-select: none;
  cursor:pointer;
  border-radius:4px;
  border: 0.5px solid rgba(255, 255, 255, 0.06);

  > svg{
    position: absolute;
    vertical-align: middle;
  }

  &:active {
    border-style: double;
  }

`;


export default TitleButtonToggle
