import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '../../../../components/i18n'
import ListTree from './ListTree'

import animationList from '../../../../config/animator_list.json'

const ListArea: React.FC = ({children}) => {
  const { t ,i18n} = useTranslation()

  const [colorMode] = useColorMode();

  return (
    <Container>
      {/* <ListTree name="main">
        <ListTree name="hello" />
        <ListTree name="subtree with children">
          <ListTree name="hello" />
          <ListTree name="sub-subtree with children">
            <ListTree name="child 1" style={{ color: '#37ceff' }} />
            <ListTree name="child 2" style={{ color: '#37ceff' }} />
            <ListTree name="child 3" style={{ color: '#37ceff' }} />
          </ListTree>
          <ListTree name="hello" />
        </ListTree>
        <ListTree name="world" />
        <ListTree name={<span>🙀 something something</span>} />
      </ListTree> */}
      {
          animationList.map(function (data:any,index:number) {
            //console.log(data)
            //console.log(data['name'])
            return (
              <ListTree name={data['name']} info={data['name']}  key={data['name']+'_'+index}>
              {
                data['li'].map(function (subdata:any,i:number) {
                //console.log(subdata['name'])
                return <ListTree name={subdata['name']} key={data['name']+'_'+subdata['name']+'_'+i} info={data['name']+'_'+subdata['name']}/>
              })
              }
              </ListTree>
            )
        

          })
      }
    </Container>
  )
}


export default ListArea


const Container = styled.div`
    height: 100%;
    //background:#00AA00;
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
    // Need a fake scrollbar
    //overflow-y: auto;
    overflow:hidden;
    padding:25px;
    // Or it will re-rendering cause performance issue
    min-width:250px;
`
