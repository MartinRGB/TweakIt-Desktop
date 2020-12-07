import React,{ memo,useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {css} from "@emotion/core";
import { jsx,useColorMode} from 'theme-ui'

// i18n
import '@Context/i18nContext'
import DropDownMenu from '@Components/DropDownMenu'
import Icons from '@Assets/icons'
import adbConfig from '@Config/adb_cmd_list.json';
import ADBButtonSegment from '@Components/ADBButtonSegment'
import ADBExpandSelect from '@Components/ADBExpandSelect'

const ADBTopArea: React.FC = memo(({ children }) => {
  // return <button type="button">{children}</button>
  const [colorMode, setColorMode] = useColorMode();

  const defaultActivie = adbConfig.adb_b;
  const segmentIconStr = ["USB","Wifi",];
  const segmentCMDStr = [adbConfig.adb_b,adbConfig.adb_test];


  const castIconStr:any = "Cast";
  const screenshotIconStr = "Screenshot";
  const recordIconStr = "Record";
  const castCMDStr:any = adbConfig.adb_1;
  const screenshotCMDStr = adbConfig.adb_2;
  const recordCMDStr= adbConfig.adb_3;


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

  
  const [connectionMode,setConnectionMode] = useState<string>(defaultActivie)
  
  const onIndexClicked = (i:any,val:any) =>{
    console.log(i)
    console.log(val)
  }

  const onSegementIndexClicked = (i:any,val:any,cmd:any) =>{
    console.log(i)
    console.log(cmd)
    console.log(val)
    setConnectionMode(val)
  }

  console.log(connectionMode)


  return (
      <Container>
        <DropDownMenu onClickIndex={(i,val)=>{onIndexClicked(i,val)}} style={{zIndex:`1`}} menuStyle={{zIndex:`1`,left:`-1px`,width:`calc(100% + 3px)`}} optionsData={optionsData} menuWidth={`calc(100%)`} isRichAnimation={false}></DropDownMenu>

        <ADBButtonSegment
          style={{    
            bottom: `18px`,
            position: `absolute`
          }}
          cmdArray = {segmentCMDStr}
          iconArray = {segmentIconStr}
          active = {defaultActivie}
          onSegementClickIndex={(i,val,cmd)=>{onSegementIndexClicked(i,val,cmd)}}
        >

        </ADBButtonSegment>

        <ScreenContainer>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={castIconStr}
            cmdStr={castCMDStr}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            style={{
              marginRight:`6px`,
            }}
            iconStr={screenshotIconStr}
            cmdStr={screenshotCMDStr}
          >

          </ADBExpandSelect>
          <ADBExpandSelect
            iconStr={recordIconStr}
            cmdStr={recordCMDStr}
          >

          </ADBExpandSelect>
        </ScreenContainer>

      </Container>
  );
})

export default ADBTopArea

const Container = styled.div`
  width:100%;
  height:90px;
  padding: 18px 38px;
  background:${p=>p.theme.colors.adb_top_background};
  border-bottom:1px solid ${p => p.theme.colors.adb_border};
  position: relative;
`

const ScreenContainer = styled.div`
bottom: 18px;
position: absolute;
right:0px;
display:flex;
flex-direction:row;
right:38px;
`
