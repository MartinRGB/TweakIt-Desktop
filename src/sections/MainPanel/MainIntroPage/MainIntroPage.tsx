import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
// import i18n from '@i18n'
import '@Context/i18nContext'

// import CTAButton from '../../../components/CTAButton'
import CTAButton from '@Components/CTAButton'

import { ADBExpandStateContext } from '@Context/ADBExpandContext';


import appIcon from '@Assets/img/appIcon.png'
import mainHeroImg from '@Assets/img/main_hero_img.png'
import mainHeroBg from '@Assets//img/main_hero_bg.jpg'
import mainIconImg from '@Assets//img/main_icon.png'

const MainIntroPage: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );

  return (
    <Container
      active={adbIsExpand}
    >
      <ImageContainer>
        <ImageBackground
          darkmode={((colorMode === 'dark')?true:false)}
          src={mainHeroBg}
          alt="BackgroundImage"
        />
        <ImageHero
          src={mainHeroImg}
          alt="HeroImage"
        />
        <LogoContainer>
          <ImageIcon
            src={mainIconImg}
            alt="Icon">
          </ImageIcon>
          <TextIcon>
            TweakIt Android
          </TextIcon>
          <TextDesc><Trans>title</Trans> —— {children}</TextDesc>
        </LogoContainer>
      </ImageContainer>
      <TextContainer>
        <CTAButton><Trans>connect_tweakit_android</Trans></CTAButton>
      </TextContainer>
    </Container>
  )
}

export default MainIntroPage

const Container = styled.div<
{
  active:boolean;
}
>`
    height: 100%;
    // width:${p => (p.active? 'calc(100% - 320px)':'calc(100%)')};
    // transition:all 0.3s;
    // transition-timing-function: cubic-bezier(0,0,0.2,1);
    // padding: 25px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
`

const ImageContainer = styled.div`
    width: 100%;
    height:600px;
    position: relative;

`

const ImageHero = styled.img`
    width: 100%;
    height:100%;
    object-fit: contain;
    position: absolute;

`

const ImageBackground = styled.img<
{
  darkmode:boolean;
}
>`
    width: 100%;
    height:100%;
    object-fit: cover;
    position: absolute;
    mix-blend-mode: ${p => (p.darkmode? 'hard-light':'initial')};
    filter: ${p => (p.darkmode? 'contrast(0.7)':'none')};
`

const LogoContainer = styled.div`
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 24px;
    left: 24px;
`

const ImageIcon = styled.img`
    width: 48px;
    height:48px;
    position: absolute;
    left:0px;
    top: 0px;
`

const TextIcon = styled.p`
    position: absolute;
    width: 135px;
    height: 24px;
    left: 54px;
    top: 12px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 16px;
    line-height: 0px;
`


const TextContainer = styled.div`
    flex: 1;
    padding:24px;
    box-shadow: 0px -1px 0px ${p => p.theme.colors.adb_border};
    z-index:7;
    position:relative;
    min-height: 100px;
`



const TextDesc = styled.p`
    // margin-top: 35px;
    // font-size: 20px;
    // font-weight: bold;
    // line-height:23px;
    flex: 1;
    font-size: 14px;
    font-weight: 300;
    line-height: 23px;
    font-family: -apple-system,BlinkMacSystemFont,"San Francisco","Helvetica Neue",Helvetica,Ubuntu,Roboto,Noto,"Segoe UI",Arial,sans-serif;
    position: absolute;
    left: 54px;
    top: 25px;
    max-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 101px);
`
