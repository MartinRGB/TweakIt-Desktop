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
var react_highlight_1 = require("react-highlight");
var TitleButtonNormal_1 = require("@Components/TitleButtonNormal");
var icons_1 = require("@Assets/icons");
var CodeArea = function (_a) {
    var children = _a.children;
    var _b = react_i18next_1.useTranslation(), t = _b.t, i18n = _b.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _c = react_1.useState(false), isExpanded = _c[0], setCodeIsExpand = _c[1];
    console.log(colorMode);
    return (react_1["default"].createElement(Container, { isExpanded: isExpanded },
        react_1["default"].createElement(BlurContainer, null,
            react_1["default"].createElement(TopNav, null,
                react_1["default"].createElement(TopRightContainer, null,
                    react_1["default"].createElement(TitleButtonNormal_1["default"], { style: {
                            width: "24px",
                            borderRadius: "2px"
                        }, onClick: function () {
                            setCodeIsExpand(!isExpanded);
                            console.log('233');
                        } },
                        react_1["default"].createElement(icons_1["default"].CollapsedArrowAlertNative, { style: {
                                transform: "rotate(" + (isExpanded ? '0deg' : '180deg') + ")",
                                transition: "all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s"
                            } }))))),
        react_1["default"].createElement(ScrollContainer, null,
            react_1["default"].createElement(react_highlight_1["default"], { language: "javascript" }, "\n// Facebook ReboundJS Spring Animation  [Repo]\nvar springSystem = new rebound.SpringSystem();\nvar spring = springSystem.rebound.createSpringWithBouncinessAndSpeed(11.82,66.51);\n\n// (Legacy) Framer Classic RK4 Animation  [API]\nlayerA = new Layer\nanimationA = new Animation layerA\n    x:[parameter]\n    options:\n        curve: Spring(tension:1500,friction:38.73)\n\n// PopMotion | FramerMotion  [PopMotion API]  [FramerMotion API]\nspring({\n  from: [parameter],\n  to: [parameter],\n  stiffness: 1500,\n  damping: 38.73,\n  mass: 1,\n  velocity: 0\n})\n// Facebook ReboundJS Spring Animation  [Repo]\nvar springSystem = new rebound.SpringSystem();\nvar spring = springSystem.rebound.createSpringWithBouncinessAndSpeed(11.82,66.51);\n\n// (Legacy) Framer Classic RK4 Animation  [API]\nlayerA = new Layer\nanimationA = new Animation layerA\n    x:[parameter]\n    options:\n        curve: Spring(tension:1500,friction:38.73)\n\n// PopMotion | FramerMotion  [PopMotion API]  [FramerMotion API]\nspring({\n  from: [parameter],\n  to: [parameter],\n  stiffness: 1500,\n  damping: 38.73,\n  mass: 1,\n  velocity: 0\n})\n\n"))));
};
exports["default"] = CodeArea;
var TopRightContainer = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  height: 100%;\n  float: right;\n  padding-right:14px;\n  padding-left:14px;\n"], ["\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  height: 100%;\n  float: right;\n  padding-right:14px;\n  padding-left:14px;\n"])));
var BlurContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 40px;\n  //mask: linear-gradient(180deg, ", ", transparent);\n  // backdrop-filter: saturate(180%) blur(5px);\n  // -webkit-mask: linear-gradient(to bottom,#000000 80%,#00000080 100%);\n  z-index:1\n"], ["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 40px;\n  //mask: linear-gradient(180deg, ", ", transparent);\n  // backdrop-filter: saturate(180%) blur(5px);\n  // -webkit-mask: linear-gradient(to bottom,#000000 80%,#00000080 100%);\n  z-index:1\n"])), function (p) { return p.theme.colors.main_top_bg_blur; });
var TopNav = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    height:100%;\n    width:100%;\n\n"], ["\n    height:100%;\n    width:100%;\n\n"])));
var Container = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    //height: 100%;\n    height:", ";\n    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;\n    // min-height:50px;\n    //background:blue;\n    display: flex;\n    flex-direction: column;\n    box-shadow:0px -1px 0px ", ";\n    background:", ";\n    z-index:1;\n    position:relative;\n    //flex:4;\n"], ["\n    //height: 100%;\n    height:", ";\n    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;\n    // min-height:50px;\n    //background:blue;\n    display: flex;\n    flex-direction: column;\n    box-shadow:0px -1px 0px ", ";\n    background:", ";\n    z-index:1;\n    position:relative;\n    //flex:4;\n"])), function (p) { return p.isExpanded ? '350px' : '40px'; }, function (p) { return p.theme.colors.adb_border; }, function (p) { return p.theme.colors.main_bottom_bg; });
var ScrollContainer = styled_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 100%;\n    height:100%;\n    padding: 0px 0px 0px 0px;\n    overflow-y:scroll;\n"], ["\n    width: 100%;\n    height:100%;\n    padding: 0px 0px 0px 0px;\n    overflow-y:scroll;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
