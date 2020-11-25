import React,{ useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'
import MainIntroPage from './MainIntroPage'

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'

//animation
import { ADBExpandStateContext } from '@Context/ADBExpandContext';
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';
import MainTweakItPage from '@Sections/MainPanel/MainTweakItPage';


const MainPanel: React.FC = ({ children }) => {
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
        width: interpolate([widthProps], (widthProps => `calc(100% - ${widthProps}px)`))
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
}

export default MainPanel


const AnimatedContainerCSS = css`
  // width: 320px;
  // height: calc(100vh - 38px);
  // position: absolute;  
  // height: 100%;
  height: calc(100vh - 38px);
  z-index:8;
`;

const Container = styled.div<
{
  active:boolean;
}
>`
    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.background};

`;
