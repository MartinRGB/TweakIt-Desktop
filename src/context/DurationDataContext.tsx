import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var DurationDataContext = createContext({
  durationData:-1,
  setDurationData: (tag: number) => {}
});

var DurationDataProvider: React.FC<{}> = ({ children }) => {
  const [mDuration, setMDuration] = useState<number>(-1);

  function seDurationAndSave(tag: number) {
    setMDuration(tag);
  }
  return (
    <DurationDataContext.Provider
      value={{
        durationData:mDuration,
        setDurationData: seDurationAndSave,
      }}>
      {children}
    </DurationDataContext.Provider>
  );
};

export default DurationDataProvider;