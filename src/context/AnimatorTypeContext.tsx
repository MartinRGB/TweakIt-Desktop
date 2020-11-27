import React, { createContext, useState } from "react";
import initState from '@Config/init_state.json'

export var AnimatorTypeContext = createContext({
  currentAnimName: initState.initAnimName,
  currentAnimCalculator: initState.initAnimCalculator,
  currentAnimData: [],
  currentSolverData: [],
  currentDataRange: [],
  setCurrentAnimName: (tag: string) => {},
  setCurrentAnimCalculator: (tag: string) => {},
  setCurrentAnimData: (tag: any) => {},
  setCurrentSolverData: (tag: any) => {},
  setCurrentSolverDataByIndex:(value:number,index:number) =>{},
  setCurrentDataRange: (tag: any) => {},
  setCurrentDataRangeByIndex:(value:number,index:number) =>{},
  previousAnimName:'',
  previousAnimCalculator:'',
  previousAnimData: [],
  previousSolverData:[],
  previousDataRange:[],
  previousDataMin:[],
  setPreviousAnimName: (tag: string) => {},
  setPreviousAnimCalculator: (tag: string) => {},
  setPreviousAnimData:(tag: any) => {},
  setPreviousSolverData: (tag: any) => {},
  setPreviousSolverDataByIndex:(value:number,index:number) =>{},
  setPreviousDataRange: (tag: any) => {},
  setPreviousDataRangeByIndex:(value:number,index:number) =>{},
  setPreviousDataMin: (tag: any) => {},
  setPreviousDataMinByIndex:(value:number,index:number) =>{},
  selectTransition:false,
  setSelectTransition:(tag: boolean) => {},
});

var AnimatorTypeProvider: React.FC<{}> = ({ children }) => {
  
  const [mCurrAnimName, setCurrAnimName] = useState<string>(initState.initAnimName);
  const [mCurrAnimCalculator, setCurrAnimCalculator] = useState<string>(initState.initAnimCalculator);
  const [mCurrAnimData, setCurrAnimData] = useState<any>([]);
  const [mCurrSolverData, setCurrSolverData] = useState<any>([]);
  const [mCurrDataRange,setCurrRangeData] = useState<any>([]);
  

  const [mPrevAnimName, setPrevAnimName] = useState<string>('');
  const [mPrevAnimCalculator, setPrevAnimCalculator] = useState<string>('');
  const [mPrevAnimData, setPrevAnimData] = useState<any>([]);
  const [mPrevSolverData, setPrevSolverData] = useState<any>([]);
  const [mPrevDataRange,setPrevRangeData] = useState<any>([]);
  const [mPrevDataMin,setPrevMinData] = useState<any>([]);

  const [mSelectTransition, setSelectTransition] = useState<boolean>(true);
  

  function setCurrAnimNameAndSave(tag: string) {
    setCurrAnimName(tag);
  }

  function setCurrAnimCalculatorAndSave(tag: string) {
    setCurrAnimCalculator(tag);
  }

  function setCurrAnimDataAndSave(tag: any) {
    setCurrAnimData(tag);

    var solverData:any = [];
  
    if(tag){
      tag.map(function (data:any,index:number) {
        solverData.push(data[1].default);
      })
    }
    setCurrSolverData(solverData);
  }

  function setCurrSolverDataAndSave(tag: any) {
    setCurrSolverData(tag);
  }


  function setCurrSolverDataByIndexAndSave(value: number,index:number) {
    var solverData:any = mCurrSolverData;
    solverData[index] = Number(value);
    //console.log(solverData)
    setCurrSolverData(solverData);
  }

  function setCurrDataRangeAndSave(tag: any) {
    setCurrRangeData(tag);
  }

  function setCurrDataRangeByIndexAndSave(value: number,index:number) {
    var dataRange:any = mCurrDataRange;
    dataRange[index] = Number(value);
    //console.log(solverData)
    setCurrRangeData(dataRange);
  }

  function setPrevAnimNameAndSave(tag: string) {
    setPrevAnimName(tag);
  }

  function setPrevAnimCalculatorAndSave(tag: string) {
    setPrevAnimCalculator(tag);
  }

  function setPrevAnimDataAndSave(tag: any) {
    setPrevAnimData(tag);

    var solverData:any = [];
  
    if(tag){
      tag.map(function (data:any,index:number) {
        solverData.push(data[1].default);
      })
    }
    setPrevSolverData(solverData);
  }

  function setPrevSolverDataAndSave(tag: any) {
    setPrevSolverData(tag);
  }

  function setPrevSolverDataByIndexAndSave(value: number,index:number) {
    var solverData:any = mPrevSolverData;
    solverData[index] = Number(value);
    //console.log(solverData)
    setPrevSolverData(solverData);
  }

  function setPrevDataRangeAndSave(tag: any) {
    setPrevRangeData(tag);
  }

  function setPrevDataRangeByIndexAndSave(value: number,index:number) {
    var dataRange:any = mPrevDataRange;
    dataRange[index] = Number(value);
    //console.log(solverData)
    setPrevRangeData(dataRange);
  }

  function setPrevDataMinAndSave(tag: any) {
    setPrevMinData(tag);
  }

  function setPrevDataMinByIndexAndSave(value: number,index:number) {
    var dataMin:any = mPrevDataMin;
    dataMin[index] = Number(value);
    //console.log(solverData)
    setPrevMinData(dataMin);
  }


  function setSelectTransitionAndSave(tag: boolean) {
    setSelectTransition(tag);
  }


  return (
    <AnimatorTypeContext.Provider
      value={{
        currentAnimName: mCurrAnimName,
        currentAnimCalculator: mCurrAnimCalculator,
        currentAnimData: mCurrAnimData,
        currentSolverData: mCurrSolverData,
        currentDataRange:mCurrDataRange,
        setCurrentAnimName: setCurrAnimNameAndSave,
        setCurrentAnimCalculator: setCurrAnimCalculatorAndSave,
        setCurrentAnimData: setCurrAnimDataAndSave,
        setCurrentSolverData: setCurrSolverDataAndSave,
        setCurrentSolverDataByIndex: setCurrSolverDataByIndexAndSave,
        setCurrentDataRange: setCurrDataRangeAndSave,
        setCurrentDataRangeByIndex: setCurrDataRangeByIndexAndSave,
        previousAnimName:mPrevAnimName,
        previousAnimCalculator:mPrevAnimCalculator,
        previousAnimData:mPrevAnimData,
        previousSolverData:mPrevSolverData,
        previousDataRange:mPrevDataRange,
        previousDataMin:mPrevDataMin,
        setPreviousAnimName: setPrevAnimNameAndSave,
        setPreviousAnimCalculator: setPrevAnimCalculatorAndSave,
        setPreviousAnimData: setPrevAnimDataAndSave,
        setPreviousSolverData: setPrevSolverDataAndSave,
        setPreviousSolverDataByIndex: setPrevSolverDataByIndexAndSave,
        setPreviousDataRange: setPrevDataRangeAndSave,
        setPreviousDataRangeByIndex: setPrevDataRangeByIndexAndSave,
        setPreviousDataMin:setPrevDataMinAndSave,
        setPreviousDataMinByIndex:setPrevDataMinByIndexAndSave,
        selectTransition:mSelectTransition,
        setSelectTransition:setSelectTransitionAndSave,
      }}>
      {children}
    </AnimatorTypeContext.Provider>
  );
};

export default AnimatorTypeProvider;