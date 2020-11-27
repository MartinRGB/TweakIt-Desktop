import React, { useContext, useEffect} from 'react';
import styled from '@emotion/styled'
//import {css} from '@emotion/core'
import { useColorMode,jsx,css} from 'theme-ui'
import TitleButtonNormal from '@Components/TitleButtonNormal'
import TitleButtonToggle from '@Components/TitleButtonToggle'
import Icons from '@Assets/icons';

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'

import { ADBExpandStateContext } from '@Context/ADBExpandContext';

import initState from '@Config/init_state.json'

const TitleBar: React.FC = ({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );

  const { t ,i18n} = useTranslation()

  const clickLan = () =>{
    i18n.changeLanguage(i18n.language === 'enUs' ? 'zhCn' : 'enUs');
  }
  const clickDark = () =>{
    setColorMode(colorMode === 'default' ? 'dark' : 'default')
  }
  const clickADB = () =>{
    setADBExpandState(!adbIsExpand);
  }


  useEffect(() => {
    setColorMode(initState.isDarkMode === true ? 'dark' : 'default')
  }, []);

  return (
    <Container >
      <ContainerBackground></ContainerBackground>
      <TitleBox>
        {children}
      </TitleBox>
      <ButtonLayout>
        <TitleButtonToggle active={adbIsExpand} onClick={clickADB}>
          <Icons.ADB/>
        </TitleButtonToggle>
        <TitleButtonNormal onClick={clickDark}>
          <Icons.DarkMode/>
        </TitleButtonNormal>
        <TitleButtonNormal onClick={clickLan}>
          <Icons.Languages/>
        </TitleButtonNormal>

      </ButtonLayout>
    </Container>
  );
}

export default TitleBar

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
  float: right;
`

const ContainerBackground = styled.div`
  width: 100%;
  height: 100%;
  position:absolute;
  top:0;
  left:0;
  background: linear-gradient(180deg, ${p => p.theme.colors.title_background_top} 0%, ${p => p.theme.colors.title_background_bottom} 100%);
  -webkit-app-region: drag;
  // z-index:10;
`


const Container = styled.div`
    width: 100%;
    height: 38px;
    position:relative;
    // background: linear-gradient(180deg, ${p => p.theme.colors.title_background_top} 0%, ${p => p.theme.colors.title_background_bottom} 100%);
    box-shadow: 0px 2px 14px ${p => p.theme.colors.title_box_shadow};
    // -webkit-app-region: drag;
    z-index:10;
`;
//${props => props.theme.fonts.numberInput};

const TitleBox = styled.div`
    text-align: center;
    line-height:38px;
    font-size:13px;
    position: absolute;
    width: 100%;
    font-family: FUTURA; 
    font-style: normal;
    font-weight: 500;
    letter-spacing: 10px;
    color:${p => p.theme.colors.primary};
`;
