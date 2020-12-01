import React ,{memo} from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const TitleButtonNormal: React.FC<IButton> = memo(({ style,children , onClick}) => {
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
          <div>
            {children}
          </div>
      </Button>
  </animated.div>);

})

const AnimatedContainerCSS = css`
  height:20px;
  width:24px;
  margin-left:8px;
`;

// twmacro
const Button = styled.button`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  height:20px;
  width:24px;
  border-radius:4px;
  padding: 0;
  background: ${p => p.theme.colors.normal_button_bg};
  outline:none;
  // margin-left:8px;
  position:absolute;
  top:0;
  left:0;
  user-select: none;
  border: 0.5px solid rgba(255, 255, 255, 0.06);

  > div > svg{

    height: 20px;
    position: absolute;
    top: -1px;
    text-align: center;
    left: 3px;

    vertical-align: middle;
    fill: ${p => p.theme.colors.text};
  }

  &:active {
    border-style: double;
    background: ${p => p.theme.colors.normal_button_active};
  }

  &:active  > div > svg{
    fill: ${p => p.theme.colors.background};
  }
`;


export default TitleButtonNormal
