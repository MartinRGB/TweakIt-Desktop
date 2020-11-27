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
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var Solver_1 = require("@Components/Solver");
var SVGUtil_1 = require("@Components/SVG/SVGUtil");
var SVGGraph = function (_a) {
    var pathStyle = _a.pathStyle, svgStyle = _a.svgStyle, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, svgPointNumber = _a.svgPointNumber, svgPointScale = _a.svgPointScale, isVisable = _a.isVisable, svgData = _a.svgData, isError = _a.isError, viewBoxHFixed = _a.viewBoxHFixed, viewBoxWFixed = _a.viewBoxWFixed, extendLineScale = _a.extendLineScale;
    react_1.useContext(GraphUpdateContext_1.GraphUpdateContext);
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), selectTransition = _b.selectTransition, currentAnimName = _b.currentAnimName, currentAnimCalculator = _b.currentAnimCalculator, currentSolverData = _b.currentSolverData;
    Solver_1["default"].setCalculatorSamplePointNumber(svgPointNumber ? svgPointNumber : 50);
    Solver_1["default"].setCalculatorSampleScale(svgPointScale ? svgPointScale : 3);
    var currStepData = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimName, currentSolverData).getStepArray();
    var currValueData = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimName, currentSolverData).getValueArray();
    var mIsError = !currValueData[0];
    var mSVGData;
    if (selectTransition) {
        mSVGData = "M0,240";
    }
    else {
        mSVGData = mIsError ? "M0,0" : SVGUtil_1.SVGTemplate_50(currStepData, currValueData, svgWidth, svgHeight, 1.);
    }
    // ############ Try Smooth Pathline ############
    // const { selectTransitionProgress } = useSpring({
    //   from:{selectTransitionProgress:0},
    //   to:{selectTransitionProgress:1},
    //   config: animationConfig.graph_trasition,
    //   onFrame: () =>{
    //     var value = selectTransitionProgress.value.toFixed(2);
    //   },
    //   onRest: () => {
    //     //console.log('bezier stop')
    //   }
    // })
    // var finalPointsObj = [new PointObject(0,0)];
    // for(let i=0;i<stepData.length;i++){
    //   //if(i%2 == 0){
    //     finalPointsObj.push(new PointObject(stepData[i]*svgWidth,valueData[i]*svgWidth))
    //   //}
    // }
    // finalPointsObj.push(new PointObject(svgWidth,svgWidth))
    // const viewBoxWFixed = svgWidth*0.5;
    // const viewBoxHFixed = svgHeight*0.5;
    //console.log(finalPointsObj)
    { /* <svg
        width={svgWidth}
        height={svgHeight}
        viewBox ={`0 0 ${svgWidth*1 + viewBoxWFixed} ${svgHeight + viewBoxHFixed}`}
        style={{
          position:`absolute`,
          height:`500px`,

          top:`0`,
          left:`0`
        }}>
        <g
          style={{
            transform:`translate3d(${svgWidth/2 - svgWidth/2*svgScale + viewBoxWFixed/2}px,${svgHeight - (svgHeight/2- svgHeight/2*svgScale) + viewBoxHFixed/2}px,0) scale3d(${1},-${1},1)`
          }}>
        <PathLine
            points={finalPointsObj}
            stroke="red"
            strokeWidth={svgStrokeWidth*0.75}
            fill="none"
            r={3}
            />
        </g>
    </svg> */
    }
    //console.log("canvas re render")
    return (react_1["default"].createElement(CustomSVG, { width: svgWidth, height: svgHeight, style: __assign(__assign({}, svgStyle), { 
            // width:`${svgWidth}`,
            height: "" + svgHeight }), viewBox: "0 0 " + (svgWidth * 1 + viewBoxWFixed) + " " + (svgHeight + viewBoxHFixed) },
        react_1["default"].createElement(CustomGraphG, { style: __assign(__assign({}, pathStyle), { transform: "translate3d(" + (svgWidth / 2 - svgWidth / 2 * svgScale + viewBoxWFixed / 2) + "px," + (svgHeight - (svgHeight / 2 - svgHeight / 2 * svgScale) + viewBoxHFixed / 2) + "px,0) scale3d(" + svgScale + ",-" + svgScale + ",1)" }) },
            react_1["default"].createElement(CustomErrorBG, { isError: mIsError, x: "0", y: "0", width: svgWidth, height: svgHeight }),
            react_1["default"].createElement(CustomPath, { strokeWidth: svgStrokeWidth, d: mSVGData }))));
};
var CustomSVG = styled_1["default"].svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n// width: 400px;\n// height: 400px;\n// position: absolute;\n// left: 50%;\n// transform: translate3d(-50%, 50%, 0px);\n  // margin:12px auto;\n  min-height: 160px;\n  display: block;\n\n"], ["\n// width: 400px;\n// height: 400px;\n// position: absolute;\n// left: 50%;\n// transform: translate3d(-50%, 50%, 0px);\n  // margin:12px auto;\n  min-height: 160px;\n  display: block;\n\n"])));
var CustomGraphG = styled_1["default"].g(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  stroke:", ";\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  fill:none;\n"], ["\n  position: relative;\n  stroke:", ";\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  fill:none;\n"])), function (p) { return p.theme.colors.primary; });
var CustomErrorBG = styled_1["default"].rect(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  fill:", ";\n  opacity:0.15;\n"], ["\n  position: relative;\n  fill:", ";\n  opacity:0.15;\n"])), function (p) { return p.isError ? 'red' : p.theme.colors.text_input_bg; });
var CustomPath = styled_1["default"].path(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n"], ["\n"])));
exports["default"] = SVGGraph;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
