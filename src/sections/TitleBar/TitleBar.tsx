import React, {memo,useContext, useEffect,useRef,useState,useLayoutEffect} from 'react';
import styled from '@emotion/styled'
import { useColorMode,useThemeUI} from 'theme-ui'
import { css,jsx } from "@emotion/react";
import TitleButtonNormal from '@Components/TitleButtonNormal'
import TitleButtonToggle from '@Components/TitleButtonToggle'
import Icons from '@Assets/icons';

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'

import { ADBExpandStateContext } from '@Context/ADBExpandContext';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

import initState from '@Config/init_state.json'

const TitleBar: React.FC = memo(({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();
  const { theme} = useThemeUI()

  const { adbIsExpand, setADBExpandState} = useContext(
    ADBExpandStateContext,
  );
  const { isGlobalAnimEnable, setGlobalAnimEnable} = useContext(
    GlobalAnimationStateContext,
  );
  

  const { t ,i18n} = useTranslation()

  const clickLan = () =>{
    i18n.changeLanguage(i18n.language === 'enUs' ? 'zhCn' : 'enUs');
  }
  const clickDark = () =>{
    setColorMode(colorMode === 'default' ? 'dark' : 'default')
  }
  const clickADB = () =>{
    setADBExpandState(!adbIsExpand);
  }
  const clickAnimation = () =>{
    setGlobalAnimEnable(!isGlobalAnimEnable);
  }

  const sizeRef = useRef(null);
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  function updateSize() {
    let height = sizeRef.current.offsetHeight;
    let width  = sizeRef.current.offsetWidth;
    if(width >= 550){
      setIsShowBtn(true)
    }
    else{
      setIsShowBtn(false)
    }
  }

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => 
      window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if(sizeRef.current){updateSize()}
    setColorMode(initState.isDarkMode === true ? 'dark' : 'default')
  }, [sizeRef]);

  return (
    <Container 
      ref = {sizeRef}
      >
      <ContainerBackground isAnimationEnable={isGlobalAnimEnable}></ContainerBackground>
      <ContainerTransitionBackground isAnimationEnable={isGlobalAnimEnable}></ContainerTransitionBackground>
      <TitleBox isAnimationEnable={isGlobalAnimEnable}>
        {children}
      </TitleBox>
      {isShowBtn?
      <ButtonLayout>
        <TitleButtonToggle active={adbIsExpand}
          buttonCSS={css`
            margin-left:8px;
            margin-right:13px;
            height:38px;
            
            > div > button{
              width:40px;
              height:22px;
            }
            > div > button > svg {
              height:20px;
              top: 0px;
              left: 1px;
            }
          `}
          buttonSib={'ADB'}
          
          onClick={clickADB}>
          <Icons.ADB/>
        </TitleButtonToggle>
        <TitleButtonToggle active={isGlobalAnimEnable}
          buttonCSS={css`
            margin-left:8px;
            margin-right:0px;
            height:38px;
            display: inline-flex;
            flex-direction: column;
            
            -webkit-app-region: no-drag;
            > div > button{
              width:40px;
              height:22px;
            }
            > div > button > svg {
              height:20px;
              top: 0px;
              left: 0px;
            }
          
          `}
          buttonSib={'Animation'}
        onClick={clickAnimation}>
          <Icons.Animation style={{transform: `scale3d(1.25,1.25,1)`}}/>
        </TitleButtonToggle>
        <TitleButtonNormal 
          buttonCSS={css`
            height:38px;
            margin-left:8px;
            
            >div > button{
              width:40px;
              height:22px;
            }

            > div > button > div > svg{
              height: 20px;
              top: 0px;
              left: 0px;
            }
          `} 
          buttonSib={'Theme'}
          onClick={clickDark}>
          <Icons.DarkMode/>
        </TitleButtonNormal>
        <TitleButtonNormal 
        
          buttonCSS={css`
            height:38px;
            margin-left:8px;
            
            >div > button{
              width:40px;
              height:22px;
            }

            > div > button > div > svg{
              height: 20px;
              top: 0px;
              left: 0px;
            }
          `} 
          buttonSib={'Language'}
          onClick={clickLan}>
          <Icons.Languages/>
        </TitleButtonNormal>

      </ButtonLayout>
      :
      <ButtonLayout>
        <TitleButtonToggle 
            buttonCSS={css`
              margin-left:8px;
              margin-right:13px;
              
              height:38px;
              > div > button{
                width:40px;
                height:22px;
              }
              > div > button > svg {
                height:20px;
                top: 0px;
                left: 1px;
              }
          `}
          buttonSib={'ADB'}
          active={adbIsExpand} 
          onClick={clickADB}
          >
          <Icons.ADB/>
        </TitleButtonToggle>
      </ButtonLayout>
      }
    </Container>
  );
})

export default TitleBar

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
  float: right;
`

const ContainerBackground = styled.div<{
  isAnimationEnable:boolean;
}>`
  width: 100%;
  height: 100%;
  position:absolute;
  top:0;
  left:0;
  //background: linear-gradient(180deg, ${p => p.theme.colors.title_background_top} 0%, ${p => p.theme.colors.title_background_bottom} 100%);
  background: linear-gradient(180deg, #b4b4b4, #C6C7C8);
  -webkit-app-region: drag;
  // z-index:10;
`


const Container = styled.div`
    width: 100%;
    height: 52px;
    position:relative;
    // background: linear-gradient(180deg, #9e9e9e} 0%, #C6C7C8 100%);
    box-shadow: 0px 2px 14px ${p => p.theme.colors.title_box_shadow};
    // -webkit-app-region: drag;
    z-index:10;
`;
//${props => props.theme.fonts.numberInput};

const TitleBox = styled.div<{
  isAnimationEnable:boolean;
}>`
    text-align: center;
    line-height:38px;
    font-size:13px;
    position: absolute;
    width: 100%;
    font-family: FUTURA; 
    font-style: normal;
    font-weight: 500;
    letter-spacing: 10px;
    user-select: none;
    color:${p => p.theme.colors.primary};

    transition: ${p => p.isAnimationEnable?'color 0.2s':''};
`;

const ContainerTransitionBackground = styled.div<{
  isAnimationEnable:boolean;
}>`
  width: 100%;
  height: 100%;
  position:absolute;
  top:0;
  left:0;
  transition:${p=>p.isAnimationEnable?'background 0.3s':'none'};
  background:  ${p => p.theme.colors.title_background_transition};
  -webkit-app-region: drag;
  
`