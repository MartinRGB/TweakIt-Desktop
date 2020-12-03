import React ,{memo,useState, useContext,useEffect,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import MainButtonNormal from '@Components/MainButtonNormal'
//import childProcess from 'child_process';
import Icons from '@Assets/icons'
import animationConfig from '@Config/animation.json';

import theme from 'src/styles/theme.ts';
import DropDownMenu from '@Components/DropDownMenu'
import {ADBConnectStateContext} from '@Context/ADBConnectContext'




const { app } = window.require('electron').remote;
const childProcess = require('child_process');
const exec = childProcess.exec;
const fs = require("fs");

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localNodePath = appPath + '/node_modules/'
var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
var localScrcpyBinPath = localAssetsPath + 'scrcpy/1.16/bin/';
var ADBPath = '~/Library/Android/sdk/platform-tools'; ///usr/local/bin
var ScrcpyBinPath = '/usr/local/Cellar/scrcpy/1.12.1/bin';

const getUserHome = () =>{
  return process.env.HOME || process.env.USERPROFILE;
}


const injectTempEnv = () =>{
  process.env.PATH =  '/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:' + 
  localNodePath + '.bin' + ':' + 
  ADBPath.substring(0, localADBPath.length - 1) + ':' + 
  ScrcpyBinPath.substring(0, localScrcpyBinPath.length - 1) + ':' +
  '/usr/bin:' +
  '/bin:' +
  '/usr/local/sbin:' +
  '/usr/local/bin:' +
  '/usr/sbin:' +
  '/sbin:' + 
  '/opt/puppetlabs/bin:' +
  '/usr/local/munki:' + 
  '/Library/Apple/usr/bin:';
}

injectTempEnv()


const execCMDPromise = (cmd:any,log?:any,successCallback?:(e:any) => void,errorCallback?:(e:any)=>void) =>{
    
  exec(cmd, function(error:any, stdout:any, stderr:any){
    if(error) {
        console.error('error: ' + error);
        if(errorCallback){
          errorCallback(error);
        }
        return;
    }
    console.log(log + ':\n' + stdout);
    if(successCallback){
      successCallback(stdout);
    }
  });
  
}

const execCMD = (cmd:any,log?:any,successCallback?:(e:any) => void,errorCallback?:(e:any)=>void) =>{
  var promise = new Promise((resolve, reject) =>{
    exec(cmd, function(error:any, stdout:any, stderr:any){
      if(error) {
          reject(error);
          return;
      }
      resolve(stdout);
    });
  });

  promise.then(function(value) {
    console.log(log + ':\n' + value);
    if(successCallback){
      successCallback(value);
    }
    // success                       
  }).catch(function(error) {
    console.error('error: ' + error);
    if(errorCallback){
      errorCallback(error);
    }
    // failure                       
  });
}

const SelectArea: React.FC = memo(({children}) => {
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();

  const {setADBTerminalText,adbTerminalText,adbInfoTimes,setADBInfoTimes,setADBTagStartText,setADBCommandText,setADBTagEndText,setADBCommandIsSuccess,setADBResultText} =  useContext(ADBConnectStateContext)

  const cmdWithConsole = (cmd:any) =>{
    execCMD(cmd,`input command is ${cmd}`,
    (value:any)=>{
      setADBTerminalText(
        adbTerminalText + '\n' +
        `=================== Result Start At ${new Date().toString()} ===================`+ '\n' +
        '\n' +
        `Command '${cmd}' result is: `+ '\n' + 
        '\n' +
        value + '\n' +
        `=================== Result End At ${new Date().toString()} ===================` + '\n'
      )
      console.log(value)
      setADBInfoTimes(adbInfoTimes+1)
      setADBTagStartText( 
      `=================== Result Start At ${new Date().toString()} ===================`+ '\n' +
      '\n'
      )
      setADBCommandText(
      `Command '${cmd}' result is: `+ '\n' + '\n'
      )
      setADBCommandIsSuccess(
        true
      )
      setADBResultText(
      value + '\n'
      )
      setADBTagEndText(
      `=================== Result End At ${new Date().toString()} ===================` + '\n'
      )
    },
    (value:any)=>{
      setADBTerminalText(
        adbTerminalText + '\n' +
        `=================== Result Start At ${new Date().toString()} ===================`+ '\n' +
        '\n' +
        `Command '${cmd}' not found: `+ '\n' + 
        '\n' +
        value + '\n' +
        `=================== Result End At ${new Date().toString()} ===================` + '\n'
      )
      setADBInfoTimes(adbInfoTimes+1)
      setADBTagStartText( 
      `=================== Result Start At ${new Date().toString()} ===================`+ '\n' +
      '\n'
      )
      setADBCommandText(
      `Command '${cmd}' not found: `+ '\n' + '\n'
      )
      setADBCommandIsSuccess(
        false
      )
      setADBResultText(
      value + '\n'
      )
      setADBTagEndText(
      `=================== Result End At ${new Date().toString()} ===================` + '\n'
      )
      console.log(value)
   

    })
  }

  window.execCMD = (str:string) => cmdWithConsole(str)

  const getMessageFromDevice = () =>{}

  const postMessageToDevice = () =>{}

  const optionsData = [
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
    { value: "Spring", label: "Spring" },
    { value: "Summer", label: "Summer" },
    { value: "Autumn", label: "Autumn" },
    { value: "Winter", label: "Winter" },
  ];
  


  return (
    <Container>

      <TopLeftContainer>
        <TitleSpan><Trans>Select Animation In Tweakit-Android</Trans></TitleSpan>

        <DropDownMenu optionsData={optionsData} menuWidth={240} isRichAnimation={true}></DropDownMenu>
     
        <MainButtonNormal 
          buttonCSS = {
            css`
              margin-left:12px;
              margin-right:12px;
              height:20px;
              margin-top:-6px;
              > button{
                display:inline-block;
                height:20px;
                width:40px;
              }
            `
          }
          onClick={getMessageFromDevice}
          // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Get</Trans></CustomSpan>
        </MainButtonNormal>
        <MainButtonNormal
          buttonCSS = {
            css`
              margin-right:12px;
              height:20px;
              margin-top:-6px;
              > button{
                display:inline-block;
                height:20px;
                width:40px;
              }
            `
          }
          onClick={postMessageToDevice}
          // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Build</Trans></CustomSpan>
        </MainButtonNormal>


      </TopLeftContainer>
    </Container>
  )
})

export default SelectArea

const Container = styled.div`
  width:100%;
  height: 56px;
  min-height:56px;
  display: flex;
  flex-direction: column;
  z-index:2;
  background:${p => p.theme.colors.main_top_bg};
  box-shadow: 0px 1px 0px ${p => p.theme.colors.adb_border};
`

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  float: left;
  padding-left:14px;
`
const TitleSpan = styled.p`
  text-align:left;
  width:201px;
  min-width:201px;
  opacity:0.5;
  font-family: ${props => props.theme.fonts.headText};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  user-select: none;
  margin-right:12px;
  color:${p => p.theme.colors.text};
  z-index:1;
`

const CustomSpan = styled.span`
  text-align: center;
  font-family: ${props => props.theme.fonts.numberInput};
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 14px;
  color:${p => p.theme.colors.primary};
`