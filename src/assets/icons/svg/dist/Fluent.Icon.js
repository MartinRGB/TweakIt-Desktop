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
var Fluent = function (_a) {
    var style = _a.style;
    return (react_1["default"].createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", style: __assign({}, style), xmlns: "http://www.w3.org/2000/svg" },
        react_1["default"].createElement("path", { d: "M3 3.313C3 3.14 3.14 3 3.313 3h4.374v4.688H3V3.313zM8.313 3h4.374c.173 0 .313.14.313.313v4.374H8.312V3zM3 8.313v4.374c0 .173.14.313.313.313h4.374V8.312H3zM8.313 13V8.312H13v4.376c0 .172-.14.312-.313.312H8.314z" })));
};
exports["default"] = Fluent;
