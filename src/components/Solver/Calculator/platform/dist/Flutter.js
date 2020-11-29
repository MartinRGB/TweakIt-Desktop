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
var InterpolatorExtend_1 = require("@Components/Solver/Calculator/type/InterpolatorExtend");
var CubicBezierExtend_1 = require("@Components/Solver/Calculator/type/CubicBezierExtend");
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear(a) {
        return _super.call(this, a) || this;
    }
    return Linear;
}(InterpolatorExtend_1.FlutterLinear));
var Decelerate = /** @class */ (function (_super) {
    __extends(Decelerate, _super);
    function Decelerate(a) {
        return _super.call(this, a) || this;
    }
    return Decelerate;
}(InterpolatorExtend_1.FlutterDecelerate));
var FastLinearToSlowEaseIn = /** @class */ (function (_super) {
    __extends(FastLinearToSlowEaseIn, _super);
    function FastLinearToSlowEaseIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return FastLinearToSlowEaseIn;
}(CubicBezierExtend_1.CubicBezier));
var FastOutSlowIn = /** @class */ (function (_super) {
    __extends(FastOutSlowIn, _super);
    function FastOutSlowIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return FastOutSlowIn;
}(CubicBezierExtend_1.CubicBezier));
var SlowMiddle = /** @class */ (function (_super) {
    __extends(SlowMiddle, _super);
    function SlowMiddle(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return SlowMiddle;
}(CubicBezierExtend_1.CubicBezier));
var Ease = /** @class */ (function (_super) {
    __extends(Ease, _super);
    function Ease(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Ease;
}(CubicBezierExtend_1.CubicBezier));
var StandardEasing = /** @class */ (function (_super) {
    __extends(StandardEasing, _super);
    function StandardEasing(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return StandardEasing;
}(CubicBezierExtend_1.CubicBezier));
var AccelerateEasing = /** @class */ (function (_super) {
    __extends(AccelerateEasing, _super);
    function AccelerateEasing(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return AccelerateEasing;
}(CubicBezierExtend_1.CubicBezier));
var DecelerateEasing = /** @class */ (function (_super) {
    __extends(DecelerateEasing, _super);
    function DecelerateEasing(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return DecelerateEasing;
}(CubicBezierExtend_1.CubicBezier));
var EaseIn = /** @class */ (function (_super) {
    __extends(EaseIn, _super);
    function EaseIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseIn;
}(CubicBezierExtend_1.CubicBezier));
var EaseInToLinear = /** @class */ (function (_super) {
    __extends(EaseInToLinear, _super);
    function EaseInToLinear(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInToLinear;
}(CubicBezierExtend_1.CubicBezier));
var EaseInSine = /** @class */ (function (_super) {
    __extends(EaseInSine, _super);
    function EaseInSine(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInSine;
}(CubicBezierExtend_1.CubicBezier));
var EaseInQuad = /** @class */ (function (_super) {
    __extends(EaseInQuad, _super);
    function EaseInQuad(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInQuad;
}(CubicBezierExtend_1.CubicBezier));
var EaseInCubic = /** @class */ (function (_super) {
    __extends(EaseInCubic, _super);
    function EaseInCubic(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInCubic;
}(CubicBezierExtend_1.CubicBezier));
var EaseInQuart = /** @class */ (function (_super) {
    __extends(EaseInQuart, _super);
    function EaseInQuart(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInQuart;
}(CubicBezierExtend_1.CubicBezier));
var EaseInQuint = /** @class */ (function (_super) {
    __extends(EaseInQuint, _super);
    function EaseInQuint(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInQuint;
}(CubicBezierExtend_1.CubicBezier));
var EaseInExpo = /** @class */ (function (_super) {
    __extends(EaseInExpo, _super);
    function EaseInExpo(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInExpo;
}(CubicBezierExtend_1.CubicBezier));
var EaseInCirc = /** @class */ (function (_super) {
    __extends(EaseInCirc, _super);
    function EaseInCirc(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInCirc;
}(CubicBezierExtend_1.CubicBezier));
var EaseInBack = /** @class */ (function (_super) {
    __extends(EaseInBack, _super);
    function EaseInBack(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInBack;
}(CubicBezierExtend_1.CubicBezier));
var EaseOut = /** @class */ (function (_super) {
    __extends(EaseOut, _super);
    function EaseOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOut;
}(CubicBezierExtend_1.CubicBezier));
var LinearToEaseOut = /** @class */ (function (_super) {
    __extends(LinearToEaseOut, _super);
    function LinearToEaseOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return LinearToEaseOut;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutSine = /** @class */ (function (_super) {
    __extends(EaseOutSine, _super);
    function EaseOutSine(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutSine;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutQuad = /** @class */ (function (_super) {
    __extends(EaseOutQuad, _super);
    function EaseOutQuad(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutQuad;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutCubic = /** @class */ (function (_super) {
    __extends(EaseOutCubic, _super);
    function EaseOutCubic(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutCubic;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutQuart = /** @class */ (function (_super) {
    __extends(EaseOutQuart, _super);
    function EaseOutQuart(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutQuart;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutQuint = /** @class */ (function (_super) {
    __extends(EaseOutQuint, _super);
    function EaseOutQuint(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutQuint;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutExpo = /** @class */ (function (_super) {
    __extends(EaseOutExpo, _super);
    function EaseOutExpo(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutExpo;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutCirc = /** @class */ (function (_super) {
    __extends(EaseOutCirc, _super);
    function EaseOutCirc(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutCirc;
}(CubicBezierExtend_1.CubicBezier));
var EaseOutBack = /** @class */ (function (_super) {
    __extends(EaseOutBack, _super);
    function EaseOutBack(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseOutBack;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOut = /** @class */ (function (_super) {
    __extends(EaseInOut, _super);
    function EaseInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOut;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutSine = /** @class */ (function (_super) {
    __extends(EaseInOutSine, _super);
    function EaseInOutSine(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutSine;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutQuad = /** @class */ (function (_super) {
    __extends(EaseInOutQuad, _super);
    function EaseInOutQuad(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutQuad;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutCubic = /** @class */ (function (_super) {
    __extends(EaseInOutCubic, _super);
    function EaseInOutCubic(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutCubic;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutQuart = /** @class */ (function (_super) {
    __extends(EaseInOutQuart, _super);
    function EaseInOutQuart(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutQuart;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutQuint = /** @class */ (function (_super) {
    __extends(EaseInOutQuint, _super);
    function EaseInOutQuint(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutQuint;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutExpo = /** @class */ (function (_super) {
    __extends(EaseInOutExpo, _super);
    function EaseInOutExpo(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutExpo;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutCirc = /** @class */ (function (_super) {
    __extends(EaseInOutCirc, _super);
    function EaseInOutCirc(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutCirc;
}(CubicBezierExtend_1.CubicBezier));
var EaseInOutBack = /** @class */ (function (_super) {
    __extends(EaseInOutBack, _super);
    function EaseInOutBack(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return EaseInOutBack;
}(CubicBezierExtend_1.CubicBezier));
var ElasticIn = /** @class */ (function (_super) {
    __extends(ElasticIn, _super);
    function ElasticIn(a) {
        return _super.call(this, a) || this;
    }
    return ElasticIn;
}(InterpolatorExtend_1.FlutterElasticIn));
var ElasticOut = /** @class */ (function (_super) {
    __extends(ElasticOut, _super);
    function ElasticOut(a) {
        return _super.call(this, a) || this;
    }
    return ElasticOut;
}(InterpolatorExtend_1.FlutterElasticOut));
var ElasticInOut = /** @class */ (function (_super) {
    __extends(ElasticInOut, _super);
    function ElasticInOut(a) {
        return _super.call(this, a) || this;
    }
    return ElasticInOut;
}(InterpolatorExtend_1.FlutterElasticInOut));
var BounceIn = /** @class */ (function (_super) {
    __extends(BounceIn, _super);
    function BounceIn(a) {
        return _super.call(this, a) || this;
    }
    return BounceIn;
}(InterpolatorExtend_1.FlutterBounceIn));
var BounceOut = /** @class */ (function (_super) {
    __extends(BounceOut, _super);
    function BounceOut(a) {
        return _super.call(this, a) || this;
    }
    return BounceOut;
}(InterpolatorExtend_1.FlutterBounceOut));
var BounceInOut = /** @class */ (function (_super) {
    __extends(BounceInOut, _super);
    function BounceInOut(a) {
        return _super.call(this, a) || this;
    }
    return BounceInOut;
}(InterpolatorExtend_1.FlutterBounceInOut));
var Flutter = { Linear: Linear, Decelerate: Decelerate, ElasticIn: ElasticIn, ElasticOut: ElasticOut, ElasticInOut: ElasticInOut, BounceIn: BounceIn, BounceOut: BounceOut, BounceInOut: BounceInOut, FastLinearToSlowEaseIn: FastLinearToSlowEaseIn, FastOutSlowIn: FastOutSlowIn, SlowMiddle: SlowMiddle, StandardEasing: StandardEasing, AccelerateEasing: AccelerateEasing, DecelerateEasing: DecelerateEasing, Ease: Ease, EaseIn: EaseIn, EaseInToLinear: EaseInToLinear, EaseInSine: EaseInSine, EaseInQuad: EaseInQuad, EaseInCubic: EaseInCubic, EaseInQuart: EaseInQuart, EaseInQuint: EaseInQuint, EaseInExpo: EaseInExpo, EaseInCirc: EaseInCirc, EaseInBack: EaseInBack, EaseOut: EaseOut, LinearToEaseOut: LinearToEaseOut, EaseOutSine: EaseOutSine, EaseOutQuad: EaseOutQuad, EaseOutCubic: EaseOutCubic, EaseOutQuart: EaseOutQuart, EaseOutQuint: EaseOutQuint, EaseOutExpo: EaseOutExpo, EaseOutCirc: EaseOutCirc, EaseOutBack: EaseOutBack, EaseInOut: EaseInOut, EaseInOutSine: EaseInOutSine, EaseInOutQuad: EaseInOutQuad, EaseInOutCubic: EaseInOutCubic, EaseInOutQuart: EaseInOutQuart, EaseInOutQuint: EaseInOutQuint, EaseInOutExpo: EaseInOutExpo, EaseInOutCirc: EaseInOutCirc, EaseInOutBack: EaseInOutBack };
exports["default"] = Flutter;
