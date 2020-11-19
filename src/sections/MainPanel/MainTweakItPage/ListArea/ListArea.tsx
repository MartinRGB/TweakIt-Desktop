import React ,{ useContext, useEffect} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import ListTree from './ListTree'

import animationList from '@Config/animator_list.json'

const ListArea: React.FC = ({children}) => {
  
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();

  return (
    <Container>
      {
          animationList.map(function (data:any,index:number) {
            return (
              <ListTree 
                key={data['name']+'_'+index} 
                index={index}
                info={data['name']} 
                isUlElement={true}
                name={data['name']}>
              {
                data['li'].map(function (animData:any,i:number) {
                  return <ListTree 
                            key={data['name']+'_'+animData['name']+'_'+i} 
                            index={i}
                            info={data['name']+'_'+animData['name']} 
                            isUlElement={false} 
                            name={animData['name']} 
                            calculator={animData['calculator']}
                            animation_data={animData['animation_data']}>
                         </ListTree>
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
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
    // Need a fake scrollbar
    //overflow-y: auto;
    overflow-y:auto;
    padding:24px 14px 24px 14px;
    // Or it will re-rendering cause performance issue
    min-width:250px;


    /* width */
    ::-webkit-scrollbar {
      width: 2px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${p => p.theme.colors.text};
    }
`
