import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

type TweakItConnectionContextType = {

  isTweakItAndroidExist:boolean;
  jsonData:any;
  setIsTweakItAndoridExist: (tag: boolean) =>void
  setJSONData: (tag:any) => void;
  selectObjIndex:number;
  setSelectObjIndex: (tag:number) => void;
};


export var TweakItConnectionContext = createContext<TweakItConnectionContextType>({
  isTweakItAndroidExist: false,
  setIsTweakItAndoridExist: (tag: boolean) => {},
  jsonData:{},
  setJSONData: (tag:any) => {},
  selectObjIndex:-1,
  setSelectObjIndex: (tag:number) => {},
});

var TweakItConnectionContextProvider: React.FC<{}> = ({ children }) => {
  const [ifTweakItAndroidExist, setIfTweakItAndroidExist] = useState<boolean>(false);
  const [jsData, setJSData] = useState<any>();
  const [selectIndex, setSelectIndex] = useState<number>(-1);

  function setTweakItAndroidExistAndSave(tag: boolean) {
    setIfTweakItAndroidExist(tag);
  }

  function setJSONDataAndSave(tag:any){
    setJSData(tag)
  }

  function setSelectIndexAndSave(tag:number){
    setSelectIndex(tag)
  }
  return (
    <TweakItConnectionContext.Provider
      value={{
        isTweakItAndroidExist:ifTweakItAndroidExist,
        setIsTweakItAndoridExist: setTweakItAndroidExistAndSave,
        jsonData:jsData,
        setJSONData:setJSData,
        selectObjIndex:selectIndex,
        setSelectObjIndex:setSelectIndexAndSave,
      }}>
      {children}
    </TweakItConnectionContext.Provider>
  );
};

export default TweakItConnectionContextProvider;