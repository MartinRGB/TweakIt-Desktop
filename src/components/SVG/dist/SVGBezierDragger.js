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
var react_spring_1 = require("react-spring");
// import * as Icons from './ListIcon'
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
require("@Context/i18nContext");
var animation_json_1 = require("@Config/animation.json");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var SVGBezierDragger = function (_a) {
    var style = _a.style, 
    //isEditable,
    svgHeight = _a.svgHeight, svgWidth = _a.svgWidth, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, viewBoxWFixed = _a.viewBoxWFixed, isBezier = _a.isBezier, viewBoxHFixed = _a.viewBoxHFixed;
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), currentAnimData = _b.currentAnimData, selectTransition = _b.selectTransition, currentAnimName = _b.currentAnimName, currentAnimCalculator = _b.currentAnimCalculator, currentSolverData = _b.currentSolverData, previousAnimName = _b.previousAnimName, previousAnimCalculator = _b.previousAnimCalculator, previousSolverData = _b.previousSolverData;
    var colorMode = theme_ui_1.useColorMode()[0];
    var boxWidth = svgWidth * (svgWidth / (svgWidth + viewBoxWFixed)) * svgScale;
    var boxHeight = svgHeight * (svgHeight / (svgHeight + viewBoxHFixed)) * svgScale;
    var boxPadding = 40;
    var _c = react_1.useState(0), transitionScale = _c[0], setTransitionScale = _c[1];
    var transInProgress = react_spring_1.useSpring({
        transInProgress: selectTransition ? 0 : 1,
        config: animation_json_1["default"].bezier_dragger,
        onFrame: function () {
            setTransitionScale(transInProgress.value);
        }
    }).transInProgress;
    return isBezier ? (react_1["default"].createElement(DragContainer, { canShow: !selectTransition, style: __assign({ width: boxWidth + "px", height: boxHeight + "px" }, style) },
        react_1["default"].createElement("svg", { width: boxWidth + boxPadding, height: boxHeight + boxPadding, style: {
                transform: "translate3d(" + -boxPadding / 2 + "px," + -boxPadding / 2 + "px,0) scale3d(1,-1,1)"
            } },
            react_1["default"].createElement("g", null,
                react_1["default"].createElement(CustomBorderline, { x1: boxPadding / 2, y1: boxPadding / 2, x2: boxWidth * currentSolverData[0] * transitionScale + boxPadding / 2, y2: boxHeight * currentSolverData[1] * transitionScale + boxPadding / 2, strokeWidth: svgStrokeWidth / 2 * transitionScale }),
                react_1["default"].createElement(CustomBorderline, { x1: boxWidth * (1 - transitionScale) + boxWidth * currentSolverData[2] * transitionScale + boxPadding / 2, y1: boxHeight * (1 - transitionScale) + boxHeight * currentSolverData[3] * transitionScale + boxPadding / 2, x2: boxWidth + boxPadding / 2, y2: boxHeight + boxPadding / 2, strokeWidth: svgStrokeWidth / 2 * transitionScale }))))) : '';
    //isBezier?
    //:''
};
exports["default"] = SVGBezierDragger;
// Styles
var DragContainer = styled_1["default"]('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background:transparent;\n  display:", ";\n  // opacity:0.15\n"], ["\n  background:transparent;\n  display:", ";\n  // opacity:0.15\n"])), function (p) { return p.canShow ? 'block' : 'none'; });
var CustomBorderline = styled_1["default"].line(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  //stroke:", ";\n  stroke:red;\n"], ["\n  position: relative;\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  //stroke:", ";\n  stroke:red;\n"])), function (p) { return p.theme.colors.adb_border; });
var CustomCircle = styled_1["default"].circle(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  //stroke:", ";\n  fill:red;\n"], ["\n  position: relative;\n  //stroke:", ";\n  fill:red;\n"])), function (p) { return p.theme.colors.adb_border; });
var templateObject_1, templateObject_2, templateObject_3;
