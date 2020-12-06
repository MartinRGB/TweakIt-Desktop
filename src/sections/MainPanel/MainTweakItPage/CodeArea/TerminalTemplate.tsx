import React ,{memo,useContext, useEffect,useState,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import Solver from '@Helpers/Solver'
import {ADBConnectStateContext} from '@Context/ADBConnectContext'
import theme from 'src/styles/theme.ts';
import CodeTexts from '@Components/CodeTexts'
import autosize from 'autosize'
import {execCMD,execCMDPromise,registWindowCMDConsole} from '@Helpers/ADBCommand/ADBCommand'
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';
import DataDrivenAnimator from '@Helpers/Animator/DataDrivenAnimator'
import TerminalCore from './TerminalCore'

import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
export interface ITerminalSnippet{
  style?:any;
  scrollRef?:any;
}

const TerminalTemplate: React.FC<ITerminalSnippet> = memo(({style,scrollRef}) => {

  const [colorMode] = useColorMode();
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {cleanAllData,adbInfoTimes,adbTagStartText,adbCommandText,adbCommandIsSuccess,adbResultText,adbTagEndText,setADBInfoTimes,setADBTagStartText,setADBCommandText,setADBTagEndText,setADBCommandIsSuccess,setADBResultText} =  useContext(ADBConnectStateContext)

  const {adbInputCMD,setADBInputCMD,setTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );

  const [isInit,setIsInit] = useState<boolean>(false)
  const initHeight = 358;
  const paddingValue = 10;

  const textAreaRef = useRef();
  const containerRef = useRef();
  autosize(textAreaRef.current)
  useEffect(() => {
    cleanAllData()
    setIsInit(true)
    textAreaRef.current.focus()
  }, [])

  if(scrollRef){
    if(scrollRef.current){
      scrollRef.current.scrollToBottom();
    }
  }



  const Comment = CodeTexts.Grey;
  const ResultError = CodeTexts.Red;
  const ResultSuccess = CodeTexts.Green;
  const CommandError = CodeTexts.Orange;
  const CommandSuccess = CodeTexts.Blue;
  const Break = CodeTexts.Break;


  const solver:any = new Solver.Android.Spring(450,0.8,0)
  const animation = new DataDrivenAnimator(solver.getValueArray())
  const [transitionInProgress,setTransitionInProgress] = useState<number>(1);
  const startTransitionInAnimation = () => {
    animation.setFromToDuration(0,1,solver.duration*1000);
    animation.setOnFrameCallback(()=>{
      setTransitionInProgress(animation.getValueProgress())
    })
    animation.setOnEndCallback(()=>{
      
    })
    animation.start();
  }

  const solverScroll:any = new Solver.Android.Spring(450,0.95,0)
  const animationScroll = new DataDrivenAnimator(solverScroll.getValueArray())
  const startScrollAnimation = (height:any) => {
    animationScroll.setFromToDuration(1,0,Math.min(1000,solver.duration*(height/1000)*2*1000));
    animationScroll.setOnFrameCallback(()=>{
      containerRef.current.style.height = `${(height - (initHeight - paddingValue*2 - 20))*animationScroll.getValueProgress() + (initHeight - paddingValue*2 - 20)}px`;
    })
    animationScroll.setOnEndCallback(()=>{
      cleanAllData()
      containerRef.current.style.height = `auto`;
    })
    animationScroll.start();
  }

  const cmdResultToConsole = (cmd:any) =>{
    // add this for console
    setADBInputCMD(cmd);
    
    execCMDPromise(cmd,`input command is ${cmd}`,
    (value:any)=>{
      setADBInfoTimes(adbInfoTimes+1)
      setADBTagStartText( 
      [`=================== Result Start At ${new Date().toString()} ===================`]
      )
      setADBCommandText(
      [`Command '${cmd}' result is: `]
      )
      setADBCommandIsSuccess(
      [true]
      )
      setADBResultText(
      [value]
      )
      setADBTagEndText(
      [`=================== Result End At ${new Date().toString()} ===================`]
      )
      setInputValue('');
      if(isGlobalAnimEnable) startTransitionInAnimation();
    },
    (value:any)=>{
      setADBInfoTimes(adbInfoTimes+1)
      setADBTagStartText( 
      [`=================== Result Start At ${new Date().toString()} ===================`]
      )
      setADBCommandText(
      [`Command '${cmd}' not found: `]
      )
      setADBCommandIsSuccess(
      [false]
      )
      setADBResultText(
      [value]
      )
      setADBTagEndText(
      [`=================== Result  End  At ${new Date().toString()} ===================`]
      )
      setInputValue('');
      if(isGlobalAnimEnable) startTransitionInAnimation();
    })
  }


  const [inputValue,setInputValue] = useState<string>('');
  const onCMDKeychange = (e:any) =>{
    setInputValue(e.target.value);
    setADBInputCMD(e.target.value);
    setTriggerControlAnim(false)
  }

  const onCMDKeyup = (e:any) =>{

    if (e.key === 'Enter') {

      if(e.target.value === ''){
        
      }
      else if(e.target.value === 'clear'){
        setInputValue('');
        if(isGlobalAnimEnable){
          startScrollAnimation(containerRef.current.offsetHeight)
        }
        else{
          cleanAllData()
        }
      }
      else{
        setADBInputCMD(e.target.value);
        setTriggerControlAnim(true)
        setInputValue('loading...');
        cmdResultToConsole(adbInputCMD)
      }
    }
  }

  //TODO
  registWindowCMDConsole(cmdResultToConsole);

  const onCMDKeydown = (e:any) =>{

  }

  const onCMDFocus = (e:any) =>{
    scrollRef.current.setInputEditable(true);
  }

  const onCMDBlur = (e:any) =>{
    scrollRef.current.setInputEditable(false);
  }

  return (
    <TerminalContainer style={{...style}} ref={containerRef}>
    <Comment>🍺🍺🍺 <Trans>Console Log Here</Trans> 🍺🍺🍺</Comment>
    <CommandInfoContainer>
      <CommandInfo >clear</CommandInfo> <CommandInfoNote><Trans>Clear all result</Trans></CommandInfoNote><Break/>
      <CommandInfo >ls</CommandInfo> <CommandInfoNote><Trans>List files</Trans></CommandInfoNote><Break/>
      <CommandInfo >adb --help</CommandInfo> <CommandInfoNote><Trans>List all ADB commands</Trans></CommandInfoNote><Break/>
      <CommandInfo >node --help</CommandInfo> <CommandInfoNote><Trans>List all Node commands</Trans></CommandInfoNote><Break/>
      <CommandInfo >brew --help</CommandInfo> <CommandInfoNote><Trans>List all Brew commands</Trans></CommandInfoNote>
    </CommandInfoContainer>
    {(isInit&&adbInfoTimes>-1)?
      adbResultText.map(function (data:any,index:number) {

        return (
          <CommandContainer style={{
            transition: `${isGlobalAnimEnable?'all 0.6s cubic-bezier(0.13,0.79,0.25,1)':'none'}`,
          }} isCurrent={(index === adbInfoTimes)} key={index}>
            <InsideContainer 
              padding={paddingValue}
              style={{
                transformOrigin: `top`,
                transform:`${(index === adbInfoTimes && isGlobalAnimEnable)?`scale3d(1,1,1) translate3d(${140 - 140*transitionInProgress}px,0px,0)`:`scale3d(1,1,1)`}`,
                opacity:`${(index === adbInfoTimes && isGlobalAnimEnable)?`${transitionInProgress}`:'1'}`,
              }}
              >
              <Comment>{adbTagStartText[index]}</Comment><Break/><Break/>
              {adbCommandIsSuccess[index]?
              <CommandSuccess>{adbCommandText[index]}</CommandSuccess>
              :
              <CommandError>{adbCommandText[index]}</CommandError>
              }<Break/><Break/>
              {adbCommandIsSuccess[index]?
              <ResultSuccess>{adbResultText[index].toString()}</ResultSuccess>
              :
              <ResultError>{adbResultText[index].toString()}</ResultError>
              }<Break/><Break/>  
              <Comment>{adbTagEndText[index]}</Comment><Break/>
            </InsideContainer>
          </CommandContainer>
        )
      }) 
      :''
    }
    <CMDInputContainer contentEditable={false} 
               suppressContentEditableWarning={true}>
      <Arrow   contentEditable={false} 
               suppressContentEditableWarning={true}>{`>`}</Arrow>
      <CMDInput
        ref={textAreaRef}
        placeholder="" 
        placeholderTextColor={theme.colors.adb_border} 
        value={inputValue}
        onChange={(e)=>onCMDKeychange(e)}
        onKeyDown={(e)=>onCMDKeydown(e)}
        onKeyUp={(e)=>onCMDKeyup(e)}
        onFocus={(e)=>onCMDFocus(e)}
        onBlur={(e)=>onCMDBlur(e)}
      />
    </CMDInputContainer>
    </TerminalContainer>
  )
})

export default TerminalTemplate

const TerminalContainer = styled.div`
  white-space:pre-wrap;
  overflow-wrap: break-word;
  padding-right: 12px;
  
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
  margin-bottom: 14px;
  overflow-x:hidden;
  overflow-y:hidden;
`

const CommandContainer = styled.div<{
  isCurrent:boolean;
}>`
  border-radius:5px;
  padding-left: ${p=>p.isCurrent?'14px':'0px'};
  padding-right: ${p=>p.isCurrent?'14px':'0px'};
  border:${p=>p.isCurrent?`1px solid ${p.theme.colors.adb_border}`:'1px solid transparent'};
  background:  ${p=>p.isCurrent?`${p.theme.colors.code_block_background}`:'transparent'};
  transition: all 0.6s cubic-bezier(0.13,0.79,0.25,1);
  margin-top:  ${p=>p.isCurrent?`10px`:''};
  margin-bottom: ${p=>p.isCurrent?`10px`:''};

`

const InsideContainer =  styled.div<{
  padding:number;
}>`
  padding-top: ${p=>p.padding}px;
  padding-bottom: ${p=>p.padding}px;
  overflow: hidden;
}

`


const CommandInfoContainer = styled.div`
padding-top: 24px;
padding-bottom: 10px;
display: grid;
`

const CommandInfo =styled.p`
  line-height:21px;
  color:#0DB5FF; //blue
  display: inline-block;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`

const CommandInfoNote =styled.p`
  line-height:21px;
  color:#9D9DB2; //grey
  display: inline-block;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`



const CMDInputContainer = styled.div`
  position: relative;
  height: 28px;
  margin-top: 10px;
`

const Arrow = styled.p`
  display: inline-block;
  color:${p => p.theme.colors.primary};
  font-family:${p => p.theme.fonts.monospace};
  font-size:13px;
  position: absolute;
  left: 0px;
  top:0px;
  line-height:28px;
`

const CMDInput = styled.input`
  display: inline-block;
  color:${p => p.theme.colors.primary};
  font-family:${p => p.theme.fonts.monospace};
  font-size:13px;
  outline: none;
  background: transparent;
  border: none;
  width: 100%;
  padding-left: 16px;
  resize: none;
  line-height:28px;

`