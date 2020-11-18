import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

const SelectArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();


  return (
    <Container>

    </Container>
  )
}

export default SelectArea

const Container = styled.div`
    width:100%;
    height: 50px;
    min-height:50px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 0px ${p => p.theme.colors.adb_border};
`
