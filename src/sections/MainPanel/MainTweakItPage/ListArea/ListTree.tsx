import ReactDOM from 'react-dom'
import React, { memo, useState, useRef, useEffect, useContext } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
//import styled from 'styled-components'
import { Icon, IListTree } from "@Types";
// import * as Icons from './ListIcon'

import { useColorMode, jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import { css } from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'

import animationConfig from '@Config/animation.json'

import Icons from '@Assets/icons'

import { ListSelectStateContext } from '@Context/ListSelectStateContext';
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import Solver from 'src/helpers/Solver.ts';
import initState from '@Config/init_state.json'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

const ListTree: React.FC<IListTree> = memo(({
  clickable, 
  platform,
  children, 
  name, 
  style,
  defaultOpen = false, 
  info, 
  isUlElement, 
  index, 
  liIndex,
  animation_data,
  ease_name,
  calculator,
  listLength,
  selectArray,
  visible,}) => {

  const UlVerticalPadding: number = 3;
  const UlHeight:number = 24;
  const LiHeight:number = 22;

  const { currentAnimationItem, selectAnimationItem,setPreviousAndCurrentGraph } = useContext(
    ListSelectStateContext
  );

  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  const [isOpen, setOpen] = useState(initState.isAnimationListExpand)

  //const [isOpen, setOpen] = useState(selectArray)


  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()

  const {currentAnimPlatform,previousAnimPlatform,setCurrentAnimPlatform,setPreviousAnimPlatform,setListDurationData,setPreviousDataRange,previousSolverData,currentSolverData,currentDataRange,previousDataRange,setCurrentDataRangeByIndex,currentAnimName,currentAnimCalculator,setCurrentSolverDataByIndex,currentAnimData,selectTransition,setCurrentAnimName, setCurrentAnimCalculator, setCurrentAnimData,setCurrentSolverData,setPreviousAnimName,setPreviousAnimCalculator,setPreviousSolverData,setSelectTransition,setPreviousDataRangeByIndex,setPreviousDataMinByIndex,setInterpolatorName,setFlutterName,setiOSName,setWebName,setSmartisanName} = useContext(
    AnimatorTypeContext
  );

  //console.log('ListTree - Render')

  useEffect(() => {
    if(platform === currentAnimPlatform && name === currentAnimName && calculator === currentAnimCalculator){
      setPrevAndCurrData();
    }
  }, [])

  const setPrevAndCurrData = () =>{
    setPreviousAndCurrentGraph(info,platform,name,calculator,ease_name,animation_data)
  }

  //(isOpen != undefined && isOpen[index] === true)
  const { revealProgress } = useSpring({
    revealProgress:  isOpen ? 1 : (isGlobalAnimEnable?0:1),
    config: animationConfig.list_reveal
  }) 

  // TODO
  var PlatformIcon;

  if(isUlElement){
    PlatformIcon = Icons[(platform.replace(/\s/g, "")!)];
  }

  // (children)?
  return (
    <Frame isAnimationEnable={isGlobalAnimEnable}>
      {children ?
        // with children - withIcon(normal ul)
        <UlElement id="UlElement" isOpen={isOpen} isAnimationEnable={isGlobalAnimEnable} css={Toggle} onClick={() => {

          setOpen(!isOpen)
            // console.log(index)
            // console.log(selectArray)
            // var openData = [...isOpen]
            // openData[index] = !openData[index]

            // console.log(openData)
            // setOpen(openData)
          
          }}>

          <animated.div
            css={css`
              display: inline-block;
              vertical-align: middle;
              height: 18px;`
            }
            style={{
              transform: isOpen?interpolate([revealProgress], (r) => `rotate(${r * 90}deg) translate3d(0px,${r * 1.5}px,0px) scale3d(${1 - r * 0.1},${1 - r * 0.1},${1 - r * 0.1})`):'',
              marginTop: `-2px`,
            }}>
            <Icons.CollapsedArrow />
          </animated.div>
          {
            isUlElement?<PlatformIcon style={{
              height: `18px`,
              width: `18px`,
              verticalAlign: `middle`,
              marginLeft: `8px`,
              marginRight: `4px`,
              marginTop: `-2px`,
            }}></PlatformIcon>:''
          }
          <UlTitle style={style} height={UlHeight}><Trans>{platform}</Trans></UlTitle>
        </UlElement>

        :
        // without children - withoutIcon(normal li)
        <LiElement id="LiElement">
          {!visible?
            // ---- divide --- 3px
            <div css={css`height:0px`}></div> :
            <LiTitle style={{ ...style }} isAnimationEnable={isGlobalAnimEnable} isClickable={clickable} isSelected={currentAnimationItem === info }
            height={LiHeight} 
            onClick={() => 
              {
                if((currentAnimationItem != info) && clickable && !selectTransition){
                    setPrevAndCurrData();
                }
              }
            }
            ><Trans>{name}</Trans></LiTitle>
          }
        </LiElement>
      }

      {children ?
      <UlContent id="UlContent" style={{
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


export default ListTree;

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
  padding-left: 8px;
  margin-left: 6px;

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
    width:234px;
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

`




const LiTitle = styled.span<{
  isSelected: boolean;
  isClickable:boolean;
  height:number;
  isAnimationEnable:boolean;
}>`
  vertical-align: middle;
  user-select:none;
  font-family: ${props => props.theme.fonts.normalText};
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: ${p=>p.height}px;
  margin-left: 5px;
  padding-left: 18px;
  padding-right: 18px;
  border-radius: 4px;
  color:${p => (p.isSelected ? p.theme.colors.primary : p.theme.colors.text)};
  opacity:${p => (p.isClickable ?(p.isSelected?'1':'0.7'):'0.3')};
  cursor:${p => (p.isClickable ? 'pointer':'not-allowed')};

  transition:${p=>p.isAnimationEnable?'all 0.25s':''};
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
    :before{
      background:${p=>p.isClickable?p.theme.colors.primary_middle_opacity:''};
    }
    opacity:${p => (p.isClickable ? '0.85':'')};
  }

  &:active{
    :before{
      background:${p=>p.isClickable?p.theme.colors.primary_dark_1_opacity:''};
    }
    opacity:${p => (p.isClickable ? '1':'')};
  }
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
`
const UlContent = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 20px;
  padding: 0px 8px 0px 14px;
  border-left: 1px dashed;
  border-color:${p => p.theme.colors.title_background_bottom};
  overflow: hidden;
`

const UlContainer = styled(animated.ul)`
`

const Toggle = css`
  cursor:pointer
`
