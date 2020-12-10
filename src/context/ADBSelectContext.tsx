import React, { createContext, useState,useEffect} from "react";

export var ADBSelectContext = createContext({
  currentSelectDeviceId:'',
  setCurrentSelectDeviceId:(tag:string) => {},
  currentSelectIndex:-1,
  setCurrentSelectIndex:(tag:number) => {},
});

var ADBSelectProvider: React.FC<{}> = ({ children }) => {
  const [selectDeviceId,setSelectDeviceId] = useState<string>('');
  const [selectDeviceIndex,setSelectDeviceIndex] = useState<number>(-1);

  function setSelectDeviceIndexAndSave(tag:number){
    setSelectDeviceIndex(tag)
  }

  function setSelctDeviceIdAndSave(tag:string){
    setSelectDeviceId(tag)
  }

  return (
    <ADBSelectContext.Provider
      value={{
        currentSelectDeviceId:selectDeviceId,
        setCurrentSelectDeviceId:setSelctDeviceIdAndSave,
        currentSelectIndex:selectDeviceIndex,
        setCurrentSelectIndex:setSelectDeviceIndexAndSave,
      }}>
      {children}
    </ADBSelectContext.Provider>
  );
};

export default ADBSelectProvider;