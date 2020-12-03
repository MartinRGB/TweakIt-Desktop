import React ,{memo,useState, useEffect,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import {useSpring, animated,interpolate} from 'react-spring'
import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import DescText from '@Components/DescText'
import MainButtonNormal from '@Components/MainButtonNormal'
//import childProcess from 'child_process';
import Icons from '@Assets/icons'
import animationConfig from '@Config/animation.json';
import TitleButtonNormal from '@Components/TitleButtonNormal'

import Terminal from 'terminal-in-react';
import theme from 'src/styles/theme.ts';
const { app } = window.require('electron').remote;
const childProcess = require('child_process');
const exec = childProcess.exec;
const fs = require("fs");
var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localNodePath = appPath + '/node_modules/'
var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
var localScrcpyBinPath = localAssetsPath + 'scrcpy/1.16/bin/';
var ADBPath = '/usr/local/bin/adb'
var ScrcpyBinPath = '/usr/local/bin/scrcpy'


const execCMD2 = (cmd:any,log?:any,successCallback?:(e:any) => void) =>{
    

  exec(cmd, function(error:any, stdout:any, stderr:any){
    if(error) {
      console.error('error: ' + error);
        return;
    }
    console.log(log + ':\n' + stdout);
    if(successCallback){
      successCallback(stdout);
    }
  });
  
}

window.execCMD = (str:string) => execCMD2(str)


const getUserHome = () =>{
  return process.env.HOME || process.env.USERPROFILE;
}

console.log(localADBPath)
console.log(localADBPath)
console.log(localScrcpyBinPath)

const injectTempEnv = () =>{
  process.env.PATH =  '/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:' + 
  localNodePath + '.bin' + ':' + 
  localADBPath.substring(0, localADBPath.length - 1) + ':' + 
  localScrcpyBinPath.substring(0, localScrcpyBinPath.length - 1) + ':' +
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

console.log(process.env.PATH)


const SelectArea: React.FC = memo(({children}) => {
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();


  const getMessageFromDevice = () =>{

  }

  const postMessageToDevice = () =>{

  }



  // ################### Custom DropDown ###################


  const [selectedText,setSelectedText] = useState<string>('select...')
  const [selectIndex,setSelectIndex] = useState<number>(-1)
  const [selectExpand,setSelectExpand] = useState<boolean>(false)
  
  const [selectAnimationProgress,setSelectAnimationProgress] = useState<number>(0)
  const [selectExpandAnimate,setSelectExpandAnimate] = useState<boolean>(false)
  const [opacityTransitionIn,setOpacityTransitionIn] = useState<boolean>(false)

  const customOptions = [
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



  const menuPadding = 6;
  const menuListNum = customOptions.length;
  const listHeight = 20;

  const onClickSelect = () =>{

    if(onClickListExpandTimeOut){
      clearTimeout(onClickListExpandTimeOut)
    }
    if(onExpandAnimationEndTimeOut){
      clearTimeout(onExpandAnimationEndTimeOut)
    }

    if(!selectExpand){
      setSelectExpandAnimate(true)
      setSelectExpand(true)
      setOpacityTransitionIn(true)
    }
    else{
      setSelectExpandAnimate(false)
    }
  }


  var onClickListExpandTimeOut:any;

  const onClickList = (index:number,value:string) => {

    if(onClickListExpandTimeOut){
      clearTimeout(onClickListExpandTimeOut)
    }
    if(onExpandAnimationEndTimeOut){
      clearTimeout(onExpandAnimationEndTimeOut)
    }

    console.log(value)
    setSelectIndex(index)
    setSelectedText(value)
    if(selectExpand){
      onClickListExpandTimeOut = setTimeout(()=>{
        setSelectExpandAnimate(false)
        clearTimeout(onClickListExpandTimeOut)
      },150)
    }
  }


  var onExpandAnimationEndTimeOut:any;

  const {listProps} = useSpring({
    listProps: selectExpandAnimate ? 1 : 0,
    config: animationConfig.select_drop_down,
    onStart: () =>{
    },
    onFrame: () =>{
      setSelectAnimationProgress(listProps.value);
    },
    onRest: () =>{
      if(!selectExpandAnimate){
        setOpacityTransitionIn(false)
        onExpandAnimationEndTimeOut = setTimeout(()=>{
          setSelectExpand(false)
          clearTimeout(onExpandAnimationEndTimeOut)
        },150)
      }
    }
  })

  // ################### Custom DropDown ###################
  

  const [log,setLog] = useState<any>();
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

const [textVal,setTextVal] = useState<number>('')
const [prevVal,setPrevTextVal] = useState<number>()

  const addADB = () =>{
    execCMD2('ls','curr',(value:any)=>{
      setTextVal(textVal+value)
    })
    //console.log('2323')
  }

  const myRef= useRef();

  return (
    <Container>


<button onClick={(e)=>addADB()}> + adb 内容</button>
      <div
        style={{
          background:`${theme.colors.background}`,
          width:`100vw`,
          height:`50vh`,
          position:`absolute`,
          left:`0px`,
          bottom:`0px`,
          overflowY: `scroll`,
        }}
      >
        <p
          style={{
            position: `absolute`,
            color:`grey`, //${theme.colors.primary}
            left: `0`,
            fontFamily:`${theme.fonts.monospace}`,
            fontSize:`11px`,
            top: `0`,
            wordBreak: `break-all`,
            whiteSpace: `pre-wrap`,
            background: `transparent`,
          }}
        >
        {textVal}
        </p>

      </div>

        {/* <Terminal
          color='green'
          allowTabs={false}
          hideTopBar={true}
          showActions={false}
          watchConsoleLogging={true}
          backgroundColor='black'
          barColor='black'
          style={            
            { 
            width:`100%`,
            fontWeight: "normal", 
            "fontSize": "1em",
            fontFamily:`${theme.fonts.monospace}`,
            position: `absolute`,
            bottom: `0px`,
            left: `0px`,
            }
          }
          commands={{
            'ls':(cmd,print) => {
              // do something async
              execCMD('ls','current dir is',
                      (value:any)=>{
                          console.log(value)
                          print(`-PassedThrough '${'ls'}', result is:`);
                          print(`${value}`);
                      },
                      (error:any)=>{
                          print(`error: :${error}`);
                      }
              )
            },
            'adb-devices':(cmd,print) => {
              // do something async
              execCMD('adb devices',
                      (value:any)=>{
                          console.log(value)
                          print(`-PassedThrough '${'adb devices'}', result is:`);
                          print(`${value}`);
                      },
                      (error:any)=>{
                          print(`error: :${error}`);
                      }
              )
            },

          }}
          
          // commandPassThrough={(cmd, print) => {
          //   // do something async
          //   var origCMD = cmd.toString().replace(/\,/g, " ");
          //   if(origCMD === 'ls'){
          //     execCMD('ls','current dir is',
          //     (value:any)=>{
          //       console.log(value)
          //       print(`-PassedThrough ${origCMD}, result is:`);
          //       print(`${value}`);
          //     },
          //     (error:any)=>{
          //       print(`error: :${error}`);
          //     }
          //     )
          //   }
          //   else{
          //     print(`-PassedThrough ${origCMD}: command not found`);
          //   }
          // }}
          descriptions={{
            'ls': 'show current dir',
            'adb devices': 'show current connected Android devices'
          }}
          msg='ADB Command Line'
        /> */}
      <TopLeftContainer>
        <TitleSpan><Trans>Select Animation In Tweakit-Android</Trans></TitleSpan>


        {/* ################### Custom DropDown ################### */}
        <CustomSelectWrapper>
          <CustomSelect
            onClick={onClickSelect}
          >
            <CustomSelectedSpan>{selectedText}</CustomSelectedSpan>
            <Icons.SelectArrow></Icons.SelectArrow>
          </CustomSelect>

          {
            selectExpand?
            <DropDownMenu
            style={{
              height: `${Math.max(0,(selectIndex === -1)?
                                    (0 + selectAnimationProgress*(menuPadding*2+menuListNum*listHeight - 0))
                                    :
                                    (20 + selectAnimationProgress*(menuPadding*2+menuListNum*listHeight - 20))  )}px`,
              padding: `${menuPadding*selectAnimationProgress}px 0px`,
              borderWidth: `${selectAnimationProgress}px`,
              display:`${selectExpand?'block':'none'}`,
              transform:`translate3d(0px,${(selectIndex === -1)?0:selectAnimationProgress*21 -21}px,0px)`
            }}
            >
              <DropDownBackground
                style={{
                  opacity:`${opacityTransitionIn?'1':'0'}`
                }}
              ></DropDownBackground>
              <DropDownTransitionDiv
                style={{
                  transform:`translate3d(${19*selectAnimationProgress-19}px,${(selectIndex === -1)?0:-selectIndex*listHeight+selectAnimationProgress*(selectIndex*listHeight)}px,0px)`
                }}
              >
              {
                customOptions.map(function (data:any,index:number) {

                  return (
                    <DropDownListContainer
                      style={{
                        display:`${selectExpand?'block':'none'}`,
                        height:`${listHeight}px`
                      }}
                      key={index}
                      onClick = {()=>{onClickList(index,data.value)}}
                    >
                        <DropDownListBackground>
                          <Icons.CheckMark style={{
                            position: `absolute`,
                            top: `2px`,
                            left: `8px`,
                            transform: `${(selectIndex === index)?'scale3d(1,1,1)':'scale(0,0,0)'}`,
                            opacity: `${(selectIndex === index)?selectAnimationProgress:'0'}`,
                            }}>
                          </Icons.CheckMark>
      
                          <DropDownListSpan
                            style={{
                              opacity: `${(selectIndex === index)?'1':''}`,
                              transform: `${(selectIndex === index)?'scale3d(1.2,1.2,1)':''}`,
                            }}  
                          >{data.value}</DropDownListSpan> 
                      </DropDownListBackground>
                    </DropDownListContainer>
                  )

                })
              }
              </DropDownTransitionDiv>

            </DropDownMenu>
            :
            ''
          }

        </CustomSelectWrapper>
        {/* ################### Custom DropDown ###################*/}




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

const DropDownMenu = styled.div`
  position:absolute;
  top: 20px;
  left: -1px;
  width:240px;
  height:0px;
  border: 1px solid ${p => p.theme.colors.adb_border};
  border-radius:4px;
  overflow:hidden;
  //transition:all 0.3s;
  
`

const DropDownBackground = styled.div`
  width:100%;
  height:100%;
  background:${p => p.theme.colors.normal_button_bg};
  backdrop-filter:blur(3px);
  position: absolute;
  top: 0px;
  transition:all 0.1s;
`

const DropDownListContainer = styled.div<{
}>`
  width:300px;
  margin-left: 0px;
  margin-right: 0px;
  position: relative;
  z-index:0;
  cursor:pointer;
  transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;
  
  // &:hover > div{
  //   background:${p => p.theme.colors.primary};
  // }

  // &:hover > div > svg {
  //   fill:${p => p.theme.colors.background};
  // }

  &:hover > div > span{
    transform:scale3d(1.2,1.2,1);
    opacity:1;
    //color:${p => p.theme.colors.background};
  }

  &:active > div > span{
    transform:scale3d(1,1,1);
    opacity:1;
  }

  > div > svg {
    fill: ${p => p.theme.colors.text};
    transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;
  }
`

const DropDownTransitionDiv = styled.div`
`

const DropDownListBackground = styled.div`
  width:100%;
  height:100%;

  &:hover {
    //background: ${p => p.theme.colors.primary};
    opacity:1;
  }

  &:hover > span {
    //color: ${p => p.theme.colors.background};
    //filter:drop-shadow(2px 4px 6px black);
  }

  &:hover > svg {
    //fill: ${p => p.theme.colors.background};
  }
`

const DropDownListSpan = styled.span`
  color:${p => p.theme.colors.text};
  font-family: ${p => p.theme.fonts.headText};
  font-size: 10px;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  left: 28px;
  top: 0px;
  user-select:none;
  transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;
  transform-origin: left center;
  opacity:0.6;
`

const CustomSelectWrapper = styled.div`
    height: 20px;
    width: 240px;
    min-width:240px;
    position: relative;
    border: 1px solid ${p => p.theme.colors.text_input_border};
    border-radius: 4px;
    margin-right: 32px;
    background: ${p => p.theme.colors.normal_button_bg};
`
const CustomSelect = styled.button`
    height: 100%;
    width: 100%;
    position: absolute;
    background: transparent;
    transition:all 0.15s;
    cursor:pointer;
    outline:none;
    border:none;

    >svg{
      fill: ${p => p.theme.colors.text};
      position: absolute;
      right: 1px;
      top: 1px;
      transition:all 0.15s;
      z-index:1;
    }

    &:active  > span{
      //color: ${p => p.theme.colors.background};
    }
  
    &:active  > svg{
      //fill: ${p => p.theme.colors.background};
    }

    &:active {
      background: #a4a7a480;
      opacity:0.5;
    }
`

const CustomSelectedSpan = styled.span`
  color:${p => p.theme.colors.text};
  font-family: ${p => p.theme.fonts.headText};
  font-size: 10px;
  transform:scale3d(1.2,1.2,1);
  transform-origin:left center;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  left: 8px;
  top: -1px;
  user-select:none;
  transition:all 0.15s;
`




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