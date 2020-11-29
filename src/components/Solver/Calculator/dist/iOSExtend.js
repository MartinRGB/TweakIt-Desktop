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
}(CubicBezierExtend_1.iOSLinear));
var EaseIn = /** @class */ (function (_super) {
    __extends(EaseIn, _super);
    function EaseIn() {
        return _super.call(this) || this;
    }
    return EaseIn;
}(CubicBezierExtend_1.iOSEaseIn));
var EaseOut = /** @class */ (function (_super) {
    __extends(EaseOut, _super);
    function EaseOut() {
        return _super.call(this) || this;
    }
    return EaseOut;
}(CubicBezierExtend_1.iOSEaseOut));
var EaseInOut = /** @class */ (function (_super) {
    __extends(EaseInOut, _super);
    function EaseInOut() {
        return _super.call(this) || this;
    }
    return EaseInOut;
}(CubicBezierExtend_1.iOSEaseInOut));
