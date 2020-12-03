"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@emotion/core");
var styled_1 = require("@emotion/styled");
require("@Context/i18nContext");
var MainButtonToggle_1 = require("@Components/MainButtonToggle");
var MainButtonNormal_1 = require("@Components/MainButtonNormal");
var icons_1 = require("@Assets/icons");
var CodeTemplate_1 = require("./CodeTemplate");
var TerminalTemplate_1 = require("./TerminalTemplate");
var react_i18next_1 = require("react-i18next");
var CopyToast_1 = require("./CopyToast");
var CodeArea = react_1.memo(function (_a) {
    //const [colorMode] = useColorMode();
    var children = _a.children;
    react_i18next_1.useTranslation();
    var _b = react_1.useState(true), isExpanded = _b[0], setCodeIsExpand = _b[1];
    var _c = react_1.useState(false), isShowCodeBloc = _c[0], setIsShowCodeBloc = _c[1];
    var _d = react_1.useState(''), activeName = _d[0], setActiveName = _d[1];
    //,"Flutter","Smartisan"
    var IconStr = ["Android", "iOS", "Web", "Flutter", "Smartisan", "Data"];
    var _e = react_1.useState(false), copyState = _e[0], setCopyState = _e[1];
    var PlatformIcon;
    //const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    var toastRef = react_1.useRef();
    function selectCodeContentAndCopy() {
        var code_content = document.getElementById("code_content");
        var range = document.createRange();
        range.selectNodeContents(code_content);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        toastRef.current.startAnimation(true);
        var removeTimeOut = setTimeout(function () {
            sel.removeAllRanges();
            toastRef.current.startAnimation(false);
            setCopyState(false);
            clearTimeout(removeTimeOut);
        }, 1200);
    }
    var ContentOnKeyDown = function (e) {
        e.preventDefault();
    };
    return (react_1["default"].createElement(Container, { isExpanded: isExpanded },
        react_1["default"].createElement(CopyToast_1["default"], { ref: toastRef }),
        react_1["default"].createElement(TopNav, null,
            react_1["default"].createElement(TopLeftContainer, null,
                IconStr.map(function (data, index) {
                    //var currIcon = Icons[(iCon[index].replace(/\s/g, "")!)];
                    PlatformIcon = icons_1["default"][(IconStr[index].replace(/\s/g, ""))];
                    return (react_1["default"].createElement(MainButtonToggle_1["default"], { buttonCSS: core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                        > button {\n                          width:100%;\n                          border-radius:2px;\n                          display: nline-flex;\n                          padding-left: 4px;\n                          padding-right: 6px;\n                          align-items: center;\n                          margin-right: 8px;\n                          height: 16px;\n                          > svg{\n                            top: 0px;\n                            left:3px;\n                          }\n                        }\n                      "], ["\n                        > button {\n                          width:100%;\n                          border-radius:2px;\n                          display: nline-flex;\n                          padding-left: 4px;\n                          padding-right: 6px;\n                          align-items: center;\n                          margin-right: 8px;\n                          height: 16px;\n                          > svg{\n                            top: 0px;\n                            left:3px;\n                          }\n                        }\n                      "]))), onClick: function () {
                            setActiveName(IconStr[index]);
                            setIsShowCodeBloc(false);
                        }, active: activeName === IconStr[index] && isExpanded && !isShowCodeBloc, key: 'CodeButton' + '_' + index },
                        react_1["default"].createElement(PlatformIcon, { style: {
                                position: "absolute",
                                top: "0px",
                                left: "3px"
                            } }),
                        react_1["default"].createElement(CustomSpan, null, IconStr[index])));
                }),
                react_1["default"].createElement(MainButtonNormal_1["default"], { parentStyle: {
                        height: "16px",
                        flex: "1",
                        display: "flex"
                    }, style: {
                        width: "52px",
                        borderRadius: "2px",
                        display: "inline-flex",
                        paddingLeft: "4px",
                        paddingRight: "6px",
                        alignItems: "center",
                        marginRight: "8px",
                        marginLeft: "4px"
                    }, buttonCSS: core_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                  height:16px;\n                  flex:1\n                  display:flex;\n                  > button{\n                    width:52px;\n                    height:16px;\n                    border-radius:2px;\n                    display: inline-flex;\n                    padding-left: 4px;\n                    padding-right: 6px;\n                    align-items: center;\n                    margin-right:8px;\n                  }\n                "], ["\n                  height:16px;\n                  flex:1\n                  display:flex;\n                  > button{\n                    width:52px;\n                    height:16px;\n                    border-radius:2px;\n                    display: inline-flex;\n                    padding-left: 4px;\n                    padding-right: 6px;\n                    align-items: center;\n                    margin-right:8px;\n                  }\n                "]))), onClick: function () {
                        if (!copyState && isExpanded) {
                            selectCodeContentAndCopy();
                            setCopyState(true);
                        }
                    } },
                    react_1["default"].createElement(icons_1["default"].Copy, { style: {
                            position: "absolute",
                            top: "0px",
                            left: "7px"
                        } }),
                    react_1["default"].createElement(CustomSpan, { style: {} },
                        react_1["default"].createElement(react_i18next_1.Trans, null, "Copy")))),
            react_1["default"].createElement(TopRightContainer, null,
                react_1["default"].createElement(MainButtonToggle_1["default"], { parentStyle: {
                        height: "16px",
                        flex: "1",
                        display: "flex",
                        marginLeft: "8px"
                    }, style: {}, buttonCSS: core_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                height:16px;\n                flex:1\n                display:flex;\n                >button{\n                  width:24px;\n                  height:16px;\n                  border-radius:2px;\n                }\n              "], ["\n                height:16px;\n                flex:1\n                display:flex;\n                >button{\n                  width:24px;\n                  height:16px;\n                  border-radius:2px;\n                }\n              "]))), onClick: function () {
                        setCodeIsExpand(!isExpanded);
                        setActiveName('');
                        if (!isExpanded) {
                            setIsShowCodeBloc(false);
                        }
                    }, active: isExpanded },
                    react_1["default"].createElement(icons_1["default"].CollapsedArrowAlertNative, { style: {
                            transform: "rotate(" + (isExpanded ? '0deg' : '180deg') + ")",
                            transition: "all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s",
                            position: "absolute",
                            top: "0px",
                            left: "4px"
                        } })),
                react_1["default"].createElement(MainButtonToggle_1["default"], { active: isShowCodeBloc && isExpanded, parentStyle: {
                        height: "16px",
                        flex: "1",
                        display: "flex",
                        marginLeft: "8px"
                    }, style: {}, buttonCSS: core_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n                height:16px;\n                flex:1\n                display:flex;\n                >button{\n                  width:100%;\n                  border-radius:2px;\n                  display: nline-flex;\n                  padding-left: 4px;\n                  padding-right: 6px;\n                  align-items: center;\n                  height: 16px;\n                }\n              "], ["\n                height:16px;\n                flex:1\n                display:flex;\n                >button{\n                  width:100%;\n                  border-radius:2px;\n                  display: nline-flex;\n                  padding-left: 4px;\n                  padding-right: 6px;\n                  align-items: center;\n                  height: 16px;\n                }\n              "]))), onClick: function () {
                        setIsShowCodeBloc(true);
                        setActiveName('');
                    } },
                    react_1["default"].createElement(icons_1["default"].Terminal, { style: {
                            position: "absolute",
                            top: "0px",
                            left: "3px"
                        } }),
                    react_1["default"].createElement(CustomSpan, null, "Console")))),
        react_1["default"].createElement(ScrollContainer, { onKeyDown: function (e) { return ContentOnKeyDown(e); }, id: "code_content", contentEditable: true, suppressContentEditableWarning: true }, isShowCodeBloc ?
            react_1["default"].createElement(TerminalTemplate_1["default"], null)
            :
                react_1["default"].createElement(CodeTemplate_1["default"], { name: activeName, isActive: isExpanded && !isShowCodeBloc }))));
});
exports["default"] = CodeArea;
var TopRightContainer = styled_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  height: 100%;\n  float: right;\n  padding-right:14px;\n"], ["\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: center;\n  height: 100%;\n  float: right;\n  padding-right:14px;\n"])));
var TopLeftContainer = styled_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"])));
var TopNav = styled_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    height:100%;\n    width:100%;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    height: 40px;\n\n"], ["\n    height:100%;\n    width:100%;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    height: 40px;\n\n"])));
var Container = styled_1["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    //height: 100%;\n    height:", ";\n    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;\n    // min-height:50px;\n    //background:blue;\n    display: flex;\n    flex-direction: column;\n    box-shadow:0px -1px 0px ", ";\n    background:", ";\n    z-index:1;\n    position:relative;\n    //flex:4;\n"], ["\n    //height: 100%;\n    height:", ";\n    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;\n    // min-height:50px;\n    //background:blue;\n    display: flex;\n    flex-direction: column;\n    box-shadow:0px -1px 0px ", ";\n    background:", ";\n    z-index:1;\n    position:relative;\n    //flex:4;\n"])), function (p) { return p.isExpanded ? '280px' : '40px'; }, function (p) { return p.theme.colors.adb_border; }, function (p) { return p.theme.colors.main_bottom_bg; });
var ScrollContainer = styled_1["default"].div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    width: calc(100% - 28px);\n    height: 100%;\n    margin-top: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    //margin-bottom: 12px;\n    overflow-y: scroll;\n    outline: none;\n    /* width */\n    ::-webkit-scrollbar {\n      width: 8px;\n    }\n\n    font-family:", ";\n    font-size:12px;\n\n    // ::-webkit-scrollbar-track {\n    //   box-shadow: inset 0 0 14px 14px transparent;\n    //   border: solid 4px transparent;\n    // }\n    \n    ::-webkit-scrollbar-thumb {\n      // box-shadow: inset 0 0 14px 14px #bbbbbe;\n      // border: solid 4px transparent;\n      background:", ";\n      //border-radius: 100px;\n      border-bottom: 14px ", " solid;\n      background-clip: padding-box;\n      transition:all 0.3s;\n    }\n\n    ::-webkit-scrollbar-thumb:hover {\n      background:", "\n    }\n"], ["\n    width: calc(100% - 28px);\n    height: 100%;\n    margin-top: 40px;\n    margin-left: auto;\n    margin-right: auto;\n    //margin-bottom: 12px;\n    overflow-y: scroll;\n    outline: none;\n    /* width */\n    ::-webkit-scrollbar {\n      width: 8px;\n    }\n\n    font-family:", ";\n    font-size:12px;\n\n    // ::-webkit-scrollbar-track {\n    //   box-shadow: inset 0 0 14px 14px transparent;\n    //   border: solid 4px transparent;\n    // }\n    \n    ::-webkit-scrollbar-thumb {\n      // box-shadow: inset 0 0 14px 14px #bbbbbe;\n      // border: solid 4px transparent;\n      background:", ";\n      //border-radius: 100px;\n      border-bottom: 14px ", " solid;\n      background-clip: padding-box;\n      transition:all 0.3s;\n    }\n\n    ::-webkit-scrollbar-thumb:hover {\n      background:", "\n    }\n"])), function (p) { return p.theme.fonts.monospace; }, function (p) { return p.theme.colors.adb_border; }, function (p) { return p.theme.colors.main_bottom_bg; }, function (p) { return p.theme.colors.text; });
var CustomSpan = styled_1["default"].span(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    text-align: center;\n    font-family: ", ";\n    font-style: normal;\n    font-weight: bold;\n    font-size: 11px;\n    line-height: 14px;\n    margin-left:16px;\n"], ["\n    text-align: center;\n    font-family: ", ";\n    font-style: normal;\n    font-weight: bold;\n    font-size: 11px;\n    line-height: 14px;\n    margin-left:16px;\n"])), function (props) { return props.theme.fonts.numberInput; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
