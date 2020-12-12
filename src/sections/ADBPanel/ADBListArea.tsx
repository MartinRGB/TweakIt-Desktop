import React,{ memo,useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'

// i18n
import '@Context/i18nContext'
import { useTranslation, Trans} from 'react-i18next'
import { ADBExpandStateContext } from '@Context/ADBExpandContext';
import {useSpring, animated,interpolate} from 'react-spring'
import animationConfig from '@Config/animation.json';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import adbList from '@Config/adb_list.json'
import ADBListTree from './ADBListTree'

import {ADBConnectContext}  from '@Context/ADBConnectContext';
import {ADBSelectContext} from '@Context/ADBSelectContext';

//adb shell ip addr show wlan0
//adb shell getprop ro.build.version.sdk
//adb shell getprop ro.build.version.release 


const ADBListArea: React.FC = memo(() => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const { t ,i18n} = useTranslation()

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  const {wifiIsConnecting} = useContext(ADBConnectContext)
  // const {currentSelectDeviceId,currentSelectIndex} = useContext(ADBSelectContext)
  const {cmdTarget} = useContext(ADBSelectContext)


  const renderFunction = () =>{
    return(
    <Container>
        {adbList.map(function (data:any,index:number) {
            return (
              <ADBListTree 
                key={data['category']+'_'+index} 
                isUlElement={true}
                category={data['category']}
                index={index}
                visible={data['visible']}
                clickable={data['clickable']}
                >
              {
                data['li'].map(function (cmdData:any,i:number) {
                  return (<ADBListTree 
                            key={data['category']+'_'+cmdData['name']+'_'+i} 
                            isUlElement={false} 
                            name={cmdData['name']} 
                            visible={cmdData['visible']}
                            clickable={cmdData['clickable']}
                            cmdStr={cmdData['adb_cmd']}
                            wifiIsConnecting ={wifiIsConnecting}
                            cmdTarget={cmdTarget}
                            >
                         </ADBListTree>)
                })
              }
              </ADBListTree>
            )
        

          })}
    </Container>
    )
    
  }

  return (
    renderFunction()
  );
})

export default ADBListArea



const Container = styled.div<
{
}
>`
    width: 100%;
    height: 100%;
    padding: 12px 14px;
`;
