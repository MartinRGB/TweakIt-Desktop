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
var TextInput = function (_a) {
    var id = _a.id, style = _a.style, value = _a.value, min = _a.min, max = _a.max, step = _a.step, isEditable = _a.isEditable, onChange = _a.onChange, onKeyUp = _a.onKeyUp, onKeyDown = _a.onKeyDown, onBlur = _a.onBlur, onFocus = _a.onFocus;
    var _b = theme_ui_1.useColorMode(), colorMode = _b[0], setColorMode = _b[1];
    var _c = react_with_gesture_1.useGesture(), bind = _c[0], _d = _c[1], delta = _d.delta, down = _d.down;
    var size = react_spring_1.useSpring({
        size: down ? 1.1 : 1,
        immediate: function (name) { return down && name === 'x'; },
        config: animation_json_1["default"].button_pressed
    }).size;
    var mIsEditable = isEditable ? isEditable : true;
    return (react_1["default"].createElement(Input, { id: id, type: "text", style: style, value: value, min: min, max: max, step: step, isEditable: isEditable, onChange: onChange, onKeyUp: onKeyUp, onKeyDown: onKeyDown, onBlur: onBlur, onFocus: onFocus }));
};
var Input = styled_1["default"].input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  border: 1px solid ", ";\n  color: ", ";\n  border-radius: 3px;\n  height:100%;\n  width: 40px;\n  text-align: center;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: bold;\n  font-size: 10px;\n  line-height: 10px;\n  outline: none;\n  cursor: ", ";\n  opacity: ", "\n"], ["\n  background: ", ";\n  border: 1px solid ", ";\n  color: ", ";\n  border-radius: 3px;\n  height:100%;\n  width: 40px;\n  text-align: center;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: bold;\n  font-size: 10px;\n  line-height: 10px;\n  outline: none;\n  cursor: ", ";\n  opacity: ", "\n"])), function (props) { return props.theme.colors.text_input_bg; }, function (props) { return props.theme.colors.text_input_border; }, function (props) { return props.theme.colors.text_input_text; }, function (props) { return props.theme.fonts.numberInput; }, function (p) { return p.isEditable ? 'text' : 'not-allowed'; }, function (p) { return p.isEditable ? '1' : '0.3'; });
exports["default"] = TextInput;
var templateObject_1;
