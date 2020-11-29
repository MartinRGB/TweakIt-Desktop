import React ,{ useContext, useEffect,useState} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import Highlight from 'react-highlight'
import TitleButtonNormal from '@Components/TitleButtonNormal'
import Icons from '@Assets/icons'

const CodeArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  const [isExpanded,setCodeIsExpand] = useState<boolean>(false);
  console.log(colorMode)

  return (
    <Container
      isExpanded ={isExpanded}
      >
      <BlurContainer>
        <TopNav>
          <TopRightContainer>
            <TitleButtonNormal
              style={{
                width:`24px`,
                borderRadius:`2px`,
              }}
              onClick={()=>{
                setCodeIsExpand(!isExpanded)
                console.log('233')
              }}
            >
              <Icons.CollapsedArrowAlertNative
                style={{
                  transform:`rotate(${isExpanded?'0deg':'180deg'})`,
                  transition:`all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s`,
                }}
              ></Icons.CollapsedArrowAlertNative>
            </TitleButtonNormal>
          </TopRightContainer>
        </TopNav>
      </BlurContainer>
      <ScrollContainer>
    <Highlight language="javascript">
{
`
// Facebook ReboundJS Spring Animation  [Repo]
var springSystem = new rebound.SpringSystem();
var spring = springSystem.rebound.createSpringWithBouncinessAndSpeed(11.82,66.51);

// (Legacy) Framer Classic RK4 Animation  [API]
layerA = new Layer
animationA = new Animation layerA
    x:[parameter]
    options:
        curve: Spring(tension:1500,friction:38.73)

// PopMotion | FramerMotion  [PopMotion API]  [FramerMotion API]
spring({
  from: [parameter],
  to: [parameter],
  stiffness: 1500,
  damping: 38.73,
  mass: 1,
  velocity: 0
})
// Facebook ReboundJS Spring Animation  [Repo]
var springSystem = new rebound.SpringSystem();
var spring = springSystem.rebound.createSpringWithBouncinessAndSpeed(11.82,66.51);

// (Legacy) Framer Classic RK4 Animation  [API]
layerA = new Layer
animationA = new Animation layerA
    x:[parameter]
    options:
        curve: Spring(tension:1500,friction:38.73)

// PopMotion | FramerMotion  [PopMotion API]  [FramerMotion API]
spring({
  from: [parameter],
  to: [parameter],
  stiffness: 1500,
  damping: 38.73,
  mass: 1,
  velocity: 0
})

`}
    </Highlight>
    </ScrollContainer>
    </Container>
  )
}

export default CodeArea

const TopRightContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
  float: right;
  padding-right:14px;
  padding-left:14px;
`

const BlurContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  //mask: linear-gradient(180deg, ${p => p.theme.colors.main_top_bg_blur}, transparent);
  // backdrop-filter: saturate(180%) blur(5px);
  // -webkit-mask: linear-gradient(to bottom,#000000 80%,#00000080 100%);
  z-index:1
`

const TopNav = styled.div`
    height:100%;
    width:100%;

`

const Container = styled.div<{
  isExpanded:boolean;
}>`
    //height: 100%;
    height:${p => p.isExpanded?'350px':'40px'};
    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;
    // min-height:50px;
    //background:blue;
    display: flex;
    flex-direction: column;
    box-shadow:0px -1px 0px ${p => p.theme.colors.adb_border};
    background:${p => p.theme.colors.main_bottom_bg};
    z-index:1;
    position:relative;
    //flex:4;
`

const ScrollContainer = styled.div`
    width: 100%;
    height:100%;
    padding: 0px 0px 0px 0px;
    overflow-y:scroll;
`
