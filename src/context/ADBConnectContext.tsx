import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var ADBConnectStateContext = createContext({
  adbIsConnect: false,
  setADBIsConnect: (tag: boolean) => {},
  adbTerminalText: '',
  setADBTerminalText: (tag: any) => {},

  adbInfoTimes:0,
  adbResultText:[],
  adbCommandText:[],
  adbCommandIsSuccess:[],
  adbTagStartText:[],
  adbTagEndText:[],
  setADBInfoTimes: (tag: any) => {},
  setADBResultText: (tag: any) => {},
  setADBCommandText: (tag: any) => {},
  setADBCommandIsSuccess: (tag: any) => {},
  setADBTagStartText: (tag: any) => {},
  setADBTagEndText: (tag: any) => {},
  cleanAllData: () => {},
});

var ADBConnectStateProvider: React.FC<{}> = ({ children }) => {
  const [connectState, setConnectState] = useState<boolean>(false);
  const [textVal,setTextVal] = useState<any>('')

  const [adbTimes,setADBTimes] = useState<any>(0)
  const [resultText,setResultText] = useState<any>([])
  const [commandIsSuccess,setCommandIsSuccess] = useState<any>([])
  const [commandText,setCommandText] = useState<any>([])
  const [tagStartText,setTagStartText] = useState<any>([])
  const [tagEndText,setTagEndText] = useState<any>([])

  function setConnectStateAndSave(tag: boolean) {
    setConnectState(tag);
  }

  function setADBTextAndSave(tag:any){
    setTextVal(tag)
  }


  function setResultTextAndSave(tag:any){
    var a = resultText;
    console.log(tag)
    a.push(tag)
    setResultText(a)
  }
  function setCommandTextAndSave(tag:any){
    var a = commandText;
    a.push(tag)
    setCommandText(a)
  }
  function setCommandIsSuccessAndSave(tag:boolean){
    var a = commandIsSuccess;
    a.push(tag)
    setCommandIsSuccess(a)
  }
  function setTagStartTextAndSave(tag:any){
    var a = tagStartText;
    a.push(tag)
    setTagStartText(a)
  }
  function setTagEndTextAndSave(tag:any){
    var a = tagEndText;
    a.push(tag)
    setTagEndText(a)
  }
  function setADBTimesAndSave(tag:number){
    setADBTimes(tag)
  }

  function cleanAllADBData(){
    setADBTimes(0)
    setTagEndText([])
    setTagStartText([])
    setCommandIsSuccess([])
    setCommandText([])
    setResultText([])
  }

  return (
    <ADBConnectStateContext.Provider
      value={{
        adbIsConnect:connectState,
        setADBIsConnect: setConnectStateAndSave,
        adbTerminalText:textVal,
        setADBTerminalText:setADBTextAndSave,
        adbInfoTimes:adbTimes,
        adbResultText:resultText,
        adbCommandText:commandText,
        adbCommandIsSuccess:commandIsSuccess,
        adbTagStartText:tagStartText,
        adbTagEndText:tagEndText,
        setADBInfoTimes: setADBTimesAndSave,
        setADBResultText: setResultTextAndSave,
        setADBCommandText: setCommandTextAndSave,
        setADBCommandIsSuccess:setCommandIsSuccessAndSave,
        setADBTagStartText: setTagStartTextAndSave,
        setADBTagEndText: setTagEndTextAndSave,
        cleanAllData:cleanAllADBData,
      }}>
      {children}
    </ADBConnectStateContext.Provider>
  );
};

export default ADBConnectStateProvider;