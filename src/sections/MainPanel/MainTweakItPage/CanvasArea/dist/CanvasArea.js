"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var InputTree_1 = require("./InputTree");
var SVGGraph_1 = require("@Components/SVGGraph");
var Solver_1 = require("@Components/Solver");
var SVGUtil_1 = require("@Components/SVGGraph/SVGUtil");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var PointObject = /** @class */ (function () {
    function PointObject(x, y) {
        this.x = x;
        this.y = y;
    }
    return PointObject;
}());
var CanvasArea = function (_a) {
    var children = _a.children;
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), currentAnimName = _b.currentAnimName, currentAnimCalculator = _b.currentAnimCalculator, currentAnimData = _b.currentAnimData, currentSolverData = _b.currentSolverData;
    var _c = react_1.useContext(GraphUpdateContext_1.GraphUpdateContext), shouldGraphUpdate = _c.shouldGraphUpdate, setGraphShouldUpdate = _c.setGraphShouldUpdate;
    var svgWidth = 240;
    var svgHeight = 240;
    var svgScale = 0.75;
    var svgStrokeWidth = 3;
    var svgPointNumber = 50;
    var svgPointScale = 3;
    Solver_1["default"].setCalculatorSamplePointNumber(svgPointNumber);
    Solver_1["default"].setCalculatorSampleScale(svgPointScale);
    var stepData = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimName, currentSolverData).getStepArray();
    var valueData = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimName, currentSolverData).getValueArray();
    // ############ Reszie ############
    var sizeRef = react_1.useRef(null);
    var _d = react_1.useState(false), isLayoutRow = _d[0], setIsLayoutRow = _d[1];
    function updateSize() {
        var height = sizeRef.current.offsetHeight;
        var width = sizeRef.current.offsetWidth;
        if (width >= 680) {
            setIsLayoutRow(true);
        }
        else {
            setIsLayoutRow(false);
        }
    }
    react_1.useLayoutEffect(function () {
        updateSize();
        window.addEventListener("resize", updateSize);
        return function () {
            return window.removeEventListener("resize", updateSize);
        };
    }, []);
    react_1.useEffect(function () {
        if (sizeRef.current) {
            updateSize();
        }
    }, [sizeRef]);
    // ############ Try Smooth Pathline ############
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
    return (react_1["default"].createElement(Container, { ref: sizeRef, isLayoutRow: isLayoutRow },
        react_1["default"].createElement(GraphContainer, { isLayoutRow: isLayoutRow },
            react_1["default"].createElement(AnimationTitle, null, currentAnimName ?
                react_1["default"].createElement(react_i18next_1.Trans, null, currentAnimName) :
                react_1["default"].createElement(react_i18next_1.Trans, null, "select_an_animator")),
            react_1["default"].createElement(SVGGraph_1["default"], { svgWidth: svgWidth, svgHeight: svgHeight, svgScale: svgScale, svgStrokeWidth: svgStrokeWidth, svgPointNumber: svgPointNumber, svgPointScale: svgPointScale, 
                // ########### Performance Issue here ###########
                isError: !valueData[0], 
                // currentAnimCalculator={currentAnimCalculator}
                // currentAnimName={currentAnimName}
                // currentSolverData={currentSolverData}
                svgData: SVGUtil_1.SVGTemplate_50(stepData, valueData, svgWidth, svgHeight, 1.), svgStyle: {
                    height: !isLayoutRow ? "" + svgHeight : "100%",
                    margin: !isLayoutRow ? "12px auto" : "0px auto%",
                    position: !isLayoutRow ? "relative" : "absolute",
                    left: !isLayoutRow ? "0" : "50%",
                    top: !isLayoutRow ? "0" : "50%",
                    transform: !isLayoutRow ? "translate3d(0, 0, 0px)" : "translate3d(-50%, -50%, 0px)"
                } })),
        react_1["default"].createElement(InputContainer, { isLayoutRow: isLayoutRow }, currentAnimName ?
            currentAnimData.map(function (data, index) {
                return (react_1["default"].createElement(InputTree_1["default"], { name: data[0], index: index, isLast: index === (currentAnimData.length - 1), defaultVal: data[1]["default"], min: data[1].min, max: data[1].max, key: currentAnimName + index }));
            }) : react_1["default"].createElement(InputTree_1["default"], { name: 'property', index: 0, isLast: true, defaultVal: 0.5, min: 0, max: 1, key: 'input_placeholder' }))));
};
exports["default"] = CanvasArea;
var AnimationTitle = styled_1["default"].p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align:center;\n  opacity:0.5;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 21px;\n  padding-top:24px;\n  color:", ";\n"], ["\n  text-align:center;\n  opacity:0.5;\n  font-family: Montserrat;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 21px;\n  padding-top:24px;\n  color:", ";\n"])), function (p) { return p.theme.colors.text; });
var GraphContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 2;\n  height:100%;\n  position:relative;\n  box-shadow: ", "\n  \n"], ["\n  flex: 2;\n  height:100%;\n  position:relative;\n  box-shadow: ", "\n  \n"])), function (p) { return p.isLayoutRow ? "1px 0px 0px " + p.theme.colors.adb_border + ",-1px 0px 0px " + p.theme.colors.adb_border : 'none'; });
var Container = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    height: 100%;\n    background:", ";\n    display: flex;\n    //padding:24px 0px;\n    position: relative;\n    flex-direction: ", ";\n    align-items:", ";\n    flex:2;\n    min-width:250px;\n    // max-width:680px;\n    z-index:1;\n    box-shadow: 1px 0px 0px ", ",-1px 0px 0px ", ";\n"], ["\n    height: 100%;\n    background:", ";\n    display: flex;\n    //padding:24px 0px;\n    position: relative;\n    flex-direction: ", ";\n    align-items:", ";\n    flex:2;\n    min-width:250px;\n    // max-width:680px;\n    z-index:1;\n    box-shadow: 1px 0px 0px ", ",-1px 0px 0px ", ";\n"])), function (p) { return p.theme.colors.main_top_bg; }, function (p) { return p.isLayoutRow ? 'row' : 'column'; }, function (p) { return p.isLayoutRow ? 'center' : 'initial'; }, function (p) { return p.theme.colors.adb_border; }, function (p) { return p.theme.colors.adb_border; });
var InputContainer = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex: 3;\n  padding: 0 ", ";\n"], ["\n  flex: 3;\n  padding: 0 ", ";\n"])), function (p) { return p.isLayoutRow ? '24px' : '0'; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
