import React, { createContext, useState,useContext} from "react";
import initState from "@Config/init_state.json";

import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import {GlobalAnimationStateContext}  from '@Context/GlobalAnimationContext';

export var ListSelectStateContext = createContext({
  currentAnimationItem: initState.initAnimPlatform + '_' + initState.initAnimName,
  selectAnimationItem: (tag: any) => {},
  setPreviousAndCurrentGraph: (animInfo:any,animPlatform:any,animName:any,animCalculator:any,animEase:any,animData:any) => {},
});

var ListSelectStateProvider: React.FC<{}> = ({ children }) => {
  const [currentAnimItem, setCurrentAnimItem] = useState<string>(initState.initAnimPlatform + '_' + initState.initAnimName);

  function setCurrentAnimItemAndSave(tag: string) {
    setCurrentAnimItem(tag);
  }

  const {currentAnimPlatform,previousAnimPlatform,setCurrentAnimPlatform,setPreviousAnimPlatform,setListDurationData,setPreviousDataRange,previousSolverData,currentSolverData,currentDataRange,previousDataRange,setCurrentDataRangeByIndex,currentAnimName,currentAnimCalculator,setCurrentSolverDataByIndex,currentAnimData,selectTransition,setCurrentAnimName, setCurrentAnimCalculator, setCurrentAnimData,setCurrentSolverData,setPreviousAnimName,setPreviousAnimCalculator,setPreviousSolverData,setSelectTransition,setPreviousDataRangeByIndex,setPreviousDataMinByIndex,setInterpolatorName,setFlutterName,setiOSName,setWebName} = useContext(
    AnimatorTypeContext
  );
  const {isGlobalAnimEnable} = useContext(GlobalAnimationStateContext)

  function setPreviousAndCurrentGraphData(animInfo:any,animPlatform:any,animName:any,animCalculator:any,animEase:any,animData:any){
    setPreviousAnimPlatform(currentAnimPlatform);
    setPreviousAnimName(currentAnimName);
    setPreviousAnimCalculator(currentAnimCalculator);
    setPreviousSolverData(currentSolverData);
    
    Object.entries(currentAnimData).map(function (data:any,index:number) {
      setPreviousDataMinByIndex(data[1][1].min,index)
      setPreviousDataRangeByIndex(data[1][1].max - data[1][1].min,index)
    })

    setCurrentAnimItemAndSave(animInfo)
    setCurrentAnimPlatform(animPlatform);
    setCurrentAnimName(animName)
    setCurrentAnimCalculator(animCalculator)

    setInterpolatorName(animEase[0])
    setiOSName(animEase[1])
    setWebName(animEase[2])
    setFlutterName(animEase[3])

    if(animData){
      setCurrentAnimData(Object.entries(animData))
      //console.log(animData)
    }
    else{
      setCurrentAnimData([])
    }

    Object.entries(animData).map(function (data:any,index:number) {
      if(data[0] === "Duration"){
        setListDurationData(data[1].default)
      }
      else{
        setListDurationData(-1)
      }
      setCurrentDataRangeByIndex(data[1].max - data[1].min,index)
    })

    // BUGS:Delete Comments will delete transition anim
    // Object.entries(animation_data).map(function (data:any,index:number) {
    //   setCurrentSolverDataByIndex(data[1].default,index)
    // })

    isGlobalAnimEnable?setSelectTransition(true):setSelectTransition(false)
  }
  
  return (
    <ListSelectStateContext.Provider
      value={{
        currentAnimationItem:currentAnimItem,
        selectAnimationItem: setCurrentAnimItemAndSave,
        setPreviousAndCurrentGraph:setPreviousAndCurrentGraphData
      }}
    >
      {children}
    </ListSelectStateContext.Provider>
  );

};

export default ListSelectStateProvider;