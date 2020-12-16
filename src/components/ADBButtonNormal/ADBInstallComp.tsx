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
const {dialog} = require('electron').remote;
import {ADBCommandStateContext}  from '@Context/ADBCommandContext';
export interface IADBInstallComp{
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

const ADBInstallComp: React.FC<IADBInstallComp> = memo(({cmdTriggerAnim,keyword,btnStr,children,enable,isDisableCMDAnim,cmdStr,cmdTarget}) => {
  const [colorMode, setColorMode] = useColorMode()
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)


  const [mCMDStr,setMyCMDStr] = useState<string>('')
  const {cmdWithConsole} =  useContext(ADBCommandStateContext)

  const selectAPKToInstall = (str:any,target:any) =>{
    console.log(str);
    console.log(target)
    let options = {properties:["openFile"]}
    var path = dialog.showOpenDialog(options); 
    path.then(function (result:any) {
        var apkPath = result.filePaths;
        console.log(result.filePaths)
        if(apkPath.indexOf(0) == -1){
            apkPath = result.filePaths.toString().replace(/ /g,"\\ ");
            console.log(result.filePaths.toString().replace(/ /g,'\\ '));
        }
        
        cmdWithConsole(str.replace(/{target}/g, target) + ' ' + apkPath)
        //setMyCMDStr(str.replace(/{target}/g, target) + ' ' + apkPath)
        // execCMDPromise(str.replace(/{target}/g, target) + ' ' + apkPath,function(val:any){
        //   console.log(val);
        // })
    
    });
  }

  return (
    <div>
      <ADBButtonNormal
        enable={enable}
        cmdTriggerAnim={cmdTriggerAnim}
        isDisableCMDAnim={isDisableCMDAnim}
        cmd = {mCMDStr}
        onClick ={()=>{selectAPKToInstall(cmdStr,cmdTarget)}}
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



export default ADBInstallComp
