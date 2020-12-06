import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var ListSelectStateContext = createContext({
  currentAnimationItem: initState.initAnimPlatform + '_' + initState.initAnimName,
  selectAnimationItem: (tag: any) => {}
});

var ListSelectStateProvider: React.FC<{}> = ({ children }) => {
  const [currentAnimItem, setCurrentAnimItem] = useState<string>(initState.initAnimPlatform + '_' + initState.initAnimName);

  function setAnimationAndSave(tag: string) {
    setCurrentAnimItem(tag);
  }
  
  return (
    <ListSelectStateContext.Provider
      value={{
        currentAnimationItem:currentAnimItem,
        selectAnimationItem: setAnimationAndSave,
      }}
    >
      {children}
    </ListSelectStateContext.Provider>
  );

};

export default ListSelectStateProvider;