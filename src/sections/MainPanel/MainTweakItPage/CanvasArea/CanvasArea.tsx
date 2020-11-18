import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {ListSelectStateContext} from '@Context/ListSelectContext'

const CanvasArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  const { currentAnimation, selectAnimation} = useContext(
    ListSelectStateContext
  );
  return (
    <Container>
      <Trans>greetings</Trans>
      <p css={css`
        text-align:center
      `}>{currentAnimation}</p>
    </Container>
  )
}

export default CanvasArea

const Container = styled.div`
    height: 100%;
    //background:#00CC00;
    display: flex;
    flex-direction: column;
    flex:2;
    min-width:250px;
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`
