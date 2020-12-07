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
import TerminalTemplate from './TerminalTemplate';
import { useTranslation, Trans, Translation } from 'react-i18next'
import animationConfig from '@Config/animation.json'
import CopyToast from './CopyToast';
import SpringFactorEvaluator from './SpringFactorEvaluator'
import CodeScrollContainer from '@Components/CodeScrollContainer'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import initState from "@Config/init_state.json";
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const CodeArea: React.FC = memo(({children}) => {
  //const [colorMode] = useColorMode();

  useTranslation();
  const [isExpanded,setCodeIsExpand] = useState<boolean>(initState.isBottomPannelExpanded);
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {codeBlockIsShow, setCodeBlockIsShow} = useContext(
    CodeBlockStateContext,
  );

  

  const [activeName,setActiveName] = useState<string>('')
  //,"Flutter","Smartisan"
  const IconStr = ["Android","iOS","Web","Flutter","Smartisan","Data"];


  const [copyState,setCopyState] = useState<boolean>(false)

  var PlatformIcon;
  //const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toastRef = useRef();
  const scrollRef= useRef();

  function selectCodeContentAndCopy() {
    scrollRef.current.selectCodeContentRangeAndCopy(true)
    toastRef.current.startAnimation(true)
    
    var removeTimeOut = setTimeout(()=>{
      //sel.removeAllRanges();
      scrollRef.current.selectCodeContentRangeAndCopy(false)
      toastRef.current.startAnimation(false)
      setCopyState(false)
      clearTimeout(removeTimeOut)
    },1200)
  }

  const ContentOnKeyDown = (e:any) =>{
    e.preventDefault();
  }

  return (
    <Container
      isExpanded ={isExpanded}
      style={{
        transition:`${isGlobalAnimEnable?'height 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s,background 0.3s ,box-shadow 0.3s ':'none'}`,
      }}
      >
      {isExpanded?<CopyToast ref={toastRef}></CopyToast>:''}
      <TopNav>
        <TopLeftContainer>
            {
                  IconStr.map(function (data:any,index:number) {
                    //var currIcon = Icons[(iCon[index].replace(/\s/g, "")!)];
                    PlatformIcon = Icons[(IconStr[index].replace(/\s/g, "")!)];
                    return (
                      <MainButtonToggle
                      buttonCSS={css`
                        margin-right: 8px;
                        > button {
                          padding-left: 4px;
                          padding-right: 6px;
                          height: 16px;
                          > svg{
                            top: -1px;
                          }
                          > span{
                            margin-left: 1px;
                            top: -1px;
                          }
                        }
                      `}
                      onClick={()=>{
                        setActiveName(IconStr[index])
                        setCodeBlockIsShow(false)
                        scrollRef.current.selectCodeContentRangeAndCopy(false)
                      }}
                      active={activeName === IconStr[index] && isExpanded && !codeBlockIsShow}
                      key={'CodeButton' + '_' +index}
                    >
                      <PlatformIcon></PlatformIcon><CustomSpan>{IconStr[index]}</CustomSpan>
                    </MainButtonToggle>
                    )

                
              })
            }


            <MainButtonNormal
              buttonCSS = {
                css`
                margin-right: 8px;
                > button {
                  padding-left: 4px;
                  padding-right: 6px;
                  height: 16px;
                  > svg{
                    top: -1px;
                  }
                  > span{
                    margin-left: 1px;
                    top: -1px;
                  }
                }
              `
              }
              onClick={()=>{
                if(!copyState && isExpanded){
                  selectCodeContentAndCopy();
                  setCopyState(true)
                  }
                }}
              >
              <Icons.Copy></Icons.Copy><CustomSpan style={{}}><Trans>Copy</Trans></CustomSpan>
            </MainButtonNormal>
        </TopLeftContainer>
        <TopRightContainer>
          <MainButtonToggle
            parentStyle={{
              height:`16px`,
              flex:`1`,
              display:`flex`,
              marginLeft:`8px`,
            }}
            style={{

            }}
            buttonCSS = {
              css`
                height:16px;
                >button{
                  width:24px;
                  height:16px;
                }
              `
            }
            onClick={()=>{
              setCodeIsExpand(!isExpanded)
              setActiveName('')
              if(!isExpanded){
                setCodeBlockIsShow(false)
              }
            }}
            active={isExpanded}
          >
            <Icons.CollapsedArrowAlertNative
              style={{
                transform:`rotate(${isExpanded?'0deg':'180deg'})`,
                transition:`${isGlobalAnimEnable?'all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s':'none'}`,
                position: `absolute`,
                top: `0px`,
                left:`4px`
              }}
            ></Icons.CollapsedArrowAlertNative>
          </MainButtonToggle>

          <MainButtonToggle
            active={codeBlockIsShow && isExpanded}
            buttonCSS={css`
              margin-right: 6px;
              > button {
                padding-left: 4px;
                padding-right: 6px;
                height: 16px;
                > svg{
                  top: -1px;
                }
                > span{
                  margin-left: 1px;
                  top: -1px;
                }
              }
            `}
            onClick={()=>{
                if(isExpanded){
                  setCodeBlockIsShow(true)
                  scrollRef.current.selectCodeContentRangeAndCopy(false)
                  setActiveName('')
                }

            }}
          >
            <Icons.Terminal></Icons.Terminal><CustomSpan><Trans>Console</Trans></CustomSpan>
          </MainButtonToggle>
        </TopRightContainer>
      </TopNav>
      <CodeScrollContainer ref={scrollRef}>
        {
          codeBlockIsShow?
          <TerminalTemplate scrollRef={scrollRef}></TerminalTemplate>
          :
          <CodeTemplate name={activeName} isActive={isExpanded && !codeBlockIsShow}></CodeTemplate>
        }
      </CodeScrollContainer>
    </Container>
  )
})

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

const TopNav = styled.div`
    height:100%;
    width:100%;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 40px;
`

const Container = styled.div<{
  isExpanded:boolean;
}>`
    //height: 100%;
    // min-height:50px;
    //background:blue;

    height:${p => p.isExpanded?'340px':'40px'}; //280px
    display: flex;
    flex-direction: column;
    box-shadow:0px -1px 0px ${p => p.theme.colors.adb_border};
    background:${p => p.theme.colors.main_bottom_bg};
    z-index:1;
    position:relative;
    //flex:4;
`
const CustomSpan = styled.span`
    text-align: center;
    font-family: ${props => props.theme.fonts.numberInput};
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 14px;
`
