"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
require("@Context/i18nContext");
var ADBConnectContext_1 = require("@Context/ADBConnectContext");
var TerminalTemplate = react_1.memo(function (_a) {
    var style = _a.style;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _b = react_1.useContext(ADBConnectContext_1.ADBConnectStateContext), adbTerminalText = _b.adbTerminalText, cleanAllData = _b.cleanAllData, adbInfoTimes = _b.adbInfoTimes, adbTagStartText = _b.adbTagStartText, adbCommandText = _b.adbCommandText, adbCommandIsSuccess = _b.adbCommandIsSuccess, adbResultText = _b.adbResultText, adbTagEndText = _b.adbTagEndText;
    //const [isInit,setIsInit] = useState<boolean>(false)
    react_1.useEffect(function () {
        //setADBTerminalText('')
        //cleanAllData()
        //setIsInit(true)
    }, []);
    console.log(adbTerminalText);
    console.log(adbTagStartText);
    console.log(adbCommandText);
    console.log(adbResultText);
    console.log(adbTagEndText);
    return (react_1["default"].createElement(TerminalContainer, { style: __assign({}, style) }));
});
exports["default"] = TerminalTemplate;
var TerminalContainer = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  white-space:pre-wrap;\n  overflow-wrap: break-word;\n  padding-right: 12px;\n  \n  ::selection {\n    background: ", ";\n  }\n  margin-bottom: 14px;\n"], ["\n  white-space:pre-wrap;\n  overflow-wrap: break-word;\n  padding-right: 12px;\n  \n  ::selection {\n    background: ", ";\n  }\n  margin-bottom: 14px;\n"])), function (p) { return p.theme.colors.selection; });
var CustomSpan = styled_1["default"].span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\n  color:", ";\n  word-break: break-all;\n  white-space: pre-wrap;\n  background: transparent;\n  height: 100%;\n\n"], ["\n\n  color:", ";\n  word-break: break-all;\n  white-space: pre-wrap;\n  background: transparent;\n  height: 100%;\n\n"])), function (p) { return p.theme.colors.primary; });
var Comment = styled_1["default"].p(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color:#9D9DB2; //grey\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#9D9DB2; //grey\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var templateObject_1, templateObject_2, templateObject_3;
