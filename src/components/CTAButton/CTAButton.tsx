import React ,{ useContext, useEffect} from 'react';

import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { ICallToActionButton } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

// Call To Action Big Green Btns

const CTAButton:  React.FC<ICallToActionButton> = ({ children , onClick}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
     size: down ? 1.03: 1,
     immediate: name => down && name === 'x',
     config:animationConfig.button_pressed
  })


  return (
  <animated.div 
    css={AnimatedContainerCSS}
    {...bind()} 
    style={
      { 
      transform: interpolate([size], (s) => `translateX(-50%) translateY(-50%) scale3d(${s},${s},${s})`)
      }
    }>
      <Button
        onClick={onClick}>
        <Trans>{children}</Trans>
      </Button>
  </animated.div>);
}

export default CTAButton

const AnimatedContainerCSS = css`
  transform-origin: center center;
  height: max-content;
  width: max-content;
  padding: 10px;
  margin: 0px auto;

  position: absolute;
  left: 50%;
  top: 50%;
`;

// twmacro
const Button = styled.button`
  
  // height:20px;
  // width:24px;
  // border-radius:4px;
  // padding: 0;
  // background: ${p => p.theme.colors.normal_button_bg};
  // outline:none;
  // // margin-left:8px;
  // position:absolute;
  // top:0;
  // left:0;
  // border: 0.5px solid rgba(255, 255, 255, 0.06);

  
  border-radius: 10px;
  padding: 18px 42px;
  background: transparent;
  outline: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  border: 2px solid ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.primary};
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-transform: translateZ(0),scale(1.);

  &:active {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
  }
`;
