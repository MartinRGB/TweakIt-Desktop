import React ,{ useContext} from 'react';
import styled from '@emotion/styled';

import { Trans } from 'react-i18next'
import '@Context/i18nContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import initState from '@Config/init_state.json'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const CanvasTitle: React.FC = ({}) => {
  
  const { currentAnimName} = useContext(
    AnimatorTypeContext
  ); 
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  return (
      <AnimationTitle isAnimationEnable={isGlobalAnimEnable}>
          <Trans>{(currentAnimName)?currentAnimName:'select_an_animator'}</Trans>
      </AnimationTitle>

  )
}

export default CanvasTitle


const AnimationTitle = styled.p<{
  isAnimationEnable:boolean;
}>`
  text-align:center;
  opacity:0.5;
  font-family: ${props => props.theme.fonts.headText};
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 21px;
  padding-top:24px;
  user-select: none;
  color:${p => p.theme.colors.text};
  z-index:1;
  transition: ${p => p.isAnimationEnable?'color 0.2s':''};
`
