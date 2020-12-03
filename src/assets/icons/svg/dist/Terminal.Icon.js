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
var Terminal = function (_a) {
    var style = _a.style;
    return (react_1["default"].createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", style: __assign({}, style), xmlns: "http://www.w3.org/2000/svg" },
        react_1["default"].createElement("path", { d: "M5.707 10L5 9.293l1.146-1.146L5 7l.707-.707 1.854 1.854L5.707 10zM11 10H8V9h3v1z" }),
        react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3 11a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v6zm1.25-.25V5.2l7.5.05v5.5h-7.5z" })));
};
exports["default"] = Terminal;
