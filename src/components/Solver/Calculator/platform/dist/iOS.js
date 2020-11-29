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
var SpringAnimationExtend_1 = require("@Components/Solver/Calculator/type/SpringAnimationExtend");
var CubicBezierExtend_1 = require("@Components/Solver/Calculator/type/CubicBezierExtend");
var UIViewSpring = /** @class */ (function (_super) {
    __extends(UIViewSpring, _super);
    function UIViewSpring(dampingratio, duration) {
        return _super.call(this, dampingratio, duration) || this;
    }
    return UIViewSpring;
}(SpringAnimationExtend_1.iOSUIViewSpring));
var CASpring = /** @class */ (function (_super) {
    __extends(CASpring, _super);
    function CASpring(stiffness, damping, mass, velocity) {
        return _super.call(this, stiffness, damping, mass, velocity) || this;
    }
    return CASpring;
}(SpringAnimationExtend_1.iOSCASpring));
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Linear;
}(CubicBezierExtend_1.CubicBezier));
var EaseIn = /** @class */ (function (_super) {
    __extends(EaseIn, _super);
    function EaseIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseIn;
}(CubicBezierExtend_1.CubicBezier));
var EaseOut = /** @class */ (function (_super) {
    __extends(EaseOut, _super);
    function EaseOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOut;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOut = /** @class */ (function (_super) {
    __extends(EaseInOut, _super);
    function EaseInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOut;
}(CubicBezierExtend_1.CubicBezier));
var iOS = {
    UIViewSpring: UIViewSpring, CASpring: CASpring, Linear: Linear, EaseIn: EaseIn, EaseOut: EaseOut, EaseInOut: EaseInOut
};
exports["default"] = iOS;
