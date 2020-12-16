import React, { createContext, useState,useContext } from "react";
import initState from "@Config/init_state.json";
import {CodeBlockStateContext} from '@Context/CodeBlockContext'
import {execCMDPromise} from '@Helpers/ADBCommand/ADBCommand';

type ADBCommandStateContextType = {

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
  cmdWithConsole: (cmd: string,callback?:() => void) => void;
};

export var ADBCommandStateContext = createContext<ADBCommandStateContextType>({

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
  cmdWithConsole: (cmd: string,callback?:() => void) => {},
});

var ADBCommandStateProvider: React.FC<{}> = ({ children }) => {

  const [adbTimes,setADBTimes] = useState<number>(-1)
  const [resultText,setResultText] = useState<any[]>([])
  const [commandIsSuccess,setCommandIsSuccess] = useState<boolean[]>([])
  const [commandText,setCommandText] = useState<string[]>([])
  const [tagStartText,setTagStartText] = useState<string[]>([])
  const [tagEndText,setTagEndText] = useState<string[]>([])

  const {codeBlockIsShow,adbInputCMD,setADBInputCMD,setTriggerControlAnim} = useContext(
    CodeBlockStateContext,
  );

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


  function cmdResultToConsole(cmd:any,callback?:() => void){
    // add this for console
    setADBInputCMD(cmd);
    
    execCMDPromise(cmd,
    (value:any)=>{
      if(codeBlockIsShow){
        setADBTimesAndSave(adbTimes+1)
        setTagStartTextAndSave( 
        [`=================== Result Start At ${new Date().toString()} ===================`]
        )
        setCommandTextAndSave(
        [`Command '${cmd}' result is: `]
        )
        setCommandIsSuccessAndSave(
        [true]
        )
        setResultTextAndSave(
        [value]
        )
        setTagEndTextAndSave(
        [`=================== Result End At ${new Date().toString()} ===================`]
        )
      }

      callback?callback():''
    },
    (value:any)=>{
      if(codeBlockIsShow){
        setADBTimesAndSave(adbTimes+1)
        setTagStartTextAndSave( 
        [`=================== Result Start At ${new Date().toString()} ===================`]
        )
        setCommandTextAndSave(
        [`Command '${cmd}' not found: `]
        )
        setCommandIsSuccessAndSave(
        [false]
        )
        setResultTextAndSave(
        [value]
        )
        setTagEndTextAndSave(
        [`=================== Result  End  At ${new Date().toString()} ===================`]
        )
      }
      callback?callback():''
    },`input command is ${cmd}`)
  }

  function cleanAllADBData(){
    setADBTimes(-1)
    setTagEndText([])
    setTagStartText([])
    setCommandIsSuccess([])
    setCommandText([])
    setResultText([])
  }

  return (
    <ADBCommandStateContext.Provider
      value={{
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
        cmdWithConsole:cmdResultToConsole
      }}>
      {children}
    </ADBCommandStateContext.Provider>
  );
};

export default ADBCommandStateProvider;