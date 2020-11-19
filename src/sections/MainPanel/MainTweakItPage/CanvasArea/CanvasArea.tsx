import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {ListSelectStateContext} from '@Context/ListSelectContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import InputTree from './InputTree'

const CanvasArea: React.FC = ({children}) => {
  
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();
  const { currentAnimationItem, selectAnimationItem} = useContext(
    ListSelectStateContext
  );

  const currentAnimationName = currentAnimationItem.split("_").pop();

  const { currentAnimName, currentAnimCalculator, currentAnimData} = useContext(
    AnimatorTypeContext
  );


  return (
    <Container>
      <AnimationTitle><Trans>{currentAnimName}</Trans></AnimationTitle>
      {
          Object.entries(currentAnimData).map(function (data:any,index:number) {
            return (
              <InputTree 
                  name={data[0]}
                  defaultVal={data[1].default}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName+index}
                >
              </InputTree>
            )
          })
      }
    </Container>
  )
}

export default CanvasArea

const AnimationTitle = styled.p`
  text-align:center;
  opacity:0.5;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  padding-top:24px;
  color:${p => p.theme.colors.text};
`

const Container = styled.div`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    flex:2;
    min-width:250px;
    z-index:1;
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`
