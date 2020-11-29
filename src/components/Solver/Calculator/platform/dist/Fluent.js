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
var CubicBezierExtend_1 = require("@Components/Solver/Calculator/type/CubicBezierExtend");
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Linear;
}(CubicBezierExtend_1.CubicBezier));
var Standard = /** @class */ (function (_super) {
    __extends(Standard, _super);
    function Standard(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Standard;
}(CubicBezierExtend_1.CubicBezier));
var Accelerate = /** @class */ (function (_super) {
    __extends(Accelerate, _super);
    function Accelerate(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Accelerate;
}(CubicBezierExtend_1.CubicBezier));
var Decelerate = /** @class */ (function (_super) {
    __extends(Decelerate, _super);
    function Decelerate(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Decelerate;
}(CubicBezierExtend_1.CubicBezier));
var Fluent = {
    Linear: Linear,
    Standard: Standard,
    Accelerate: Accelerate,
    Decelerate: Decelerate
};
exports["default"] = Fluent;
