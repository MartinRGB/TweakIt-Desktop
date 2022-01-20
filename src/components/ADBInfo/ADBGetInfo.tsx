import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";
import { IInput } from "@Types";
import { useTranslation, Trans, Translation } from 'react-i18next'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import ADBButtonNormal from '@Components/ADBButtonNormal'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';

export interface IADBGetInfo{
  childen:any;
  enable?:any;
  isDisableCMDAnim?:any;
  cmdTarget?:any;
  cmdStr?:any;
  cmdKeyword?:any;
  keyword?:any;
  btnStr?:any;
  cmdTriggerAnim?:any;
}

const ADBGetInfo: React.FC<IADBGetInfo> = memo(({cmdTriggerAnim,keyword,btnStr,children,enable,isDisableCMDAnim,cmdStr,cmdTarget}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const [currentInfo,setCurrentInfo] = useState<string>('-')

  const getCallBackInfo = (str:any,target:any) =>{
    console.log(str);
    console.log(target)
    execCMDPromise(str.replace(/{target}/g, target),function(val:any){
      setCurrentInfo(val)
    })
  }

  return (
    <div>
      <ADBButtonNormal
        enable={enable}
        cmdTriggerAnim={cmdTriggerAnim}
        isDisableCMDAnim={isDisableCMDAnim}
        cmd = {(cmdStr!=null?cmdStr.replace(/{target}/g, cmdTarget):'')}
        onClick ={()=>{getCallBackInfo(cmdStr,cmdTarget)}}
        buttonCSS = {
          css`
            position: absolute;
            top: 0px;
            right: 0px;
            > button{
              height:16px;
              width:32px;
              padding-left: 0px;
              padding-right: 0px;
            }
            > button > svg{
              position: absolute;
              top: -1px;
              height: 16px;
              width: 16px;
              left: 5px;
              left: 5px;
              transform: scale3d(0.9,0.9,1);
            }
            > button > span{
              line-height:14px;
              font-size: 9px;
            }
          `
        }
      >
      <CustomSpan><Trans>{btnStr}</Trans></CustomSpan>
    </ADBButtonNormal>
    <CallbackSpan isAnimationEnable={isGlobalAnimEnable}>{currentInfo?currentInfo:'-'}</CallbackSpan>
  </div>
  )
})

const CustomSpan = styled.span`
  text-align: center;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
  line-height: 14px;
  width: 100%;
  color:${p => p.theme.colors.primary};
`


const CallbackSpan = styled.span<{
  isAnimationEnable:boolean;
}>`
  width: 100%;
  text-align: right;
  display:block;
  opacity:0.7;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 22px;
  color:${p => p.theme.colors.text};
  transition:${p=>p.isAnimationEnable?'all 0.25s':''};
  //user-select:none;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`


export default ADBGetInfo
