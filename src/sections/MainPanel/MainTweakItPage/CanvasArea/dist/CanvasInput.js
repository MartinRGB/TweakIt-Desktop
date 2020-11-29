"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("@Context/i18nContext");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var InputTree_1 = require("./InputTree");
var init_state_json_1 = require("@Config/init_state.json");
var CanvasInput = function (_a) {
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), currentAnimName = _b.currentAnimName, currentSolverData = _b.currentSolverData, currentAnimData = _b.currentAnimData, currentAnimCalculator = _b.currentAnimCalculator;
    var isBezierCalculator = (currentAnimCalculator === 'CubicBezierCalculator');
    return (react_1["default"].createElement("div", null, (currentAnimName != init_state_json_1["default"].initAnimName) ? (isBezierCalculator ?
        currentAnimData.map(function (data, index) {
            if (index === currentAnimData.length - 1) {
                return (react_1["default"].createElement(InputTree_1["default"], { name: data[0], calculator: '', index: index, isLast: true, defaultVal: data[1]["default"], isEditable: data[1].editable, min: data[1].min, max: data[1].max, key: currentAnimName + 'duration' }));
            }
            else if (index === currentAnimData.length - 2) {
                // var p1:any = currentAnimData[0];
                // var p2:any = currentAnimData[1];
                // var p3:any = currentAnimData[2];
                // var p4:any = currentAnimData[3];
                // return (
                // <BezierInputTree 
                //   name={'P1~P4'}
                //   index={(index)}
                //   isLast={false}
                //   defaultVal={[currentSolverData[0],currentSolverData[1],currentSolverData[2],currentSolverData[3]]}
                //   isEditable={p1[1].editable}
                //   min={data[1].min}
                //   max={data[1].max}
                //   key={currentAnimName + index}>
                // </BezierInputTree>)
            }
            else {
                return '';
            }
        })
        :
            currentAnimData.map(function (data, index) {
                return (react_1["default"].createElement(InputTree_1["default"], { name: data[0], calculator: currentAnimCalculator, index: index, isLast: index === (currentAnimData.length - 1), defaultVal: data[1]["default"], isEditable: data[1].editable, min: data[1].min, max: data[1].max, key: currentAnimName + index }));
            }))
        :
            react_1["default"].createElement(InputTree_1["default"], { name: 'property', index: 0, isLast: true, defaultVal: init_state_json_1["default"].initSliderValue, isEditable: false, min: 0, max: 1, key: 'input_placeholder' })));
};
exports["default"] = CanvasInput;
