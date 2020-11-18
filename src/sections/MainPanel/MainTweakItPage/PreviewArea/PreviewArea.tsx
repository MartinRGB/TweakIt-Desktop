import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

const PreviewArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();


  return (
    <Container>

    </Container>
  )
}

export default PreviewArea

const Container = styled.div`
    height: 100%;
    //background:#00FF00;
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
`
