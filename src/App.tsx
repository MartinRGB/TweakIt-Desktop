import React ,{useEffect,useContext,useRef,useState} from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from '@Styles/GlobalStyle'
import styled from '@emotion/styled';


//import Button from './components/Button'
import TitleBar from '@Sections/TitleBar';
import ADBPanel from '@Sections/ADBPanel';
import MainPanel from '@Sections/MainPanel';

// theme-ui
import { ThemeProvider, useColorMode } from 'theme-ui'
import theme from '@Styles/theme'

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'

import ADBExpandStateProvider from "@Context/ADBExpandContext";
import ADBCommandProvider from "@Context/ADBCommandContext";
import CodeBlockProvider from "@Context/CodeBlockContext";
import GlobalAnimationStateProvider from "@Context/GlobalAnimationContext";
import {injectPathEnvironments} from '@Helpers/GlobalEnvironments/PathEnvironments'
import ADBConnectionProvider from "@Context/ADBConnectionContext";
// twmacro

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  const { t ,i18n} = useTranslation()

  useEffect(() => {
    injectPathEnvironments()

  }, [])
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <GlobalAnimationStateProvider>
        <CodeBlockProvider>
        <ADBCommandProvider>
        <ADBExpandStateProvider>
            <ADBConnectionProvider>
            <TitleBar>TWEAKIT</TitleBar>
            <ADBPanel></ADBPanel>
            <MainPanel></MainPanel>
            </ADBConnectionProvider>
        </ADBExpandStateProvider>
        </ADBCommandProvider>
        </CodeBlockProvider>
        </GlobalAnimationStateProvider>
      </ThemeProvider>
    </div>
  )
}



render(<App />, mainElement)
