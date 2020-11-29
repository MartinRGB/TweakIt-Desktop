"use strict";
exports.__esModule = true;
exports.AnimatorTypeContext = void 0;
var react_1 = require("react");
var init_state_json_1 = require("@Config/init_state.json");
exports.AnimatorTypeContext = react_1.createContext({
    currentAnimPlatform: '',
    currentAnimName: init_state_json_1["default"].initAnimName,
    currentAnimCalculator: init_state_json_1["default"].initAnimCalculator,
    currentAnimData: [],
    currentSolverData: [],
    currentDataRange: [],
    setCurrentAnimPlatform: function (tag) { },
    setCurrentAnimName: function (tag) { },
    setCurrentAnimCalculator: function (tag) { },
    setCurrentAnimData: function (tag) { },
    setCurrentSolverData: function (tag) { },
    setCurrentSolverDataByIndex: function (value, index) { },
    setCurrentDataRange: function (tag) { },
    setCurrentDataRangeByIndex: function (value, index) { },
    previousAnimPlatform: '',
    previousAnimName: '',
    previousAnimCalculator: '',
    previousAnimData: [],
    previousSolverData: [],
    previousDataRange: [],
    previousDataMin: [],
    setPreviousAnimPlatform: function (tag) { },
    setPreviousAnimName: function (tag) { },
    setPreviousAnimCalculator: function (tag) { },
    setPreviousAnimData: function (tag) { },
    setPreviousSolverData: function (tag) { },
    setPreviousSolverDataByIndex: function (value, index) { },
    setPreviousDataRange: function (tag) { },
    setPreviousDataRangeByIndex: function (value, index) { },
    setPreviousDataMin: function (tag) { },
    setPreviousDataMinByIndex: function (value, index) { },
    selectTransition: false,
    setSelectTransition: function (tag) { },
    durationData: 0,
    setDurationData: function (tag) { }
});
var AnimatorTypeProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(''), mCurrAnimPlatform = _b[0], setCurrAnimPlatform = _b[1];
    var _c = react_1.useState(init_state_json_1["default"].initAnimName), mCurrAnimName = _c[0], setCurrAnimName = _c[1];
    var _d = react_1.useState(init_state_json_1["default"].initAnimCalculator), mCurrAnimCalculator = _d[0], setCurrAnimCalculator = _d[1];
    var _e = react_1.useState([]), mCurrAnimData = _e[0], setCurrAnimData = _e[1];
    var _f = react_1.useState([]), mCurrSolverData = _f[0], setCurrSolverData = _f[1];
    var _g = react_1.useState([]), mCurrDataRange = _g[0], setCurrRangeData = _g[1];
    var _h = react_1.useState(''), mPrevAnimPlatform = _h[0], setPrevAnimPlatform = _h[1];
    var _j = react_1.useState(''), mPrevAnimName = _j[0], setPrevAnimName = _j[1];
    var _k = react_1.useState(''), mPrevAnimCalculator = _k[0], setPrevAnimCalculator = _k[1];
    var _l = react_1.useState([]), mPrevAnimData = _l[0], setPrevAnimData = _l[1];
    var _m = react_1.useState([]), mPrevSolverData = _m[0], setPrevSolverData = _m[1];
    var _o = react_1.useState([]), mPrevDataRange = _o[0], setPrevRangeData = _o[1];
    var _p = react_1.useState([]), mPrevDataMin = _p[0], setPrevMinData = _p[1];
    var _q = react_1.useState(true), mSelectTransition = _q[0], setSelectTransition = _q[1];
    var _r = react_1.useState(0), mDuration = _r[0], setDuration = _r[1];
    function setCurrAnimPlatformAndSave(tag) {
        setCurrAnimPlatform(tag);
    }
    function setCurrAnimNameAndSave(tag) {
        setCurrAnimName(tag);
    }
    function setCurrAnimCalculatorAndSave(tag) {
        setCurrAnimCalculator(tag);
    }
    function setCurrAnimDataAndSave(tag) {
        setCurrAnimData(tag);
        var solverData = [];
        if (tag) {
            tag.map(function (data, index) {
                solverData.push(data[1]["default"]);
            });
        }
        setCurrSolverData(solverData);
    }
    function setCurrSolverDataAndSave(tag) {
        setCurrSolverData(tag);
    }
    function setCurrSolverDataByIndexAndSave(value, index) {
        var solverData = mCurrSolverData;
        solverData[index] = value;
        //console.log(solverData)
        setCurrSolverData(solverData);
    }
    function setCurrDataRangeAndSave(tag) {
        setCurrRangeData(tag);
    }
    function setCurrDataRangeByIndexAndSave(value, index) {
        var dataRange = mCurrDataRange;
        dataRange[index] = value;
        //console.log(solverData)
        setCurrRangeData(dataRange);
    }
    function setPrevAnimPlatformAndSave(tag) {
        setPrevAnimPlatform(tag);
    }
    function setPrevAnimNameAndSave(tag) {
        setPrevAnimName(tag);
    }
    function setPrevAnimCalculatorAndSave(tag) {
        setPrevAnimCalculator(tag);
    }
    function setPrevAnimDataAndSave(tag) {
        setPrevAnimData(tag);
        var solverData = [];
        if (tag) {
            tag.map(function (data, index) {
                solverData.push(data[1]["default"]);
            });
        }
        setPrevSolverData(solverData);
    }
    function setPrevSolverDataAndSave(tag) {
        setPrevSolverData(tag);
    }
    function setPrevSolverDataByIndexAndSave(value, index) {
        var solverData = mPrevSolverData;
        solverData[index] = Number(value);
        //console.log(solverData)
        setPrevSolverData(solverData);
    }
    function setPrevDataRangeAndSave(tag) {
        setPrevRangeData(tag);
    }
    function setPrevDataRangeByIndexAndSave(value, index) {
        var dataRange = mPrevDataRange;
        dataRange[index] = Number(value);
        //console.log(solverData)
        setPrevRangeData(dataRange);
    }
    function setPrevDataMinAndSave(tag) {
        setPrevMinData(tag);
    }
    function setPrevDataMinByIndexAndSave(value, index) {
        var dataMin = mPrevDataMin;
        dataMin[index] = Number(value);
        //console.log(solverData)
        setPrevMinData(dataMin);
    }
    function setSelectTransitionAndSave(tag) {
        setSelectTransition(tag);
    }
    function setDurationAndSave(tag) {
        setDuration(tag);
    }
    return (react_1["default"].createElement(exports.AnimatorTypeContext.Provider, { value: {
            currentAnimPlatform: mCurrAnimPlatform,
            currentAnimName: mCurrAnimName,
            currentAnimCalculator: mCurrAnimCalculator,
            currentAnimData: mCurrAnimData,
            currentSolverData: mCurrSolverData,
            currentDataRange: mCurrDataRange,
            setCurrentAnimPlatform: setCurrAnimPlatformAndSave,
            setCurrentAnimName: setCurrAnimNameAndSave,
            setCurrentAnimCalculator: setCurrAnimCalculatorAndSave,
            setCurrentAnimData: setCurrAnimDataAndSave,
            setCurrentSolverData: setCurrSolverDataAndSave,
            setCurrentSolverDataByIndex: setCurrSolverDataByIndexAndSave,
            setCurrentDataRange: setCurrDataRangeAndSave,
            setCurrentDataRangeByIndex: setCurrDataRangeByIndexAndSave,
            previousAnimPlatform: mPrevAnimPlatform,
            previousAnimName: mPrevAnimName,
            previousAnimCalculator: mPrevAnimCalculator,
            previousAnimData: mPrevAnimData,
            previousSolverData: mPrevSolverData,
            previousDataRange: mPrevDataRange,
            previousDataMin: mPrevDataMin,
            setPreviousAnimPlatform: setPrevAnimPlatformAndSave,
            setPreviousAnimName: setPrevAnimNameAndSave,
            setPreviousAnimCalculator: setPrevAnimCalculatorAndSave,
            setPreviousAnimData: setPrevAnimDataAndSave,
            setPreviousSolverData: setPrevSolverDataAndSave,
            setPreviousSolverDataByIndex: setPrevSolverDataByIndexAndSave,
            setPreviousDataRange: setPrevDataRangeAndSave,
            setPreviousDataRangeByIndex: setPrevDataRangeByIndexAndSave,
            setPreviousDataMin: setPrevDataMinAndSave,
            setPreviousDataMinByIndex: setPrevDataMinByIndexAndSave,
            selectTransition: mSelectTransition,
            setSelectTransition: setSelectTransitionAndSave,
            durationData: mDuration,
            setDurationData: setDurationAndSave
        } }, children));
};
exports["default"] = AnimatorTypeProvider;
