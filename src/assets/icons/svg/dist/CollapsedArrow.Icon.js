"use strict";
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
var CollapsedArrow = function (_a) {
    var style = _a.style;
    return (react_1["default"].createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", style: __assign({}, style), xmlns: "http://www.w3.org/2000/svg" },
        react_1["default"].createElement("path", { d: "M5 12.663l7.333-4.666L5 3.33v9.333z" })));
};
exports["default"] = CollapsedArrow;
