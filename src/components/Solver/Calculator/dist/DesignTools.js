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
var SpringAnimationExtend_1 = require("./SpringAnimationExtend");
var OrigamiPOPSpring = /** @class */ (function (_super) {
    __extends(OrigamiPOPSpring, _super);
    function OrigamiPOPSpring(bounciness, speed) {
        return _super.call(this, bounciness, speed) || this;
    }
    return OrigamiPOPSpring;
}(SpringAnimationExtend_1.OrigamiPOPSpring));
var FramerRK4Spring = /** @class */ (function (_super) {
    __extends(FramerRK4Spring, _super);
    function FramerRK4Spring(tension, friction, velocity) {
        return _super.call(this, tension, friction, velocity) || this;
    }
    return FramerRK4Spring;
}(SpringAnimationExtend_1.FramerRK4Spring));
var FramerDHOSpring = /** @class */ (function (_super) {
    __extends(FramerDHOSpring, _super);
    function FramerDHOSpring(stiffness, damping, mass, velocity) {
        return _super.call(this, stiffness, damping, mass, velocity) || this;
    }
    return FramerDHOSpring;
}(SpringAnimationExtend_1.FramerDHOSpring));
var ProtopieSpring = /** @class */ (function (_super) {
    __extends(ProtopieSpring, _super);
    function ProtopieSpring(tension, friction) {
        return _super.call(this, tension, friction) || this;
    }
    return ProtopieSpring;
}(SpringAnimationExtend_1.ProtopieSpring));
var PrincipleSpring = /** @class */ (function (_super) {
    __extends(PrincipleSpring, _super);
    function PrincipleSpring(tension, friction) {
        return _super.call(this, tension, friction) || this;
    }
    return PrincipleSpring;
}(SpringAnimationExtend_1.ProtopieSpring));
var DesignTools = {
    OrigamiPOPSpring: OrigamiPOPSpring, FramerRK4Spring: FramerRK4Spring, FramerDHOSpring: FramerDHOSpring, ProtopieSpring: ProtopieSpring, PrincipleSpring: PrincipleSpring
};
exports["default"] = DesignTools;
