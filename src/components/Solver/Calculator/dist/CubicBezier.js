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
var CubicBezierExtend_1 = require("./CubicBezierExtend");
var CustomCubicBezier = /** @class */ (function (_super) {
    __extends(CustomCubicBezier, _super);
    function CustomCubicBezier(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CustomCubicBezier;
}(CubicBezierExtend_1.CubicBezier));
var CustomDoubleCubicBezier = /** @class */ (function (_super) {
    __extends(CustomDoubleCubicBezier, _super);
    function CustomDoubleCubicBezier(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CustomDoubleCubicBezier;
}(CustomDoubleCubicBezier));
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
        return _super.call(this) || this;
    }
    return Linear;
}(iOSLinear));
var EaseIn = /** @class */ (function (_super) {
    __extends(EaseIn, _super);
    function EaseIn() {
        return _super.call(this) || this;
    }
    return EaseIn;
}(iOSEaseIn));
var EaseOut = /** @class */ (function (_super) {
    __extends(EaseOut, _super);
    function EaseOut() {
        return _super.call(this) || this;
    }
    return EaseOut;
}(iOSEaseOut));
var EaseInOut = /** @class */ (function (_super) {
    __extends(EaseInOut, _super);
    function EaseInOut() {
        return _super.call(this) || this;
    }
    return EaseInOut;
}(iOSEaseInOut));
