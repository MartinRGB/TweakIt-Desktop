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
var CubicBezierExtend_1 = require("@Components/Solver/Calculator/CubicBezierExtend");
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
        return _super.call(this) || this;
    }
    return Linear;
}(CubicBezierExtend_1.FluentLinear));
var Standard = /** @class */ (function (_super) {
    __extends(Standard, _super);
    function Standard() {
        return _super.call(this) || this;
    }
    return Standard;
}(CubicBezierExtend_1.FluentStandard));
var Accelerate = /** @class */ (function (_super) {
    __extends(Accelerate, _super);
    function Accelerate() {
        return _super.call(this) || this;
    }
    return Accelerate;
}(CubicBezierExtend_1.FluentAccelerate));
var Decelerate = /** @class */ (function (_super) {
    __extends(Decelerate, _super);
    function Decelerate() {
        return _super.call(this) || this;
    }
    return Decelerate;
}(CubicBezierExtend_1.FluentDecelerate));
var Fluent = {
    Linear: Linear,
    Standard: Standard,
    Accelerate: Accelerate,
    Decelerate: Decelerate
};
exports["default"] = Fluent;
