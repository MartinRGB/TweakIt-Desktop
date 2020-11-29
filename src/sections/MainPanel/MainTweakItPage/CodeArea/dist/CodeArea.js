"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var CodeStyle_1 = require("@Styles/CodeStyle");
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
    var _d = react_1.useState(false), isEditable = _d[0], setIsEditable = _d[1];
    var iconStr = [icons_1["default"].iOS, icons_1["default"].Android, icons_1["default"].Web, icons_1["default"].Flutter, icons_1["default"].Smartisan];
    //FPlatformIcon = Icons[(IconStr[index].replace(/\s/g, "")!)];
    return (react_1["default"].createElement(Container, { isExpanded: isExpanded },
        react_1["default"].createElement(CodeStyle_1.CodeStyle, null),
        react_1["default"].createElement(BlurContainer, null,
            react_1["default"].createElement(TopNav, null,
                react_1["default"].createElement(TopLeftContainer, null, iconStr.map(function (data, index) {
                    return (react_1["default"].createElement(TitleButtonNormal_1["default"], { style: {
                            width: "100px",
                            borderRadius: "2px"
                        }, onClick: function () {
                        } },
                        react_1["default"].createElement(icons_1["default"].Android, null),
                        react_1["default"].createElement("span", null, "Android Clear")));
                })),
                react_1["default"].createElement(TopRightContainer, null,
                    react_1["default"].createElement(TitleButtonNormal_1["default"], { style: {
                            width: "24px",
                            borderRadius: "2px"
                        }, onClick: function () {
                            setCodeIsExpand(!isExpanded);
                        } },
                        react_1["default"].createElement(icons_1["default"].CollapsedArrowAlertNative, { style: {
                                transform: "rotate(" + (isExpanded ? '0deg' : '180deg') + ")",
                                transition: "all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s"
                            } }))))),
        react_1["default"].createElement(ScrollContainer, { contentEditable: true },
            react_1["default"].createElement(react_highlight_1["default"], { language: "javascript" }, "\nfunction $initHighlight(block, cls) {\n  try {\n    if (cls.search(/\bno-highlight\b/) != -1)\n      return process(block, true, 0x0F) +\n              class=\"233\";\n  } catch (e) {\n    /* handle exception */\n  }\n  for (var i = 0 / 2; i < classes.length; i++) {\n    if (checkCondition(classes[i]) === undefined)\n      console.log('undefined');\n  }\n\n  return (\n    <div>\n      <web-component>{block}</web-component>\n    </div>\n  )\n}\n\nexport  $initHighlight;\n\n"))));
};
exports["default"] = CodeArea;
var TopRightContainer = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  height: 100%;\n  float: right;\n  padding-right:14px;\n"], ["\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  height: 100%;\n  float: right;\n  padding-right:14px;\n"])));
var TopLeftContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"])));
var BlurContainer = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 40px;\n  //mask: linear-gradient(180deg, ", ", transparent);\n  // backdrop-filter: saturate(180%) blur(5px);\n  // -webkit-mask: linear-gradient(to bottom,#000000 80%,#00000080 100%);\n  z-index:1\n"], ["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 40px;\n  //mask: linear-gradient(180deg, ", ", transparent);\n  // backdrop-filter: saturate(180%) blur(5px);\n  // -webkit-mask: linear-gradient(to bottom,#000000 80%,#00000080 100%);\n  z-index:1\n"])), function (p) { return p.theme.colors.main_top_bg_blur; });
var TopNav = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    height:100%;\n    width:100%;\n\n"], ["\n    height:100%;\n    width:100%;\n\n"])));
var Container = styled_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    //height: 100%;\n    height:", ";\n    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;\n    // min-height:50px;\n    //background:blue;\n    display: flex;\n    flex-direction: column;\n    box-shadow:0px -1px 0px ", ";\n    background:", ";\n    z-index:1;\n    position:relative;\n    //flex:4;\n"], ["\n    //height: 100%;\n    height:", ";\n    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;\n    // min-height:50px;\n    //background:blue;\n    display: flex;\n    flex-direction: column;\n    box-shadow:0px -1px 0px ", ";\n    background:", ";\n    z-index:1;\n    position:relative;\n    //flex:4;\n"])), function (p) { return p.isExpanded ? '350px' : '40px'; }, function (p) { return p.theme.colors.adb_border; }, function (p) { return p.theme.colors.main_bottom_bg; });
var ScrollContainer = styled_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    width: calc(100% - 28px);\n    height: 100%;\n    margin-top: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    //margin-bottom: 12px;\n    overflow-y: scroll;\n    outline: none;\n    /* width */\n    ::-webkit-scrollbar {\n      width: 6px;\n    }\n\n    ::-webkit-scrollbar-track {\n      box-shadow: inset 0 0 14px 14px transparent;\n      border: solid 4px transparent;\n    }\n    \n    ::-webkit-scrollbar-thumb {\n      // box-shadow: inset 0 0 14px 14px #bbbbbe;\n      // border: solid 4px transparent;\n      background:", ";\n      border-radius: 100px;\n    }\n\n\n"], ["\n    width: calc(100% - 28px);\n    height: 100%;\n    margin-top: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    //margin-bottom: 12px;\n    overflow-y: scroll;\n    outline: none;\n    /* width */\n    ::-webkit-scrollbar {\n      width: 6px;\n    }\n\n    ::-webkit-scrollbar-track {\n      box-shadow: inset 0 0 14px 14px transparent;\n      border: solid 4px transparent;\n    }\n    \n    ::-webkit-scrollbar-thumb {\n      // box-shadow: inset 0 0 14px 14px #bbbbbe;\n      // border: solid 4px transparent;\n      background:", ";\n      border-radius: 100px;\n    }\n\n\n"])), function (p) { return p.theme.colors.adb_border; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
