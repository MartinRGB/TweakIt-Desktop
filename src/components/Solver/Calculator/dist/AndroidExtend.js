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
var BaseCalculator_1 = require("./BaseCalculator");
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
var CustomFunction = /** @class */ (function (_super) {
    __extends(CustomFunction, _super);
    function CustomFunction(funs) {
        return _super.call(this, funs) || this;
    }
    return CustomFunction;
}(InterpolatorExtend_1.CustomFunctionInterpolator));
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear(a) {
        return _super.call(this, a) || this;
    }
    return Linear;
}(InterpolatorExtend_1.LinearInterpolator));
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
        return _super.call(this, 0.30, 0.00, 0.80, 0.15, 0.05, 0.70, 0.10, 1.00, 0.167, 0.50) || this;
    }
    return FastOutExtraSlowIn;
}(BaseCalculator_1.DoubleCubicBezierCalculator));
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
}(CubicBezierExtend_1.FastOutSlowInInterpolator));
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
var AccelerateDecelerateInterpolator = /** @class */ (function (_super) {
    __extends(AccelerateDecelerateInterpolator, _super);
    function AccelerateDecelerateInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return Math.cos((t + 1) * Math.PI) / 2 + 0.5; });
        return _this_1;
    }
    return AccelerateDecelerateInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var AnticipateInterpolator = /** @class */ (function (_super) {
    __extends(AnticipateInterpolator, _super);
    function AnticipateInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return (c + 1) * Math.pow(t, 3) - c * Math.pow(t, 2); });
        return _this_1;
    }
    return AnticipateInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var OvershootInterpolator = /** @class */ (function (_super) {
    __extends(OvershootInterpolator, _super);
    function OvershootInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) + 1; });
        return _this_1;
    }
    return OvershootInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var AnticipateOvershootInterpolator = /** @class */ (function (_super) {
    __extends(AnticipateOvershootInterpolator, _super);
    function AnticipateOvershootInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return _this_1.getAOSI(t, c); });
        return _this_1;
    }
    AnticipateOvershootInterpolator.prototype.getAOSI = function (t, f) {
        if (t < 0.5)
            return 0.5 * this.aosiFunctionA(t * 2.0, f * 1.5);
        else
            return 0.5 * (this.aosiFunctionB(t * 2.0 - 2.0, f * 1.5) + 2.0);
    };
    AnticipateOvershootInterpolator.prototype.aosiFunctionA = function (t, s) {
        return t * t * ((s + 1) * t - s);
    };
    AnticipateOvershootInterpolator.prototype.aosiFunctionB = function (t, s) {
        return t * t * ((s + 1) * t + s);
    };
    return AnticipateOvershootInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var BounceInterpolator = /** @class */ (function (_super) {
    __extends(BounceInterpolator, _super);
    function BounceInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return _this_1.getBounce(t); });
        return _this_1;
    }
    BounceInterpolator.prototype.bounce = function (t) {
        return t * t * 8.0;
    };
    BounceInterpolator.prototype.getBounce = function (t) {
        t *= 1.1226;
        if (t < 0.3535)
            return this.bounce(t);
        else if (t < 0.7408)
            return this.bounce(t - 0.54719) + 0.7;
        else if (t < 0.9644)
            return this.bounce(t - 0.8526) + 0.9;
        else
            return this.bounce(t - 1.0435) + 0.95;
    };
    return BounceInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var CycleInterpolator = /** @class */ (function (_super) {
    __extends(CycleInterpolator, _super);
    function CycleInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return Math.sin(2 * Math.PI * c * t); });
        return _this_1;
    }
    return CycleInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var CustomSpringInterpolator = /** @class */ (function (_super) {
    __extends(CustomSpringInterpolator, _super);
    function CustomSpringInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 0.5;
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            if (t == 0.0 || t == 1.0) {
                return t;
            }
            else {
                var value = (Math.pow(2, -10 * t) * Math.sin((t - c / 4.0) * (2.0 * Math.PI) / c) + 1);
                return value;
            }
        });
        return _this_1;
    }
    return CustomSpringInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var CustomMocosSpringInterpolator = /** @class */ (function (_super) {
    __extends(CustomMocosSpringInterpolator, _super);
    function CustomMocosSpringInterpolator(tension, friction, velocity) {
        var _this_1 = _super.call(this) || this;
        _this_1.tension = tension ? tension : 100;
        _this_1.friction = friction ? friction : 15;
        _this_1.velocity = velocity ? velocity : 0;
        _this_1.mGamma = 0;
        _this_1.mVDiv2 = 0;
        _this_1.mOscilative = false;
        _this_1.mEps = 0;
        _this_1.mA = 0;
        _this_1.mB = 0;
        _this_1.mDuration = 0;
        _this_1.CustomMocosSpringCalculate(_this_1.tension, _this_1.friction, _this_1.velocity);
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            var _this = _this_1;
            if (t >= 1) {
                return 1;
            }
            var t = t * _this.mDuration;
            return (_this.mOscilative ?
                (_this.mA * Math.exp(-_this.mVDiv2 * t) * Math.sin(_this.mGamma * t + _this.mB) + 1) :
                (_this.mA * Math.exp((_this.mGamma - _this.mVDiv2) * t) + _this.mB * Math.exp(-(_this.mGamma + _this.mVDiv2) * t) + 1));
        });
        return _this_1;
    }
    CustomMocosSpringInterpolator.prototype.CustomMocosSpringCalculate = function (tension, damping, velocity) {
        //mEps = eps;
        var _this = this;
        _this.mEps = 0.001;
        _this.mOscilative = (4 * tension - damping * damping > 0);
        if (_this.mOscilative) {
            _this.mGamma = Math.sqrt(4 * tension - damping * damping) / 2;
            _this.mVDiv2 = damping / 2;
        }
        else {
            _this.mGamma = Math.sqrt(damping * damping - 4 * tension) / 2;
            _this.mVDiv2 = damping / 2;
        }
        _this.setInitialVelocity(velocity);
    };
    CustomMocosSpringInterpolator.prototype.setInitialVelocity = function (v0) {
        var _this = this;
        if (_this.mOscilative) {
            _this.mB = Math.atan(-_this.mGamma / (v0 - _this.mVDiv2));
            _this.mA = -1 / Math.sin(_this.mB);
            _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / _this.mVDiv2;
        }
        else {
            _this.mA = (v0 - (_this.mGamma + _this.mVDiv2)) / (2 * _this.mGamma);
            _this.mB = -1 - _this.mA;
            _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / (_this.mVDiv2 - _this.mGamma);
        }
    };
    CustomMocosSpringInterpolator.prototype.getDesiredDuration = function () {
        var _this = this;
        return _this.mDuration;
    };
    return CustomMocosSpringInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var CustomBounceInterpolator = /** @class */ (function (_super) {
    __extends(CustomBounceInterpolator, _super);
    function CustomBounceInterpolator(tension, friction) {
        var _this_1 = _super.call(this) || this;
        _this_1.tension = tension ? tension : 0;
        _this_1.friction = friction ? friction : 0;
        _this_1.originalTension = tension;
        _this_1.originalFriction = friction;
        _this_1.maxStifness = 50;
        _this_1.maxFrictionMultipler = 1;
        _this_1.mTension = 0;
        _this_1.mFriction = 0;
        //Curve Position parameters(No Adjust)
        _this_1.amplitude = 1;
        _this_1.phase = 0;
        //Original Scale parameters(Better No Adjust)
        _this_1.originalStiffness = 12;
        _this_1.originalFrictionMultipler = 0.3;
        _this_1.mass = 0.058;
        //Internal parameters
        _this_1.pulsation = 0;
        // this.friction = 0;
        _this_1.CustomPhysicsCalculate(_this_1.tension, _this_1.friction);
        //this.array = this.interpolatorCalculator();
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            if (t == 0.0 || t == 1.0) {
                return t;
            }
            else {
                var value = _this_1.amplitude * Math.exp(-_this_1.friction * t) *
                    Math.cos(_this_1.pulsation * t + _this_1.phase);
                //var result = funs(value)
                return -Math.abs(value) + 1;
            }
        });
        return _this_1;
    }
    CustomBounceInterpolator.prototype.computePulsation = function () {
        this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
    };
    CustomBounceInterpolator.prototype.computeFriction = function () {
        this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
    };
    CustomBounceInterpolator.prototype.computeInternalParameters = function () {
        // never call computeFriction() without
        // updating the pulsation
        this.computePulsation();
        this.computeFriction();
    };
    CustomBounceInterpolator.prototype.CustomPhysicsCalculate = function (tension, friction) {
        this.mTension = Math.min(Math.max(tension, 0), 100) * (this.maxStifness - this.originalStiffness) / 100;
        this.mFriction = Math.min(Math.max(friction, 0), 100) * (this.maxFrictionMultipler - this.originalFrictionMultipler) / 100;
        this.computeInternalParameters();
    };
    return CustomBounceInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var CustomDampingInterpolator = /** @class */ (function (_super) {
    __extends(CustomDampingInterpolator, _super);
    function CustomDampingInterpolator(tension, friction) {
        var _this_1 = _super.call(this) || this;
        _this_1.tension = tension ? tension : 0;
        _this_1.friction = friction ? friction : 0;
        _this_1.originalTension = tension;
        _this_1.originalFriction = friction;
        _this_1.maxStifness = 50;
        _this_1.maxFrictionMultipler = 1;
        _this_1.mTension = 0;
        _this_1.mFriction = 0;
        //Curve Position parameters(No Adjust)
        _this_1.amplitude = 1;
        _this_1.phase = 0;
        //Original Scale parameters(Better No Adjust)
        _this_1.originalStiffness = 12;
        _this_1.originalFrictionMultipler = 0.3;
        _this_1.mass = 0.058;
        //Internal parameters
        _this_1.pulsation = 0;
        // this.friction = 0;
        _this_1.CustomPhysicsCalculate(_this_1.tension, _this_1.friction);
        //this.array = this.interpolatorCalculator();
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            if (t == 0.0 || t == 1.0) {
                return t;
            }
            else {
                var value = _this_1.amplitude * Math.exp(-_this_1.friction * t) *
                    Math.cos(_this_1.pulsation * t + _this_1.phase);
                //var result = funs(value)
                return -(value) + 1;
            }
        });
        return _this_1;
    }
    CustomDampingInterpolator.prototype.computePulsation = function () {
        this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
    };
    CustomDampingInterpolator.prototype.computeFriction = function () {
        this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
    };
    CustomDampingInterpolator.prototype.computeInternalParameters = function () {
        // never call computeFriction() without
        // updating the pulsation
        this.computePulsation();
        this.computeFriction();
    };
    CustomDampingInterpolator.prototype.CustomPhysicsCalculate = function (tension, friction) {
        this.mTension = Math.min(Math.max(tension, 0), 100) * (this.maxStifness - this.originalStiffness) / 100;
        this.mFriction = Math.min(Math.max(friction, 0), 100) * (this.maxFrictionMultipler - this.originalFrictionMultipler) / 100;
        this.computeInternalParameters();
    };
    return CustomDampingInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
var ViscosFluidInterpolator = /** @class */ (function (_super) {
    __extends(ViscosFluidInterpolator, _super);
    function ViscosFluidInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return _this_1.getViscosFluid(t, c); });
        return _this_1;
    }
    ViscosFluidInterpolator.prototype.viscousFluid = function (x, c) {
        x *= c;
        if (x < 1.0) {
            x -= (1.0 - Math.exp(-x));
        }
        else {
            var start = 0.36787944117; // 1/e == exp(-1)
            x = 1.0 - Math.exp(1.0 - x);
            x = start + x * (1.0 - start);
        }
        return x;
    };
    ViscosFluidInterpolator.prototype.getViscosFluid = function (t, c) {
        var VISCOUS_FLUID_NORMALIZE = 1.0 / this.viscousFluid(1.0, c);
        // account for very small floating-point error
        var VISCOUS_FLUID_OFFSET = 1.0 - VISCOUS_FLUID_NORMALIZE * this.viscousFluid(1.0, c);
        var interpolated = VISCOUS_FLUID_NORMALIZE * this.viscousFluid(t, c);
        if (interpolated > 0) {
            return interpolated + VISCOUS_FLUID_OFFSET;
        }
        return interpolated;
    };
    return ViscosFluidInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
