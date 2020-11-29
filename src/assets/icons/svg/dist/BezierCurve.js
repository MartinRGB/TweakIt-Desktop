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
var BezierCurve = function (_a) {
    var style = _a.style;
    return (react_1["default"].createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", style: __assign({}, style), xmlns: "http://www.w3.org/2000/svg" },
        react_1["default"].createElement("path", { d: "M11.955 4h-1.23v1.23h.369c.01.234.012 1.277-.675 2.03-.498.545-1.255.822-2.249.822-3.332 0-3.715 3.208-3.753 3.688H4V13h1.23v-1.23h-.403c.039-.506.386-3.279 3.343-3.279 1.114 0 1.973-.321 2.552-.955.777-.851.795-1.986.782-2.306h.451V4zm-6.862 8.863h-.956v-.956h.956v.956zm6.726-7.77h-.957v-.956h.957v.956z" }),
        react_1["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.455 3.5v2.23h-.467c-.053.568-.247 1.432-.897 2.143-.7.766-1.71 1.118-2.921 1.118-1.285 0-1.958.585-2.339 1.21-.224.368-.35.758-.421 1.07h.32V13.5H3.5v-2.23h.48c.08-.45.258-1.128.65-1.781.593-.99 1.674-1.907 3.54-1.907.904 0 1.506-.25 1.88-.66.336-.367.468-.837.518-1.192h-.342V3.5h2.23zm-.5.5h-1.23v1.23h.369a3.086 3.086 0 01-.022.5c-.052.432-.207 1.042-.652 1.53-.499.545-1.256.822-2.25.822-2.849 0-3.541 2.344-3.706 3.325a4.43 4.43 0 00-.047.363H4V13h1.23v-1.23h-.403a4.015 4.015 0 01.072-.5c.193-.96.876-2.779 3.271-2.779 1.114 0 1.973-.321 2.552-.955.588-.644.741-1.45.776-1.943a3.64 3.64 0 00.006-.363h.451V4zm-.136 1.093v-.956h-.957v.956h.957zm-7.682 6.814v.956h.956v-.956h-.956z" })));
};
exports["default"] = BezierCurve;
