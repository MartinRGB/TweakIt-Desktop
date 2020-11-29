"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var init_state_json_1 = require("@Config/init_state.json");
var CanvasTitle = function (_a) {
    var currentAnimName = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext).currentAnimName;
    return (react_1["default"].createElement(AnimationTitle, null,
        react_1["default"].createElement(react_i18next_1.Trans, null, (currentAnimName && currentAnimName != init_state_json_1["default"].initAnimCalculator) ? currentAnimName : 'select_an_animator')));
};
exports["default"] = CanvasTitle;
var AnimationTitle = styled_1["default"].p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align:center;\n  opacity:0.5;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 21px;\n  padding-top:24px;\n  color:", ";\n  z-index:1;\n"], ["\n  text-align:center;\n  opacity:0.5;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 21px;\n  padding-top:24px;\n  color:", ";\n  z-index:1;\n"])), function (props) { return props.theme.fonts.headText; }, function (p) { return p.theme.colors.text; });
var templateObject_1;
