import React, { useContext, useEffect} from 'react';
import styled from '@emotion/styled'
import { jsx,useColorMode} from 'theme-ui'
import TitleButtonNormal from '../../components/TitleButtonNormal'
import TitleButtonToggle from '../../components/TitleButtonToggle'
import Icons from '../../icons';

// i18n
import '../../translations/i18n'
import { useTranslation, Trans} from 'react-i18next'

import { ADBExpandStateContext } from '../ADBPanel/ADBPanel.Context';

const TitleBar: React.FC = ({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );

  const { t ,i18n} = useTranslation()

  useEffect(() => {}, []);

  const clickLan = () =>{
    i18n.changeLanguage(i18n.language === 'enUs' ? 'zhCn' : 'enUs');
  }
  const clickDark = () =>{
    setColorMode(colorMode === 'default' ? 'dark' : 'default')
  }
  const clickADB = () =>{
    setADBExpandState(!adbIsExpand);
  }


  return (
    <Container >
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

const Container = styled.div`
    width: 100%;
    height: 38px;
    background: linear-gradient(180deg, ${p => p.theme.colors.title_background_top} 0%, ${p => p.theme.colors.title_background_bottom} 100%);
    box-shadow: 0px 4px 4px ${p => p.theme.colors.title_box_shadow};
    -webkit-app-region: drag;
`;


const TitleBox = styled.div`
    text-align: center;
    line-height:38px;
    font-size:12px;
    font-weight: 500;
    color:${p => p.theme.colors.primary};
`;