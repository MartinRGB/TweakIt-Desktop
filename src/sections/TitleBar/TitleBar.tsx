import React, {memo,useContext, useEffect,useRef,useState,useLayoutEffect} from 'react';
import styled from '@emotion/styled'
//import {css} from '@emotion/core'
import { useColorMode,jsx,useThemeUI} from 'theme-ui'
import {css} from "@emotion/core";
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
    if(width >= 500){
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
      <ContainerBackground></ContainerBackground>
      <TitleBox>
        {children}
      </TitleBox>
      {isShowBtn?
      <ButtonLayout>
        <TitleButtonToggle active={adbIsExpand}
          buttonCSS={css`
            margin-left:8px;
            margin-right:13px;
            height:38px;
            display: inline-flex;
            flex-direction: column;
            -webkit-app-region: no-drag;
            > div > button{
              width:40px;
              height:22px;
              position: relative;
              background:${adbIsExpand?theme.colors.toggle_button_bg:theme.colors.normal_button_bg};
            }
            > div > button > svg {
              height:20px;
              text-align: center;
              top: 0px;
              left: 1px;
              fill: ${adbIsExpand?theme.colors.background:theme.colors.text};
            }
            &:active > div > button{
              background:${theme.colors.toggle_button_active};
            }

            &:active > div > button > svg{
              fill: ${adbIsExpand?theme.colors.text:theme.colors.background};
              opacity:0.8;
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
              position: relative;
              background:${isGlobalAnimEnable?theme.colors.toggle_button_bg:theme.colors.normal_button_bg};
            }
            > div > button > svg {
              height:20px;
              text-align: center;
              top: 0px;
              left: 0px;
              fill: ${isGlobalAnimEnable?theme.colors.background:theme.colors.text};
            }
            &:active > div > button{
              background:${theme.colors.toggle_button_active};
            }
            &:active > div > button > svg{
              fill: ${adbIsExpand?theme.colors.text:theme.colors.background};
              opacity:0.8;
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
            display: inline-flex;
            flex-direction: column;
            -webkit-app-region: no-drag;
            >div > button{
              width:40px;
              height:22px;
              position:relative;
              display: block;
              background: ${theme.colors.normal_button_bg};

            }

            > div > button > div > svg{
              height: 20px;
              top: 0px;
              left: 0px;
              fill: ${theme.colors.text};
            }

            &:active > div > button{
              background: ${theme.colors.normal_button_active};
            }

            &:active > div > button > div > svg{
              fill: ${theme.colors.background};
            }

            &:active > div > button{
              background:${theme.colors.toggle_button_active};
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
          display: inline-flex;
          flex-direction: column;
          -webkit-app-region: no-drag;
          >div > button{
            width:40px;
            height:22px;
            position:relative;
            display: block;
            background: ${theme.colors.normal_button_bg};

          }

          > div > button > div > svg{
            height: 20px;
            top: 0px;
            left: 0px;
            fill: ${theme.colors.text};
          }

          &:active > div > button{
            background: ${theme.colors.normal_button_active};
          }

          &:active > div > button > div > svg{
            fill: ${theme.colors.background};
          }

          &:active > div > button{
            background:${theme.colors.toggle_button_active};
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
            display: inline-flex;
            flex-direction: column;
            -webkit-app-region: no-drag;
            > div > button{
              width:40px;
              height:22px;
              position: relative;
              background:${adbIsExpand?theme.colors.toggle_button_bg:theme.colors.normal_button_bg};
            }
            > div > button > svg {
              height:20px;
              text-align: center;
              top: 0px;
              left: 1px;
              fill: ${adbIsExpand?theme.colors.background:theme.colors.text};
            }
            &:active > div > button{
              background:${theme.colors.toggle_button_active};
            }

            &:active > div > button > svg{
              fill: ${adbIsExpand?theme.colors.text:theme.colors.background};
              opacity:0.8;
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

const ContainerBackground = styled.div`
  width: 100%;
  height: 100%;
  position:absolute;
  top:0;
  left:0;
  background: linear-gradient(180deg, ${p => p.theme.colors.title_background_top} 0%, ${p => p.theme.colors.title_background_bottom} 100%);
  -webkit-app-region: drag;
  // z-index:10;
`


const Container = styled.div`
    width: 100%;
    height: 52px;
    position:relative;
    // background: linear-gradient(180deg, ${p => p.theme.colors.title_background_top} 0%, ${p => p.theme.colors.title_background_bottom} 100%);
    box-shadow: 0px 2px 14px ${p => p.theme.colors.title_box_shadow};
    // -webkit-app-region: drag;
    z-index:10;
`;
//${props => props.theme.fonts.numberInput};

const TitleBox = styled.div`
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
`;
