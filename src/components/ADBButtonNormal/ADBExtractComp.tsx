import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { IInput } from "@Types";
import { useTranslation, Trans, Translation } from 'react-i18next'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import ADBButtonNormal from '@Components/ADBButtonNormal'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';
import {getUserHome} from 'src/helpers/GlobalEnvironments/PathEnvironments';

const {dialog} = require('electron').remote;
import {ADBCommandStateContext}  from '@Context/ADBCommandContext';

export interface IADBExtractComp{
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

const ADBExtractComp: React.FC<IADBExtractComp> = memo(({cmdTriggerAnim,keyword,btnStr,children,enable,isDisableCMDAnim,cmdStr,cmdTarget}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  const [mCMDStr,setMyCMDStr] = useState<string>('')

  const {cmdWithConsole} =  useContext(ADBCommandStateContext)
  const selectAPKToExtract = (target:any) =>{
    execCMDPromise(`adb -s '${target}' shell dumpsys activity recents | grep 'Recent #0' | cut -d= -f2 | sed 's| .*||' | cut -d '/' -f1`, function(valName:any){
      execCMDPromise(`adb -s '${target}' shell pm path` + ' ' + valName, function(val:any){
          var path = val.toString();
          path = path.substring(path.indexOf(':')+1,path.lastIndexOf('k')+1);
          console.log(path)

          cmdWithConsole(`adb -s '${target}' pull`  + ' ' + path + ' '  +getUserHome()+`/Desktop/${valName.replace(/\s/g, "")}.apk`)
          //setMyCMDStr(`adb -s '${target}' pull`  + ' ' + path + ' '  +getUserHome()+`/Desktop/${valName.replace(/\s/g, "")}.apk`)
          // execCMDPromise(`adb -s '${target}' pull`  + ' ' + path + ' '  +getUserHome()+`/Desktop/${valName.replace(/\s/g, "")}.apk`, function(val:any){
          //     console.log('提取成功')

          // });
      });

    });
  }

  return (
    <div>
      <ADBButtonNormal
        enable={enable}
        cmdTriggerAnim={cmdTriggerAnim}
        isDisableCMDAnim={isDisableCMDAnim}
        cmd = {mCMDStr}
        onClick ={()=>{selectAPKToExtract(cmdTarget)}}
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


export default ADBExtractComp
