import React ,{memo,useState, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import DescText from '@Components/DescText'
import MainButtonNormal from '@Components/MainButtonNormal'

import Select from "react-select";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const SelectArea: React.FC = memo(({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Container>
      <TopLeftContainer>
        <DescText
          style={{fongWeight:`300`,fontSize:`12px`}}>Select Animation</DescText>
        <Select
          style={{width:`300px`}}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        ></Select>
        <MainButtonNormal 
          style={{
            display:`inline-block`,
          }}
          // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Build</Trans></CustomSpan>
        </MainButtonNormal>
        <MainButtonNormal 
          style={{
            display:`inline-block`,
          }}
          // onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          // onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Get</Trans></CustomSpan>
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
const CustomSpan = styled.span`
text-align: center;
font-family: ${props => props.theme.fonts.numberInput};
font-style: normal;
font-weight: bold;
font-size: 11px;
line-height: 14px;
`
