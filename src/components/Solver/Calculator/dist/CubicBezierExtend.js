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
exports.FastOutLinearInterpolator = exports.LinearOutSlowInInterpolator = exports.FastOutSlowInInterpolator = exports.FluentDecelerate = exports.FluentAccelerate = exports.FluentStandard = exports.FluentLinear = exports.WebEase = exports.WebEaseInOut = exports.WebEaseOut = exports.WebEaseIn = exports.WebLinear = exports.iOSEaseInOut = exports.iOSEaseOut = exports.iOSEaseIn = exports.iOSLinear = exports.CubicBezier = void 0;
var BaseCalculator_1 = require("./BaseCalculator");
var CubicBezier = /** @class */ (function (_super) {
    __extends(CubicBezier, _super);
    function CubicBezier(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CubicBezier;
}(BaseCalculator_1.CubicBezierCalculator));
exports.CubicBezier = CubicBezier;
var iOSLinear = /** @class */ (function (_super) {
    __extends(iOSLinear, _super);
    function iOSLinear() {
        return _super.call(this, 0.25, 0.25, 0.75, 0.75) || this;
    }
    return iOSLinear;
}(BaseCalculator_1.CubicBezierCalculator));
exports.iOSLinear = iOSLinear;
var iOSEaseIn = /** @class */ (function (_super) {
    __extends(iOSEaseIn, _super);
    function iOSEaseIn() {
        return _super.call(this, 0.42, 0.00, 1.00, 1.00) || this;
    }
    return iOSEaseIn;
}(BaseCalculator_1.CubicBezierCalculator));
exports.iOSEaseIn = iOSEaseIn;
var iOSEaseOut = /** @class */ (function (_super) {
    __extends(iOSEaseOut, _super);
    function iOSEaseOut() {
        return _super.call(this, 0.00, 0.00, 0.58, 1.00) || this;
    }
    return iOSEaseOut;
}(BaseCalculator_1.CubicBezierCalculator));
exports.iOSEaseOut = iOSEaseOut;
var iOSEaseInOut = /** @class */ (function (_super) {
    __extends(iOSEaseInOut, _super);
    function iOSEaseInOut() {
        return _super.call(this, 0.42, 0.00, 0.58, 1.00) || this;
    }
    return iOSEaseInOut;
}(BaseCalculator_1.CubicBezierCalculator));
exports.iOSEaseInOut = iOSEaseInOut;
var WebLinear = /** @class */ (function (_super) {
    __extends(WebLinear, _super);
    function WebLinear() {
        return _super.call(this, 0.25, 0.25, 0.75, 0.75) || this;
    }
    return WebLinear;
}(BaseCalculator_1.CubicBezierCalculator));
exports.WebLinear = WebLinear;
var WebEaseIn = /** @class */ (function (_super) {
    __extends(WebEaseIn, _super);
    function WebEaseIn() {
        return _super.call(this, 0.42, 0.00, 1.00, 1.00) || this;
    }
    return WebEaseIn;
}(BaseCalculator_1.CubicBezierCalculator));
exports.WebEaseIn = WebEaseIn;
var WebEaseOut = /** @class */ (function (_super) {
    __extends(WebEaseOut, _super);
    function WebEaseOut() {
        return _super.call(this, 0.00, 0.00, 0.58, 1.00) || this;
    }
    return WebEaseOut;
}(BaseCalculator_1.CubicBezierCalculator));
exports.WebEaseOut = WebEaseOut;
var WebEaseInOut = /** @class */ (function (_super) {
    __extends(WebEaseInOut, _super);
    function WebEaseInOut() {
        return _super.call(this, 0.42, 0.00, 0.58, 1.00) || this;
    }
    return WebEaseInOut;
}(BaseCalculator_1.CubicBezierCalculator));
exports.WebEaseInOut = WebEaseInOut;
var WebEase = /** @class */ (function (_super) {
    __extends(WebEase, _super);
    function WebEase() {
        return _super.call(this, 0.25, 0.10, 0.25, 1.00) || this;
    }
    return WebEase;
}(BaseCalculator_1.CubicBezierCalculator));
exports.WebEase = WebEase;
var FluentLinear = /** @class */ (function (_super) {
    __extends(FluentLinear, _super);
    function FluentLinear() {
        return _super.call(this, 0.00, 0.00, 1.00, 1.00) || this;
    }
    return FluentLinear;
}(BaseCalculator_1.CubicBezierCalculator));
exports.FluentLinear = FluentLinear;
var FluentStandard = /** @class */ (function (_super) {
    __extends(FluentStandard, _super);
    function FluentStandard() {
        return _super.call(this, 0.80, 0.00, 0.20, 1.00) || this;
    }
    return FluentStandard;
}(BaseCalculator_1.CubicBezierCalculator));
exports.FluentStandard = FluentStandard;
var FluentAccelerate = /** @class */ (function (_super) {
    __extends(FluentAccelerate, _super);
    function FluentAccelerate() {
        return _super.call(this, 0.90, 0.10, 1.00, 0.20) || this;
    }
    return FluentAccelerate;
}(BaseCalculator_1.CubicBezierCalculator));
exports.FluentAccelerate = FluentAccelerate;
var FluentDecelerate = /** @class */ (function (_super) {
    __extends(FluentDecelerate, _super);
    function FluentDecelerate() {
        return _super.call(this, 0.10, 0.90, 0.20, 1.00) || this;
    }
    return FluentDecelerate;
}(BaseCalculator_1.CubicBezierCalculator));
exports.FluentDecelerate = FluentDecelerate;
var FastOutSlowInInterpolator = /** @class */ (function (_super) {
    __extends(FastOutSlowInInterpolator, _super);
    function FastOutSlowInInterpolator() {
        return _super.call(this, 0.40, 0.00, 0.20, 1.00) || this;
    }
    return FastOutSlowInInterpolator;
}(BaseCalculator_1.CubicBezierCalculator));
exports.FastOutSlowInInterpolator = FastOutSlowInInterpolator;
var LinearOutSlowInInterpolator = /** @class */ (function (_super) {
    __extends(LinearOutSlowInInterpolator, _super);
    function LinearOutSlowInInterpolator() {
        return _super.call(this, 0.00, 0.00, 0.20, 1.00) || this;
    }
    return LinearOutSlowInInterpolator;
}(BaseCalculator_1.CubicBezierCalculator));
exports.LinearOutSlowInInterpolator = LinearOutSlowInInterpolator;
var FastOutLinearInterpolator = /** @class */ (function (_super) {
    __extends(FastOutLinearInterpolator, _super);
    function FastOutLinearInterpolator() {
        return _super.call(this, 0.40, 0.00, 1.00, 1.00) || this;
    }
    return FastOutLinearInterpolator;
}(BaseCalculator_1.CubicBezierCalculator));
exports.FastOutLinearInterpolator = FastOutLinearInterpolator;
