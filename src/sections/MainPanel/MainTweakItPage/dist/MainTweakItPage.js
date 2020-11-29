"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var ListArea_1 = require("./ListArea");
var CanvasArea_1 = require("./CanvasArea");
var PreviewArea_1 = require("./PreviewArea");
var SelectArea_1 = require("./SelectArea");
var CodeArea_1 = require("./CodeArea");
var ListSelectStateContext_1 = require("@Context/ListSelectStateContext");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var MainTweakItPage = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement(AnimatorTypeContext_1["default"], null,
            react_1["default"].createElement(ListSelectStateContext_1["default"], null,
                react_1["default"].createElement(GraphUpdateContext_1["default"], null,
                    react_1["default"].createElement(SelectArea_1["default"], null),
                    react_1["default"].createElement(TopContainer, null,
                        react_1["default"].createElement(ListArea_1["default"], null),
                        react_1["default"].createElement(CanvasArea_1["default"], null),
                        react_1["default"].createElement(PreviewArea_1["default"], null)),
                    react_1["default"].createElement(CodeArea_1["default"], null))))));
};
exports["default"] = MainTweakItPage;
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"], ["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"])));
var TopContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    //flex:7;\n    //min-height:528px;\n"], ["\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    //flex:7;\n    //min-height:528px;\n"])));
var templateObject_1, templateObject_2;
