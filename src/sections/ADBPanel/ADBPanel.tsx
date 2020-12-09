import React,{ memo,useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'
import { ADBExpandStateContext } from '@Context/ADBExpandContext';
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';
import ReactPlaceholder from 'react-placeholder';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import ADBTopArea from './ADBTopArea'
//adb shell ip addr show wlan0
//adb shell getprop ro.build.version.sdk
//adb shell getprop ro.build.version.release 
import adb from 'adbkit'

const ADBPanel: React.FC = memo(() => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const { t ,i18n} = useTranslation()
  const clickLan = () =>{
    i18n.changeLanguage(i18n.language === 'enUs' ? 'zhCn' : 'enUs');
  }
  const clickDark = () =>{
    setColorMode(colorMode === 'default' ? 'dark' : 'default')
  }

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [animationExpand,setAnimationExpand] = useState<boolean>(adbIsExpand)

  
  // React Spring State
  // const [isExpand, set] = useState(false)
  // React Spring Property
  const {rightProps} = useSpring({
    rightProps: adbIsExpand ? 1 : 0,
    config: animationConfig.panel_slide,
    onStart:()=>{
      if(adbIsExpand){
        setAnimationExpand(true)
      }
    },
    onRest:()=>{
      if(!adbIsExpand){
        setAnimationExpand(false)
      }
    } 
  })

  const renderFunction = () =>{
    return(animationExpand?
    <animated.div
      css={AnimatedContainerCSS}
      style={{
        right: isGlobalAnimEnable?interpolate([rightProps], (rightProps => `${-320 + rightProps*320}px`)):`${adbIsExpand?'0px':'-320px'}`
      }}
    >
      <Container
        active={animationExpand}
        isAnimationEnable={isGlobalAnimEnable}
      >
        <ADBTopArea></ADBTopArea>
      </Container>
    </animated.div>:''
    )
    
  }

  return (
    renderFunction()
    // <animated.div
    //   // static base style
    //   // css={{
    //   //   position: "fixed",
    //   //   width: "33vw",
    //   //   height: "100vw",
    //   //   backgroundColor: "magenta"
    //   // }}
    //   css={AnimatedContainerCSS}
    //   // animated dynamic style
    //   style={{
    //     // transform: interpolate([x], (x) => `translate3d(${x}px,0,0)`),
    //     right: isGlobalAnimEnable?interpolate([rightProps], (rightProps => `${-320 + rightProps*320}px`)):`${adbIsExpand?'0px':'-320px'}`
    //   }}
    // >
    //   <Container
    //     active={adbIsExpand}
    //     isAnimationEnable={isGlobalAnimEnable}
    //   >
    //     <ADBTopArea></ADBTopArea>
    //     {/* <ReactPlaceholder type='text' ready={false} rows={30} 
    //       css={PlaceHolderCSS}
    //       color='#929292'
    //       >
    //     </ReactPlaceholder> */}
    //   </Container>
    // </animated.div>
  );
})

export default ADBPanel


const PlaceHolderCSS = css`
  width: 100%;
  height: calc(100% - 24px);
  padding: 24px;
  overflow: hidden;
  opacity:0.15;
  
`;


const AnimatedContainerCSS = css`
  width: 320px;
  height: calc(100vh - 38px);
  position: absolute;  
  z-index:9;
`;

const Container = styled.div<
{
  active:boolean;
  isAnimationEnable:boolean;
}
>`
    // width: 320px;
    // height: calc(100vh - 38px);
    // position:absolute;
    // transition:all 0.3s;
    // transition-timing-function: cubic-bezier(0,0,0.2,1);
    // right:${p => (p.active? '0px':'-320px')};
    width: 100%;
    height: 100%;
    background: ${p => p.theme.colors.adb_background};
    box-shadow: -1px 0px 0px ${p => p.theme.colors.adb_border};
    transition:${p=>p.isAnimationEnable?'box-shadow 0.3s,background 0.3s':'none'};
`;
