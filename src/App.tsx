import React ,{useEffect} from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from '@Styles/GlobalStyle'
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import tw from 'twin.macro'

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
import ADBConnectProvider from "@Context/ADBConnectContext";
import CodeBlockProvider from "@Context/CodeBlockContext";
import {injectPathEnvironments} from '@Helpers/GlobalEnvironments/PathEnvironments'
import animatorList from '@Config/animator_list.json';


// twmacro
const Button = styled.button`
  ${tw`mt-4 p-2 text-white bg-blue-600`}
`;

// pure tw
const Input = () => <input tw="mt-4 p-2 text-white bg-red-600" />
//const Buttons = () => <Button tw="mt-4 p-2 text-white bg-blue-600">click</Button>

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  const { t ,i18n} = useTranslation()
  //console.log(animatorList)
  useEffect(() => {
    injectPathEnvironments()
  }, [])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <CodeBlockProvider>
        <ADBConnectProvider>
        <ADBExpandStateProvider>
          <TitleBar>TWEAKIT</TitleBar>
          <ADBPanel></ADBPanel>
          <MainPanel></MainPanel>
        </ADBExpandStateProvider>
        </ADBConnectProvider>
        </CodeBlockProvider>
      </ThemeProvider>
    </div>
  )
}

const BodyDiv = styled.div``

render(<App />, mainElement)
