import React ,{ useContext} from 'react';
import styled from '@emotion/styled';

import { Trans } from 'react-i18next'
import '@Context/i18nContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';


const CanvasTitle: React.FC = ({}) => {
  
  const { currentAnimName} = useContext(
    AnimatorTypeContext
  ); 

  return (
      <AnimationTitle>
        {currentAnimName? 
          <Trans>{currentAnimName}</Trans>:
          <Trans>select_an_animator</Trans>
        }
      </AnimationTitle>

  )
}

export default CanvasTitle


const AnimationTitle = styled.p`
  text-align:center;
  opacity:0.5;
  font-family: ${props => props.theme.fonts.headText};
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 21px;
  padding-top:24px;
  color:${p => p.theme.colors.text};
`