import React ,{ useContext, useEffect} from 'react';
import { Image, Text } from './styles' // Container
import styled from 'styled-components'
import '../../translations/i18n'
import { useTranslation, Trans, Translation } from 'react-i18next'
import appIcon from '../../icons/appIcon.png'
import mainHeroImg from '../../img/main_hero_img.jpg'
import mainHeroBg from '../../img/main_hero_bg.jpg'

import { ADBExpandStateContext } from '../../sections/ADBPanel/ADBPanel.Context';

const Greetings: React.FC = ({ children }) => {
  const { t ,i18n} = useTranslation()

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );
  

  return (
    <Container
      active={adbIsExpand}
    >
      <Image
        src={appIcon}
        alt="ReactJS logo"
      />
      <Text><Trans>title</Trans> —— {children}</Text>
    </Container>
  )
}

export default Greetings

const Container = styled.div<
{
  active:boolean;
}
>`
    height: 100%;
    width:${p => (p.active? 'calc(100% - 320px)':'calc(100%)')};;
    transition:all 0.3s;
    transition-timing-function: cubic-bezier(0,0,0.2,1);
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`