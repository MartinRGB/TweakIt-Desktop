import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var GraphUpdateContext = createContext({
  triggredIndex:-1,
  setTriggeredIndex: (tag: number) => {},
  shouldGraphUpdate: false,
  setGraphShouldUpdate: (tag: boolean) => {},
  // graphUpdateTimes:-1,
  // setGraphUpdateTimes: (tag: number) => {},
});

var GraphUpdateProvider: React.FC<{}> = ({ children }) => {
  var [isUpdate, setIsUpdate] = useState<boolean>(false);
  var [index, setIndex] = useState<number>(-1);


  function setShouldUpdateAndSave(tag: boolean) {
    setIsUpdate(tag);
  }

  function setIndexAndSave(tag: number) {
    setIndex(tag);
  }

  // const [times, setTimes] = useState<number>(-1);
  // function setUpdateTimeAndSave(tag: number) {
  //   setTimes(tag);
  // }
  return (
    <GraphUpdateContext.Provider
      value={{
        triggredIndex:index,
        setTriggeredIndex: setIndexAndSave,
        shouldGraphUpdate:isUpdate,
        setGraphShouldUpdate: setShouldUpdateAndSave,
        // graphUpdateTimes:times,
        // setGraphUpdateTimes:setUpdateTimeAndSave,
      }}>
      {children}
    </GraphUpdateContext.Provider>
  );
};

export default GraphUpdateProvider;