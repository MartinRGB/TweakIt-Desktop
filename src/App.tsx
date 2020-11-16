import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import tw from 'twin.macro'

import Greetings from './components/Greetings'
//import Button from './components/Button'
import TitleBar from './sections/TitleBar';
import ADBPanel from './sections/ADBPanel';

// theme-ui
import { ThemeProvider } from 'theme-ui'
import theme from './styles/theme.ts'

// i18n
import './translations/i18n'
import { useTranslation, Trans} from 'react-i18next'

import ADBExpandStateProvider from "./sections/ADBPanel/ADBPanel.Context";

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
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <ADBExpandStateProvider>
          <TitleBar></TitleBar>
          <ADBPanel></ADBPanel>
          <Greetings><Trans>greetings</Trans></Greetings>
        </ADBExpandStateProvider>
      </ThemeProvider>
    </>
  )
}

render(<App />, mainElement)
