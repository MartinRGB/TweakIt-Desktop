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
exports.AndroidFling = void 0;
var BaseCalculator_1 = require("./BaseCalculator");
var AndroidFling = /** @class */ (function (_super) {
    __extends(AndroidFling, _super);
    function AndroidFling(velocity, friction) {
        return _super.call(this, velocity ? velocity : -2000, friction ? friction : 0.5) || this;
    }
    return AndroidFling;
}(BaseCalculator_1.FlingAnimationCalculator));
exports.AndroidFling = AndroidFling;
