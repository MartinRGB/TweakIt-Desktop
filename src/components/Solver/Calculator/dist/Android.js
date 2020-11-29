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
var DoubleCubicBezierExtend_1 = require("./DoubleCubicBezierExtend");
var SpringAnimationExtend_1 = require("./SpringAnimationExtend");
var FlingAnimationExtend_1 = require("./FlingAnimationExtend");
var InterpolatorExtend_1 = require("@Components/Solver/Calculator/InterpolatorExtend");
var CubicBezierExtend_1 = require("@Components/Solver/Calculator/CubicBezierExtend");
var Spring = /** @class */ (function (_super) {
    __extends(Spring, _super);
    function Spring(stiffness, dampingratio, velocity) {
        return _super.call(this, stiffness, dampingratio, velocity) || this;
    }
    return Spring;
}(SpringAnimationExtend_1.AndroidSpring));
var Fling = /** @class */ (function (_super) {
    __extends(Fling, _super);
    function Fling(velocity, friction) {
        return _super.call(this, velocity, friction) || this;
    }
    return Fling;
}(FlingAnimationExtend_1.AndroidFling));
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear(a) {
        return _super.call(this, a) || this;
    }
    return Linear;
}(InterpolatorExtend_1.LinearInterpolator));
var Accelerate = /** @class */ (function (_super) {
    __extends(Accelerate, _super);
    function Accelerate(a) {
        return _super.call(this, a) || this;
    }
    return Accelerate;
}(InterpolatorExtend_1.AccelerateInterpolator));
var Decelerate = /** @class */ (function (_super) {
    __extends(Decelerate, _super);
    function Decelerate(a) {
        return _super.call(this, a) || this;
    }
    return Decelerate;
}(InterpolatorExtend_1.DecelerateInterpolator));
var AccelerateDecelerate = /** @class */ (function (_super) {
    __extends(AccelerateDecelerate, _super);
    function AccelerateDecelerate(a) {
        return _super.call(this, a) || this;
    }
    return AccelerateDecelerate;
}(InterpolatorExtend_1.AccelerateDecelerateInterpolator));
var Anticipate = /** @class */ (function (_super) {
    __extends(Anticipate, _super);
    function Anticipate(a) {
        return _super.call(this, a) || this;
    }
    return Anticipate;
}(InterpolatorExtend_1.AnticipateInterpolator));
var Overshoot = /** @class */ (function (_super) {
    __extends(Overshoot, _super);
    function Overshoot(a) {
        return _super.call(this, a) || this;
    }
    return Overshoot;
}(InterpolatorExtend_1.OvershootInterpolator));
var AnticipateOvershoot = /** @class */ (function (_super) {
    __extends(AnticipateOvershoot, _super);
    function AnticipateOvershoot(a) {
        return _super.call(this, a) || this;
    }
    return AnticipateOvershoot;
}(InterpolatorExtend_1.AnticipateOvershootInterpolator));
var Bounce = /** @class */ (function (_super) {
    __extends(Bounce, _super);
    function Bounce(a) {
        return _super.call(this, a) || this;
    }
    return Bounce;
}(InterpolatorExtend_1.BounceInterpolator));
var Cycle = /** @class */ (function (_super) {
    __extends(Cycle, _super);
    function Cycle(a) {
        return _super.call(this, a) || this;
    }
    return Cycle;
}(InterpolatorExtend_1.CycleInterpolator));
var FastOutSlowIn = /** @class */ (function (_super) {
    __extends(FastOutSlowIn, _super);
    function FastOutSlowIn() {
        return _super.call(this) || this;
    }
    return FastOutSlowIn;
}(CubicBezierExtend_1.FastOutSlowInInterpolator));
var FastOutExtraSlowIn = /** @class */ (function (_super) {
    __extends(FastOutExtraSlowIn, _super);
    function FastOutExtraSlowIn() {
        return _super.call(this) || this;
    }
    return FastOutExtraSlowIn;
}(DoubleCubicBezierExtend_1.FastOutExtraSlowInInterpolator));
var LinearOutSlowIn = /** @class */ (function (_super) {
    __extends(LinearOutSlowIn, _super);
    function LinearOutSlowIn() {
        return _super.call(this) || this;
    }
    return LinearOutSlowIn;
}(CubicBezierExtend_1.LinearOutSlowInInterpolator));
var FastOutLinear = /** @class */ (function (_super) {
    __extends(FastOutLinear, _super);
    function FastOutLinear() {
        return _super.call(this) || this;
    }
    return FastOutLinear;
}(CubicBezierExtend_1.FastOutLinearInterpolator));
var CustomFunction = /** @class */ (function (_super) {
    __extends(CustomFunction, _super);
    function CustomFunction(funs) {
        return _super.call(this, funs) || this;
    }
    return CustomFunction;
}(InterpolatorExtend_1.CustomFunctionInterpolator));
var CustomSpring = /** @class */ (function (_super) {
    __extends(CustomSpring, _super);
    function CustomSpring(a) {
        return _super.call(this, a) || this;
    }
    return CustomSpring;
}(InterpolatorExtend_1.CustomSpringInterpolator));
var CustomMocosSpring = /** @class */ (function (_super) {
    __extends(CustomMocosSpring, _super);
    function CustomMocosSpring(tension, friction, velocity) {
        return _super.call(this, tension, friction, velocity) || this;
    }
    return CustomMocosSpring;
}(InterpolatorExtend_1.CustomMocosSpringInterpolator));
var CustomBounce = /** @class */ (function (_super) {
    __extends(CustomBounce, _super);
    function CustomBounce(tension, friction) {
        return _super.call(this, tension, friction) || this;
    }
    return CustomBounce;
}(InterpolatorExtend_1.CustomBounceInterpolator));
var CustomDamping = /** @class */ (function (_super) {
    __extends(CustomDamping, _super);
    function CustomDamping(tension, friction) {
        return _super.call(this, tension, friction) || this;
    }
    return CustomDamping;
}(InterpolatorExtend_1.CustomDampingInterpolator));
var ViscosFluid = /** @class */ (function (_super) {
    __extends(ViscosFluid, _super);
    function ViscosFluid(a) {
        return _super.call(this, a) || this;
    }
    return ViscosFluid;
}(InterpolatorExtend_1.ViscosFluidInterpolator));
var Android = {
    Spring: Spring, Fling: Fling, Linear: Linear, Accelerate: Accelerate, Decelerate: Decelerate, AccelerateDecelerate: AccelerateDecelerate, Anticipate: Anticipate, Overshoot: Overshoot, AnticipateOvershoot: AnticipateOvershoot, Bounce: Bounce, Cycle: Cycle, FastOutSlowIn: FastOutSlowIn, FastOutExtraSlowIn: FastOutExtraSlowIn, LinearOutSlowIn: LinearOutSlowIn, FastOutLinear: FastOutLinear, CustomFunction: CustomFunction, CustomSpring: CustomSpring, CustomMocosSpring: CustomMocosSpring, CustomBounce: CustomBounce, CustomDamping: CustomDamping, ViscosFluid: ViscosFluid
};
exports["default"] = Android;
