import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IButton } from "@Types";
import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const TitleButtonToggle: React.FC<IButton> = memo(({buttonCSS,parentStyle,buttonSib, style,children , onClick, active }) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
    size: down ? (isGlobalAnimEnable?1:1): 1, //1.1:1
    immediate: name => down && name === 'x',
    config:animationConfig.button_pressed
 })

  return (
    <Container css={buttonCSS}>
    <animated.div 
      
      {...bind()} 
      style={
        { 
          ...parentStyle,
          transform: interpolate([size], (s) => `scale(${s})`),
          position: `relative`,
          display: `flex`
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
    </animated.div>
    <Sib><Trans>{buttonSib}</Trans></Sib></Container>);
})

const Container = styled.div`

display: inline-flex;
flex-direction: column;
-webkit-app-region: no-drag;

`

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
  position: relative;
  background:${p=>p.active?p.theme.colors.toggle_button_bg:p.theme.colors.normal_button_bg};
  > svg{
    position: relative;
    vertical-align: middle;
    text-align: center;
    fill: ${p=>p.active?p.theme.colors.background:p.theme.colors.text};
  }

  &:active {
    border-style: double;
    background:${p=>p.theme.colors.toggle_button_active};

    > svg{
      fill: ${p=>p.active?'':p.theme.colors.background};
      opacity:0.8;
    }
  }

`;

const Sib = styled.p`

  display: block;
  position: relative;
  text-align: center;
  margin-top: 6px;
  color: ${p => p.theme.colors.text};
  line-height: 14px;
  font-size: 8px;
  transform: scale3d(1.15,1.15,1);
  font-weight: 500;
  font-family: ${p => p.theme.fonts.headText};
  user-select:none;
`

export default TitleButtonToggle
