import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var CodeBlockStateContext = createContext({
  codeBlockIsShow: initState.codeBlockIsShow,
  setCodeBlockIsShow: (tag: boolean) => {},
  adbInputCMD:'',
  setADBInputCMD:(tag: string) => {},
  canTriggerControlAnim:false,
  setTriggerControlAnim: (tag: boolean) => {},
  canTriggeBlocAnim:false,
  setTriggerBlocAnim: (tag: boolean) => {},
});

var CodeBlockStateProvider: React.FC<{}> = ({ children }) => {
  const [cbIsShow, setCBIsShow] = useState<boolean>(initState.codeBlockIsShow);
  const [adbCMD,setADBCMD] = useState<string>('')
  const [canTCAnim,setTCAnim] = useState<boolean>(false);
  const [canTBAnim,setTBAnim] = useState<boolean>(false);

  function codeBlockIsShowAndSave(tag: boolean) {
    setCBIsShow(tag);
  }

  function setADBCMDAndSave(tag:string){
    setADBCMD(tag)
  }

  function setCanTriggerControlAnimAndSave(tag:boolean){
    setTCAnim(tag)
  }

  function setCanTriggerBlocAnimAndSave(tag:boolean){
    setTBAnim(tag)
  }

  return (
    <CodeBlockStateContext.Provider
      value={{
        codeBlockIsShow:cbIsShow,
        setCodeBlockIsShow: codeBlockIsShowAndSave,
        adbInputCMD:adbCMD,
        setADBInputCMD:setADBCMDAndSave,
        canTriggerControlAnim:canTCAnim,
        setTriggerControlAnim:setCanTriggerControlAnimAndSave,
        canTriggeBlocAnim:canTBAnim,
        setTriggerBlocAnim: setCanTriggerBlocAnimAndSave,
      }}>
      {children}
    </CodeBlockStateContext.Provider>
  );
};

export default CodeBlockStateProvider;