import React, { createContext, useState } from "react";

export var AnimatorTypeContext = createContext({
  currentAnimName: '',
  currentAnimCalculator: '',
  currentAnimData: '',
  setCurrentAnimName: (tag: string) => {},
  setCurrentAnimCalculator: (tag: string) => {},
  setCurrentAnimData: (tag: any) => {}
});

var AnimatorTypeProvider: React.FC<{}> = ({ children }) => {
  
  const [mAnimName, setAnimName] = useState<string>('');
  const [mAnimCalculator, setAnimCalculator] = useState<string>('');
  const [mAnimData, setAnimData] = useState<any>('');

  function setAnimNameAndSave(tag: string) {
    setAnimName(tag);
  }

  function setAnimCalculatorAndSave(tag: string) {
    setAnimCalculator(tag);
  }

  function setAnimDataAndSave(tag: string) {
    setAnimData(tag);
  }

  return (
    <AnimatorTypeContext.Provider
      value={{
        currentAnimName: mAnimName,
        currentAnimCalculator: mAnimCalculator,
        currentAnimData: mAnimData,
        setCurrentAnimName: setAnimNameAndSave,
        setCurrentAnimCalculator: setAnimCalculatorAndSave,
        setCurrentAnimData: setAnimDataAndSave
      }}>
      {children}
    </AnimatorTypeContext.Provider>
  );
};

export default AnimatorTypeProvider;