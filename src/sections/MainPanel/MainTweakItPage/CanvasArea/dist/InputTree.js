"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_spring_1 = require("react-spring");
// import * as Icons from './ListIcon'
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var animation_json_1 = require("@Config/animation.json");
var RangeInput_1 = require("@Components/RangeInput");
var TextInput_1 = require("@Components/TextInput");
var DescText_1 = require("@Components/DescText");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var InputTree = react_1.memo(function (_a) {
    var style = _a.style, isLast = _a.isLast, isEditable = _a.isEditable, index = _a.index, name = _a.name, 
    //calculator,
    defaultVal = _a.defaultVal, min = _a.min, max = _a.max;
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), previousDataRange = _b.previousDataRange, currentDataRange = _b.currentDataRange, setCurrentSolverDataByIndex = _b.setCurrentSolverDataByIndex, currentSolverData = _b.currentSolverData, currentAnimCalculator = _b.currentAnimCalculator, previousSolverData = _b.previousSolverData;
    var _c = react_1.useContext(GraphUpdateContext_1.GraphUpdateContext), setGraphShouldUpdate = _c.setGraphShouldUpdate, triggredIndex = _c.triggredIndex, setTriggeredIndex = _c.setTriggeredIndex;
    var _d = react_i18next_1.useTranslation(), t = _d.t, i18n = _d.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _e = react_1.useState(defaultVal), rangeValue = _e[0], setRangeValue = _e[1];
    // TODO
    //(previousSolverData[index] === undefined)?0:previousSolverData[index] -> current
    // 0 -> default
    // prev range
    // console.log('ISSUE HERE')
    // console.log(currentSolverData)
    console.log('============= Input Tree ============');
    console.log('prev SolvData  ---- ' + previousSolverData);
    console.log('curr SolvData ----' + currentSolverData);
    console.log('prev DataRange  ---- ' + previousDataRange);
    console.log('curr DataRange ----' + currentDataRange);
    console.log('============= Input Tree ============');
    var _f = react_1.useState((previousSolverData[index] === undefined) ? 0 : previousSolverData[index]), previousRangeValue = _f[0], setPreviousRangeValue = _f[1];
    var _g = react_1.useState((currentSolverData[index] === undefined) ? 0 : currentSolverData[index]), targetRangeValue = _g[0], setTargetRangeValue = _g[1];
    var _h = react_1.useState(false), isRangeAnimTriggered = _h[0], setRangeAnimTriggered = _h[1];
    var _j = react_1.useState(defaultVal), textValue = _j[0], setTextValue = _j[1];
    var _k = react_1.useState(defaultVal), textPreviousValue = _k[0], setTextPreviousValue = _k[1];
    var _l = react_1.useState(true), isTextBlurred = _l[0], setTextBlur = _l[1];
    //console.log('input tree rerender')
    react_1.useEffect(function () {
        setTriggeredIndex(-1);
    }, []);
    //console.log('rerender')
    // 2 Group Control -> 4 Time Spring
    var sliderProgress = react_spring_1.useSpring({
        from: { sliderProgress: previousRangeValue },
        to: { sliderProgress: isRangeAnimTriggered ? targetRangeValue : previousRangeValue },
        config: animation_json_1["default"].slider_drag,
        onFrame: function () {
            var value = sliderProgress.value.toFixed(2);
            setRangeValue(Math.min(max, Math.max(Number(value), min)));
            //console.log('trigger')
            //console.log(index)
            if (triggredIndex === index) {
                setCurrentSolverDataByIndex(Math.min(max, Math.max(Number(value), min)), index);
                var fps_60 = Math.round((new Date().getTime() - sliderProgress.startTime) / 16);
                //if(currentAnimCalculator != 'CubicBezierCalculator'){
                if (fps_60 % 2 == 0) {
                    setGraphShouldUpdate(false);
                    //console.log('odd' + fps_60);
                }
                else {
                    setGraphShouldUpdate(true);
                    //console.log('even' + fps_60);
                }
                //}
            }
            //console.log('input setting!')
        },
        onRest: function () {
            setPreviousRangeValue(rangeValue);
            setRangeAnimTriggered(false);
        }
    }).sliderProgress;
    var handleRangeChange = function (e) {
        setPreviousRangeValue(rangeValue);
        setTargetRangeValue(Math.min(max, Math.max(e.target.value, min)));
        setTriggeredIndex(index);
        setRangeAnimTriggered(true);
        //if(currentAnimCalculator != 'CubicBezierCalculator'){
        setGraphShouldUpdate(true);
        //}
        //console.log('rangeChange')
        //update text
        setTextValue(Math.min(max, Math.max(e.target.value, min)));
    };
    var handleTextChange = function (e) {
        // . 0~9
        var lmtVal = e.target.value.replace(/[^\?\d.]/g, '');
        // Hold the CharaPostion
        var target = e.target;
        var position = target.selectionStart; // Capture initial position
        var shouldFoward = (lmtVal === target.value);
        console.log(target.selectionEnd);
        // only 1 . in Input Area
        if ((lmtVal.split(".").length - 1) > 1) {
            lmtVal = textPreviousValue;
            shouldFoward = false;
        }
        else {
        }
        setPreviousRangeValue(rangeValue);
        setTargetRangeValue(Math.min(max, Math.max(Number(lmtVal), min)));
        setTriggeredIndex(index);
        setRangeAnimTriggered(true);
        setGraphShouldUpdate(true);
        //console.log('textChange')
        setTextBlur(false);
        setTextValue(lmtVal);
        setTextPreviousValue(lmtVal);
        target.value = lmtVal.replace(/\s/g, ''); // This triggers the cursor to move.
        target.selectionEnd = shouldFoward ? position : position - 1;
    };
    var handleTextBlur = function (e) {
        setTextBlur(true);
        setTextValue(Math.min(max, Math.max(e.target.value, min)));
    };
    var handleTextFocus = function (e) {
        setTextBlur(false);
    };
    return (react_1["default"].createElement(Frame, null,
        react_1["default"].createElement(InputContainer, { isLast: isLast },
            react_1["default"].createElement(DescText_1["default"], { style: {
                    width: '66px',
                    lineHeight: '16px'
                } }, name),
            react_1["default"].createElement(TextInput_1["default"], { value: textValue, 
                // min={min} 
                // max={max} 
                isEditable: isEditable, step: 0.01, onChange: function (e) {
                    e.preventDefault();
                    isEditable ? handleTextChange(e) : '';
                }, onKeyUp: function (e) {
                    // PressEnter
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        isEditable ? handleTextBlur(e) : '';
                    }
                }, onBlur: function (e) {
                    // Out of Focus
                    e.preventDefault();
                    isEditable ? handleTextBlur(e) : '';
                }, onFocus: function (e) {
                    // Out of Focus
                    e.preventDefault();
                    isEditable ? handleTextFocus(e) : '';
                } }),
            react_1["default"].createElement(RangeInput_1["default"], { style: {
                    marginLeft: '12px'
                }, value: rangeValue, isEditable: isEditable, min: min, max: max, step: 0.01, onChange: function (e) {
                    isEditable ? handleRangeChange(e) : '';
                } }))));
});
exports["default"] = InputTree;
// Styles
var InputContainer = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  max-width: 450px;\n  margin: 0 auto;\n  padding-left: 28px;\n  padding-right: 28px;\n  height: 16px;\n  display: flex;\n  flex-direction: row;\n  margin-bottom:  ", ";\n"], ["\n  width: 100%;\n  max-width: 450px;\n  margin: 0 auto;\n  padding-left: 28px;\n  padding-right: 28px;\n  height: 16px;\n  display: flex;\n  flex-direction: row;\n  margin-bottom:  ", ";\n"])), function (p) { return p.isLast ? '0px' : '24px'; });
var Frame = styled_1["default"]('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  padding: 1px 0px 1px 0px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n  color:  ", ";\n  fill: ", ";\n"], ["\n  position: relative;\n  padding: 1px 0px 1px 0px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n  color:  ", ";\n  fill: ", ";\n"])), function (p) { return p.theme.colors.text; }, function (p) { return p.theme.colors.text; });
var templateObject_1, templateObject_2;
