import ReactDOM from 'react-dom'
import React, { memo, useState, useRef, useEffect,useContext } from 'react'
import { useSpring,animated,a} from 'react-spring'
import ResizeObserver from 'resize-observer-polyfill'
//import styled from 'styled-components'
import { IListTree,ListSVGIcon } from "@types";
// import * as Icons from './ListIcon'

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '../../../../components/i18n'

import animationConfig from '../../../../config/animation.json'

import { ListSelectContext } from './ListSelect.Context';

const ListTree:React.FC<IListTree> = memo(({ children, name, style, defaultOpen = false,info }) => {

  const { t ,i18n} = useTranslation()

  const UlVerticalPadding:number = 6; 
  
  const { currentAnimation, selectAnimation} = useContext(
    ListSelectContext
  );
  const [colorMode] = useColorMode();

  const [isOpen, setOpen] = useState(defaultOpen)
  const [selectedName, setSelectedName] = useState('false');
  const previousName = usePrevious(selectedName)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight,width:viewWidth }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? viewHeight+UlVerticalPadding*2 : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` },
    config:animationConfig.list_reveal
  })
  //const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]

  const Icon = (children ? (isOpen ? MinusSquareO : PlusSquareO) : CloseSquareO);
  //const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  return (
    <Frame>
      {children?
          <div css={Toggle} onClick={() => setOpen(!isOpen)}>
            <Icon style={{opacity: children ? 1 : 0.3 }} css={IconStyle}  />
            <Title style={style}><Trans>{name}</Trans></Title>
          </div>:
          
          <div css={Toggle} onClick={() => selectAnimation(info)}>
              {name === "Divide"?
                <div css={css`height:1px`}></div>:
                <Title style={{...style,opacity: (currentAnimation === info ? 1 : 0.5)}} css={css`margin-left:5px`}><Trans>{name}</Trans></Title>
              }
          </div>
      }
      <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height}}>
        <a.div style={{ transform }} css={css`padding-top:${UlVerticalPadding}px;padding-bottom:${UlVerticalPadding}px`} {...bind} children={children} />
      </Content>
    </Frame>
  )
})


export default ListTree;

// State Control

const usePrevious = function(value:any) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

const useMeasure = function() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}


// Styles

const Frame = styled('div')`
  position: relative;
  padding: 4px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color:  ${p => p.theme.colors.text};
  fill: ${p => p.theme.colors.text};
`

const Title = styled('span')`
  vertical-align: middle;
  user-select:none;
  line-height: 21px;
`

const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed ${p => p.theme.colors.adb_border};
  overflow: hidden;
`

const IconStyle = css`
  width:1em;
  height:1em;
  margin-right: 10px;
  vertical-align: middle;
`

const Toggle = css`
  cursor:pointer
`



// SVG Icons

const MinusSquareO:React.FC<ListSVGIcon> = props => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path
        d="M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0
  q0 -15 -11 -25.5t-25 -10.5z"
      />
    </g>
  </svg>
)

const PlusSquareO:React.FC<ListSVGIcon> = props => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path
        d="M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184
  q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z"
      />
    </g>
  </svg>
)

const CloseSquareO:React.FC<ListSVGIcon> = props => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path
        d="M717.5 589.5q-10.5 10.5 -25.5 10.5t-26 -10l-154 -155l-154 155q-11 10 -26 10t-25.5 -10.5t-10.5 -25.5t11 -25l154 -155l-154 -155q-11 -10 -11 -25t10.5 -25.5t25.5 -10.5t26 10l154 155l154 -155q11 -10 26 -10t25.5 10.5t10.5 25t-11 25.5l-154 155l154 155
  q11 10 11 25t-10.5 25.5zM888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0z"
      />
    </g>
  </svg>
)


export { PlusSquareO, MinusSquareO, CloseSquareO }