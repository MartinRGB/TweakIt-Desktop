import React,{ useContext, useEffect, useState,memo} from 'react';
import styled from '@emotion/styled'
import { css,jsx } from "@emotion/react";
import { useColorMode } from 'theme-ui';
import MainIntroPage from './MainIntroPage'

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'

//animation
import { ADBExpandStateContext } from '@Context/ADBExpandContext';
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';
import MainTweakItPage from '@Sections/MainPanel/MainTweakItPage';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const MainPanel: React.FC = memo(({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const { t ,i18n} = useTranslation()
  const clickLan = () =>{
    i18n.changeLanguage(i18n.language === 'enUs' ? 'zhCn' : 'enUs');
  }
  const clickDark = () =>{
    setColorMode(colorMode === 'default' ? 'dark' : 'default')
  }

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  //TODO Issue:Will caused canvas's re-render
  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );
  
  const {widthProps} = useSpring({
    widthProps: adbIsExpand ? 320 : 0,
    config: animationConfig.panel_slide
  })
  
  //calc(100% - 320px)':'calc(100%)
  return (
    <animated.div
      // static base style
      css={AnimatedContainerCSS}
      // animated dynamic style
      style={{
        width: isGlobalAnimEnable?interpolate([widthProps], (widthProps => `calc(100% - ${widthProps}px)`)):`${adbIsExpand?`calc(100% - 320px)`:`calc(100%)`}`
      }}
    >
      <Container 
        // active={adbIsExpand}
        >
        <MainTweakItPage>
          <Trans>greetings</Trans>
        </MainTweakItPage>
      </Container>
    </animated.div>
  );
})

export default MainPanel


const AnimatedContainerCSS = css`
  // width: 320px;
  // height: calc(100vh - 38px);
  // position: absolute;  
  // height: 100%;
  height: calc(100vh - 52px);
  z-index:8;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.background};

`;
