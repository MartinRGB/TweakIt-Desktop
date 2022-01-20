import ReactDOM from 'react-dom'
import React, { memo, useState, useRef, useEffect, useContext } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
//import styled from 'styled-components'
import { Icon, IADBListTree } from "@Types";
// import * as Icons from './ListIcon'

import { useColorMode } from 'theme-ui'

import styled from '@emotion/styled';
import { css,jsx } from '@emotion/react';

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

import animationConfig from '@Config/animation.json'

import Icons from '@Assets/icons'

import initState from '@Config/init_state.json'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import { execCMDPromise } from 'src/helpers/ADBCommand/ADBCommand.ts';
import ADBInfo from '@Components/ADBInfo'
import ADBNumberInputGroup from '@Components/ADBInput/ADBNumberInputGroup'
import ADBSwitcher from '@Components/ADBSwitcher'
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import ADBTextInput from '@Components/ADBInput/ADBTextInput'
import ADBNormalButtonGroup from '@Components/ADBButtonNormal/ADBNormalButtonGroup'
import ADBGetInfo from '@Components/ADBInfo/ADBGetInfo'
import ADBInstallComp from '@Components/ADBButtonNormal/ADBInstallComp'
import ADBExtractComp from '@Components/ADBButtonNormal/ADBExtractComp'
const ADBListTree: React.FC<IADBListTree> = memo(({
  clickable, 
  children, 
  name, 
  style,
  category,
  isUlElement, 
  switcherON,
  switcherOFF,
  displayInfo,
  index, 
  divide,
  cmdKeyWord,
  cmdTarget,
  cmdGetStr,
  cmdSetStr,
  type,
  min,
  max,
  wifiIsConnecting,
  iconStrArray,
  keywordArray,
  cmdSetStrArray,
  btnStr,
  visible,}) => {

  const UlVerticalPadding: number = 3;
  const UlHeight:number = 24;
  const LiHeight:number = 22;

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  const {codeBlockIsShow, setCodeBlockIsShow,setTriggerBlocAnim,adbInputCMD,canTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );

  const [isOpen, setOpen] = useState(initState.isADBListExpand)

  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()


  //console.log('ListTree - Render')

  const { revealProgress } = useSpring({
    revealProgress: isOpen ? 1 : (isGlobalAnimEnable?0:1),
    config: animationConfig.list_reveal
  }) 


  const getCMDInfoData = (str:any,target:any) =>{
    execCMDPromise(str.replace(/{target}/g, target),function(val:any){
      setCurrentInfoString(val)
    })
 
  }

  const [currentInfoString,setCurrentInfoString] = useState<string>('');

  useEffect(() => {
    if(cmdTarget != null && cmdTarget != '' && cmdTarget != undefined && !wifiIsConnecting && cmdGetStr !=null){
      getCMDInfoData(cmdGetStr,cmdTarget);
    }
  }, [cmdTarget])


  return (
    <Frame isAnimationEnable={isGlobalAnimEnable}>
      {children ?
        // with children - withIcon(normal ul)
        <UlElement id="UlElement" isOpen={isOpen} isAnimationEnable={isGlobalAnimEnable} css={Toggle} onClick={() => setOpen(!isOpen)}>

          <animated.div
            css={css`
              display: inline-block;
              vertical-align: middle;
              height: 18px;`
            }
            style={{
              transform: isOpen?interpolate([revealProgress], (r) => `rotate(${r * 90}deg) translate3d(0px,${r * -4}px,0px) scale3d(${1 - r * 0.1},${1 - r * 0.1},${1 - r * 0.1})`):'',
              marginTop: `-1px`,
            }}>
            <Icons.CollapsedArrow />
          </animated.div>
          <UlTitle style={style} height={UlHeight}><Trans>{category}</Trans></UlTitle>
        </UlElement>

        :
        // without children - withoutIcon(normal li)
        <LiElement id="LiElement">
          {!visible?
            '' 
            :
            <div style={{width:`100%`,display: `flex`,flexDirection:`column`}}>
              <LiTitle style={{ ...style }} 
              isAnimationEnable={isGlobalAnimEnable} 
              isClickable={clickable}
              isZhCn={(useTranslation().i18n.language === 'zhCn')}
              height={LiHeight} 
              onClick={() => 
                {
                  
                }
              }
              ><Trans>{name}</Trans>
              </LiTitle>
              {(type === 'ADBInfo')?<ADBInfo 
                isClickable={clickable}
                height={LiHeight} >
                  {cmdTarget?currentInfoString:'-'}
              </ADBInfo>:''}
              {(type === 'DisplayInfoGroup')?
              <ADBNumberInputGroup 
              value={currentInfoString.split('\n').slice(0,-1)} 
              isEditable={(currentInfoString != '' && currentInfoString != null)}
              min={min} 
              isAnimationEnable={isGlobalAnimEnable}
              cmdTriggerAnim={
                ((adbInputCMD === cmdGetStr || adbInputCMD.includes(cmdKeyWord)) && canTriggerControlAnim && codeBlockIsShow)
              }
              isDisableCMDAnim={true}
              max={max} 
              step={1} 
              cmdGetStr={cmdGetStr}
              cmdSetStr={cmdSetStr?cmdSetStr:''}
              cmdTarget={cmdTarget}
              cmdDivide={divide}
              />
              :
              ''}
              {(type === 'ADBSwitcher')?
              <ADBSwitcher 
              buttonCSS={css`
                position: absolute;
                right: 0px;
                top: 4px;
              `}
              enable={cmdTarget != undefined}
              cmdSetStr={cmdSetStr?cmdSetStr:''}
              cmdTarget={cmdTarget}
              isDisableCMDAnim={true}
              cmdTriggerAnimON={((adbInputCMD.includes(cmdKeyWord) && adbInputCMD.includes(switcherON)) && canTriggerControlAnim && codeBlockIsShow)}
              cmdTriggerAnimOFF={((adbInputCMD.includes(cmdKeyWord) && adbInputCMD.includes(switcherOFF)) && canTriggerControlAnim && codeBlockIsShow)}
              switcherON={switcherON}
              switcherOFF={switcherOFF}
              isAnimationEnable={isGlobalAnimEnable}
              style={{
                width:`28px`,
                height:`14px`
              }}
              onClick={()=>{}}
              ></ADBSwitcher>
              :
              ''
              }
              {(type === 'ADBTextInput')?
              <ADBTextInput
                isEditable={cmdTarget != undefined}
                style={{
                  height: `18px`,
                  width: `100%`,
                  lineHeight: `18px`,
                  marginTop:`6px`,
                  marginBottom:`6px`,
                }}
                cmdSetStr={cmdSetStr}
                cmdTriggerAnim={
                  ((adbInputCMD.includes(cmdKeyWord)) && canTriggerControlAnim && codeBlockIsShow)
                }
                isDisableCMDAnim = {true}
                isAnimationEnable={isGlobalAnimEnable}
                cmdTarget={cmdTarget}
              />
              :
              ''
              }
              {(type === 'ADBNormalButtonGroup')?
              <ADBNormalButtonGroup
                enable={cmdTarget != undefined}
                iconStrArray={iconStrArray}
                keywordArray={keywordArray}
                cmdSetStrArray={cmdSetStrArray}
                isDisableCMDAnim = {true}
                isAnimationEnable={isGlobalAnimEnable}
                cmdTarget={cmdTarget}
              />
              :
              ''
              }

              {(type === 'ADBGetInfo')?
              <ADBGetInfo
                enable={cmdTarget != undefined}
                isDisableCMDAnim = {true}
                cmdStr={cmdGetStr}
                cmdTriggerAnim={
                  ((adbInputCMD.includes(cmdKeyWord)) && canTriggerControlAnim && codeBlockIsShow)
                }
                cmdKeyword={cmdKeyWord}
                btnStr={btnStr}
                cmdTarget={cmdTarget}
              ></ADBGetInfo>
              :
              ''
              }

              {(type === 'ADBInstallComp')?
              <ADBInstallComp
                enable={cmdTarget != undefined}
                isDisableCMDAnim = {true}
                cmdStr={cmdSetStr}
                cmdTriggerAnim={
                  ((adbInputCMD.includes(cmdKeyWord)) && canTriggerControlAnim && codeBlockIsShow)
                }
                cmdKeyword={cmdKeyWord}
                btnStr={btnStr}
                cmdTarget={cmdTarget}
              ></ADBInstallComp>
              :
              ''
              }
              {(type === 'ADBExtractComp')?
              <ADBExtractComp
                enable={cmdTarget != undefined}
                isDisableCMDAnim = {true}
                cmdStr={cmdSetStr}
                cmdTriggerAnim={
                  ((adbInputCMD.includes(cmdKeyWord)) && canTriggerControlAnim && codeBlockIsShow)
                }
                cmdKeyword={cmdKeyWord}
                btnStr={btnStr}
                cmdTarget={cmdTarget}
              ></ADBExtractComp>
              :
              ''
              }




            </div>
          }
        </LiElement>
      }

      {children ?
      <UlContent id="UlContent" 
      style={{
        opacity: interpolate([revealProgress], (r) => `${r * 1}`),
        display: isOpen?'block':'none',
        height: isOpen? interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`): '0px',
        transition:`${isGlobalAnimEnable?'border-color 0.25s':''}`
      }}>

 
          <UlContainer id="UlContainer"
            css={css`
                padding-top:${UlVerticalPadding}px;
                padding-bottom:${UlVerticalPadding}px
              `}
            style={{
              transform: interpolate([revealProgress], (r) => `translate3d(${10 - r * 10}px,0,0)`)
            }
            }
            {...bind}
          >
            {children}
          </UlContainer>
      </UlContent>
      :
      ''
      }
    </Frame>
  )
})


export default ADBListTree;

// State Control
const usePrevious = function (value: any) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

const useMeasure = function () {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))
  useEffect(() => {
    let refCurrent: Element = ref.current!;
    if (ref.current) ro.observe(refCurrent);
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}


// Styles

const UlElement = styled.div<{
  isAnimationEnable:boolean;
  isOpen:boolean;
}>`
  background:transparent;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  opacity:${p => p.isSelected?'1':'0.8'};
  padding-left: 1px;
  //margin-top: 6px;
  transition:${p=>p.isAnimationEnable?'opacity 0.25s':''};

  > div > svg{
    position:relative;
    left:0px;
    transition:${p=>p.isAnimationEnable?'all 0.15s':''};
  }

  > svg{
    transition:${p=>p.isAnimationEnable?'all 0.15s':''};
  }

  :before{
    content:'';
    width:100%;
    height:100%;
    left:0;
    top:0;
    border-radius:4px;
    position:absolute;
    transition:${p=>p.isAnimationEnable?'all 0.25s':''};
  }

  &:hover{
    opacity:0.9;
    > div > svg {
      left:${p=>p.isOpen?'0px':'4px'};
    }
    :before{
      background:${p=>p.theme.colors.primary_middle_opacity};
    }
  }

  &:active{
    opacity:1;
    :before{
      background:${p=>p.theme.colors.primary_dark_1_opacity};
    }
  }
`
const LiElement = styled.div`
  background:transparent;
  position: relative;
  display: flex;
  transition:all 0.2s;
  margin-left:24px;
  margin-right:24px;
  margin-top: 2px;
  margin-bottom: 2px;
  // height:24px;
`



const Frame = styled.li<{
  isAnimationEnable:boolean;
}>`
  position: relative;
  padding: 0px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color:  ${p => p.theme.colors.text};
  fill: ${p => p.theme.colors.text};
  background:transparent;
  list-style: none;
  transition:${p=>p.isAnimationEnable?'color 0.25s':''};

  >

`




const LiTitle = styled.span<{
  isSelected: boolean;
  isClickable:boolean;
  height:number;
  isAnimationEnable:boolean;
  isZhCn:boolean;
}>`
  vertical-align: middle;
  user-select:none;
  font-family: ${props => props.theme.fonts.normalText};
  font-style: normal;
  font-weight: ${p => p.isZhCn?'500':'300'};
  font-size: 10px;
  line-height: ${p=>p.height}px;
  //margin-left: 24px;
  border-radius: 4px;
  color:${p => p.theme.colors.text};
  opacity:${p => (p.isClickable ?'0.7':'0.3')};
  cursor:${p => (p.isClickable ? 'initial':'not-allowed')};
  // position: absolute;
  // left: 0px;
  transition:${p=>p.isAnimationEnable?'all 0.25s':''};
`

const UlTitle = styled.span<{
  height:number;
}>`
  vertical-align: middle;
  user-select:none;
  font-family: ${props => props.theme.fonts.headText};
  font-style: normal;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: ${p=>p.height}px;
  margin-left: 8px;
`
const UlContent = styled(animated.div)`
  will-change: transform, opacity, height;
  // margin-left: 20px;
  // padding: 0px 8px 0px 14px;
  overflow: hidden;
`

const UlContainer = styled(animated.ul)`
margin: 0;
padding-left: 0px;
`

const Toggle = css`
  cursor:pointer
`
