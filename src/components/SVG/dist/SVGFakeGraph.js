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
var styled_1 = require("@emotion/styled");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var Solver_1 = require("@Components/Solver");
var SVGUtil_1 = require("@Components/SVG/SVGUtil");
var ListSelectStateContext_1 = require("@Context/ListSelectStateContext");
var SVGFakeGraph = function (_a) {
    var pathStyle = _a.pathStyle, svgStyle = _a.svgStyle, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, svgPointNumber = _a.svgPointNumber, svgPointScale = _a.svgPointScale, isVisable = _a.isVisable, svgData = _a.svgData, isError = _a.isError, viewBoxWFixed = _a.viewBoxWFixed, viewBoxHFixed = _a.viewBoxHFixed, extendLineScale = _a.extendLineScale;
    react_1.useContext(ListSelectStateContext_1.ListSelectStateContext);
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), currentAnimPlatform = _b.currentAnimPlatform, previousAnimPlatform = _b.previousAnimPlatform, currentAnimName = _b.currentAnimName, currentAnimCalculator = _b.currentAnimCalculator, currentSolverData = _b.currentSolverData, previousAnimName = _b.previousAnimName, previousAnimCalculator = _b.previousAnimCalculator, previousSolverData = _b.previousSolverData, selectTransition = _b.selectTransition, setSelectTransition = _b.setSelectTransition;
    Solver_1["default"].setCalculatorSamplePointNumber(svgPointNumber ? svgPointNumber : 50);
    Solver_1["default"].setCalculatorSampleScale(svgPointScale ? svgPointScale : 3);
    var currStepData = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData).getStepArray();
    var currValueData = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData).getValueArray();
    var mSVGData;
    var t = 0;
    if (selectTransition) {
        var prevStepData_1 = Solver_1["default"].CreateSolverByString(previousAnimCalculator, previousAnimPlatform, previousAnimName, previousSolverData).getStepArray();
        var prevValueData_1 = Solver_1["default"].CreateSolverByString(previousAnimCalculator, previousAnimPlatform, previousAnimName, previousSolverData).getValueArray();
        var springValueData_1 = new Solver_1["default"].Android.Spring(800, 0.5, 0).getValueArray();
        var animInterval = setInterval(function () {
            var _a, _b;
            t += 1;
            if (t >= currValueData.length) {
                setSelectTransition(false);
                mSVGData = "M0,0";
                (_a = document.getElementById('pathEl')) === null || _a === void 0 ? void 0 : _a.setAttribute('d', mSVGData);
                clearInterval(animInterval);
            }
            else {
                mSVGData = SVGUtil_1.SVGTransitionTemplate_50(prevStepData_1, prevValueData_1, currStepData, currValueData, svgWidth, svgHeight, springValueData_1[t]);
                (_b = document.getElementById('pathEl')) === null || _b === void 0 ? void 0 : _b.setAttribute('d', mSVGData);
            }
        }, 10);
    }
    return (react_1["default"].createElement(CustomSVG, { width: svgWidth, height: svgHeight, style: __assign(__assign({}, svgStyle), { 
            // width:`${svgWidth}`,
            height: "" + svgHeight }), viewBox: "0 0 " + (svgWidth * 1 + viewBoxWFixed) + " " + (svgHeight + viewBoxHFixed) },
        react_1["default"].createElement(CustomGraphG, { style: __assign(__assign({}, pathStyle), { transform: "translate3d(" + (svgWidth / 2 - svgWidth / 2 * svgScale + viewBoxWFixed / 2) + "px," + (svgHeight - (svgHeight / 2 - svgHeight / 2 * svgScale) + viewBoxHFixed / 2) + "px,0) scale3d(" + svgScale + ",-" + svgScale + ",1)" }) },
            react_1["default"].createElement(CustomPath, { id: "pathEl", d: "M0,0", strokeWidth: svgStrokeWidth }))));
};
var CustomSVG = styled_1["default"].svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n// width: 400px;\n// height: 400px;\n// position: absolute;\n// left: 50%;\n// transform: translate3d(-50%, 50%, 0px);\n  // margin:12px auto;\n  min-height: 160px;\n  display: block;\n\n"], ["\n// width: 400px;\n// height: 400px;\n// position: absolute;\n// left: 50%;\n// transform: translate3d(-50%, 50%, 0px);\n  // margin:12px auto;\n  min-height: 160px;\n  display: block;\n\n"])));
var CustomGraphG = styled_1["default"].g(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  stroke:", ";\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  fill:none;\n"], ["\n  position: relative;\n  stroke:", ";\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  fill:none;\n"])), function (p) { return p.theme.colors.primary; });
var CustomPath = styled_1["default"].path(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n"], ["\n"])));
exports["default"] = SVGFakeGraph;
var templateObject_1, templateObject_2, templateObject_3;
