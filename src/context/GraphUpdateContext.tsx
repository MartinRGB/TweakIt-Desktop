import React, { createContext, useState } from "react";
import initState from "@Config/init_state.json";

export var GraphUpdateContext = createContext({
  bezierTriggeredIndex: -1,
  setBezierTriggeredIndex: (tag: number) => {},
  triggredIndex:-1,
  setTriggeredIndex: (tag: number) => {},
  shouldGraphUpdate: false,
  setGraphShouldUpdate: (tag: boolean) => {},
  isDragBezier:false,
  setIsDragBezier: (tag: boolean) => {},
  bezierDragValue:'',
  setBezierDragValue: (tag: string) => {},
  bezierTextValue:'0.5,0.2,0.1,1.0',
  setBezierTextValue: (tag: any) => {}
});

var GraphUpdateProvider: React.FC<{}> = ({ children }) => {
  var [isUpdate, setIsUpdate] = useState<boolean>(false);
  var [index, setIndex] = useState<number>(-1);
  var [bezierIndex, setBezierIndex] = useState<number>(-1);

  var [isDrag, setIsDrag] = useState<boolean>(false);
  var [dragValue, setDragValue] = useState<string>('');
  var [textValue, setTextValue] = useState<any>('0.5,0.2,0.1,1.0');

  function setShouldUpdateAndSave(tag: boolean) {
    setIsUpdate(tag);
  }

  function setIndexAndSave(tag: number) {
    setIndex(tag);
  }

  function setBezierIndexAndSave(tag: number) {
    setBezierIndex(tag);
  }

  function setIsDragAndSave(tag: boolean) {
    setIsDrag(tag);
  }

  function setDragValueAndSave(tag: string) {
    setDragValue(tag);
  }


  function setTextValueAndSave(tag: any) {
    setDragValue(tag);
  }



  // const [times, setTimes] = useState<number>(-1);
  // function setUpdateTimeAndSave(tag: number) {
  //   setTimes(tag);
  // }
  return (
    <GraphUpdateContext.Provider
      value={{
        bezierTriggeredIndex: bezierIndex,
        setBezierTriggeredIndex: setBezierIndexAndSave,
        triggredIndex:index,
        setTriggeredIndex: setIndexAndSave,
        shouldGraphUpdate:isUpdate,
        setGraphShouldUpdate: setShouldUpdateAndSave,
        isDragBezier:isDrag,
        setIsDragBezier:setIsDragAndSave,
        bezierDragValue:dragValue,
        setBezierDragValue:setDragValueAndSave,
        bezierTextValue:textValue,
        setBezierTextValue:setTextValueAndSave
      }}>
      {children}
    </GraphUpdateContext.Provider>
  );
};

export default GraphUpdateProvider;