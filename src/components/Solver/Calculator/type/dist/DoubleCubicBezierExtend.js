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
exports.FastOutExtraSlowInInterpolator = exports.DoubleCubicBezier = void 0;
var BaseCalculator_1 = require("@Components/Solver/Calculator/BaseCalculator");
var DoubleCubicBezier = /** @class */ (function (_super) {
    __extends(DoubleCubicBezier, _super);
    function DoubleCubicBezier(b1x, b1y, b2x, b2y, a1x, a1y, a2x, a2y, bpX, bpY) {
        return _super.call(this, b1x, b1y, b2x, b2y, a1x, a1y, a2x, a2y, bpX, bpY) || this;
    }
    return DoubleCubicBezier;
}(BaseCalculator_1.DoubleCubicBezierCalculator));
exports.DoubleCubicBezier = DoubleCubicBezier;
var FastOutExtraSlowInInterpolator = /** @class */ (function (_super) {
    __extends(FastOutExtraSlowInInterpolator, _super);
    function FastOutExtraSlowInInterpolator(b1x, b1y, b2x, b2y, a1x, a1y, a2x, a2y, bpX, bpY) {
        return _super.call(this, b1x, b1y, b2x, b2y, a1x, a1y, a2x, a2y, bpX, bpY) || this;
    }
    return FastOutExtraSlowInInterpolator;
}(BaseCalculator_1.DoubleCubicBezierCalculator));
exports.FastOutExtraSlowInInterpolator = FastOutExtraSlowInInterpolator;
