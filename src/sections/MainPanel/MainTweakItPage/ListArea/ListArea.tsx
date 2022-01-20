import React ,{memo,useContext, useEffect,useState} from 'react';

import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import { css,jsx } from "@emotion/react";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import ListTree from './ListTree'

import animationList from '@Config/animator_list.json'
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';
import  {TweakItConnectionContext} from '@Context/TweakItConnectionContext'

const ListArea: React.FC = memo(({children}) => {
  
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)
  const {isTweakItAndroidExist} = useContext(TweakItConnectionContext)

  return (
    <Container isAnimationEnable={isGlobalAnimEnable}>
      {
          animationList.map(function (data:any,index:number) {
            if(isTweakItAndroidExist){
              if(data['platform'] === 'Android'){
                return (
                  <ListTree 
                    key={data['platform']+'_'+index} 
                    info={data['platform']} 
                    platform={data['platform']}
                    isUlElement={true}
                    name={data['platform']}
                    switcherOption={Array(animationList.length).fill(false)}
                    index={index}
                    listLength={data['li'].length}>
                  {
                    data['li'].map(function (animData:any,i:number) {
                      if(animData['isAndroidSupport']){
                        return (<ListTree 
                          key={data['platform']+'_'+animData['name']+'_'+i} 
                          info={data['platform']+'_'+animData['name']} 
                          platform={data['platform']}
                          liIndex={i}
                          isUlElement={false} 
                          name={animData['name']} 
                          calculator={animData['calculator']}
                          animation_data={animData['animation_data']}
                          ease_name={[animData['interpolatorName'],animData['iOSName'],animData['webName'],animData['flutterName']]}
                          visible={animData['visible']}
                          clickable={animData['clickable']}>
                       </ListTree>)
                      }

                    })
                  }
                  </ListTree>
                )
              }
              else{
                return ''
              }
              
            }
            else{
              return (
                <ListTree 
                  key={data['platform']+'_'+index} 
                  info={data['platform']} 
                  platform={data['platform']}
                  isUlElement={true}
                  name={data['platform']}
                  switcherOption={Array(animationList.length).fill(false)}
                  index={index}
                  listLength={data['li'].length}>
                {
                  data['li'].map(function (animData:any,i:number) {
                    return (<ListTree 
                              key={data['platform']+'_'+animData['name']+'_'+i} 
                              info={data['platform']+'_'+animData['name']} 
                              platform={data['platform']}
                              liIndex={i}
                              isUlElement={false} 
                              name={animData['name']} 
                              calculator={animData['calculator']}
                              animation_data={animData['animation_data']}
                              ease_name={[animData['interpolatorName'],animData['iOSName'],animData['webName'],animData['flutterName']]}
                              visible={animData['visible']}
                              clickable={animData['clickable']}>
                           </ListTree>)
                  })
                }
                </ListTree>
              )
            }
            
        

          })
      }
    </Container>
  )
})


export default ListArea


const Container = styled.div<{
  isAnimationEnable:boolean;
}>`
    height: 100%;
    //background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    //flex:1;
    width:250px;
    // Need a fake scrollbar
    //overflow-y: auto;
    overflow-y:auto;
    padding: 24px 6px 24px 0px;
    //padding:24px 14px 24px 14px;
    // Or it will re-rendering cause performance issue
    min-width:250px;
    
    transition:${p=>p.isAnimationEnable?'background 0.25s':''};
    /* width */
    ::-webkit-scrollbar {
      width: 2px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${p => p.theme.colors.text};
      transition:${p=>p.isAnimationEnable?'background 0.25s':''};
    }
`
