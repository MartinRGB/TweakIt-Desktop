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
var ListTree_1 = require("./ListTree");
var animator_list_json_1 = require("@Config/animator_list.json");
var ListArea = function (_a) {
    var children = _a.children;
    var _b = react_i18next_1.useTranslation(), t = _b.t, i18n = _b.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    return (react_1["default"].createElement(Container, null, animator_list_json_1["default"].map(function (data, index) {
        return (react_1["default"].createElement(ListTree_1["default"], { key: data['platform'] + '_' + index, info: data['platform'], platform: data['platform'], isUlElement: true, name: data['platform'], index: index }, data['li'].map(function (animData, i) {
            return react_1["default"].createElement(ListTree_1["default"], { key: data['platform'] + '_' + data['name'] + '_' + animData['name'] + '_' + i, info: data['platform'] + '_' + data['name'] + '_' + animData['name'], platform: data['platform'], index: i, isUlElement: false, name: animData['name'], calculator: animData['calculator'], animation_data: animData['animation_data'], visible: animData['visible'], clickable: animData['clickable'] });
        })));
    })));
};
exports["default"] = ListArea;
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    background:", ";\n    display: flex;\n    flex-direction: column;\n    //flex:1;\n    width:250px;\n    // Need a fake scrollbar\n    //overflow-y: auto;\n    overflow-y:auto;\n    padding:24px 14px 24px 14px;\n    // Or it will re-rendering cause performance issue\n    min-width:250px;\n\n\n    /* width */\n    ::-webkit-scrollbar {\n      width: 2px;\n    }\n\n    /* Handle */\n    ::-webkit-scrollbar-thumb {\n      background: ", ";\n    }\n"], ["\n    height: 100%;\n    background:", ";\n    display: flex;\n    flex-direction: column;\n    //flex:1;\n    width:250px;\n    // Need a fake scrollbar\n    //overflow-y: auto;\n    overflow-y:auto;\n    padding:24px 14px 24px 14px;\n    // Or it will re-rendering cause performance issue\n    min-width:250px;\n\n\n    /* width */\n    ::-webkit-scrollbar {\n      width: 2px;\n    }\n\n    /* Handle */\n    ::-webkit-scrollbar-thumb {\n      background: ", ";\n    }\n"])), function (p) { return p.theme.colors.main_top_bg; }, function (p) { return p.theme.colors.text; });
var templateObject_1;
