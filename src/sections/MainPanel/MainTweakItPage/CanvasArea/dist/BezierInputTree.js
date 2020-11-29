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
var TextInput_1 = require("@Components/TextInput");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
var react_draggable_1 = require("react-draggable");
var BezierInputTree = react_1.memo(function (_a) {
    var style = _a.style, isLast = _a.isLast, isDoubleBezier = _a.isDoubleBezier, isEditable = _a.isEditable, index = _a.index, name = _a.name, defaultVal = _a.defaultVal, svgHeight = _a.svgHeight, svgWidth = _a.svgWidth, svgScale = _a.svgScale, svgStrokeWidth = _a.svgStrokeWidth, viewBoxWFixed = _a.viewBoxWFixed, isBezier = _a.isBezier, viewBoxHFixed = _a.viewBoxHFixed;
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), selectTransition = _b.selectTransition, currentSolverData = _b.currentSolverData, setCurrentSolverDataByIndex = _b.setCurrentSolverDataByIndex;
    var _c = react_1.useContext(GraphUpdateContext_1.GraphUpdateContext), setBezierTriggeredIndex = _c.setBezierTriggeredIndex, bezierTriggeredIndex = _c.bezierTriggeredIndex, setGraphShouldUpdate = _c.setGraphShouldUpdate, shouldGraphupdate = _c.shouldGraphupdate;
    var boxWidth = svgWidth * (svgWidth / (svgWidth + viewBoxWFixed)) * svgScale;
    var boxHeight = svgHeight * (svgHeight / (svgHeight + viewBoxHFixed)) * svgScale;
    var boxPadding = 40;
    var circleRadius = 8;
    var _d = react_i18next_1.useTranslation(), t = _d.t, i18n = _d.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _e = react_1.useState(currentSolverData[index][0]), prev1 = _e[0], setPrev1 = _e[1];
    var _f = react_1.useState(currentSolverData[index][0]), target1 = _f[0], setTarget1 = _f[1];
    var _g = react_1.useState(false), isStart1 = _g[0], setStart1 = _g[1];
    var _h = react_1.useState(currentSolverData[index][1]), prev2 = _h[0], setPrev2 = _h[1];
    var _j = react_1.useState(currentSolverData[index][1]), target2 = _j[0], setTarget2 = _j[1];
    var _k = react_1.useState(false), isStart2 = _k[0], setStart2 = _k[1];
    var _l = react_1.useState(currentSolverData[index][2]), prev3 = _l[0], setPrev3 = _l[1];
    var _m = react_1.useState(currentSolverData[index][2]), target3 = _m[0], setTarget3 = _m[1];
    var _o = react_1.useState(false), isStart3 = _o[0], setStart3 = _o[1];
    var _p = react_1.useState(currentSolverData[index][3]), prev4 = _p[0], setPrev4 = _p[1];
    var _q = react_1.useState(currentSolverData[index][3]), target4 = _q[0], setTarget4 = _q[1];
    var _r = react_1.useState(false), isStart4 = _r[0], setStart4 = _r[1];
    var _s = react_1.useState(false), isStartAnimation = _s[0], setStartAnimation = _s[1];
    var _t = react_1.useState(defaultVal), textValue = _t[0], setTextValue = _t[1];
    var _u = react_1.useState(defaultVal), textPreviousValue = _u[0], setTextPreviousValue = _u[1];
    var _v = react_1.useState(true), isTextBlurred = _v[0], setTextBlur = _v[1];
    //console.log('input tree rerender')
    react_1.useEffect(function () {
        setBezierTriggeredIndex(-1);
    }, []);
    var progress1 = react_spring_1.useSpring({
        from: { progress1: prev1 },
        to: { progress1: (isStart1) ? target1 : prev1 },
        config: animation_json_1["default"].bezier_input,
        onFrame: function () {
            var value = progress1.value.toFixed(2);
            //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+0);
        },
        onRest: function () {
            setPrev1(target1);
            setStart1(false);
        }
    }).progress1;
    var progress2 = react_spring_1.useSpring({
        from: { progress2: prev2 },
        to: { progress2: (isStart2) ? target2 : prev2 },
        config: animation_json_1["default"].bezier_input,
        //duration: 0,
        onFrame: function () {
            var value = progress2.value.toFixed(2);
            //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+1);
        },
        onRest: function () {
            setPrev2(target2);
            setStart2(false);
        }
    }).progress2;
    var progress3 = react_spring_1.useSpring({
        from: { progress3: prev3 },
        to: { progress3: (isStart3) ? target3 : prev3 },
        config: animation_json_1["default"].bezier_input,
        //duration: 0,
        onFrame: function () {
            var value = progress3.value.toFixed(2);
            //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+2);
        },
        onRest: function () {
            setPrev3(target3);
            setStart3(false);
        }
    }).progress3;
    var progress4 = react_spring_1.useSpring({
        from: { progress4: prev4 },
        to: { progress4: (isStart4) ? target4 : prev4 },
        config: animation_json_1["default"].bezier_input,
        //duration: 0,
        onFrame: function () {
            var value = progress4.value.toFixed(2);
            //if(bezierTriggeredIndex != -1) setCurrentSolverDataByIndex(value,index*4+3);
        },
        onRest: function () {
            setPrev4(target4);
            setStart4(false);
        }
    }).progress4;
    var renderProgress = react_spring_1.useSpring({
        from: { renderProgress: 0 },
        to: { renderProgress: (isStartAnimation) ? 1 : 0 },
        config: animation_json_1["default"].bezier_input,
        //duration: 0,
        onFrame: function () {
            if (bezierTriggeredIndex != -1) {
                console.log([progress1.value.toFixed(2), progress2.value.toFixed(2), progress3.value.toFixed(2), progress4.value.toFixed(2)]);
                setCurrentSolverDataByIndex([progress1.value.toFixed(2), progress2.value.toFixed(2), progress3.value.toFixed(2), progress4.value.toFixed(2)], index);
                var fps_60 = Math.round((new Date().getTime() - progress1.startTime) / 16);
                if (fps_60 % 2 == 0) {
                    setGraphShouldUpdate(false);
                }
                else {
                    setGraphShouldUpdate(true);
                }
            }
        },
        onRest: function () {
            // Maybe Bugs Here
            setBezierTriggeredIndex(-1);
            setGraphShouldUpdate(false);
            setStartAnimation(false);
        }
    }).renderProgress;
    var charLocation = function (substring, string) {
        var a = [0], i = -1;
        while ((i = string.indexOf(substring, i + 1)) >= 0)
            a.push(i);
        return a;
    };
    var handleBezierTextChange = function (e) {
        // Hold the CharaPostion
        var target = e.target;
        var lmtVal = target.value.replace(/[^\?\d,.]/g, '');
        var position = target.selectionStart; // Capture initial position
        var shouldFoward = (lmtVal === target.value);
        if ((lmtVal.toString().split(".").length - 1) > 4 || (lmtVal.toString().split(",").length - 1) > 3) {
            lmtVal = textPreviousValue;
            shouldFoward = false;
        }
        if ((lmtVal.toString().split(".").length - 1) == 4 && (lmtVal.toString().split(",").length - 1) == 3) {
            var dotLocation = charLocation(",", lmtVal.toString());
            var cursorLocation = shouldFoward ? position : position - 1;
            setPrev1(Number(lmtVal.toString().split(",")[0]));
            setTarget1(Math.min(1, Math.max(Number(lmtVal.toString().split(",")[0]), 0)));
            setPrev2(Number(lmtVal.toString().split(",")[1]));
            setTarget2(Math.min(1, Math.max(Number(lmtVal.toString().split(",")[1]), 0)));
            setPrev3(Number(lmtVal.toString().split(",")[2]));
            setTarget3(Math.min(1, Math.max(Number(lmtVal.toString().split(",")[2]), 0)));
            setPrev4(Number(lmtVal.toString().split(",")[3]));
            setTarget4(Math.min(1, Math.max(Number(lmtVal.toString().split(",")[3]), 0)));
            setBezierTriggeredIndex(10);
            setGraphShouldUpdate(true);
            setTextPreviousValue(lmtVal);
            setStartAnimation(true);
            setStart1(true);
            setStart2(true);
            setStart3(true);
            setStart4(true);
        }
        setTextBlur(false);
        setTextValue(lmtVal);
        target.value = lmtVal.toString().replace(/\s/g, ''); // This triggers the cursor to move.
        target.selectionEnd = shouldFoward ? position : position - 1;
    };
    var handleBezierTextBlur = function (e) {
        setTextBlur(true);
        var lmtVal = e.target.value.replace(/[^\?\d,.]/g, '');
        if ((lmtVal.toString().split(".").length - 1) != 4 && (lmtVal.toString().split(",").length - 1) != 3) {
            lmtVal = textPreviousValue;
            setTextValue(lmtVal);
            setTextPreviousValue(lmtVal);
        }
    };
    var handleBezierTextFocus = function (e) {
        setTextBlur(false);
    };
    var _w = react_1.useState(0), transitionScale = _w[0], setTransitionScale = _w[1];
    var transInProgress = react_spring_1.useSpring({
        transInProgress: selectTransition ? 0 : 1,
        config: animation_json_1["default"].bezier_dragger,
        onFrame: function () {
            setTransitionScale(transInProgress.value);
        }
    }).transInProgress;
    var handleStart = function (e, ui) {
    };
    var handleStop = function (e, ui) {
        setPrev1(currentSolverData[index][0]);
        setPrev2(currentSolverData[index][1]);
        setPrev3(currentSolverData[index][2]);
        setPrev4(currentSolverData[index][3]);
        setTarget1(currentSolverData[index][0]);
        setTarget2(currentSolverData[index][1]);
        setTarget3(currentSolverData[index][2]);
        setTarget4(currentSolverData[index][3]);
    };
    var handleDragLeft = function (e, ui) {
        var p1V = ui.x / boxWidth;
        var p2V = (boxHeight - ui.y) / boxHeight;
        //setCurrentSolverDataByIndex(Number(p1V.toFixed(2)),index*4+0);
        //setCurrentSolverDataByIndex(Number(p2V.toFixed(2)),index*4+1)
        console.log(Number(p1V.toFixed(2)));
        console.log(Number(p2V.toFixed(2)));
        setCurrentSolverDataByIndex([Number(p1V.toFixed(2)), Number(p2V.toFixed(2)), Number(currentSolverData[index][2]), Number(currentSolverData[index][3])], index);
        setBezierTriggeredIndex(-1);
        setStartAnimation(false);
        setGraphShouldUpdate(!shouldGraphupdate);
        setTextValue(p1V.toFixed(2) + "," + p2V.toFixed(2) + "," + currentSolverData[index][2] + "," + currentSolverData[index][3]);
    };
    var handleDragRight = function (e, ui) {
        var p3V = ui.x / boxWidth;
        var p4V = (boxHeight - ui.y) / boxHeight;
        // setCurrentSolverDataByIndex(Number(p3V.toFixed(2)),index*4+2);
        // setCurrentSolverDataByIndex(Number(p4V.toFixed(2)),index*4+3)
        setCurrentSolverDataByIndex([Number(currentSolverData[index][0]), Number(currentSolverData[index][1]), Number(p3V.toFixed(2)), Number(p4V.toFixed(2))], index);
        setBezierTriggeredIndex(-1);
        setStartAnimation(false);
        setGraphShouldUpdate(!shouldGraphupdate);
        setTextValue(currentSolverData[index][0] + "," + currentSolverData[index][1] + "," + p3V.toFixed(2) + "," + p4V.toFixed(2));
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(CustomSVG, { canShow: !selectTransition, width: boxWidth + boxPadding, height: boxHeight + boxPadding },
            react_1["default"].createElement("g", null,
                react_1["default"].createElement(CustomBorderline, { isEditable: isEditable, x1: boxPadding / 2, y1: boxPadding / 2, x2: boxWidth * currentSolverData[index][0] * transitionScale + boxPadding / 2, y2: boxHeight * currentSolverData[index][1] * transitionScale + boxPadding / 2, strokeWidth: svgStrokeWidth / 2 }),
                react_1["default"].createElement(CustomBorderline, { isEditable: isEditable, x1: boxWidth * (1 - transitionScale) + boxWidth * currentSolverData[index][2] * transitionScale + boxPadding / 2, y1: boxHeight * (1 - transitionScale) + boxHeight * currentSolverData[index][3] * transitionScale + boxPadding / 2, x2: boxWidth + boxPadding / 2, y2: boxHeight + boxPadding / 2, strokeWidth: svgStrokeWidth / 2 }))),
        isEditable ? react_1["default"].createElement(DraggableContainer, { canShow: !selectTransition, style: {
                width: boxWidth + "px",
                height: boxHeight + "px",
                transform: "translate3d(-50%,-50%,0) scale3d(1,1,1)"
            } },
            react_1["default"].createElement(react_draggable_1["default"], { axis: "both", handle: ".handle", position: { x: boxWidth * currentSolverData[index][0] * transitionScale, y: boxHeight - boxHeight * currentSolverData[index][1] * transitionScale }, 
                // position={{x:isDragInit?(boxWidth*currentSolverData[0]*transitionScale):null,y:isDragInit?(boxHeight - boxHeight*currentSolverData[1]*transitionScale):null}}
                scale: 1, bounds: { top: -boxHeight / 2, left: 0, right: boxWidth, bottom: boxHeight + boxHeight / 2 }, 
                // position={null}
                onStart: handleStart, onDrag: handleDragLeft, onStop: handleStop },
                react_1["default"].createElement(DraggableCircle, { className: "handle", canShow: !selectTransition, isEditable: isEditable, radius: circleRadius, onMouseDown: function () {
                        //addDragEvent(document.getElementById('draggable_1'),true)
                    }, style: {
                        // left:`${boxWidth*currentSolverData[0]*transitionScale}px`,
                        // top:`${boxHeight - boxHeight*currentSolverData[1]*transitionScale}px`,
                        // transform:`translate3d(${-circleRadius/2}px,${-circleRadius/2}px,0) scale3d(${transitionScale},${transitionScale},1)`
                        width: transitionScale * circleRadius + "px",
                        height: transitionScale * circleRadius + "px",
                        left: -circleRadius / 2 * transitionScale + "px",
                        top: -circleRadius / 2 * transitionScale + "px"
                    } })),
            react_1["default"].createElement(react_draggable_1["default"], { axis: "both", handle: ".handle", position: { x: boxWidth * (1 - transitionScale) + boxWidth * currentSolverData[index][2] * transitionScale, y: boxHeight * (1 - currentSolverData[index][3]) * transitionScale }, 
                // position={{x:isDragInit?(boxWidth*currentSolverData[0]*transitionScale):null,y:isDragInit?(boxHeight - boxHeight*currentSolverData[1]*transitionScale):null}}
                scale: 1, bounds: { top: -boxHeight / 2, left: 0, right: boxWidth, bottom: boxHeight + boxHeight / 2 }, 
                // position={null}
                onStart: handleStart, onDrag: handleDragRight, onStop: handleStop },
                react_1["default"].createElement(DraggableCircle, { className: "handle", canShow: !selectTransition, radius: circleRadius, isEditable: isEditable, onMouseDown: function () {
                        //addDragEvent(document.getElementById('draggable_1'),true)
                    }, style: {
                        // left:`${boxWidth*currentSolverData[0]*transitionScale}px`,
                        // top:`${boxHeight - boxHeight*currentSolverData[1]*transitionScale}px`,
                        // transform:`translate3d(${-circleRadius/2}px,${-circleRadius/2}px,0) scale3d(${transitionScale},${transitionScale},1)`
                        width: transitionScale * circleRadius + "px",
                        height: transitionScale * circleRadius + "px",
                        left: -circleRadius / 2 * transitionScale + "px",
                        top: -circleRadius / 2 * transitionScale + "px"
                    } }))) : react_1["default"].createElement(DraggableContainer, { canShow: !selectTransition, style: {
                width: boxWidth + "px",
                height: boxHeight + "px",
                transform: "translate3d(-50%,-50%,0) scale3d(1,1,1)"
            } },
            react_1["default"].createElement(DraggableCircle, { canShow: !selectTransition, isEditable: isEditable, radius: circleRadius, onMouseDown: function () {
                    //addDragEvent(document.getElementById('draggable_1'),true)
                }, style: {
                    left: boxWidth * currentSolverData[index][0] * transitionScale + "px",
                    top: boxHeight - boxHeight * currentSolverData[index][1] * transitionScale + "px",
                    transform: "translate3d(" + -circleRadius / 2 + "px," + -circleRadius / 2 + "px,0) scale3d(" + transitionScale + "," + transitionScale + ",1)",
                    width: transitionScale * circleRadius + "px",
                    height: transitionScale * circleRadius + "px"
                } }),
            react_1["default"].createElement(DraggableCircle, { canShow: !selectTransition, radius: circleRadius, isEditable: isEditable, onMouseDown: function () {
                    //addDragEvent(document.getElementById('draggable_1'),true)
                }, style: {
                    left: boxWidth * (1 - transitionScale) + boxWidth * currentSolverData[index][2] * transitionScale + "px",
                    top: boxHeight * (1 - currentSolverData[index][3]) * transitionScale + "px",
                    transform: "translate3d(" + -circleRadius / 2 + "px," + -circleRadius / 2 + "px,0) scale3d(" + transitionScale + "," + transitionScale + ",1)",
                    width: transitionScale * circleRadius + "px",
                    height: transitionScale * circleRadius + "px"
                } })),
        react_1["default"].createElement(TextInput_1["default"], { id: 'bezier_input', value: textValue, isEditable: isEditable, step: 0.01, style: {
                width: '100%',
                height: 'auto',
                marginLeft: '0px',
                background: 'transparent',
                border: 'none',
                fontSize: '12px',
                position: 'absolute',
                bottom: '42px'
            }, onChange: function (e) {
                e.preventDefault();
                isEditable ? handleBezierTextChange(e) : '';
                //handleBezierDragInput([0.5,0.2,1.0,1.0])
            }, onKeyUp: function (e) {
                // PressEnter
                if (e.keyCode === 13) {
                    e.preventDefault();
                    isEditable ? handleBezierTextBlur(e) : '';
                }
            }, onBlur: function (e) {
                // Out of Focus
                e.preventDefault();
                isEditable ? handleBezierTextBlur(e) : '';
            }, onFocus: function (e) {
                // Out of Focus
                e.preventDefault();
                isEditable ? handleBezierTextFocus(e) : '';
            } })));
});
exports["default"] = BezierInputTree;
// Styles
var DraggableContainer = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nposition:absolute;\nleft:50%;\ntop:50%;\ndisplay:", ";\nbackground:transparent;\n"], ["\nposition:absolute;\nleft:50%;\ntop:50%;\ndisplay:", ";\nbackground:transparent;\n"])), function (p) { return p.canShow ? 'block' : 'none'; });
var DraggableCircle = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nleft:0px;\ntop:0px;\nwidth:", "px;\nheight:", "px;\nposition:absolute;\nborder-radius:", "px;\ndisplay:", ";\nbackground:", ";\ncursor: ", ";\nborder-radius: ", "px;\nbox-shadow: ", ";\n\n:hover {\n  background:", ";\n}\n\n"], ["\nleft:0px;\ntop:0px;\nwidth:", "px;\nheight:", "px;\nposition:absolute;\nborder-radius:", "px;\ndisplay:", ";\nbackground:", ";\ncursor: ", ";\nborder-radius: ", "px;\nbox-shadow: ", ";\n\n:hover {\n  background:", ";\n}\n\n"])), function (p) { return p.radius; }, function (p) { return p.radius; }, function (p) { return p.radius / 2; }, function (p) { return p.canShow ? 'block' : 'none'; }, function (p) { return p.isEditable ? p.theme.colors.range_input_thumb : p.theme.colors.range_input_thumb_unactive; }, function (p) { return p.isEditable ? 'move' : 'not-allowed'; }, function (p) { return p.radius / 2; }, function (p) { return p.isEditable ? "0px 0px 3px " + p.theme.colors.text_input_text : 'none'; }, function (p) { return p.isEditable ? p.theme.colors.range_input_thumb_active : p.theme.colors.range_input_thumb_unactive; });
var CustomSVG = styled_1["default"].svg(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  transform:translate3d(-50%,-50%,0) scale3d(1,-1,1);\n  position:absolute;\n  left:50%;\n  top:50%;\n  display:", ";\n  overflow:inherit;\n"], ["\n  transform:translate3d(-50%,-50%,0) scale3d(1,-1,1);\n  position:absolute;\n  left:50%;\n  top:50%;\n  display:", ";\n  overflow:inherit;\n"])), function (p) { return p.canShow ? 'block' : 'none'; });
var CustomBorderline = styled_1["default"].line(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  stroke:", ";\n"], ["\n  position: relative;\n  stroke-linecap:round;\n  stroke-linejoin:round;\n  stroke:", ";\n"])), function (p) { return p.isEditable ? p.theme.colors.range_input_thumb : p.theme.colors.slider_input_thumb_unactive; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
