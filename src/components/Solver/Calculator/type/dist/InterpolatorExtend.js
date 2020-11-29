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
exports.FlutterBounceInOut = exports.FlutterBounceOut = exports.FlutterBounceIn = exports.FlutterElasticInOut = exports.FlutterElasticOut = exports.FlutterElasticIn = exports.FlutterDecelerate = exports.FlutterLinear = exports.ViscosFluidInterpolator = exports.CustomDampingInterpolator = exports.CustomBounceInterpolator = exports.CustomMocosSpringInterpolator = exports.CustomSpringInterpolator = exports.CycleInterpolator = exports.BounceInterpolator = exports.AnticipateOvershootInterpolator = exports.OvershootInterpolator = exports.AnticipateInterpolator = exports.AccelerateDecelerateInterpolator = exports.DecelerateInterpolator = exports.AccelerateInterpolator = exports.LinearInterpolator = exports.CustomFunctionInterpolator = void 0;
var BaseCalculator_1 = require("@Components/Solver/Calculator/BaseCalculator");
// e.g
// new CustomFunctionInterpolator((x:number)=>{
//     return x*x*x;
// })
var CustomFunctionInterpolator = /** @class */ (function (_super) {
    __extends(CustomFunctionInterpolator, _super);
    function CustomFunctionInterpolator(funs) {
        var _this_1 = _super.call(this) || this;
        var def = funs ? funs : function (x) { return x; };
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return def(t); });
        return _this_1;
    }
    return CustomFunctionInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
exports.CustomFunctionInterpolator = CustomFunctionInterpolator;
var LinearInterpolator = /** @class */ (function (_super) {
    __extends(LinearInterpolator, _super);
    function LinearInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return t; });
        return _this_1;
    }
    return LinearInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
exports.LinearInterpolator = LinearInterpolator;
var AccelerateInterpolator = /** @class */ (function (_super) {
    __extends(AccelerateInterpolator, _super);
    function AccelerateInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return Math.pow(t, 2 * c); });
        return _this_1;
    }
    return AccelerateInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
exports.AccelerateInterpolator = AccelerateInterpolator;
var DecelerateInterpolator = /** @class */ (function (_super) {
    __extends(DecelerateInterpolator, _super);
    function DecelerateInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        var c = a ? a : 2;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return 1 - Math.pow(1 - t, 2 * c); });
        return _this_1;
    }
    return DecelerateInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
exports.DecelerateInterpolator = DecelerateInterpolator;
var AccelerateDecelerateInterpolator = /** @class */ (function (_super) {
    __extends(AccelerateDecelerateInterpolator, _super);
    function AccelerateDecelerateInterpolator(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return Math.cos((t + 1) * Math.PI) / 2 + 0.5; });
        return _this_1;
    }
    return AccelerateDecelerateInterpolator;
}(BaseCalculator_1.InterpolatorCalculator));
exports.AccelerateDecelerateInterpolator = AccelerateDecelerateInterpolator;
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
exports.AnticipateInterpolator = AnticipateInterpolator;
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
exports.OvershootInterpolator = OvershootInterpolator;
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
exports.AnticipateOvershootInterpolator = AnticipateOvershootInterpolator;
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
exports.BounceInterpolator = BounceInterpolator;
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
exports.CycleInterpolator = CycleInterpolator;
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
exports.CustomSpringInterpolator = CustomSpringInterpolator;
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
exports.CustomMocosSpringInterpolator = CustomMocosSpringInterpolator;
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
exports.CustomBounceInterpolator = CustomBounceInterpolator;
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
exports.CustomDampingInterpolator = CustomDampingInterpolator;
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
exports.ViscosFluidInterpolator = ViscosFluidInterpolator;
var FlutterLinear = /** @class */ (function (_super) {
    __extends(FlutterLinear, _super);
    function FlutterLinear(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return t; });
        return _this_1;
    }
    return FlutterLinear;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterLinear = FlutterLinear;
var FlutterDecelerate = /** @class */ (function (_super) {
    __extends(FlutterDecelerate, _super);
    function FlutterDecelerate(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            t = 1.0 - t;
            return 1.0 - t * t;
        });
        return _this_1;
    }
    return FlutterDecelerate;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterDecelerate = FlutterDecelerate;
var FlutterElasticIn = /** @class */ (function (_super) {
    __extends(FlutterElasticIn, _super);
    function FlutterElasticIn(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.period = 0.4;
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            var s = _this_1.period / 4.0;
            t = t - 1.0;
            return -Math.pow(2.0, 10.0 * t) * Math.sin((t - s) * (Math.PI * 2.0) / _this_1.period);
        });
        return _this_1;
    }
    return FlutterElasticIn;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterElasticIn = FlutterElasticIn;
var FlutterElasticOut = /** @class */ (function (_super) {
    __extends(FlutterElasticOut, _super);
    function FlutterElasticOut(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.period = 0.4;
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            var s = _this_1.period / 4.0;
            return Math.pow(2.0, -10 * t) * Math.sin((t - s) * (Math.PI * 2.0) / _this_1.period) + 1.0;
        });
        return _this_1;
    }
    return FlutterElasticOut;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterElasticOut = FlutterElasticOut;
var FlutterElasticInOut = /** @class */ (function (_super) {
    __extends(FlutterElasticInOut, _super);
    function FlutterElasticInOut(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.period = 0.4;
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            var s = _this_1.period / 4.0;
            t = 2.0 * t - 1.0;
            if (t < 0.0)
                return -0.5 * Math.pow(2.0, 10.0 * t) * Math.sin((t - s) * (Math.PI * 2.0) / _this_1.period);
            else
                return Math.pow(2.0, -10.0 * t) * Math.sin((t - s) * (Math.PI * 2.0) / _this_1.period) * 0.5 + 1.0;
        });
        return _this_1;
    }
    return FlutterElasticInOut;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterElasticInOut = FlutterElasticInOut;
var FlutterBounceIn = /** @class */ (function (_super) {
    __extends(FlutterBounceIn, _super);
    function FlutterBounceIn(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return 1.0 - _this_1._bounce(1.0 - t); });
        return _this_1;
    }
    FlutterBounceIn.prototype._bounce = function (t) {
        if (t < 1.0 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    };
    return FlutterBounceIn;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterBounceIn = FlutterBounceIn;
var FlutterBounceOut = /** @class */ (function (_super) {
    __extends(FlutterBounceOut, _super);
    function FlutterBounceOut(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) { return _this_1._bounce(t); });
        return _this_1;
    }
    FlutterBounceOut.prototype._bounce = function (t) {
        if (t < 1.0 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    };
    return FlutterBounceOut;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterBounceOut = FlutterBounceOut;
var FlutterBounceInOut = /** @class */ (function (_super) {
    __extends(FlutterBounceInOut, _super);
    function FlutterBounceInOut(a) {
        var _this_1 = _super.call(this) || this;
        _this_1.array = _this_1.interpolatorCalculator(function (t) {
            if (t < 0.5)
                return (1.0 - _this_1._bounce(1.0 - t * 2.0)) * 0.5;
            else
                return _this_1._bounce(t * 2.0 - 1.0) * 0.5 + 0.5;
        });
        return _this_1;
    }
    FlutterBounceInOut.prototype._bounce = function (t) {
        if (t < 1.0 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    };
    return FlutterBounceInOut;
}(BaseCalculator_1.InterpolatorCalculator));
exports.FlutterBounceInOut = FlutterBounceInOut;
