import React ,{memo,useState, useContext,useEffect,useRef,useCallback} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";
import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import ADBButtonNormal from '@Components/ADBButtonNormal'
//import childProcess from 'child_process';
import Icons from '@Assets/icons'
import animationConfig from '@Config/animation.json';
import cmdList from '@Config/cmd_list.json';

import theme from 'src/styles/theme.ts';
import DropDownMenu from '@Components/DropDownMenu'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import {ADBConnectionContext}  from '@Context/ADBConnectionContext';

import  {TweakItConnectionContext} from '@Context/TweakItConnectionContext';

import { ListSelectStateContext } from '@Context/ListSelectStateContext';
import { exec, execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';
import { resolve } from 'webpack/electron.webpack.ts';

// Getter

// $adb -s emulator-5554 shell content call --uri content://com.smartisan.tweakitdemo.tweakit/tweak_call --method "anim_get"
// Result: Bundle[{result={"anim_list":[{"anim_name":"MainActivity.java_97","anim_data":{"type":"SpringAnimation","dampingRatio":{"min":0,"max":10,"value":0.55},"naturalFreq":{"min":0.10000000149011612,"max":1000,"value":300.1}}}]}}]

//adb -s 00d4fe2f shell content call --uri content://com.smartisan.tweakit/tweak_call --method "anim_get"
//adb -s 00d4fe2f shell content call --uri content://com.smartisan.tweakitdemo.tweakit/tweak_call --method "anim_get"

//adb -s 1f496250 shell content call --uri content://com.smartisan.tweakitdemo.tweakit/tweak_call --method "anim_get"

// Setter
// $adb -s 00d4fe2f shell content call --uri content://com.smartisan.tweakit/tweak_call --method "anim_set" --arg "{"anim_list":[{"anim_name":'SMTUIScaleHelper.java_130',"anim_data":{"type":"SpringAnimation","dampingRatio":0.15,"naturalFreq":200}}]}"

// adb -s 00d4fe2f shell content call --uri content://com.smartisan.tweakitdemo.tweakit/tweak_call --method "anim_set" --arg "{"animator_list":[{"animation_name":"MainActivity.java_161","animation_data":{"calculator":"SpringAnimationCalculator","Stiffness":{"min":0,"max":3000,"default":800},"DampingRatio":{"min":0.01,"max":1,"default":0.855},"Velocity":{"min":0,"max":0,"default":0}}}]}"

const passedAnimationData = {
  "animation_data": {
    "Stiffness": {
        "default": 500,
        "min": 1,
        "max": 5000,
        "editable": true
    },
    "DampingRatio": {
        "default": 0.25,
        "min": 0.01,
        "max": 0.999,
        "editable": true
    },
    "Velocity": {
        "default": 0,
        "min": 0,
        "max": 1000,
        "editable": true
    }
  }
}


const passedAnimationInfo = 'Android_Spring'
const passedAnimationPlatform = 'Android'
const passedAnimationName = 'Spring'
const passedAnimationCalculator = 'SpringAnimationCalculator'
const passedAnimationEaseName = ['','','','','']

const alterAnimationData = {
  "animation_data": {
    "Factor": {
        "default": 2,
        "min": 0.01,
        "max": 5,
        "editable": true
    },
    "Duration": {
        "default": 1,
        "min": 0.01,
        "max": 10,
        "editable": true
    }
  }
}


const SelectArea: React.FC = memo(({children}) => {
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();

  const {codeBlockIsShow, setCodeBlockIsShow,setTriggerBlocAnim,adbInputCMD,canTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {setPreviousAndCurrentGraph} = useContext(ListSelectStateContext)

  const {serialNoDevicesCounts,currentDeviceSelectIndex,serialNoDevicesIsConnectingWifi,serialNoDevicesIsConnectingUSB,serialNoDevicesTargets} = useContext(ADBConnectionContext)

  const {isTweakItAndroidExist,setIsTweakItAndoridExist} = useContext(TweakItConnectionContext)


  useEffect( () => {
    if(!isTweakItAndroidExist){
      setOptionsData([])
    }

  }, [isTweakItAndroidExist]);

  const [optionsData,setOptionsData] = useState<string[]>([])

  const [connectionText,setConnectionText] =  useState<string>('Connect')

  const [jsonData,setJsonData] = useState<any>();
  const [selectIndex,setSelectIndex] = useState<number>(-1);

  const getMessageFromDevice = () =>{
    if(connectionText === 'Connect'){
      execCMDPromise(`adb -s ${serialNoDevicesTargets} shell dumpsys activity | grep -E 'mResumedActivity' | awk '{print $4}'`,function(val:any){
        const activityName = val.split('/')[0];
  
        execCMDPromise(`adb -s ${serialNoDevicesTargets} shell content call --uri content://${activityName}.tweakit/tweak_call --method "anim_get"`,function(val:any){
          if(val.includes("animation_name")){
            setIsTweakItAndoridExist(true)
            setConnectionText('Disconnect')
            var value = val.replace("Result: Bundle[{result=","");
            value = value.substring(0, value.length - 3);
            var obj = JSON.parse(value)
            setJsonData(obj)
            var opData = [];
            for(var i = 0;i<obj['animator_list'].length;i++){
              opData.push(obj['animator_list'][i]['animation_name'])
            };
            setOptionsData(opData);
            // if(selectObjIndex != -1){
            //   setGraphTrans(selectObjIndex)
            // }

            if(selectIndex != -1){
              //setGraphTrans(selectIndex)
              setPreviousAndCurrentGraph(
                "Android_"+(obj['animator_list'][selectIndex]['name'].includes('Interpolator')?obj['animator_list'][selectIndex]['name'].replace("Interpolator",""):obj['animator_list'][selectIndex]['name']),"Android",
                obj['animator_list'][selectIndex]['name'].includes('Interpolator')?obj['animator_list'][selectIndex]['name'].replace("Interpolator",""):obj['animator_list'][selectIndex]['name'],obj['animator_list'][selectIndex]['calculator'],
                ['','','','',''],
                obj['animator_list'][selectIndex]['animation_data'])

            }

          }
          else{
            setIsTweakItAndoridExist(false)
          }
        })
        
      })

    }

    if(connectionText === 'Disconnect'){
      setIsTweakItAndoridExist(false)
      setConnectionText('Connect')
    }

  }


  const onIndexClicked = (i:any,val:any) =>{
    console.log(i)
    console.log(val)

    setGraphTrans(i)
    setSelectIndex(i)
    //setSelectObjIndex(i)
  }

  const setGraphTrans = (i:number) =>{
    console.log(jsonData)
    setPreviousAndCurrentGraph(
      "Android_"+(jsonData['animator_list'][i]['name'].includes('Interpolator')?jsonData['animator_list'][i]['name'].replace("Interpolator",""):jsonData['animator_list'][i]['name']),"Android",
      jsonData['animator_list'][i]['name'].includes('Interpolator')?jsonData['animator_list'][i]['name'].replace("Interpolator",""):jsonData['animator_list'][i]['name'],jsonData['animator_list'][i]['calculator'],
      ['','','','',''],
      jsonData['animator_list'][i]['animation_data'])
  }

  return (
    <Container isAnimationEnable={isGlobalAnimEnable}>

      <TopLeftContainer>
        <TitleSpan><Trans>Select Animation In Tweakit-Android</Trans></TitleSpan>

        <DropDownMenu 
        onClickIndex={(i,val)=>{onIndexClicked(i,val)}} 
        menuStyle={{left:`-1px`,width:`240px`}}
        optionsData={optionsData} 
        enable={(
          currentDeviceSelectIndex != -1 &&
          serialNoDevicesCounts != 0 &&
          !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
          !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex] && 
          isTweakItAndroidExist
          
        )} 
        menuWidth={`240px`} 
        isRichAnimation={true}></DropDownMenu>
     
        <ADBButtonNormal 
          enable={(            
            currentDeviceSelectIndex != -1 &&
            serialNoDevicesCounts != 0 &&
            !serialNoDevicesIsConnectingWifi[currentDeviceSelectIndex] &&
            !serialNoDevicesIsConnectingUSB[currentDeviceSelectIndex]
          )}
          cmdTriggerAnim={
            // ((adbInputCMD === adbGetStr) && canTriggerControlAnim && codeBlockIsShow)
            false
          }
          cmd={''}
          isDisableCMDAnim={false}
          //onClick={setTriggerBlocAnim(true)}
          buttonCSS = {
            css`
              margin-left:12px;
              margin-right:12px;
              > button{
                height:20px;
                width:40px;
              }
              > button > span{
                width: 100%;
                line-height:16px;
              }
            `
          }
          onClick={getMessageFromDevice}
          >
        <CustomSpan><Trans>{connectionText}</Trans></CustomSpan>
        </ADBButtonNormal>


      </TopLeftContainer>
    </Container>
  )
})

export default SelectArea

const Container = styled.div<{
  isAnimationEnable:boolean;
}>`
  width:100%;
  height: 56px;
  min-height:56px;
  display: flex;
  flex-direction: column;
  z-index:3;
  transition:${p=>p.isAnimationEnable?'background 0.3s,box-shadow 0.3s':'none'};
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

//  <ADBButtonNormal
//   cmdTriggerAnim={
//     ((adbInputCMD === adbConfig.adb_test) && canTriggerControlAnim && codeBlockIsShow)
//   }
//   cmd={adbConfig.adb_test}
//   buttonCSS = {
//     css`
//       margin-right:12px;
//       > button{
//         height:20px;
//       }
//     `
//   }
//   onClick={postMessageToDevice}
//   // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
//   // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
//   >
//     <Icons.USB></Icons.USB>
// </ADBButtonNormal>