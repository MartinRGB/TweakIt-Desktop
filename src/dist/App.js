"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var GlobalStyle_1 = require("@Styles/GlobalStyle");
var styled_1 = require("@emotion/styled");
var twin_macro_1 = require("twin.macro");
//import Button from './components/Button'
var TitleBar_1 = require("@Sections/TitleBar");
var ADBPanel_1 = require("@Sections/ADBPanel");
var MainPanel_1 = require("@Sections/MainPanel");
// theme-ui
var theme_ui_1 = require("theme-ui");
var theme_1 = require("@Styles/theme");
// i18n
require("@Context/i18nContext");
var react_i18next_1 = require("react-i18next");
var ADBExpandContext_1 = require("@Context/ADBExpandContext");
var ADBConnectContext_1 = require("@Context/ADBConnectContext");
// twmacro
var Button = styled_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), twin_macro_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["mt-4 p-2 text-white bg-blue-600"], ["mt-4 p-2 text-white bg-blue-600"]))));
// pure tw
var Input = function () { return react_1["default"].createElement("input", { tw: "mt-4 p-2 text-white bg-red-600" }); };
//const Buttons = () => <Button tw="mt-4 p-2 text-white bg-blue-600">click</Button>
var mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);
var App = function () {
    var _a = react_i18next_1.useTranslation(), t = _a.t, i18n = _a.i18n;
    //console.log(animatorList)
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(theme_ui_1.ThemeProvider, { theme: theme_1["default"] },
            react_1["default"].createElement(GlobalStyle_1.GlobalStyle, null),
            react_1["default"].createElement(ADBConnectContext_1["default"], null,
                react_1["default"].createElement(ADBExpandContext_1["default"], null,
                    react_1["default"].createElement(TitleBar_1["default"], null, "TWEAKIT"),
                    react_1["default"].createElement(ADBPanel_1["default"], null),
                    react_1["default"].createElement(MainPanel_1["default"], null))))));
};
var BodyDiv = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
react_dom_1.render(react_1["default"].createElement(App, null), mainElement);
var templateObject_1, templateObject_2, templateObject_3;
