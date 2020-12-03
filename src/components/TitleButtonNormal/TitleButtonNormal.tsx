import React ,{memo} from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

const TitleButtonNormal: React.FC<IButton> = memo(({buttonCSS,parentStyle, style,children , onClick}) => {
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

// twmacro
const Button = styled.button`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  padding: 0;
  outline:none;
  top:0;
  left:0;
  position:absolute;
  user-select: none;
  cursor:pointer;
  border-radius:4px;
  border: 0.5px solid rgba(255, 255, 255, 0.06);

  > div > svg{
    position: absolute;
    text-align: center;
    vertical-align: middle;
  }
`;


export default TitleButtonNormal
