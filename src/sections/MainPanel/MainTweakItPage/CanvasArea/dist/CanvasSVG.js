"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var SVGGraph_1 = require("@Components/SVG/SVGGraph");
var SVGBackground_1 = require("@Components/SVG/SVGBackground");
var SVGFakeGraph_1 = require("@Components/SVG/SVGFakeGraph");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var BezierInputTree_1 = require("./BezierInputTree");
var CanvasSVG = function (_a) {
    var isLayoutRow = _a.isLayoutRow, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, svgPointNumber = _a.svgPointNumber, svgPointScale = _a.svgPointScale, viewBoxHFixed = _a.viewBoxHFixed, viewBoxWFixed = _a.viewBoxWFixed, extendLineScale = _a.extendLineScale, children = _a.children;
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), currentAnimName = _b.currentAnimName, currentSolverData = _b.currentSolverData, currentAnimData = _b.currentAnimData, currentAnimCalculator = _b.currentAnimCalculator;
    var isBezierCalculator = (currentAnimCalculator === 'CubicBezierCalculator');
    // console.log(typeof(currentAnimData[0]))
    // Object.entries(currentAnimData).map(function (data:any,index:number) {
    //   //setCurrentSolverDataByIndex(data[1].default,index)
    //   console.log(data[1][1].editable)
    // })
    return (react_1["default"].createElement(Container, { isLayoutRow: isLayoutRow, svgHeight: svgHeight, style: {
            width: "100%"
        } },
        react_1["default"].createElement(SVGBackground_1["default"], { svgWidth: svgWidth, svgHeight: svgHeight, svgScale: svgScale, svgStrokeWidth: svgStrokeWidth, svgPointNumber: svgPointNumber, svgPointScale: svgPointScale, viewBoxHFixed: viewBoxHFixed, viewBoxWFixed: viewBoxWFixed, extendLineScale: extendLineScale, svgStyle: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate3d(-50%, -50%, 0px)"
            } }),
        react_1["default"].createElement(SVGGraph_1["default"], { svgWidth: svgWidth, svgHeight: svgHeight, svgScale: svgScale, svgStrokeWidth: svgStrokeWidth, svgPointNumber: svgPointNumber, svgPointScale: svgPointScale, viewBoxHFixed: viewBoxHFixed, viewBoxWFixed: viewBoxWFixed, extendLineScale: extendLineScale, svgStyle: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate3d(-50%, -50%, 0px)"
            } }),
        react_1["default"].createElement(SVGFakeGraph_1["default"], { svgWidth: svgWidth, svgHeight: svgHeight, svgScale: svgScale, svgStrokeWidth: svgStrokeWidth, svgPointNumber: svgPointNumber, svgPointScale: svgPointScale, viewBoxHFixed: viewBoxHFixed, viewBoxWFixed: viewBoxWFixed, extendLineScale: extendLineScale, svgStyle: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate3d(-50%, -50%, 0px)"
            } }),
        (isBezierCalculator) ? (currentAnimData.map(function (data, index) {
            if (index === currentAnimData.length - 2) {
                var p1 = currentAnimData[0];
                var p2 = currentAnimData[1];
                var p3 = currentAnimData[2];
                var p4 = currentAnimData[3];
                return (react_1["default"].createElement(BezierInputTree_1["default"], { name: '', index: (index), isLast: false, defaultVal: [currentSolverData[0], currentSolverData[1], currentSolverData[2], currentSolverData[3]], isEditable: p1[1].editable, min: data[1].min, max: data[1].max, key: currentAnimName + index, svgWidth: svgWidth, svgHeight: svgHeight, svgScale: svgScale, svgStrokeWidth: svgStrokeWidth, viewBoxHFixed: viewBoxHFixed, viewBoxWFixed: viewBoxWFixed, style: {
                        width: "100%",
                        height: svgHeight + "px",
                        margin: "0 atuo",
                        position: "relative",
                        marginBottom: " 0px"
                    } }));
            }
        })) : ''));
};
exports["default"] = CanvasSVG;
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display:block;\n  height: ", "px;\n  position: ", ";\n  left: ", ";\n  top: ", ";\n  transform: ", ";\n"], ["\n  display:block;\n  height: ", "px;\n  position: ", ";\n  left: ", ";\n  top: ", ";\n  transform: ", ";\n"])), function (p) { return p.svgHeight; }, function (p) { return p.isLayoutRow ? 'absolute' : 'relative'; }, function (p) { return p.isLayoutRow ? '50%' : '0'; }, function (p) { return p.isLayoutRow ? '50%' : '0'; }, function (p) { return p.isLayoutRow ? 'translate3d(-50%, -50%, 0px)' : 'translate3d(0, 0, 0px)'; });
var templateObject_1;
