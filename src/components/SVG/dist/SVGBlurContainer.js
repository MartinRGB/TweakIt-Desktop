"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var ListSelectStateContext_1 = require("@Context/ListSelectStateContext");
var SVGBlurContainer = function (_a) {
    var pathStyle = _a.pathStyle, svgStyle = _a.svgStyle, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, svgPointNumber = _a.svgPointNumber, svgPointScale = _a.svgPointScale, isVisable = _a.isVisable, svgData = _a.svgData, isError = _a.isError, viewBoxWFixed = _a.viewBoxWFixed, viewBoxHFixed = _a.viewBoxHFixed, extendLineScale = _a.extendLineScale;
    react_1.useContext(ListSelectStateContext_1.ListSelectStateContext);
    var selectTransition = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext).selectTransition;
    // const [animValue,setAnimValue] = useState<number>(0);
    // var t = 0;
    // if(selectTransition){
    //   var animInterval = setInterval(()=>{
    //     t += 1;
    //     if(t >= 60){
    //       setAnimValue(0);
    //       clearInterval(animInterval)
    //     }
    //     else{
    //       setAnimValue(t/60)
    //     }
    //   } ,5)
    // }
    return (react_1["default"].createElement(Container, { style: {
            height: svgHeight + "px"
        } },
        react_1["default"].createElement(BlurDiv, { style: {
                backdropFilter: "" + (selectTransition ? "blur(3px)" : 'blur(0px)'),
                zIndex: "" + (selectTransition ? "0" : '-10px')
            } })));
};
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width:100%;\n    transform: translate3d(-50%, -50%, 0px) scale3d(0.95, 1.5, 1);\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    pointer-events:none;\n"], ["\n    width:100%;\n    transform: translate3d(-50%, -50%, 0px) scale3d(0.95, 1.5, 1);\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    pointer-events:none;\n"])));
var BlurDiv = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    background: ", ";\n    transition: all 0.5s cubic-bezier(0, 0, 0, 1.0)\n"], ["\n    width: 100%;\n    height: 100%;\n    background: ", ";\n    transition: all 0.5s cubic-bezier(0, 0, 0, 1.0)\n"])), function (p) { return p.theme.colors.main_top_bg_blur; });
exports["default"] = SVGBlurContainer;
var templateObject_1, templateObject_2;
