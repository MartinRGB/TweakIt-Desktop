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
  const [selectedName, setSelectedName] = useState('false');
  const previousName = usePrevious(selectedName)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()

  const { setCurrentAnimName, setCurrentAnimCalculator, setCurrentAnimData} = useContext(
    AnimatorTypeContext
  );


  const { revealProgress } = useSpring({
    revealProgress: isOpen ? 1 : 0,
    config: animationConfig.list_reveal,
  })


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
              transform: interpolate([revealProgress], (r) => `rotate(${r * 90}deg) translate3d(0px,${r * 1.5}px,0px) scale3d(${1 - r * 0.1},${1 - r * 0.1},${1 - r * 0.1})`)
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
                  setCurrentAnimData(animation_data)
                }
              }
            }><Trans>{name}</Trans></LiTitle>
          }
        </div>
      }
      <Content style={{
        opacity: interpolate([revealProgress], (r) => `${r * 1}`),
        height: isOpen && previous === isOpen ? 'auto' : interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`)
      }}>

        <animated.div
          css={css`
              padding-top:${UlVerticalPadding}px;
              padding-bottom:${UlVerticalPadding}px
            `}
          style={{
            transform: interpolate([revealProgress], (r) => `translate3d(${20 - r * 20}px,0,0)`)
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
  font-weight: 400;
  font-size: 11px;
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
  font-weight: 400;
  font-size: 13px;
  line-height: 21px;
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