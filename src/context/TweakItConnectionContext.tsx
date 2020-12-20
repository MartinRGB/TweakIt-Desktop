import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

type TweakItConnectionContextType = {

  isTweakItAndroidExist:boolean;
  jsonData:any;
  setIsTweakItAndoridExist: (tag: boolean) =>void
  setJSONData: (tag:any,callback:(e:any)=>void) => void;
  selectObjIndex:number;
  setSelectObjIndex: (tag:number) => void;
  activeActivity:any;
  setActivieActivty:(tag:string) => void;
  deviceName:any;
  setDeviceName:(tag:string) => void;
};


export var TweakItConnectionContext = createContext<TweakItConnectionContextType>({
  isTweakItAndroidExist: false,
  setIsTweakItAndoridExist: (tag: boolean) => {},
  jsonData:{},
  setJSONData: (tag:any,callback:(e:any)=>void) => {},
  selectObjIndex:-1,
  setSelectObjIndex: (tag:number) => {},
  activeActivity:'',
  setActivieActivty:(tag:string) => {},
  deviceName:'',
  setDeviceName:(tag:string) => {},
});

var TweakItConnectionContextProvider: React.FC<{}> = ({ children }) => {
  const [ifTweakItAndroidExist, setIfTweakItAndroidExist] = useState<boolean>(false);
  const [jsData, setJSData] = useState<any>();
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const [activityName,setActivityName] = useState<any>('');
  const [deviceId,setDeviceId] = useState<any>('');

  function setTweakItAndroidExistAndSave(tag: boolean) {
    setIfTweakItAndroidExist(tag);
  }

  function setJSONDataAndSave(tag:any,callback:(e:any)=>void){
    setJSData(tag)
    console.log(tag)
    if(tag !=null){
      callback(tag)
    }
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
        setJSONData:setJSONDataAndSave,
        selectObjIndex:selectIndex,
        setSelectObjIndex:setSelectIndexAndSave,
        activeActivity:activityName,
        setActivieActivty:setActivityName,
        deviceName:deviceId,
        setDeviceName:setDeviceId,
      }}>
      {children}
    </TweakItConnectionContext.Provider>
  );
};

export default TweakItConnectionContextProvider;