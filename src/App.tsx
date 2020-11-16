import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import tw from 'twin.macro'

import Greetings from './components/Greetings'
//import Button from './components/Button'

const Button = styled.button`
  ${tw`mt-4 p-2 text-white bg-blue-600`}
`;

const Input = () => <input tw="mt-4 p-2 text-white bg-red-600" />
//const Buttons = () => <Button tw="mt-4 p-2 text-white bg-blue-600">click</Button>
const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Greetings />
      <Input></Input>
      <Button>Click</Button>
    </>
  )
}

render(<App />, mainElement)
