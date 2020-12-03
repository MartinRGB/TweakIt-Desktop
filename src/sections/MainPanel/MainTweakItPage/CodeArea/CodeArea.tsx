import React ,{memo,useContext, useEffect,useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import {css} from "@emotion/core";
import styled from '@emotion/styled';
import '@Context/i18nContext'
import MainButtonToggle from '@Components/MainButtonToggle'
import MainButtonNormal from '@Components/MainButtonNormal'
import TitleButtonNormal from '@Components/TitleButtonNormal'
import Icons from '@Assets/icons'
import CodeTemplate from './CodeTemplate';
import { useTranslation, Trans, Translation } from 'react-i18next'
import animationConfig from '@Config/animation.json'
import DataDrivenAnimator from '@Components/Animator/DataDrivenAnimator'
import Solver from '@Components/Solver';
import CopyToast from './CopyToast';
import SpringFactorEvaluator from './SpringFactorEvaluator'

const CodeArea: React.FC = memo(({children}) => {
  //const [colorMode] = useColorMode();

  const [isExpanded,setCodeIsExpand] = useState<boolean>(true);

  const [activeName,setActiveName] = useState<string>('')
  //,"Flutter","Smartisan"
  const IconStr = ["Android","iOS","Web","Flutter","Smartisan","Data"];


  const [copyState,setCopyState] = useState<boolean>(false)
  const [cssProgress,setCSSProgress] = useState<number>(0);

  var PlatformIcon;
  //const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toastRef = useRef();


  function selectCodeContentAndCopy() {
    const code_content:any = document.getElementById("code_content");

    var range = document.createRange();
    range.selectNodeContents(code_content);
    var sel:any = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');

    toastRef.current.startAnimation(true)
    
    var removeTimeOut = setTimeout(()=>{
      sel.removeAllRanges();
      toastRef.current.startAnimation(false)
      setCopyState(false)
      clearTimeout(removeTimeOut)
    },1200)
  }

  const ContentOnKeyDown = (e:any) =>{
    e.preventDefault();
  }

  console.log('rerender')
  return (
    <Container
      isExpanded ={isExpanded}
      >
      <CopyToast ref={toastRef}></CopyToast>
      <BlurContainer>
        <TopNav>
          <TopLeftContainer>
              {
                    IconStr.map(function (data:any,index:number) {
                      //var currIcon = Icons[(iCon[index].replace(/\s/g, "")!)];
                      PlatformIcon = Icons[(IconStr[index].replace(/\s/g, "")!)];
                      return (
                        <MainButtonToggle
                        style={{
                          width:`100%`,
                          borderRadius:`2px`,
                          display: `inline-flex`,
                          paddingLeft: `4px`,
                          paddingRight: `6px`,
                          alignItems: `center`,
                          marginRight: `8px`
                        }}
                        onClick={()=>{
                          setActiveName(IconStr[index])
                        }}
                        active={activeName === IconStr[index] && isExpanded}
                        key={'CodeButton' + '_' +index}
                      >
                        <PlatformIcon style={{
                          position: `absolute`,
                          top: `0px`,
                          left:`3px`
                        }}
                        ></PlatformIcon><CustomSpan>{IconStr[index]}</CustomSpan>
                      </MainButtonToggle>
                      )
                  
                })
              }
          </TopLeftContainer>
          <TopRightContainer>
            <MainButtonNormal
              parentStyle={{
                height:`16px`,
                flex:`1`,
                display:`flex`,
              }}
              style={{
                width:`24px`,
                height:`16px`,
                borderRadius:`2px`,
              }}
              onClick={()=>{
                setCodeIsExpand(!isExpanded)
                setActiveName('')
              }}
            >
              <Icons.CollapsedArrowAlertNative
                style={{
                  transform:`rotate(${isExpanded?'0deg':'180deg'})`,
                  transition:`all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s`,
                  position: `absolute`,
                  top: `0px`,
                  left:`4px`
                }}
              ></Icons.CollapsedArrowAlertNative>
            </MainButtonNormal>

            <MainButtonNormal
                        parentStyle={{
                          height:`16px`,
                          flex:`1`,
                          display:`flex`,
                        }}
                        style={{
                          width:`52px`,
                          borderRadius:`2px`,
                          display: `inline-flex`,
                          paddingLeft: `4px`,
                          paddingRight: `6px`,
                          alignItems: `center`,
                          marginRight: `8px`
                        }}
                        onClick={()=>{
                          if(!copyState){
                            selectCodeContentAndCopy();
                            setCopyState(true)
                          }
                        }}
                      >
                        <Icons.Copy
                          style={{
                            position: `absolute`,
                            top: `0px`,
                            left:`3px`
                          }}
                        ></Icons.Copy><CustomSpan style={{}}><Trans>Copy</Trans></CustomSpan>
            </MainButtonNormal>
          </TopRightContainer>
        </TopNav>
      </BlurContainer>
      <ScrollContainer onKeyDown={(e)=>ContentOnKeyDown(e)} id="code_content" contentEditable={true} suppressContentEditableWarning={true}>
      <CodeTemplate 
       name={activeName} isExpanded={isExpanded}></CodeTemplate>
      </ScrollContainer>
    </Container>
  )
})

export default CodeArea

const ToastArrow = styled.div`
    width: 5px;
    height: 5px;
    background: ${p => p.theme.colors.toast_background_bottom};
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate3d(-50%,-50%, 0px) rotate(45deg);
    z-index: -10;
`

const ToastDiv = styled.div`
    position: absolute;
    top: 15px;
    z-index: 2;
    width: 52px;
    text-align: center;
    left: 100px;
    background: linear-gradient(180deg,${p => p.theme.colors.toast_background_top} 0%,${p => p.theme.colors.toast_background_bottom} 100%);
    color: ${p => p.theme.colors.background};
    padding: 2px 4px;
    border-radius: 4px;
    text-align: center;
    font-family: ${p => p.theme.fonts.numberInput};
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 15px;
    display: flex;
    flex-direction: row;
    width: 61px;
    left:37px;
    box-shadow: 0px 1px 6px ${p => p.theme.colors.text_input_text};
    > svg{
      fill:${p => p.theme.colors.background};
    }

`

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
    height:${p => p.isExpanded?'280px':'40px'};
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
      width: 8px;
    }

    font-family:${p => p.theme.fonts.monospace};
    font-size:12px;

    // ::-webkit-scrollbar-track {
    //   box-shadow: inset 0 0 14px 14px transparent;
    //   border: solid 4px transparent;
    // }
    
    ::-webkit-scrollbar-thumb {
      // box-shadow: inset 0 0 14px 14px #bbbbbe;
      // border: solid 4px transparent;
      background:${p => p.theme.colors.adb_border};
      //border-radius: 100px;
      border-bottom: 14px ${p => p.theme.colors.main_bottom_bg} solid;
      background-clip: padding-box;
      transition:all 0.3s;
    }

    ::-webkit-scrollbar-thumb:hover {
      background:${p => p.theme.colors.text}
    }
`

const CustomSpan = styled.span`
text-align: center;
font-family: ${props => props.theme.fonts.numberInput};
font-style: normal;
font-weight: bold;
font-size: 11px;
line-height: 14px;
margin-left:16px;
`
