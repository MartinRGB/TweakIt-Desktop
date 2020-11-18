import React, { createContext, useState } from "react";
import initState from "../../../../config/init_state.json";

export var ListSelectContext = createContext({
  currentAnimation: initState.initAnimationSelect,
  selectAnimation: (tag: string) => {}
});

var ListSelectProvider: React.FC<{}> = ({ children }) => {
  const [currentAnim, setCurrentAnim] = useState<string>(initState.initAnimationSelect);

  function setAnimationAndSave(tag: string) {
    setCurrentAnim(tag);
  }
  return (
    <ListSelectContext.Provider
      value={{
        currentAnimation:currentAnim,
        selectAnimation: setAnimationAndSave,
      }}
    >
      {children}
    </ListSelectContext.Provider>
  );
};

export default ListSelectProvider;