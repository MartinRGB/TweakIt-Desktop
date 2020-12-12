import React, { createContext, useState,useEffect} from "react";

export var ADBSelectContext = createContext({
  currentSelectDeviceId:'',
  setCurrentSelectDeviceId:(tag:string) => {},
  currentSelectIndex:-1,
  setCurrentSelectIndex:(tag:number) => {},
  cmdTarget:'',
  setCMDTarget:(tag:string) => {},
});

var ADBSelectProvider: React.FC<{}> = ({ children }) => {
  const [selectDeviceId,setSelectDeviceId] = useState<string>('');
  const [selectDeviceIndex,setSelectDeviceIndex] = useState<number>(-1);
  const [currentCmdTarget,setCurrentCMDTarget] = useState<string>('');

  function setSelectDeviceIndexAndSave(tag:number){
    setSelectDeviceIndex(tag)
  }

  function setSelctDeviceIdAndSave(tag:string){
    setSelectDeviceId(tag)
  }

  function setCurrentCMDTargetAndSave(tag:string){
    setCurrentCMDTarget(tag)
  }

  return (
    <ADBSelectContext.Provider
      value={{
        currentSelectDeviceId:selectDeviceId,
        setCurrentSelectDeviceId:setSelctDeviceIdAndSave,
        currentSelectIndex:selectDeviceIndex,
        setCurrentSelectIndex:setSelectDeviceIndexAndSave,
        cmdTarget:currentCmdTarget,
        setCMDTarget:setCurrentCMDTargetAndSave,
      }}>
      {children}
    </ADBSelectContext.Provider>
  );
};

export default ADBSelectProvider;