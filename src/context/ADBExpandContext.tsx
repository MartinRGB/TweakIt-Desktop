import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var ADBExpandStateContext = createContext({
  adbIsExpand: initState.isADBPannelExpand,
  setADBExpandState: (tag: boolean) => {}
});

var ADBExpandStateProvider: React.FC<{}> = ({ children }) => {
  const [expandState, setADBExpandState] = useState<boolean>(initState.isADBPannelExpand);

  function setExpandStateAndSave(tag: boolean) {
    setADBExpandState(tag);
  }
  return (
    <ADBExpandStateContext.Provider
      value={{
        adbIsExpand:expandState,
        setADBExpandState: setExpandStateAndSave,
      }}>
      {children}
    </ADBExpandStateContext.Provider>
  );
};

export default ADBExpandStateProvider;