"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var react_spring_1 = require("react-spring");
var react_with_gesture_1 = require("react-with-gesture");
var animation_json_1 = require("@Config/animation.json");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var DescText = react_1.memo(function (_a) {
    var style = _a.style, children = _a.children;
    var _b = theme_ui_1.useColorMode(), colorMode = _b[0], setColorMode = _b[1];
    var _c = react_with_gesture_1.useGesture(), bind = _c[0], _d = _c[1], delta = _d.delta, down = _d.down;
    var size = react_spring_1.useSpring({
        size: down ? 1.1 : 1,
        immediate: function (name) { return down && name === 'x'; },
        config: animation_json_1["default"].button_pressed
    }).size;
    return (react_1["default"].createElement(Text, { style: style },
        react_1["default"].createElement(react_i18next_1.Trans, null, children)));
});
var Text = styled_1["default"].span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 10px;\n  align-items: center;\n  color:", ";\n  opacity:0.5;\n  text-align: left;\n  display: inline-block;\n  user-select: none;\n"], ["\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 600;\n  font-size: 10px;\n  align-items: center;\n  color:", ";\n  opacity:0.5;\n  text-align: left;\n  display: inline-block;\n  user-select: none;\n"])), function (props) { return props.theme.fonts.normalText; }, function (props) { return props.theme.colors.text; });
exports["default"] = DescText;
var templateObject_1;
