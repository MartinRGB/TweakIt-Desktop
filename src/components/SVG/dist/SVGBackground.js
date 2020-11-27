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
var SVGBackground = function (_a) {
    var pathStyle = _a.pathStyle, svgStyle = _a.svgStyle, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, svgPointNumber = _a.svgPointNumber, svgPointScale = _a.svgPointScale, 
    // svgData,
    isError = _a.isError, viewBoxHFixed = _a.viewBoxHFixed, viewBoxWFixed = _a.viewBoxWFixed, extendLineScale = _a.extendLineScale;
    // const viewBoxWFixed = svgWidth*0.5;
    // const viewBoxHFixed = svgHeight*0.5;
    // const extendLineScale = 1.25
    var mIsError = isError ? isError : false;
    //console.log("canvas background re render")
    return (react_1["default"].createElement(CustomSVG, { width: svgWidth, height: svgHeight, style: __assign(__assign({}, svgStyle), { 
            // width:`${svgWidth}`,
            height: "" + svgHeight }), viewBox: "0 0 " + (svgWidth * 1 + viewBoxWFixed) + " " + (svgHeight + viewBoxHFixed) },
        react_1["default"].createElement("g", { style: {
                transform: "translate3d(" + (svgWidth / 2 - svgWidth / 2 * svgScale + viewBoxWFixed / 2) + "px," + (svgHeight - (svgHeight / 2 - svgHeight / 2 * svgScale) + viewBoxHFixed / 2) + "px,0) scale3d(" + svgScale + ",-" + svgScale + ",1)"
            } },
            react_1["default"].createElement(CustomBGRect, { isError: mIsError, x: "0", y: "0", width: svgWidth, height: svgHeight, style: {
                    opacity: "0.15"
                } }),
            react_1["default"].createElement(CustomBorderline, { x1: -viewBoxWFixed / 4 * extendLineScale, y1: svgHeight, x2: svgWidth + viewBoxWFixed / 4 * extendLineScale, y2: svgHeight, strokeWidth: svgStrokeWidth / 2 }),
            react_1["default"].createElement(CustomBorderline, { x1: -viewBoxWFixed / 4 * extendLineScale, y1: '0', x2: svgWidth + viewBoxWFixed / 4 * extendLineScale, y2: '0', strokeWidth: svgStrokeWidth / 2 }),
            react_1["default"].createElement(CustomBorderline, { x1: '0', y1: -viewBoxHFixed / 4 * extendLineScale, x2: '0', y2: svgHeight + viewBoxHFixed / 4 * extendLineScale, strokeWidth: svgStrokeWidth / 2 }),
            react_1["default"].createElement(CustomBorderline, { x1: svgWidth, y1: -viewBoxHFixed / 4 * extendLineScale, x2: svgWidth, y2: svgHeight + viewBoxHFixed / 4 * extendLineScale, strokeWidth: svgStrokeWidth / 2 }))));
};
var CustomSVG = styled_1["default"].svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n// width: 400px;\n// height: 400px;\n// position: absolute;\n// left: 50%;\n// transform: translate3d(-50%, 50%, 0px);\n  // margin:12px auto;\n  min-height: 160px;\n  display: block;\n\n"], ["\n// width: 400px;\n// height: 400px;\n// position: absolute;\n// left: 50%;\n// transform: translate3d(-50%, 50%, 0px);\n  // margin:12px auto;\n  min-height: 160px;\n  display: block;\n\n"])));
var CustomGraphG = styled_1["default"].g(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  stroke:", ";\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  fill:none;\n"], ["\n  position: relative;\n  stroke:", ";\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  fill:none;\n"])), function (p) { return p.theme.colors.primary; });
var CustomBGRect = styled_1["default"].rect(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  fill:", ";\n  //opacity:0.15;\n"], ["\n  position: relative;\n  fill:", ";\n  //opacity:0.15;\n"])), function (p) { return p.isError ? 'red' : p.theme.colors.text_input_bg; });
var CustomBorderline = styled_1["default"].line(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  stroke:", ";\n"], ["\n  position: relative;\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  stroke:", ";\n"])), function (p) { return p.theme.colors.adb_border; });
exports["default"] = SVGBackground;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
