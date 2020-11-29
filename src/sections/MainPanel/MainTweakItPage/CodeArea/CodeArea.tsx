import React ,{ useContext, useEffect,useState} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import {CodeStyle} from "@Styles/CodeStyle"

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

  const [isEditable,setIsEditable] = useState<boolean>(false)

  const iconStr = [Icons.iOS,Icons.Android,Icons.Web,Icons.Flutter,Icons.Smartisan];

  //FPlatformIcon = Icons[(IconStr[index].replace(/\s/g, "")!)];

  return (
    <Container
      isExpanded ={isExpanded}
      >
        <CodeStyle></CodeStyle>
      <BlurContainer>
        <TopNav>
          <TopLeftContainer>
              {
                    iconStr.map(function (data:any,index:number) {
                      return (
                        <TitleButtonNormal
                        style={{
                          width:`100px`,
                          borderRadius:`2px`,
                        }}
                        onClick={()=>{
                        }}
                      >
                        <Icons.Android
                        ></Icons.Android><span>Android Clear</span>
                      </TitleButtonNormal>
                      )
                  
                })
              }
          </TopLeftContainer>
          <TopRightContainer>
            <TitleButtonNormal
              style={{
                width:`24px`,
                borderRadius:`2px`,
              }}
              onClick={()=>{
                setCodeIsExpand(!isExpanded)
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
      <ScrollContainer
      contentEditable={true}
      >
    <Highlight  language="javascript">
{
`
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
              class="233";
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;

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
`

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  float: left;
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
    width: calc(100% - 28px);
    height: 100%;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    //margin-bottom: 12px;
    overflow-y: scroll;
    outline: none;
    /* width */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 14px 14px transparent;
      border: solid 4px transparent;
    }
    
    ::-webkit-scrollbar-thumb {
      // box-shadow: inset 0 0 14px 14px #bbbbbe;
      // border: solid 4px transparent;
      background:${p => p.theme.colors.adb_border};
      border-radius: 100px;
    }


`
