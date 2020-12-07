import React,{memo,useContext}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IButton } from "@Types";

import { useTranslation, Trans, Translation } from 'react-i18next'
import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const MainButtonToggle: React.FC<IButton> = memo(({ buttonCSS,parentStyle,style,children , onClick,active}) => {
  useTranslation();
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
     size: down ? (isGlobalAnimEnable?1.1:1): 1,
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
        height:`16px`,
        flex:`1`,
        display:`flex`,
        transform: interpolate([size], (s) => `scale(${s})`),
      }
    }>
      <Button
        style={style}
        onClick={onClick}
        isAnimationEnable={isGlobalAnimEnable}
        active={active}>
        <Trans>{children}</Trans>
      </Button>
  </animated.div>);

})

// twmacro
const Button = styled.button<
{ 
  active:boolean;
  isAnimationEnable:boolean;
}
>`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  width:100%;
  border-radius:2px;
  align-items: center;
  display: inline-flex;
  flex-direction: row;

  padding: 0;
  outline:none;
  margin: 0 auto;
  user-select: none;
  cursor:pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.06);

  background: ${p => (p.active? p.theme.colors.toggle_button_bg:p.theme.colors.normal_button_bg)};
  transition:${p => p.isAnimationEnable?'all 0.2s':''};

  > div{
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  > span{
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
    font-size: 11px;
    line-height: 16px;
    word-break: keep-all;
    position: relative;
    color: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }
  > svg{
    transition:${p => p.isAnimationEnable?'all 0.2s':''};
    position: relative;
    fill: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  &:hover {
    background: ${p => p.active?'':p.theme.colors.toggle_button_hover_bg};
    > span{
      opacity:0.9;
    }
    > svg{
      opacity:0.9;
    }
  }

  &:active {
    border-style: double;
    background: ${p => p.theme.colors.normal_button_active};

    > div{
      color: ${p => (p.active? p.theme.colors.text:p.theme.colors.background)};
    }
    > span{
      color: ${p => (p.active? p.theme.colors.background:p.theme.colors.background)};
    }
    > svg{
      fill: ${p => (p.active? p.theme.colors.background:p.theme.colors.background)};
    }
  }

`;



export default MainButtonToggle
