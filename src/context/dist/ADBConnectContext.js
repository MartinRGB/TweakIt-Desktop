"use strict";
exports.__esModule = true;
exports.ADBConnectStateContext = void 0;
var react_1 = require("react");
exports.ADBConnectStateContext = react_1.createContext({
    adbIsConnect: false,
    setADBIsConnect: function (tag) { },
    adbTerminalText: '',
    setADBTerminalText: function (tag) { },
    adbInfoTimes: 0,
    adbResultText: [],
    adbCommandText: [],
    adbCommandIsSuccess: [],
    adbTagStartText: [],
    adbTagEndText: [],
    setADBInfoTimes: function (tag) { },
    setADBResultText: function (tag) { },
    setADBCommandText: function (tag) { },
    setADBCommandIsSuccess: function (tag) { },
    setADBTagStartText: function (tag) { },
    setADBTagEndText: function (tag) { },
    cleanAllData: function () { }
});
var ADBConnectStateProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(false), connectState = _b[0], setConnectState = _b[1];
    var _c = react_1.useState(''), textVal = _c[0], setTextVal = _c[1];
    var _d = react_1.useState(0), adbTimes = _d[0], setADBTimes = _d[1];
    var _e = react_1.useState([]), resultText = _e[0], setResultText = _e[1];
    var _f = react_1.useState([]), commandIsSuccess = _f[0], setCommandIsSuccess = _f[1];
    var _g = react_1.useState([]), commandText = _g[0], setCommandText = _g[1];
    var _h = react_1.useState([]), tagStartText = _h[0], setTagStartText = _h[1];
    var _j = react_1.useState([]), tagEndText = _j[0], setTagEndText = _j[1];
    function setConnectStateAndSave(tag) {
        setConnectState(tag);
    }
    function setADBTextAndSave(tag) {
        setTextVal(tag);
    }
    function setResultTextAndSave(tag) {
        var a = resultText;
        console.log(tag);
        a.push(tag);
        setResultText(a);
    }
    function setCommandTextAndSave(tag) {
        var a = commandText;
        a.push(tag);
        setCommandText(a);
    }
    function setCommandIsSuccessAndSave(tag) {
        var a = commandIsSuccess;
        a.push(tag);
        setCommandIsSuccess(a);
    }
    function setTagStartTextAndSave(tag) {
        var a = tagStartText;
        a.push(tag);
        setTagStartText(a);
    }
    function setTagEndTextAndSave(tag) {
        var a = tagEndText;
        a.push(tag);
        setTagEndText(a);
    }
    function setADBTimesAndSave(tag) {
        setADBTimes(tag);
    }
    function cleanAllADBData() {
        setADBTimes(0);
        setTagEndText([]);
        setTagStartText([]);
        setCommandIsSuccess([]);
        setCommandText([]);
        setResultText([]);
    }
    return (react_1["default"].createElement(exports.ADBConnectStateContext.Provider, { value: {
            adbIsConnect: connectState,
            setADBIsConnect: setConnectStateAndSave,
            adbTerminalText: textVal,
            setADBTerminalText: setADBTextAndSave,
            adbInfoTimes: adbTimes,
            adbResultText: resultText,
            adbCommandText: commandText,
            adbCommandIsSuccess: commandIsSuccess,
            adbTagStartText: tagStartText,
            adbTagEndText: tagEndText,
            setADBInfoTimes: setADBTimesAndSave,
            setADBResultText: setResultTextAndSave,
            setADBCommandText: setCommandTextAndSave,
            setADBCommandIsSuccess: setCommandIsSuccessAndSave,
            setADBTagStartText: setTagStartTextAndSave,
            setADBTagEndText: setTagEndTextAndSave,
            cleanAllData: cleanAllADBData
        } }, children));
};
exports["default"] = ADBConnectStateProvider;
