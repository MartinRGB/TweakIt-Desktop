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
var resize_observer_polyfill_1 = require("resize-observer-polyfill");
// import * as Icons from './ListIcon'
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var core_1 = require("@emotion/core");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var animation_json_1 = require("@Config/animation.json");
var icons_1 = require("@Assets/icons");
var ListSelectStateContext_1 = require("@Context/ListSelectStateContext");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var ListTree = react_1.memo(function (_a) {
    var children = _a.children, name = _a.name, style = _a.style, _b = _a.defaultOpen, defaultOpen = _b === void 0 ? false : _b, info = _a.info, isUlElement = _a.isUlElement, index = _a.index, animation_data = _a.animation_data, calculator = _a.calculator;
    var _c = react_i18next_1.useTranslation(), t = _c.t, i18n = _c.i18n;
    var UlVerticalPadding = 3;
    var _d = react_1.useContext(ListSelectStateContext_1.ListSelectStateContext), currentAnimationItem = _d.currentAnimationItem, selectAnimationItem = _d.selectAnimationItem;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _e = react_1.useState(defaultOpen), isOpen = _e[0], setOpen = _e[1];
    var previous = usePrevious(isOpen);
    var _f = useMeasure(), bind = _f[0], viewHeight = _f[1].height;
    var _g = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), setPreviousDataRange = _g.setPreviousDataRange, previousSolverData = _g.previousSolverData, currentSolverData = _g.currentSolverData, currentDataRange = _g.currentDataRange, previousDataRange = _g.previousDataRange, setCurrentDataRangeByIndex = _g.setCurrentDataRangeByIndex, currentAnimName = _g.currentAnimName, currentAnimCalculator = _g.currentAnimCalculator, setCurrentSolverDataByIndex = _g.setCurrentSolverDataByIndex, currentAnimData = _g.currentAnimData, setCurrentAnimName = _g.setCurrentAnimName, setCurrentAnimCalculator = _g.setCurrentAnimCalculator, setCurrentAnimData = _g.setCurrentAnimData, setCurrentSolverData = _g.setCurrentSolverData, setPreviousAnimName = _g.setPreviousAnimName, setPreviousAnimCalculator = _g.setPreviousAnimCalculator, setPreviousSolverData = _g.setPreviousSolverData, setSelectTransition = _g.setSelectTransition, setPreviousDataRangeByIndex = _g.setPreviousDataRangeByIndex;
    var revealProgress = react_spring_1.useSpring({
        revealProgress: isOpen ? 1 : 0,
        config: animation_json_1["default"].list_reveal
    }).revealProgress;
    // TODO
    var PlatformIcon;
    //console.log('rerender')
    if (isUlElement) {
        PlatformIcon = icons_1["default"][(name.replace(/\s/g, ""))];
    }
    return (react_1["default"].createElement(Frame, null,
        children ?
            react_1["default"].createElement("div", { css: Toggle, onClick: function () { return setOpen(!isOpen); } },
                react_1["default"].createElement(react_spring_1.animated.div, { css: core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n              display: inline-block;\n              vertical-align: middle;\n              height: 18px;"], ["\n              display: inline-block;\n              vertical-align: middle;\n              height: 18px;"]))), style: {
                        transform: react_spring_1.interpolate([revealProgress], function (r) { return "rotate(" + r * 90 + "deg) translate3d(0px," + r * 1.5 + "px,0px) scale3d(" + (1 - r * 0.1) + "," + (1 - r * 0.1) + "," + (1 - r * 0.1) + ")"; }),
                        marginTop: "-2px"
                    } },
                    react_1["default"].createElement(icons_1["default"].CollapsedArrow, null)),
                isUlElement ? react_1["default"].createElement(PlatformIcon, { style: {
                        height: "18px",
                        width: "18px",
                        verticalAlign: "middle",
                        marginLeft: "8px",
                        marginRight: "4px",
                        marginTop: "-2px"
                    } }) : react_1["default"].createElement("div", null),
                react_1["default"].createElement(UlTitle, { style: style },
                    react_1["default"].createElement(react_i18next_1.Trans, null, name))) :
            react_1["default"].createElement("div", null, name === "Divide" ?
                react_1["default"].createElement("div", { css: core_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["height:1px"], ["height:1px"]))) }) :
                react_1["default"].createElement(LiTitle, { style: __assign({}, style), css: Toggle, isSelected: currentAnimationItem === info, onClick: function () {
                        if (name != "Divide" && (currentAnimationItem != info)) {
                            console.log(currentSolverData);
                            // TODO Work for GraphTransition,but not For Input
                            setPreviousAnimName(currentAnimName);
                            setPreviousAnimCalculator(currentAnimCalculator);
                            setPreviousSolverData(currentSolverData);
                            //setPreviousDataRange(currentDataRange)
                            console.log(currentAnimData);
                            //console.log(Object.entries(animation_data))
                            //这里的 animation_Data 是被点击 list 的，所以这样设置 Previous 用以出问题这里有问题
                            Object.entries(currentAnimData).map(function (data, index) {
                                setPreviousDataRangeByIndex(data[1].max - data[1].min, index);
                                //TODO 有问题
                                //console.log('ISSUE HERE')
                                // console.log(index)
                                // console.log(data[1].)
                            });
                            selectAnimationItem(info);
                            setCurrentAnimName(name);
                            setCurrentAnimCalculator(calculator);
                            if (animation_data) {
                                setCurrentAnimData(Object.entries(animation_data));
                            }
                            else {
                                setCurrentAnimData([]);
                            }
                            Object.entries(animation_data).map(function (data, index) {
                                setCurrentDataRangeByIndex(data[1].max - data[1].min, index);
                                //TODO 有问题
                                //console.log('ISSUE HERE')
                                // console.log(index)
                                // console.log(data[1].)
                                console.log(data[1].max - data[1].min);
                            });
                            // Object.entries(animation_data).map(function (data:any,index:number) {
                            //   setCurrentSolverDataByIndex(data[1].default,index)
                            // })
                            //console.log(currentSolverData)
                            console.log('============= List Tree ============');
                            console.log('prev SolvData  ---- ' + previousSolverData);
                            console.log('curr SolvData ----' + currentSolverData);
                            console.log('prev DateRange  ---- ' + previousDataRange);
                            console.log('curr DateRange ----' + currentDataRange);
                            console.log('curr AnimData ----' + currentAnimData);
                            console.log('============= List Tree ============');
                            setSelectTransition(true);
                        }
                    } },
                    react_1["default"].createElement(react_i18next_1.Trans, null, name))),
        react_1["default"].createElement(Content, { style: {
                opacity: react_spring_1.interpolate([revealProgress], function (r) { return "" + r * 1; }),
                // height: isOpen && previous === isOpen ? 'auto' : interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`)
                // height: isOpen ? 'auto' : interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`),
                display: isOpen ? 'block' : 'none',
                height: isOpen ? react_spring_1.interpolate([revealProgress], function (r) { return r * (viewHeight + UlVerticalPadding * 2) + "px"; }) : '0px'
                //display:'block',
                //height: interpolate([revealProgress], (r) => `${r * (viewHeight + UlVerticalPadding * 2)}px`)
            } },
            react_1["default"].createElement(react_spring_1.animated.div, __assign({ css: core_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                padding-top:", "px;\n                padding-bottom:", "px\n              "], ["\n                padding-top:", "px;\n                padding-bottom:", "px\n              "])), UlVerticalPadding, UlVerticalPadding), style: {
                    transform: react_spring_1.interpolate([revealProgress], function (r) { return "translate3d(" + (10 - r * 10) + "px,0,0)"; })
                } }, bind), children))));
});
exports["default"] = ListTree;
// State Control
var usePrevious = function (value) {
    var ref = react_1.useRef();
    react_1.useEffect(function () { return void (ref.current = value); }, [value]);
    return ref.current;
};
var useMeasure = function () {
    var ref = react_1.useRef();
    var _a = react_1.useState({ left: 0, top: 0, width: 0, height: 0 }), bounds = _a[0], set = _a[1];
    var ro = react_1.useState(function () { return new resize_observer_polyfill_1["default"](function (_a) {
        var entry = _a[0];
        return set(entry.contentRect);
    }); })[0];
    react_1.useEffect(function () {
        var refCurrent = ref.current;
        if (ref.current)
            ro.observe(refCurrent);
        return function () { return ro.disconnect(); };
    }, []);
    return [{ ref: ref }, bounds];
};
// Styles
var Frame = styled_1["default"]('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  padding: 1px 0px 1px 0px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n  color:  ", ";\n  fill: ", ";\n"], ["\n  position: relative;\n  padding: 1px 0px 1px 0px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n  color:  ", ";\n  fill: ", ";\n"])), function (p) { return p.theme.colors.text; }, function (p) { return p.theme.colors.text; });
var LiTitle = styled_1["default"].span(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  vertical-align: middle;\n  user-select:none;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 300;\n  font-size: 10px;\n  line-height: 11px;\n  margin-left: 25px;\n  color:", ";\n  opacity:0.8;\n"], ["\n  vertical-align: middle;\n  user-select:none;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 300;\n  font-size: 10px;\n  line-height: 11px;\n  margin-left: 25px;\n  color:", ";\n  opacity:0.8;\n"])), function (props) { return props.theme.fonts.normalText; }, function (p) { return (p.isSelected ? p.theme.colors.primary : p.theme.colors.text); });
var UlTitle = styled_1["default"]('span')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  vertical-align: middle;\n  user-select:none;\n  font-family: ", ";\n  font-style: normal;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 21px;\n"], ["\n  vertical-align: middle;\n  user-select:none;\n  font-family: ", ";\n  font-style: normal;\n  font-style: normal;\n  font-weight: 600;\n  font-size: 12px;\n  line-height: 21px;\n"])), function (props) { return props.theme.fonts.headText; });
var Content = styled_1["default"](react_spring_1.animated.div)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  will-change: transform, opacity, height;\n  margin-left: 6px;\n  padding: 0px 0px 0px 14px;\n  border-left: 1px dashed ", ";\n  overflow: hidden;\n"], ["\n  will-change: transform, opacity, height;\n  margin-left: 6px;\n  padding: 0px 0px 0px 14px;\n  border-left: 1px dashed ", ";\n  overflow: hidden;\n"])), function (p) { return p.theme.colors.title_background_bottom; });
var Toggle = core_1.css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  cursor:pointer\n"], ["\n  cursor:pointer\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
