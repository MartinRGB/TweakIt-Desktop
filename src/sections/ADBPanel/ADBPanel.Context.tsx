import React, { createContext, useState } from "react";

export var ADBExpandStateContext = createContext({
  adbIsExpand: true,
  setADBExpandState: (tag: boolean) => {}
});

var ADBExpandStateProvider: React.FC<{}> = ({ children }) => {
  const [expandState, setADBExpandState] = useState<boolean>(true);

  function setExpandStateAndSave(tag: boolean) {
    setADBExpandState(tag);
  }
  return (
    <ADBExpandStateContext.Provider
      value={{
        adbIsExpand:expandState,
        setADBExpandState: setExpandStateAndSave,
      }}
    >
      {children}
    </ADBExpandStateContext.Provider>
  );
};

export default ADBExpandStateProvider;