"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var react_spring_1 = require("react-spring");
var animation_json_1 = require("@Config/animation.json");
var icons_1 = require("@Assets/icons");
var DropDownMenu = react_1.memo(function (_a) {
    var optionsData = _a.optionsData, menuWidth = _a.menuWidth, isRichAnimation = _a.isRichAnimation;
    var _b = theme_ui_1.useColorMode(), colorMode = _b[0], setColorMode = _b[1];
    var _c = react_1.useState('select...'), selectedText = _c[0], setSelectedText = _c[1];
    var _d = react_1.useState(-1), selectIndex = _d[0], setSelectIndex = _d[1];
    var _e = react_1.useState(false), selectExpand = _e[0], setSelectExpand = _e[1];
    var _f = react_1.useState(0), selectAnimationProgress = _f[0], setSelectAnimationProgress = _f[1];
    var _g = react_1.useState(false), selectExpandAnimate = _g[0], setSelectExpandAnimate = _g[1];
    var _h = react_1.useState(false), opacityTransitionIn = _h[0], setOpacityTransitionIn = _h[1];
    var menuPadding = 6;
    var menuListNum = optionsData.length;
    var listHeight = 20;
    var onClickSelect = function () {
        if (onClickListExpandTimeOut) {
            clearTimeout(onClickListExpandTimeOut);
        }
        if (onExpandAnimationEndTimeOut) {
            clearTimeout(onExpandAnimationEndTimeOut);
        }
        if (!selectExpand) {
            setSelectExpandAnimate(true);
            setSelectExpand(true);
            setOpacityTransitionIn(true);
        }
        else {
            setSelectExpandAnimate(false);
        }
    };
    var onClickListExpandTimeOut;
    var onClickList = function (index, value) {
        if (onClickListExpandTimeOut) {
            clearTimeout(onClickListExpandTimeOut);
        }
        if (onExpandAnimationEndTimeOut) {
            clearTimeout(onExpandAnimationEndTimeOut);
        }
        console.log(value);
        setSelectIndex(index);
        setSelectedText(value);
        if (selectExpand) {
            onClickListExpandTimeOut = setTimeout(function () {
                setSelectExpandAnimate(false);
                clearTimeout(onClickListExpandTimeOut);
            }, 150);
        }
    };
    var onExpandAnimationEndTimeOut;
    var listProps = react_spring_1.useSpring({
        listProps: selectExpandAnimate ? 1 : 0,
        config: animation_json_1["default"].select_drop_down,
        onStart: function () {
        },
        onFrame: function () {
            setSelectAnimationProgress(listProps.value);
        },
        onRest: function () {
            if (!selectExpandAnimate) {
                setOpacityTransitionIn(false);
                onExpandAnimationEndTimeOut = setTimeout(function () {
                    setSelectExpand(false);
                    clearTimeout(onExpandAnimationEndTimeOut);
                }, 150);
            }
        }
    }).listProps;
    return (react_1["default"].createElement(CustomSelectWrapper, { style: { width: menuWidth + "px" } },
        react_1["default"].createElement(CustomSelect, { onClick: onClickSelect },
            react_1["default"].createElement(CustomSelectedSpan, null, selectedText),
            react_1["default"].createElement(icons_1["default"].SelectArrow, null)),
        selectExpand ?
            react_1["default"].createElement(DropDownMenuConatiner, { style: {
                    width: menuWidth + "px",
                    height: Math.max(0, (selectIndex === -1 || !isRichAnimation) ?
                        (0 + selectAnimationProgress * (menuPadding * 2 + menuListNum * listHeight - 0))
                        :
                            (20 + selectAnimationProgress * (menuPadding * 2 + menuListNum * listHeight - 20))) + "px",
                    padding: menuPadding * selectAnimationProgress + "px 0px",
                    borderWidth: selectAnimationProgress + "px",
                    display: "" + (selectExpand ? 'block' : 'none'),
                    transform: "" + (isRichAnimation ? "translate3d(0px," + ((selectIndex === -1) ? 0 : selectAnimationProgress * 21 - 21) + "px,0px)" : '')
                } },
                react_1["default"].createElement(DropDownBackground, { style: {
                        opacity: "" + (opacityTransitionIn ? '1' : '0')
                    } }),
                react_1["default"].createElement(DropDownTransitionDiv, { style: {
                        transform: "" + (isRichAnimation ? "translate3d(" + (19 * selectAnimationProgress - 19) + "px," + ((selectIndex === -1) ? 0 : -selectIndex * listHeight + selectAnimationProgress * (selectIndex * listHeight)) + "px,0px)" : '')
                    } }, optionsData.map(function (data, index) {
                    return (react_1["default"].createElement(DropDownListContainer, { style: {
                            display: "" + (selectExpand ? 'block' : 'none'),
                            height: listHeight + "px"
                        }, key: index, onClick: function () { onClickList(index, data.value); } },
                        react_1["default"].createElement(DropDownListBackground, null,
                            react_1["default"].createElement(icons_1["default"].CheckMark, { style: {
                                    position: "absolute",
                                    top: "2px",
                                    left: "8px",
                                    transform: "" + ((selectIndex === index) ? 'scale3d(1,1,1)' : 'scale(0,0,0)'),
                                    opacity: "" + ((selectIndex === index) ? selectAnimationProgress : '0')
                                } }),
                            react_1["default"].createElement(DropDownListSpan, { style: {
                                    opacity: "" + ((selectIndex === index) ? '1' : ''),
                                    transform: "" + ((selectIndex === index) ? 'scale3d(1.2,1.2,1)' : '')
                                } }, data.value))));
                })))
            :
                ''));
});
var DropDownMenuConatiner = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position:absolute;\n  top: 20px;\n  left: -1px;\n  height:0px;\n  border: 1px solid ", ";\n  border-radius:4px;\n  overflow:hidden;\n  //width:240px;\n  //transition:all 0.3s;\n  \n"], ["\n  position:absolute;\n  top: 20px;\n  left: -1px;\n  height:0px;\n  border: 1px solid ", ";\n  border-radius:4px;\n  overflow:hidden;\n  //width:240px;\n  //transition:all 0.3s;\n  \n"])), function (p) { return p.theme.colors.adb_border; });
var DropDownBackground = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width:100%;\n  height:100%;\n  background:", ";\n  backdrop-filter:blur(3px);\n  position: absolute;\n  top: 0px;\n  transition:all 0.1s;\n"], ["\n  width:100%;\n  height:100%;\n  background:", ";\n  backdrop-filter:blur(3px);\n  position: absolute;\n  top: 0px;\n  transition:all 0.1s;\n"])), function (p) { return p.theme.colors.normal_button_bg; });
var DropDownListContainer = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width:300px;\n  margin-left: 0px;\n  margin-right: 0px;\n  position: relative;\n  z-index:0;\n  cursor:pointer;\n  transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;\n  \n  // &:hover > div{\n  //   background:", ";\n  // }\n\n  // &:hover > div > svg {\n  //   fill:", ";\n  // }\n\n  &:hover > div > span{\n    transform:scale3d(1.2,1.2,1);\n    opacity:1;\n    //color:", ";\n  }\n\n  &:active > div > span{\n    transform:scale3d(1,1,1);\n    opacity:1;\n  }\n\n  > div > svg {\n    fill: ", ";\n    transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;\n  }\n"], ["\n  width:300px;\n  margin-left: 0px;\n  margin-right: 0px;\n  position: relative;\n  z-index:0;\n  cursor:pointer;\n  transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;\n  \n  // &:hover > div{\n  //   background:", ";\n  // }\n\n  // &:hover > div > svg {\n  //   fill:", ";\n  // }\n\n  &:hover > div > span{\n    transform:scale3d(1.2,1.2,1);\n    opacity:1;\n    //color:", ";\n  }\n\n  &:active > div > span{\n    transform:scale3d(1,1,1);\n    opacity:1;\n  }\n\n  > div > svg {\n    fill: ", ";\n    transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;\n  }\n"])), function (p) { return p.theme.colors.primary; }, function (p) { return p.theme.colors.background; }, function (p) { return p.theme.colors.background; }, function (p) { return p.theme.colors.text; });
var DropDownTransitionDiv = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n"], ["\n"])));
var DropDownListBackground = styled_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width:100%;\n  height:100%;\n\n  &:hover {\n    //background: ", ";\n    opacity:1;\n  }\n\n  &:hover > span {\n    //color: ", ";\n    //filter:drop-shadow(2px 4px 6px black);\n  }\n\n  &:hover > svg {\n    //fill: ", ";\n  }\n"], ["\n  width:100%;\n  height:100%;\n\n  &:hover {\n    //background: ", ";\n    opacity:1;\n  }\n\n  &:hover > span {\n    //color: ", ";\n    //filter:drop-shadow(2px 4px 6px black);\n  }\n\n  &:hover > svg {\n    //fill: ", ";\n  }\n"])), function (p) { return p.theme.colors.primary; }, function (p) { return p.theme.colors.background; }, function (p) { return p.theme.colors.background; });
var DropDownListSpan = styled_1["default"].span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color:", ";\n  font-family: ", ";\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 20px;\n  position: absolute;\n  left: 28px;\n  top: 0px;\n  user-select:none;\n  transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;\n  transform-origin: left center;\n  opacity:0.6;\n"], ["\n  color:", ";\n  font-family: ", ";\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 20px;\n  position: absolute;\n  left: 28px;\n  top: 0px;\n  user-select:none;\n  transition:all 0.25s cubic-bezier(0.03, 0.76, 0.25, 1) 0s;\n  transform-origin: left center;\n  opacity:0.6;\n"])), function (p) { return p.theme.colors.text; }, function (p) { return p.theme.fonts.headText; });
var CustomSelectWrapper = styled_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    height: 20px;\n    //width: 240px;\n    // min-width:240px;\n    position: relative;\n    border: 1px solid ", ";\n    border-radius: 4px;\n    margin-right: 32px;\n    background: ", ";\n"], ["\n    height: 20px;\n    //width: 240px;\n    // min-width:240px;\n    position: relative;\n    border: 1px solid ", ";\n    border-radius: 4px;\n    margin-right: 32px;\n    background: ", ";\n"])), function (p) { return p.theme.colors.text_input_border; }, function (p) { return p.theme.colors.normal_button_bg; });
var CustomSelect = styled_1["default"].button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    background: transparent;\n    transition:all 0.15s;\n    cursor:pointer;\n    outline:none;\n    border:none;\n\n    >svg{\n      fill: ", ";\n      position: absolute;\n      right: 1px;\n      top: 1px;\n      transition:all 0.15s;\n      z-index:1;\n    }\n\n    &:active  > span{\n      //color: ", ";\n    }\n  \n    &:active  > svg{\n      //fill: ", ";\n    }\n\n    &:active {\n      background: #a4a7a480;\n      opacity:0.5;\n    }\n"], ["\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    background: transparent;\n    transition:all 0.15s;\n    cursor:pointer;\n    outline:none;\n    border:none;\n\n    >svg{\n      fill: ", ";\n      position: absolute;\n      right: 1px;\n      top: 1px;\n      transition:all 0.15s;\n      z-index:1;\n    }\n\n    &:active  > span{\n      //color: ", ";\n    }\n  \n    &:active  > svg{\n      //fill: ", ";\n    }\n\n    &:active {\n      background: #a4a7a480;\n      opacity:0.5;\n    }\n"])), function (p) { return p.theme.colors.text; }, function (p) { return p.theme.colors.background; }, function (p) { return p.theme.colors.background; });
var CustomSelectedSpan = styled_1["default"].span(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color:", ";\n  font-family: ", ";\n  font-size: 10px;\n  transform:scale3d(1.2,1.2,1);\n  transform-origin:left center;\n  font-weight: 500;\n  line-height: 20px;\n  position: absolute;\n  left: 8px;\n  top: -1px;\n  user-select:none;\n  transition:all 0.15s;\n"], ["\n  color:", ";\n  font-family: ", ";\n  font-size: 10px;\n  transform:scale3d(1.2,1.2,1);\n  transform-origin:left center;\n  font-weight: 500;\n  line-height: 20px;\n  position: absolute;\n  left: 8px;\n  top: -1px;\n  user-select:none;\n  transition:all 0.15s;\n"])), function (p) { return p.theme.colors.text; }, function (p) { return p.theme.fonts.headText; });
exports["default"] = DropDownMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
