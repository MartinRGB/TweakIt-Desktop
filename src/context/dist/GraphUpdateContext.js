"use strict";
exports.__esModule = true;
exports.GraphUpdateContext = void 0;
var react_1 = require("react");
exports.GraphUpdateContext = react_1.createContext({
    bezierTriggeredIndex: -1,
    setBezierTriggeredIndex: function (tag) { },
    triggredIndex: -1,
    setTriggeredIndex: function (tag) { },
    shouldGraphUpdate: false,
    setGraphShouldUpdate: function (tag) { },
    isDragBezier: false,
    setIsDragBezier: function (tag) { },
    bezierDragValue: '',
    setBezierDragValue: function (tag) { },
    bezierTextValue: '0.5,0.2,0.1,1.0',
    setBezierTextValue: function (tag) { }
});
var GraphUpdateProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(false), isUpdate = _b[0], setIsUpdate = _b[1];
    var _c = react_1.useState(-1), index = _c[0], setIndex = _c[1];
    var _d = react_1.useState(-1), bezierIndex = _d[0], setBezierIndex = _d[1];
    var _e = react_1.useState(false), isDrag = _e[0], setIsDrag = _e[1];
    var _f = react_1.useState(''), dragValue = _f[0], setDragValue = _f[1];
    var _g = react_1.useState('0.5,0.2,0.1,1.0'), textValue = _g[0], setTextValue = _g[1];
    function setShouldUpdateAndSave(tag) {
        setIsUpdate(tag);
    }
    function setIndexAndSave(tag) {
        setIndex(tag);
    }
    function setBezierIndexAndSave(tag) {
        setBezierIndex(tag);
    }
    function setIsDragAndSave(tag) {
        setIsDrag(tag);
    }
    function setDragValueAndSave(tag) {
        setDragValue(tag);
    }
    function setTextValueAndSave(tag) {
        setDragValue(tag);
    }
    // const [times, setTimes] = useState<number>(-1);
    // function setUpdateTimeAndSave(tag: number) {
    //   setTimes(tag);
    // }
    return (react_1["default"].createElement(exports.GraphUpdateContext.Provider, { value: {
            bezierTriggeredIndex: bezierIndex,
            setBezierTriggeredIndex: setBezierIndexAndSave,
            triggredIndex: index,
            setTriggeredIndex: setIndexAndSave,
            shouldGraphUpdate: isUpdate,
            setGraphShouldUpdate: setShouldUpdateAndSave,
            isDragBezier: isDrag,
            setIsDragBezier: setIsDragAndSave,
            bezierDragValue: dragValue,
            setBezierDragValue: setDragValueAndSave,
            bezierTextValue: textValue,
            setBezierTextValue: setTextValueAndSave
        } }, children));
};
exports["default"] = GraphUpdateProvider;
