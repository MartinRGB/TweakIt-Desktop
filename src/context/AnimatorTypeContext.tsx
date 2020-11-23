import React, { createContext, useState } from "react";

export var AnimatorTypeContext = createContext({
  currentAnimName: '',
  currentAnimCalculator: '',
  currentAnimData: [],
  currentSolverData: [],
  setCurrentAnimName: (tag: string) => {},
  setCurrentAnimCalculator: (tag: string) => {},
  setCurrentAnimData: (tag: any) => {},
  setCurrentSolverData: (tag: any) => {},
  setCurrentSolverDataByIndex:(value:number,index:number) =>{}
});

var AnimatorTypeProvider: React.FC<{}> = ({ children }) => {
  
  const [mAnimName, setAnimName] = useState<string>('');
  const [mAnimCalculator, setAnimCalculator] = useState<string>('');
  const [mAnimData, setAnimData] = useState<any>([]);
  const [mSolverData, setSolverData] = useState<any>([]);

  function setAnimNameAndSave(tag: string) {
    setAnimName(tag);
  }

  function setAnimCalculatorAndSave(tag: string) {
    setAnimCalculator(tag);
  }

  function setAnimDataAndSave(tag: any) {
    setAnimData(tag);

    var solverData:any = [];
  
    if(tag){
      tag.map(function (data:any,index:number) {
        solverData.push(data[1].default);
      })
    }
    setSolverData(solverData);
  }

  function setSolverDataAndSave(tag: any) {
    setSolverData(tag);
  }


  function setSolverDataByIndexAndSave(value: number,index:number) {
    //setSolverData(tag);
    var solverData:any = mSolverData;
    solverData[index] = Number(value);
    //console.log(solverData)
    setSolverData(solverData);
  }


  return (
    <AnimatorTypeContext.Provider
      value={{
        currentAnimName: mAnimName,
        currentAnimCalculator: mAnimCalculator,
        currentAnimData: mAnimData,
        currentSolverData: mSolverData,
        setCurrentAnimName: setAnimNameAndSave,
        setCurrentAnimCalculator: setAnimCalculatorAndSave,
        setCurrentAnimData: setAnimDataAndSave,
        setCurrentSolverData: setSolverDataAndSave,
        setCurrentSolverDataByIndex: setSolverDataByIndexAndSave
      }}>
      {children}
    </AnimatorTypeContext.Provider>
  );
};

export default AnimatorTypeProvider;