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

import { ListSelectStateContext } from '@Context/ListSelectContext';
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';

const ListTree: React.FC<IListTree> = memo(({ 
  children, 
  name, 
  style,
  defaultOpen = false, 
  info, 
  isUlElement, 
  index, 
  animation_data,
  calculator }) => {

  const { t, i18n } = useTranslation()

  const UlVerticalPadding: number = 3;

  const { currentAnimationItem, selectAnimationItem } = useContext(
    ListSelectStateContext
  );
  const [colorMode] = useColorMode();

  const [isOpen, setOpen] = useState(defaultOpen)

  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()

  const { setCurrentAnimName, setCurrentAnimCalculator, setCurrentAnimData} = useContext(
    AnimatorTypeContext
  );

  const { revealProgress } = useSpring({
    revealProgress: isOpen ? 1 : 0,
    config: animationConfig.list_reveal
  })

  // if(animation_data){
  //   console.log(Object.entries(animation_data))
  // }
  // else{
  //   console.log('undefined 2323')
  // }

  // useEffect(() => {
  //   console.log(1)
  //   setIsListClicked(false)
  // }, [])

  // console.log(2)

  // TODO
  var PlatformIcon;

  if(isUlElement){
    PlatformIcon = Icons[(name.replace(/\s/g, "")!)];
  }

  return (
    <Frame>
      {children ?
        <div css={Toggle} onClick={() => setOpen(!isOpen)}>
          <animated.div
            css={css`
              display: inline-block;
              vertical-align: middle;
              height: 18px;`
            }
            style={{
              transform: interpolate([revealProgress], (r) => `rotate(${r * 90}deg) translate3d(0px,${r * 1.5}px,0px) scale3d(${1 - r * 0.1},${1 - r * 0.1},${1 - r * 0.1})`),
              marginTop: `-1px`,
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
              marginTop: `-1px`,
            }}></PlatformIcon>:<div></div>
          }
          <UlTitle style={style}><Trans>{name}</Trans></UlTitle>
        </div> :

        <div>
          {name === "Divide" ?
            <div css={css`height:1px`}></div> :
            <LiTitle style={{ ...style }} css={Toggle} isSelected={currentAnimationItem === info } 
            onClick={() => 
              {
                if(name != "Divide"){

                  selectAnimationItem(info)
                  setCurrentAnimName(name)
                  setCurrentAnimCalculator(calculator)
                  if(animation_data){
                    setCurrentAnimData(Object.entries(animation_data))
                  }
                  else{
                    setCurrentAnimData([])
                  }

                }
              }
            }><Trans>{name}</Trans></LiTitle>
          }
        </div>
      }
      <Content style={{
        opacity: interpolate([revealProgress], (r) => `${r * 1}`),
        // height: isOpen && previous === isOpen ? 'auto' : interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`)
        // height: isOpen ? 'auto' : interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`),

        display: isOpen?'block':'none',
        height: isOpen? interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`): '0px'
        //display:'block',
        //height: interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`)
      }}>

          <animated.div
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
          </animated.div>
      </Content>
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

const Frame = styled('div')`
  position: relative;
  padding: 1px 0px 1px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color:  ${p => p.theme.colors.text};
  fill: ${p => p.theme.colors.text};
`


const LiTitle = styled.span<{
  isSelected: boolean;
}>`
  vertical-align: middle;
  user-select:none;
  font-family: ${props => props.theme.fonts.normalText};
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 11px;
  margin-left: 25px;
  color:${p => (p.isSelected ? p.theme.colors.primary : p.theme.colors.text)};
  opacity:0.8;
`

const UlTitle = styled('span')`
  vertical-align: middle;
  user-select:none;
  font-family: ${props => props.theme.fonts.headText};
  font-style: normal;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`
const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed ${p => p.theme.colors.title_background_bottom};
  overflow: hidden;
`

const Toggle = css`
  cursor:pointer
`
