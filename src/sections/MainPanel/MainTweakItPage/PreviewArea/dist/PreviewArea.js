"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var init_state_json_1 = require("@Config/init_state.json");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var MainButtonNormal_1 = require("@Components/MainButtonNormal");
var PreviewArea = function (_a) {
    var children = _a.children;
    var _b = react_i18next_1.useTranslation(), t = _b.t, i18n = _b.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _c = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), currentSolverData = _c.currentSolverData, currentAnimCalculator = _c.currentAnimCalculator;
    var _d = react_1.useContext(GraphUpdateContext_1.GraphUpdateContext), setGraphShouldUpdate = _d.setGraphShouldUpdate, triggredIndex = _d.triggredIndex, setTriggeredIndex = _d.setTriggeredIndex;
    var _e = react_1.useState('scale'), animProperty = _e[0], setAnimProerty = _e[1];
    //console.log(currentSolverData)
    var svgHeight = init_state_json_1["default"].svgHeight;
    var setScale = function () { setAnimProerty('scale'); };
    var setTrans = function () { setAnimProerty('translationY'); };
    var setRot = function () { setAnimProerty('rotate'); };
    var startAnimate = function () { };
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement(PaddingTopBox, null),
        react_1["default"].createElement(BoxContainer, { style: {
                height: svgHeight + "px"
            } },
            react_1["default"].createElement(Box, null)),
        react_1["default"].createElement(BtnContainer, null,
            react_1["default"].createElement(MainButtonNormal_1["default"], { onClick: setScale },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Scale")),
            react_1["default"].createElement(MainButtonNormal_1["default"], { onClick: setTrans },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Trans")),
            react_1["default"].createElement(MainButtonNormal_1["default"], { onClick: setRot },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Rot"))),
        react_1["default"].createElement(RunContainer, null,
            react_1["default"].createElement(MainButtonNormal_1["default"], { onClick: startAnimate },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Run")))));
};
exports["default"] = PreviewArea;
var PaddingTopBox = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width:100%;\n  height:45px;\n"], ["\n  width:100%;\n  height:45px;\n"])));
var BoxContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width:100%;\n  height:345px;\n  display:flex;\n  align-items:center;\n"], ["\n  width:100%;\n  height:345px;\n  display:flex;\n  align-items:center;\n"])));
var Box = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width:45px;\n  height:45px;\n  background: linear-gradient(180deg, #77FBAD 0%, #47BBAC 100%);\n  opacity: 0.5;\n  border-radius: 8px;\n  margin: 0 auto;\n"], ["\n  width:45px;\n  height:45px;\n  background: linear-gradient(180deg, #77FBAD 0%, #47BBAC 100%);\n  opacity: 0.5;\n  border-radius: 8px;\n  margin: 0 auto;\n"])));
var BtnContainer = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width:100%;\n  display:flex;\n  align-items:center;\n  flex-direction: row;\n  padding: 0 28px;\n  height: 24px;\n"], ["\n  width:100%;\n  display:flex;\n  align-items:center;\n  flex-direction: row;\n  padding: 0 28px;\n  height: 24px;\n"])));
var RunContainer = styled_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width:100%;\n  display:flex;\n  align-items:center;\n  flex-direction: row;\n  padding: 0 28px;\n  flex: 1;\n}\n"], ["\n  width:100%;\n  display:flex;\n  align-items:center;\n  flex-direction: row;\n  padding: 0 28px;\n  flex: 1;\n}\n"])));
var Container = styled_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    height: 100%;\n    background:", ";\n    display: flex;\n    flex-direction: column;\n    //flex:1;\n    width:250px;\n"], ["\n    height: 100%;\n    background:", ";\n    display: flex;\n    flex-direction: column;\n    //flex:1;\n    width:250px;\n"])), function (p) { return p.theme.colors.main_top_bg; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
