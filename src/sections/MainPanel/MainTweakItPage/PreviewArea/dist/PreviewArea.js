"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var init_state_json_1 = require("@Config/init_state.json");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var MainButtonNormal_1 = require("@Components/MainButtonNormal");
var Solver_1 = require("@Components/Solver");
var DataDrivenAnimator_1 = require("./DataDrivenAnimator");
var PreviewArea = function (_a) {
    var children = _a.children;
    var _b = react_i18next_1.useTranslation(), t = _b.t, i18n = _b.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _c = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), selectTransition = _c.selectTransition, durationData = _c.durationData, currentSolverData = _c.currentSolverData, currentAnimCalculator = _c.currentAnimCalculator, currentAnimPlatform = _c.currentAnimPlatform, currentAnimName = _c.currentAnimName;
    var _d = react_1.useContext(GraphUpdateContext_1.GraphUpdateContext), triggredIndex = _d.triggredIndex, bezierTriggeredIndex = _d.bezierTriggeredIndex;
    var _e = react_1.useState('scale'), animProperty = _e[0], setAnimProerty = _e[1];
    // strange bug here
    var _f = react_1.useState(0), cssAnimationProgress = _f[0], setCSSAnimationProgress = _f[1];
    var setScale = function () { setAnimProerty('scale'); };
    var setTrans = function () { setAnimProerty('translationY'); };
    var setRot = function () { setAnimProerty('rotate'); };
    var svgHeight = init_state_json_1["default"].svgHeight;
    var currSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
    var currSolverValueData = currSolver.getValueArray();
    var currDuration = (durationData != -1) ? durationData : currSolver.duration;
    var startAnimator, endAnimator;
    var startAnimate = function () {
        // TODO RESET
        if (startAnimator && startAnimator.isAnimating())
            (startAnimator.reset());
        if (endAnimator && endAnimator.isAnimating())
            (endAnimator.reset());
        startAnimator = new DataDrivenAnimator_1["default"](currSolverValueData);
        startAnimator.setFromToDuration(0, 1., currDuration * 1000);
        startAnimator.start();
        startAnimator.setOnFrameCallback(function () {
            setCSSAnimationProgress(startAnimator.getProgress());
        });
        startAnimator.setOnEndCallback(function () {
            endAnimator = new DataDrivenAnimator_1["default"](currSolverValueData);
            endAnimator.setFromToDuration(0, 1, currDuration * 1000);
            endAnimator.start();
            endAnimator.setOnFrameCallback(function () {
                setCSSAnimationProgress(1. - endAnimator.getProgress());
            });
            endAnimator.setOnEndCallback(function () {
            });
        });
    };
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement(PaddingTopBox, null),
        react_1["default"].createElement(BoxContainer, { style: {
                height: svgHeight + "px"
            } },
            react_1["default"].createElement(Box, { id: "box", style: {
                    transform: "" + ((animProperty === 'rotate') ?
                        "rotate(" + cssAnimationProgress * 360 + "deg)"
                        :
                            (animProperty === 'scale') ?
                                "scale(" + (1 + cssAnimationProgress * 0.5) + ")"
                                :
                                    "translate3d(0," + cssAnimationProgress * -150 + "px,0px)")
                } })),
        react_1["default"].createElement(BtnContainer, null,
            react_1["default"].createElement(MainButtonNormal_1["default"], { style: {
                    cursor: "" + ((triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? 'initial' : 'not-allowed'),
                    opacity: "" + ((triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? '1' : '0.5')
                }, onClick: function () { setScale(); (triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? startAnimate() : ''; } },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Scale")),
            react_1["default"].createElement(MainButtonNormal_1["default"], { style: {
                    cursor: "" + ((triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? 'initial' : 'not-allowed'),
                    opacity: "" + ((triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? '1' : '0.5')
                }, onClick: function () { setTrans(); (triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? startAnimate() : ''; } },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Trans")),
            react_1["default"].createElement(MainButtonNormal_1["default"], { style: {
                    cursor: "" + ((triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? 'initial' : 'not-allowed'),
                    opacity: "" + ((triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? '1' : '0.5')
                }, onClick: function () { setRot(); (triggredIndex === -1 && bezierTriggeredIndex === -1 && (currentAnimName != 'HorizontalLine')) ? startAnimate() : ''; } },
                react_1["default"].createElement(react_i18next_1.Trans, null, "Rot")))));
};
exports["default"] = PreviewArea;
var PaddingTopBox = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width:100%;\n  height:45px;\n"], ["\n  width:100%;\n  height:45px;\n"])));
var BoxContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width:100%;\n  height:345px;\n  display:flex;\n  align-items:center;\n"], ["\n  width:100%;\n  height:345px;\n  display:flex;\n  align-items:center;\n"])));
var Box = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width:45px;\n  height:45px;\n  background: linear-gradient(180deg, #77FBAD 0%, #47BBAC 100%);\n  opacity: 0.5;\n  border-radius: 8px;\n  margin: 0 auto;\n"], ["\n  width:45px;\n  height:45px;\n  background: linear-gradient(180deg, #77FBAD 0%, #47BBAC 100%);\n  opacity: 0.5;\n  border-radius: 8px;\n  margin: 0 auto;\n"])));
var BtnContainer = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width:100%;\n  display:flex;\n  align-items:center;\n  flex-direction: row;\n  padding: 0 28px;\n  height: 16px;\n  flex: 1;\n"], ["\n  width:100%;\n  display:flex;\n  align-items:center;\n  flex-direction: row;\n  padding: 0 28px;\n  height: 16px;\n  flex: 1;\n"])));
var Container = styled_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    height: 100%;\n    background:", ";\n    display: flex;\n    flex-direction: column;\n    //flex:1;\n    width:250px;\n"], ["\n    height: 100%;\n    background:", ";\n    display: flex;\n    flex-direction: column;\n    //flex:1;\n    width:250px;\n"])), function (p) { return p.theme.colors.main_top_bg; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
