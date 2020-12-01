import React ,{memo,useContext, useEffect,useState,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import initState from '@Config/init_state.json'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import { GraphUpdateContext } from '@Context/GraphUpdateContext';
import MainButtonNormal from '@Components/MainButtonNormal';
import Solver from '@Components/Solver';
import DataDrivenAnimator from './DataDrivenAnimator'
import AnimationBox from './AnimationBox'

const PreviewArea: React.FC = memo(({children}) => {

  const [animProperty,setAnimProerty] = useState<string>('scale')
  const [isReverse,setIsReverse] = useState<boolean>(false)
  // strange bug here
  const setScale = () =>{setAnimProerty('scale')}
  const setTrans = () =>{setAnimProerty('translationY')}
  const setRot = () =>{setAnimProerty('rotate')}

  const animationBoxRef = useRef();

  return (
    <Container>
      <PaddingTopBox></PaddingTopBox>
      <AnimationBox
        property={animProperty}
        ref={animationBoxRef}
      >
      </AnimationBox>
      <BtnContainer>
        <MainButtonNormal 
          //onMouseDown={()=>{}} 
          //onMouseUp={()=>{}} 
          onMouseDown={()=>{setScale();animationBoxRef.current.startAnimation(true)}} 
          onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Scale</Trans></CustomSpan>
        </MainButtonNormal>
        <MainButtonNormal 
          onMouseDown={()=>{setTrans();animationBoxRef.current.startAnimation(true)}} 
          onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          //onClick={() =>{setTrans();animationBoxRef.current.startAnimation()}}
          >
            <CustomSpan><Trans>Trans</Trans></CustomSpan>
        </MainButtonNormal>
        <MainButtonNormal 
          //onMouseDown={()=>{}} 
          //onMouseUp={()=>{}} 
          onMouseDown={()=>{setRot();animationBoxRef.current.startAnimation(true)}} 
          onMouseUp={()=>{animationBoxRef.current.startAnimation(false)}} 
          >
            <CustomSpan><Trans>Rot</Trans></CustomSpan>
        </MainButtonNormal>
      </BtnContainer>
    </Container>
  )
})

export default PreviewArea


const PaddingTopBox = styled.div`
  width:100%;
  height:45px;
`
const BtnContainer = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  flex-direction: row;
  padding: 0 28px;
  height: 16px;
  flex: 1;
`


const Container = styled.div`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
`

const CustomSpan = styled.span`
text-align: center;
font-family: ${props => props.theme.fonts.numberInput};
font-style: normal;
font-weight: bold;
font-size: 11px;
line-height: 14px;
`
