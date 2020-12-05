import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var CodeBlockStateContext = createContext({
  codeBlockIsShow: false,
  setCodeBlockIsShow: (tag: boolean) => {},
  adbInputCMD:'',
  setADBInputCMD:(tag: string) => {},
  canTriggerControlAnim:false,
  setTriggerControlAnim: (tag: boolean) => {},
});

var CodeBlockStateProvider: React.FC<{}> = ({ children }) => {
  const [cbIsShow, setCBIsShow] = useState<boolean>(false);
  const [adbCMD,setADBCMD] = useState<string>('')
  const [canTCAnim,setTCAnim] = useState<boolean>(false);

  function codeBlockIsShowAndSave(tag: boolean) {
    setCBIsShow(tag);
  }

  function setADBCMDAndSave(tag:string){
    setADBCMD(tag)
  }

  function setCanTriggerControlAnimAndSave(tag:boolean){
    setTCAnim(tag)
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
      }}>
      {children}
    </CodeBlockStateContext.Provider>
  );
};

export default CodeBlockStateProvider;