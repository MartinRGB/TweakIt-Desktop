"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var theme_ui_1 = require("theme-ui");
var styled_1 = require("@emotion/styled");
var core_1 = require("@emotion/core");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var MainButtonNormal_1 = require("@Components/MainButtonNormal");
var DropDownMenu_1 = require("@Components/DropDownMenu");
var ADBConnectContext_1 = require("@Context/ADBConnectContext");
var app = window.require('electron').remote.app;
var childProcess = require('child_process');
var exec = childProcess.exec;
var fs = require("fs");
var appPath = app.getAppPath().replace(/ /g, "\\ ");
var localNodePath = appPath + '/node_modules/';
var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
var localScrcpyBinPath = localAssetsPath + 'scrcpy/1.16/bin/';
var ADBPath = '~/Library/Android/sdk/platform-tools'; ///usr/local/bin
var ScrcpyBinPath = '/usr/local/Cellar/scrcpy/1.12.1/bin';
var getUserHome = function () {
    return process.env.HOME || process.env.USERPROFILE;
};
var injectTempEnv = function () {
    process.env.PATH = '/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:' +
        localNodePath + '.bin' + ':' +
        ADBPath.substring(0, localADBPath.length - 1) + ':' +
        ScrcpyBinPath.substring(0, localScrcpyBinPath.length - 1) + ':' +
        '/usr/bin:' +
        '/bin:' +
        '/usr/local/sbin:' +
        '/usr/local/bin:' +
        '/usr/sbin:' +
        '/sbin:' +
        '/opt/puppetlabs/bin:' +
        '/usr/local/munki:' +
        '/Library/Apple/usr/bin:';
};
injectTempEnv();
var execCMDPromise = function (cmd, log, successCallback, errorCallback) {
    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            if (errorCallback) {
                errorCallback(error);
            }
            return;
        }
        console.log(log + ':\n' + stdout);
        if (successCallback) {
            successCallback(stdout);
        }
    });
};
var execCMD = function (cmd, log, successCallback, errorCallback) {
    var promise = new Promise(function (resolve, reject) {
        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
    promise.then(function (value) {
        console.log(log + ':\n' + value);
        if (successCallback) {
            successCallback(value);
        }
        // success                       
    })["catch"](function (error) {
        console.error('error: ' + error);
        if (errorCallback) {
            errorCallback(error);
        }
        // failure                       
    });
};
var SelectArea = react_1.memo(function (_a) {
    var children = _a.children;
    var _b = react_i18next_1.useTranslation(), t = _b.t, i18n = _b.i18n;
    var colorMode = theme_ui_1.useColorMode()[0];
    var _c = react_1.useContext(ADBConnectContext_1.ADBConnectStateContext), setADBTerminalText = _c.setADBTerminalText, adbTerminalText = _c.adbTerminalText, adbInfoTimes = _c.adbInfoTimes, setADBInfoTimes = _c.setADBInfoTimes, setADBTagStartText = _c.setADBTagStartText, setADBCommandText = _c.setADBCommandText, setADBTagEndText = _c.setADBTagEndText, setADBCommandIsSuccess = _c.setADBCommandIsSuccess, setADBResultText = _c.setADBResultText;
    var cmdWithConsole = function (cmd) {
        execCMD(cmd, "input command is " + cmd, function (value) {
            setADBTerminalText(adbTerminalText + '\n' +
                ("=================== Result Start At " + new Date().toString() + " ===================") + '\n' +
                '\n' +
                ("Command '" + cmd + "' result is: ") + '\n' +
                '\n' +
                value + '\n' +
                ("=================== Result End At " + new Date().toString() + " ===================") + '\n');
            console.log(value);
            setADBInfoTimes(adbInfoTimes + 1);
            setADBTagStartText("=================== Result Start At " + new Date().toString() + " ===================" + '\n' +
                '\n');
            setADBCommandText("Command '" + cmd + "' result is: " + '\n' + '\n');
            setADBCommandIsSuccess(true);
            setADBResultText(value + '\n');
            setADBTagEndText("=================== Result End At " + new Date().toString() + " ===================" + '\n');
        }, function (value) {
            setADBTerminalText(adbTerminalText + '\n' +
                ("=================== Result Start At " + new Date().toString() + " ===================") + '\n' +
                '\n' +
                ("Command '" + cmd + "' not found: ") + '\n' +
                '\n' +
                value + '\n' +
                ("=================== Result End At " + new Date().toString() + " ===================") + '\n');
            setADBInfoTimes(adbInfoTimes + 1);
            setADBTagStartText("=================== Result Start At " + new Date().toString() + " ===================" + '\n' +
                '\n');
            setADBCommandText("Command '" + cmd + "' not found: " + '\n' + '\n');
            setADBCommandIsSuccess(false);
            setADBResultText(value + '\n');
            setADBTagEndText("=================== Result End At " + new Date().toString() + " ===================" + '\n');
            console.log(value);
        });
    };
    window.execCMD = function (str) { return cmdWithConsole(str); };
    var getMessageFromDevice = function () { };
    var postMessageToDevice = function () { };
    var optionsData = [
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" },
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" },
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" },
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" },
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" },
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" },
    ];
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement(TopLeftContainer, null,
            react_1["default"].createElement(TitleSpan, null,
                react_1["default"].createElement(react_i18next_1.Trans, null, "Select Animation In Tweakit-Android")),
            react_1["default"].createElement(DropDownMenu_1["default"], { optionsData: optionsData, menuWidth: 240, isRichAnimation: true }),
            react_1["default"].createElement(MainButtonNormal_1["default"], { buttonCSS: core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n              margin-left:12px;\n              margin-right:12px;\n              height:20px;\n              margin-top:-6px;\n              > button{\n                display:inline-block;\n                height:20px;\n                width:40px;\n              }\n            "], ["\n              margin-left:12px;\n              margin-right:12px;\n              height:20px;\n              margin-top:-6px;\n              > button{\n                display:inline-block;\n                height:20px;\n                width:40px;\n              }\n            "]))), onClick: getMessageFromDevice },
                react_1["default"].createElement(CustomSpan, null,
                    react_1["default"].createElement(react_i18next_1.Trans, null, "Get"))),
            react_1["default"].createElement(MainButtonNormal_1["default"], { buttonCSS: core_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              margin-right:12px;\n              height:20px;\n              margin-top:-6px;\n              > button{\n                display:inline-block;\n                height:20px;\n                width:40px;\n              }\n            "], ["\n              margin-right:12px;\n              height:20px;\n              margin-top:-6px;\n              > button{\n                display:inline-block;\n                height:20px;\n                width:40px;\n              }\n            "]))), onClick: postMessageToDevice },
                react_1["default"].createElement(CustomSpan, null,
                    react_1["default"].createElement(react_i18next_1.Trans, null, "Build"))))));
});
exports["default"] = SelectArea;
var Container = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width:100%;\n  height: 56px;\n  min-height:56px;\n  display: flex;\n  flex-direction: column;\n  z-index:2;\n  background:", ";\n  box-shadow: 0px 1px 0px ", ";\n"], ["\n  width:100%;\n  height: 56px;\n  min-height:56px;\n  display: flex;\n  flex-direction: column;\n  z-index:2;\n  background:", ";\n  box-shadow: 0px 1px 0px ", ";\n"])), function (p) { return p.theme.colors.main_top_bg; }, function (p) { return p.theme.colors.adb_border; });
var TopLeftContainer = styled_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  float: left;\n  padding-left:14px;\n"])));
var TitleSpan = styled_1["default"].p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  text-align:left;\n  width:201px;\n  min-width:201px;\n  opacity:0.5;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 20px;\n  user-select: none;\n  margin-right:12px;\n  color:", ";\n  z-index:1;\n"], ["\n  text-align:left;\n  width:201px;\n  min-width:201px;\n  opacity:0.5;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 20px;\n  user-select: none;\n  margin-right:12px;\n  color:", ";\n  z-index:1;\n"])), function (props) { return props.theme.fonts.headText; }, function (p) { return p.theme.colors.text; });
var CustomSpan = styled_1["default"].span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  text-align: center;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: bold;\n  font-size: 10px;\n  line-height: 14px;\n  color:", ";\n"], ["\n  text-align: center;\n  font-family: ", ";\n  font-style: normal;\n  font-weight: bold;\n  font-size: 10px;\n  line-height: 14px;\n  color:", ";\n"])), function (props) { return props.theme.fonts.numberInput; }, function (p) { return p.theme.colors.primary; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
