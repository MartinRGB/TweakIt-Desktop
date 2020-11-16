import React,{ useContext, useEffect} from 'react';
import styled from '@emotion/styled'
import { jsx,useColorMode} from 'theme-ui'
import Icons from '../../icons';

// i18n
import '../../translations/i18n'
import { useTranslation, Trans} from 'react-i18next'
import { ADBExpandStateContext } from '../ADBPanel/ADBPanel.Context';

const TitleBar: React.FC = ({ children }) => {
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

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );
  

  return (
    <Container
      active={adbIsExpand}
    >
      
    </Container>
  );
}

export default TitleBar


const Container = styled.div<
{
  active:boolean;
}
>`
    width: 320px;
    height: calc(100vh - 38px);
    position:absolute;
    transition:all 0.3s;
    transition-timing-function: cubic-bezier(0,0,0.2,1);
    right:${p => (p.active? '0px':'-320px')};
    background: ${p => p.theme.colors.adb_background};
    box-shadow: -1px 0px 0px ${p => p.theme.colors.adb_border};
`;
