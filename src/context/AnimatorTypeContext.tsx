import React, { createContext, useState } from "react";
import initState from '@Config/init_state.json'

export var AnimatorTypeContext = createContext({
  currentAnimName: initState.initAnimName,
  currentAnimCalculator: initState.initAnimCalculator,
  currentAnimData: [],
  currentSolverData: [],
  setCurrentAnimName: (tag: string) => {},
  setCurrentAnimCalculator: (tag: string) => {},
  setCurrentAnimData: (tag: any) => {},
  setCurrentSolverData: (tag: any) => {},
  setCurrentSolverDataByIndex:(value:number,index:number) =>{},
  previousAnimName:'',
  previousAnimCalculator:'',
  previousAnimData: [],
  previousSolverData:[],
  setPreviousAnimName: (tag: string) => {},
  setPreviousAnimCalculator: (tag: string) => {},
  setPreviousSolverData: (tag: any) => {},
  setPreviousAnimData:(tag: any) => {},
  selectTransition:false,
  setSelectTransition:(tag: boolean) => {},
  selectTransitionProgress:0,
  setSelectTransitionProgress:(tag: number) => {},
});

var AnimatorTypeProvider: React.FC<{}> = ({ children }) => {
  
  const [mCurrAnimName, setCurrAnimName] = useState<string>(initState.initAnimName);
  const [mCurrAnimCalculator, setCurrAnimCalculator] = useState<string>(initState.initAnimCalculator);
  const [mCurrAnimData, setCurrAnimData] = useState<any>([]);
  const [mCurrSolverData, setCurrSolverData] = useState<any>([]);

  const [mPrevAnimName, setPrevAnimName] = useState<string>('');
  const [mPrevAnimCalculator, setPrevAnimCalculator] = useState<string>('');
  const [mPrevAnimData, setPrevAnimData] = useState<any>([]);
  const [mPrevSolverData, setPrevSolverData] = useState<any>([]);

  const [mSelectTransition, setSelectTransition] = useState<boolean>(true);
  const [mSelectTransitionProgress, setSelectTransitionProgress] = useState<number>(0);

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
    //setSolverData(tag);
    var solverData:any = mCurrSolverData;
    solverData[index] = Number(value);
    //console.log(solverData)
    setCurrSolverData(solverData);
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

  function setSelectTransitionAndSave(tag: boolean) {
    setSelectTransition(tag);
  }

  function setSelectProgressTransitionAndSave(tag: number) {
    setSelectTransitionProgress(tag);
  }

  return (
    <AnimatorTypeContext.Provider
      value={{
        currentAnimName: mCurrAnimName,
        currentAnimCalculator: mCurrAnimCalculator,
        currentAnimData: mCurrAnimData,
        currentSolverData: mCurrSolverData,
        setCurrentAnimName: setCurrAnimNameAndSave,
        setCurrentAnimCalculator: setCurrAnimCalculatorAndSave,
        setCurrentAnimData: setCurrAnimDataAndSave,
        setCurrentSolverData: setCurrSolverDataAndSave,
        setCurrentSolverDataByIndex: setCurrSolverDataByIndexAndSave,
        previousAnimName:mPrevAnimName,
        previousAnimCalculator:mPrevAnimCalculator,
        previousAnimData:mPrevAnimData,
        previousSolverData:mPrevSolverData,
        setPreviousAnimName: setPrevAnimNameAndSave,
        setPreviousAnimCalculator: setPrevAnimCalculatorAndSave,
        setPreviousAnimData: setPrevAnimDataAndSave,
        setPreviousSolverData: setPrevSolverDataAndSave,
        selectTransition:mSelectTransition,
        setSelectTransition:setSelectTransitionAndSave,
        selectTransitionProgress:mSelectTransitionProgress,
        setSelectTransitionProgress:setSelectProgressTransitionAndSave,
      }}>
      {children}
    </AnimatorTypeContext.Provider>
  );
};

export default AnimatorTypeProvider;