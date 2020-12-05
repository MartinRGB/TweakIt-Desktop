import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

type ADBConnectStateContextType = {

  adbIsConnect: boolean;
  setADBIsConnect: (tag: boolean) => void;


  // adbInputCMD: string;
  // setADBInputCMD:(tag: string) => void;

  adbInfoTimes:number;
  adbResultText:string[];
  adbCommandText:string[];
  adbCommandIsSuccess:boolean[];
  adbTagStartText:string[];
  adbTagEndText:string[];
  setADBInfoTimes: (tag: number) => void;
  setADBResultText: (tag: string[]) => void;
  setADBCommandText: (tag: string[]) => void;
  setADBCommandIsSuccess: (tag: boolean[]) => void;
  setADBTagStartText: (tag: string[]) => void;
  setADBTagEndText: (tag: string[]) => void;
  cleanAllData: () => void;
};

export var ADBConnectStateContext = createContext<ADBConnectStateContextType>({
  adbIsConnect: false,
  setADBIsConnect: (tag: boolean) => {},

  // adbInputCMD:'',
  // setADBInputCMD:(tag: string) => {},

  adbInfoTimes:-1,
  adbResultText:[],
  adbCommandText:[],
  adbCommandIsSuccess:[],
  adbTagStartText:[],
  adbTagEndText:[],
  setADBInfoTimes: (tag: number) => {},
  setADBResultText: (tag: any[]) => {},
  setADBCommandText: (tag: string[]) => {},
  setADBCommandIsSuccess: (tag: boolean[]) => {},
  setADBTagStartText: (tag: string[]) => {},
  setADBTagEndText: (tag: string[]) => {},
  cleanAllData: () => {},
});

var ADBConnectStateProvider: React.FC<{}> = ({ children }) => {
  const [connectState, setConnectState] = useState<boolean>(false);

  const [adbTimes,setADBTimes] = useState<number>(-1)
  const [resultText,setResultText] = useState<any[]>([])
  const [commandIsSuccess,setCommandIsSuccess] = useState<boolean[]>([])
  const [commandText,setCommandText] = useState<string[]>([])
  const [tagStartText,setTagStartText] = useState<string[]>([])
  const [tagEndText,setTagEndText] = useState<string[]>([])

  //const [adbCMD,setADBCMD] = useState<string>('')

  function setConnectStateAndSave(tag: boolean) {
    setConnectState(tag);
  }

  function setResultTextAndSave(tag:any[]){
    var a:string[] = resultText.concat(tag);
    setResultText(a)
  }
  function setCommandTextAndSave(tag:string[]){
    var a:string[] = commandText.concat(tag);
    setCommandText(a)
  }
  function setCommandIsSuccessAndSave(tag:boolean[]){
    var a:boolean[] = commandIsSuccess.concat(tag);
    setCommandIsSuccess(a)
  }
  function setTagStartTextAndSave(tag:string[]){
    var a:string[] = tagStartText.concat(tag);
    setTagStartText(a)
  }
  function setTagEndTextAndSave(tag:string[]){
    var a:string[] = tagEndText.concat(tag)
    setTagEndText(a)
  }
  function setADBTimesAndSave(tag:number){
    setADBTimes(tag)
  }

  // function setADBCMDAndSave(tag:string){
  //   setADBCMD(tag)
  // }

  function cleanAllADBData(){
    setADBTimes(-1)
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
        // adbInputCMD:adbCMD,
        // setADBInputCMD:setADBCMDAndSave,
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