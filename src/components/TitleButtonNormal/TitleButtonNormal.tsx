import React ,{memo,useContext} from 'react'
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

const TitleButtonNormal: React.FC<IButton> = memo(({buttonSib,buttonCSS,parentStyle, style,children , onClick}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [bind, { delta, down }] = useGesture()
  const {size} = useSpring({
     size: down ? (isGlobalAnimEnable?1:1): 1,  //1.1:1
     immediate: name => down && name === 'x',
     config:animationConfig.button_pressed
  })

  return (
  <div css={buttonCSS}>
  <animated.div 
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
  </animated.div>
  <Sib><Trans>{buttonSib}</Trans></Sib></div>);

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
    position: relative;
    text-align: center;
    vertical-align: middle;
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
`

export default TitleButtonNormal
