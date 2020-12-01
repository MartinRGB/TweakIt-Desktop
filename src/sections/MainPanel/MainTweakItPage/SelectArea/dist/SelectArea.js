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
var DescText_1 = require("@Components/DescText");
var MainButtonNormal_1 = require("@Components/MainButtonNormal");
var react_select_1 = require("react-select");
var options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
var SelectArea = react_1.memo(function (_a) {
    var children = _a.children;
    var _b = react_i18next_1.useTranslation(), t = _b.t, i18n = _b.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _c = react_1.useState(null), selectedOption = _c[0], setSelectedOption = _c[1];
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement(TopLeftContainer, null,
            react_1["default"].createElement(DescText_1["default"], { style: { fongWeight: "300", fontSize: "12px" } }, "Select Animation"),
            react_1["default"].createElement(react_select_1["default"], { style: { width: "300px" }, defaultValue: selectedOption, onChange: setSelectedOption, options: options }),
            react_1["default"].createElement(MainButtonNormal_1["default"], { style: {
                    display: "inline-block"
                } },
                react_1["default"].createElement(CustomSpan, null,
                    react_1["default"].createElement(react_i18next_1.Trans, null, "Build"))),
            react_1["default"].createElement(MainButtonNormal_1["default"], { style: {
                    display: "inline-block"
                } },
                react_1["default"].createElement(CustomSpan, null,
                    react_1["default"].createElement(react_i18next_1.Trans, null, "Get"))))));
});
exports["default"] = SelectArea;
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width:100%;\n    height: 56px;\n    min-height:56px;\n    display: flex;\n    flex-direction: column;\n    z-index:2;\n    background:", ";\n    box-shadow: 0px 1px 0px ", ";\n"], ["\n    width:100%;\n    height: 56px;\n    min-height:56px;\n    display: flex;\n    flex-direction: column;\n    z-index:2;\n    background:", ";\n    box-shadow: 0px 1px 0px ", ";\n"])), function (p) { return p.theme.colors.main_top_bg; }, function (p) { return p.theme.colors.adb_border; });
var TopLeftContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"])));
var CustomSpan = styled_1["default"].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\ntext-align: center;\nfont-family: ", ";\nfont-style: normal;\nfont-weight: bold;\nfont-size: 11px;\nline-height: 14px;\n"], ["\ntext-align: center;\nfont-family: ", ";\nfont-style: normal;\nfont-weight: bold;\nfont-size: 11px;\nline-height: 14px;\n"])), function (props) { return props.theme.fonts.numberInput; });
var templateObject_1, templateObject_2, templateObject_3;
