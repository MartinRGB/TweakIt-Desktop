import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const TitleButtonToggle: React.FC<IButton> = memo(({ style,children , onClick, active}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? 1.1: 1,
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })


  // return <Button
  //         onClick={onClick}
  //         active={active} >
  //         {children}
  //       </Button>
  return (
    <animated.div 
      css={AnimatedContainerCSS}
      {...bind()} 
      style={
        { 
        transform: interpolate([size], (s) => `scale(${s})`)
        }
      }>
        <Button
          style={style}
          onClick={onClick}
          active={active}>
          {children}
        </Button>
    </animated.div>);
})

const AnimatedContainerCSS = css`
  height:20px;
  width:24px;
  margin-left:20px;
  margin-right:13px;
`;

// twmacro
const Button = styled.button<
{ 
  active:boolean;
}
>`
  height:20px;
  width:24px;
  border-radius:4px;
  padding: 0;
  background:${p => (p.active? p.theme.colors.toggle_button_bg:p.theme.colors.normal_button_bg)};
  outline:none;
  // margin-left:20px;
  // margin-right:13px;
  position:absolute;
  top:0;
  left:0;
  user-select: none;
  border: 0.5px solid rgba(255, 255, 255, 0.06);
  cursor:pointer;
  
  > svg{
    height: 20px;
    position: absolute;
    top: -1px;
    text-align: center;
    left: 4px;

    vertical-align: middle;
    fill: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  &:active {
    border-style: double;
    background:${p => p.theme.colors.toggle_button_active};;
  }

  // &:active  > svg{
  //   fill: ${p => (p.active? p.theme.colors.text:p.theme.colors.background)};
  // }
`;


export default TitleButtonToggle
