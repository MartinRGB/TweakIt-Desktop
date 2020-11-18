import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var ListSelectStateContext = createContext({
  currentAnimation: initState.initAnimationSelect,
  selectAnimation: (tag: string) => {}
});

var ListSelectStateProvider: React.FC<{}> = ({ children }) => {
  const [currentAnim, setCurrentAnim] = useState<string>(initState.initAnimationSelect);

  function setAnimationAndSave(tag: string) {
    setCurrentAnim(tag);
  }
  return (
    <ListSelectStateContext.Provider
      value={{
        currentAnimation:currentAnim,
        selectAnimation: setAnimationAndSave,
      }}
    >
      {children}
    </ListSelectStateContext.Provider>
  );
};

export default ListSelectStateProvider;