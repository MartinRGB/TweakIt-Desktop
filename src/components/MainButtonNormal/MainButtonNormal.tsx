import React from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const MainButtonNormal: React.FC<IButton> = ({ style,children , onClick}) => {
  const [colorMode, setColorMode] = useColorMode()

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
     size: down ? 1.1: 1,
     immediate: name => down && name === 'x',
     config:animationConfig.button_pressed
  })


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
        onClick={onClick}>
        <CustomSpan>{children}</CustomSpan>
      </Button>
  </animated.div>);

}

const AnimatedContainerCSS = css`
  height:16px;
  flex:1;
  display:flex;
`;

// twmacro
const Button = styled.button`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  width: 40px;
  height: 16px;
  border-radius:4px;
  padding: 0;
  background: ${p => p.theme.colors.normal_button_bg};
  outline:none;
  // margin-left:8px;
  margin: 0 auto;
}
  border: 0.5px solid rgba(255, 255, 255, 0.06);
  > span{
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  &:active {
    border-style: double;
    background: ${p => p.theme.colors.normal_button_active};
  }

  &:active  > span{
    color: ${p => p.theme.colors.background};
  }
`;

const CustomSpan = styled.span`
text-align: center;
font-family: ${props => props.theme.fonts.numberInput};
font-style: normal;
font-weight: bold;
font-size: 11px;
line-height: 15px;
`


export default MainButtonNormal
