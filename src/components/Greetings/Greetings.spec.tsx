import React from 'react'
import { render } from '@testing-library/react'

import Greetings from './index'

test('Greetings should renders', () => {
  const { getByText, getByAltText } = render(<Greetings />)

  expect(
    getByText('An ![Electron](https://img.shields.io/badge/-Electron-000?&logo=Electron)Electron boilerplate including TypeScript, React, TailWindCSS, Emotion, Jest and ESLint.')
  ).toBeTruthy()
  expect(getByAltText('ReactJS logo')).toBeTruthy()
})
