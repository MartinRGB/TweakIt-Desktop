import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var ADBConnectStateContext = createContext({
  adbIsConnect: false,
  setADBIsConnect: (tag: boolean) => {}
});

var ADBConnectStateProvider: React.FC<{}> = ({ children }) => {
  const [connectState, setConnectState] = useState<boolean>(false);

  function setConnectStateAndSave(tag: boolean) {
    setConnectState(tag);
  }
  return (
    <ADBConnectStateContext.Provider
      value={{
        adbIsConnect:connectState,
        setADBIsConnect: setConnectStateAndSave,
      }}>
      {children}
    </ADBConnectStateContext.Provider>
  );
};

export default ADBConnectStateProvider;