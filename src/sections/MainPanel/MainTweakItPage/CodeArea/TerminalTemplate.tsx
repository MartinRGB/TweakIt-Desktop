import React ,{memo,useContext, useEffect,useState,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import MainButtonToggle from '@Components/MainButtonToggle'
import TitleButtonNormal from '@Components/TitleButtonNormal'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import Icons from '@Assets/icons'
import Solver from '@Components/Solver'
import { GraphUpdateContext } from '@Context/GraphUpdateContext'
import WebWorker from "react-webworker"
//import SpringFactorEvaluator from './SpringFactorEvaluator'
//import SpringFactorEvaluator from './SpringFactorEvaluator.js'
import SpringFactorEvaluatorWorker from "./SpringFactorEvaluator.worker.js";
import {ADBConnectStateContext} from '@Context/ADBConnectContext'


export interface ITerminalSnippet{
  style?:any;
}

const TerminalTemplate: React.FC<ITerminalSnippet> = memo(({style}) => {

  const [colorMode] = useColorMode();
  const {adbTerminalText,cleanAllData,adbInfoTimes,adbTagStartText,adbCommandText,adbCommandIsSuccess,adbResultText,adbTagEndText} =  useContext(ADBConnectStateContext)
  //const [isInit,setIsInit] = useState<boolean>(false)

  useEffect(() => {
    //setADBTerminalText('')
    //cleanAllData()
    //setIsInit(true)
  }, [])

  console.log(adbTerminalText)
  console.log(adbTagStartText)
  console.log(adbCommandText)
  console.log(adbResultText)
  console.log(adbTagEndText)

  return (
    <TerminalContainer style={{...style}}>

      {/* {(adbTerminalText&&isInit)?
        <CustomSpan>
          {adbTerminalText}
        </CustomSpan>
        :
        <Comment>🍺🍺🍺 <Trans>Console Log Here</Trans> 🍺🍺🍺</Comment>
      } */}
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
`

const CustomSpan = styled.span`

  color:${p=>p.theme.colors.primary};
  word-break: break-all;
  white-space: pre-wrap;
  background: transparent;
  height: 100%;

`

const Comment =styled.p`
  color:#9D9DB2; //grey
  display: inline-block;
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
`
