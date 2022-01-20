import React, {memo,useContext, useEffect,useState,useRef,useImperativeHandle,forwardRef}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IDescText } from "@Types";

import {useSpring, animated,interpolate} from 'react-spring'
import { useGesture } from 'react-with-gesture'
import animationConfig from '@Config/animation.json';

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

export interface IScrollContainer{
  style?:any;
  children?:any
}


const CodeScrollContainer: React.FC<IScrollContainer> = memo(forwardRef(({...IScrollContainer}, ref)  => {
  const [colorMode, setColorMode] = useColorMode()

  const [inputIsEditable,setInputIsEditable] = useState<boolean>(false)
  const scrollRef = useRef(null);
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  useImperativeHandle(ref, () => ({

    selectCodeContentRangeAndCopy(boo:boolean) {
      refSelectCodeContentRangeAndCopy(ref,boo)
    }
    ,
    scrollToBottom(){
      viewScrollToBottom()
    }
    ,
    setInputEditable(boo:boolean){
      setInputIsEditable(boo)
    }

  }));

  const viewScrollToBottom = () =>{

    // scrollRef.current.scrollTo({
    //   top: scrollRef.current.scrollHeight,
    //   left: 0,
    //   behavior: 'smooth'
    // });

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }

  // useImperativeHandle(ref, () => ({

  //   removeCodeContentRange() {
  //     refRemoveCodeContentRange(ref)
  //   }

  // }));

  const refSelectCodeContentRangeAndCopy = (ref:any,boo:boolean) => {
    if(ref){

      const code_content:any = scrollRef.current;
      var range = document.createRange();
      range.selectNodeContents(code_content);
      var sel:any = window.getSelection();
      if(boo){
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
      }
      else{
        sel.removeAllRanges();
      }

    }
  }

  const refRemoveCodeContentRange = (ref:any) => {
    if(ref){
      const code_content:any = scrollRef.current;
      var range = document.createRange();
      range.selectNodeContents(code_content);
      var sel:any = window.getSelection();
      sel.removeAllRanges();
    }
  }

  const ContentOnKeyDown = (e:any) =>{
    // only for Mac
    if (e.metaKey && e.key === 'a') {
    }
    else if(e.metaKey && e.key === 'c'){

    }
    else if(inputIsEditable){

    }
    else{
      e.preventDefault();
    }
  }

  return (
    <Container style={IScrollContainer.style} 
               onKeyDown={(e)=>ContentOnKeyDown(e)} 
               id="code_content" 
               ref={scrollRef}
               contentEditable={false} 
               isAnimationEnable = {isGlobalAnimEnable}
               suppressContentEditableWarning={true}
    >
      {IScrollContainer.children}
    </Container>);
}))

const Container = styled.div<{
  isAnimationEnable:boolean;
}>`
    width: calc(100% - 28px);
    min-width: 343px;
    height: 100%;
    margin-top: 40px;
    margin-left: 14px;
    margin-right: 14px;
    //margin-bottom: 12px;
    overflow-y: scroll;
    outline: none;
    /* width */
    ::-webkit-scrollbar {
      width: 8px;
    }

    font-family:${p => p.theme.fonts.monospace};
    font-size:12px;

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 14px 14px transparent;
      border: solid 4px transparent;
      cursor:pointer;
      transition:${p=>p.isAnimationEnable?'background 0.3s,border-bottom 0.3s':'none'};
    }
    
    ::-webkit-scrollbar-thumb {
      // box-shadow: inset 0 0 14px 14px #bbbbbe;
      // border: solid 4px transparent;
      background:${p => p.theme.colors.adb_border};
      //border-radius: 100px;
      border-bottom: 14px solid transparent;
      background-clip: padding-box;
      transition:all 0.3s;
      cursor:pointer;
      transition:${p=>p.isAnimationEnable?'background 0.3s,border-bottom 0.3s':'none'};
    }

    ::-webkit-scrollbar-thumb:hover {
      background:${p => p.theme.colors.text};
      border-bottom: 14px solid transparent;
      background-clip: padding-box;
      cursor:pointer;
    }
`


export default CodeScrollContainer
