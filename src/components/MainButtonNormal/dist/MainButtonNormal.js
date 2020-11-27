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
var twin_macro_1 = require("twin.macro");
var styled_1 = require("@emotion/styled");
var core_1 = require("@emotion/core");
var react_spring_1 = require("react-spring");
var react_with_gesture_1 = require("react-with-gesture");
var animation_json_1 = require("@Config/animation.json");
var MainButtonNormal = function (_a) {
    var style = _a.style, children = _a.children, onClick = _a.onClick;
    var _b = theme_ui_1.useColorMode(), colorMode = _b[0], setColorMode = _b[1];
    var _c = react_with_gesture_1.useGesture(), bind = _c[0], _d = _c[1], delta = _d.delta, down = _d.down;
    var size = react_spring_1.useSpring({
        size: down ? 1.1 : 1,
        immediate: function (name) { return down && name === 'x'; },
        config: animation_json_1["default"].button_pressed
    }).size;
    return (react_1["default"].createElement(react_spring_1.animated.div, __assign({ css: AnimatedContainerCSS }, bind(), { style: {
            transform: react_spring_1.interpolate([size], function (s) { return "scale(" + s + ")"; })
        } }),
        react_1["default"].createElement(Button, { style: style, onClick: onClick },
            react_1["default"].createElement(CustomSpan, null, children))));
};
var AnimatedContainerCSS = core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height:16px;\n  flex:1;\n  display:flex;\n"], ["\n  height:16px;\n  flex:1;\n  display:flex;\n"])));
// twmacro
var Button = styled_1["default"].button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  // ", "\n  width: 40px;\n  height: 16px;\n  border-radius:4px;\n  padding: 0;\n  background: ", ";\n  outline:none;\n  // margin-left:8px;\n  margin: 0 auto;\n}\n  border: 0.5px solid rgba(255, 255, 255, 0.06);\n  > span{\n    color: ", ";\n  }\n\n  &:active {\n    border-style: double;\n    background: ", ";\n  }\n\n  &:active  > span{\n    color: ", ";\n  }\n"], ["\n  // ", "\n  width: 40px;\n  height: 16px;\n  border-radius:4px;\n  padding: 0;\n  background: ", ";\n  outline:none;\n  // margin-left:8px;\n  margin: 0 auto;\n}\n  border: 0.5px solid rgba(255, 255, 255, 0.06);\n  > span{\n    color: ", ";\n  }\n\n  &:active {\n    border-style: double;\n    background: ", ";\n  }\n\n  &:active  > span{\n    color: ", ";\n  }\n"])), twin_macro_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["mt-4 p-2 text-white bg-blue-600"], ["mt-4 p-2 text-white bg-blue-600"]))), function (p) { return p.theme.colors.normal_button_bg; }, function (p) { return (p.active ? p.theme.colors.background : p.theme.colors.text); }, function (p) { return p.theme.colors.normal_button_active; }, function (p) { return p.theme.colors.background; });
var CustomSpan = styled_1["default"].span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\ntext-align: center;\nfont-family: ", ";\nfont-style: normal;\nfont-weight: bold;\nfont-size: 11px;\nline-height: 15px;\n"], ["\ntext-align: center;\nfont-family: ", ";\nfont-style: normal;\nfont-weight: bold;\nfont-size: 11px;\nline-height: 15px;\n"])), function (props) { return props.theme.fonts.numberInput; });
exports["default"] = MainButtonNormal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
