import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

const CodeArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();


  return (
    <Container>

    </Container>
  )
}

export default CodeArea

const Container = styled.div`
    //height: 100%;
    height:350px;
    min-height:50px;
    //background:blue;
    display: flex;
    flex-direction: column;
    box-shadow:0px -1px 0px ${p => p.theme.colors.adb_border};
    background:${p => p.theme.colors.main_bottom_bg};
    z-index:1;
    //flex:4;
`
