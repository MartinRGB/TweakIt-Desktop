"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CubicBezierExtend_1 = require("@Components/Solver/Calculator/type//CubicBezierExtend");
var DoubleCubicBezierExtend_1 = require("@Components/Solver/Calculator/type//DoubleCubicBezierExtend");
var CustomCubicBezier = /** @class */ (function (_super) {
    __extends(CustomCubicBezier, _super);
    function CustomCubicBezier(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CustomCubicBezier;
}(CubicBezierExtend_1.CubicBezier));
var CustomDoubleCubicBezier = /** @class */ (function (_super) {
    __extends(CustomDoubleCubicBezier, _super);
    function CustomDoubleCubicBezier(b1x, b1y, b2x, b2y, a1x, a1y, a2x, a2y, bpX, bpY) {
        return _super.call(this, b1x, b1y, b2x, b2y, a1x, a1y, a2x, a2y, bpX, bpY) || this;
    }
    return CustomDoubleCubicBezier;
}(DoubleCubicBezierExtend_1.DoubleCubicBezier));
var BezierCurve = {
    CustomCubicBezier: CustomCubicBezier, CustomDoubleCubicBezier: CustomDoubleCubicBezier
};
exports["default"] = BezierCurve;
