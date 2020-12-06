import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var GlobalAnimationStateContext = createContext({
  isGlobalAnimEnable: initState.isAnimationEnable,
  setGlobalAnimEnable: (tag: boolean) => {},
});

var GlobalAnimationStateProvider: React.FC<{}> = ({ children }) => {
  const [globalAnim, setGlobalAnim] = useState<boolean>(initState.isAnimationEnable);

  function setGlobalAnimAndSave(tag:boolean){
    setGlobalAnim(tag)
  }
  return (
    <GlobalAnimationStateContext.Provider
      value={{
        isGlobalAnimEnable:globalAnim,
        setGlobalAnimEnable: setGlobalAnimAndSave
      }}>
      {children}
    </GlobalAnimationStateContext.Provider>
  );
};

export default GlobalAnimationStateProvider;