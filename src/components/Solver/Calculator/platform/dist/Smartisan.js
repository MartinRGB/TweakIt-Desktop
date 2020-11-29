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
var Power1 = /** @class */ (function (_super) {
    __extends(Power1, _super);
    function Power1(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power1;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power2 = /** @class */ (function (_super) {
    __extends(Power2, _super);
    function Power2(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power2;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power3 = /** @class */ (function (_super) {
    __extends(Power3, _super);
    function Power3(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power3;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power4 = /** @class */ (function (_super) {
    __extends(Power4, _super);
    function Power4(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power4;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power5 = /** @class */ (function (_super) {
    __extends(Power5, _super);
    function Power5(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power5;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power6 = /** @class */ (function (_super) {
    __extends(Power6, _super);
    function Power6(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power6;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power7 = /** @class */ (function (_super) {
    __extends(Power7, _super);
    function Power7(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power7;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Power8 = /** @class */ (function (_super) {
    __extends(Power8, _super);
    function Power8(stiffness, dampingratio) {
        return _super.call(this, stiffness, dampingratio) || this;
    }
    return Power8;
}(SpringAnimationExtend_1.SOSPowerSpring));
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Linear;
}(CubicBezierExtend_1.CubicBezier));
var Standard = /** @class */ (function (_super) {
    __extends(Standard, _super);
    function Standard(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Standard;
}(CubicBezierExtend_1.CubicBezier));
var Ease = /** @class */ (function (_super) {
    __extends(Ease, _super);
    function Ease(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return Ease;
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
var SineIn = /** @class */ (function (_super) {
    __extends(SineIn, _super);
    function SineIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return SineIn;
}(CubicBezierExtend_1.CubicBezier));
var SineOut = /** @class */ (function (_super) {
    __extends(SineOut, _super);
    function SineOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return SineOut;
}(CubicBezierExtend_1.CubicBezier));
var SineInOut = /** @class */ (function (_super) {
    __extends(SineInOut, _super);
    function SineInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return SineInOut;
}(CubicBezierExtend_1.CubicBezier));
var QuadIn = /** @class */ (function (_super) {
    __extends(QuadIn, _super);
    function QuadIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuadIn;
}(CubicBezierExtend_1.CubicBezier));
var QuadOut = /** @class */ (function (_super) {
    __extends(QuadOut, _super);
    function QuadOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuadOut;
}(CubicBezierExtend_1.CubicBezier));
var QuadInOut = /** @class */ (function (_super) {
    __extends(QuadInOut, _super);
    function QuadInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuadInOut;
}(CubicBezierExtend_1.CubicBezier));
var CubicIn = /** @class */ (function (_super) {
    __extends(CubicIn, _super);
    function CubicIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CubicIn;
}(CubicBezierExtend_1.CubicBezier));
var CubicOut = /** @class */ (function (_super) {
    __extends(CubicOut, _super);
    function CubicOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CubicOut;
}(CubicBezierExtend_1.CubicBezier));
var CubicInOut = /** @class */ (function (_super) {
    __extends(CubicInOut, _super);
    function CubicInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return CubicInOut;
}(CubicBezierExtend_1.CubicBezier));
var QuartIn = /** @class */ (function (_super) {
    __extends(QuartIn, _super);
    function QuartIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuartIn;
}(CubicBezierExtend_1.CubicBezier));
var QuartOut = /** @class */ (function (_super) {
    __extends(QuartOut, _super);
    function QuartOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuartOut;
}(CubicBezierExtend_1.CubicBezier));
var QuartInOut = /** @class */ (function (_super) {
    __extends(QuartInOut, _super);
    function QuartInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuartInOut;
}(CubicBezierExtend_1.CubicBezier));
var QuintIn = /** @class */ (function (_super) {
    __extends(QuintIn, _super);
    function QuintIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuintIn;
}(CubicBezierExtend_1.CubicBezier));
var QuintOut = /** @class */ (function (_super) {
    __extends(QuintOut, _super);
    function QuintOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuintOut;
}(CubicBezierExtend_1.CubicBezier));
var QuintInOut = /** @class */ (function (_super) {
    __extends(QuintInOut, _super);
    function QuintInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return QuintInOut;
}(CubicBezierExtend_1.CubicBezier));
var ExpoIn = /** @class */ (function (_super) {
    __extends(ExpoIn, _super);
    function ExpoIn(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return ExpoIn;
}(CubicBezierExtend_1.CubicBezier));
var ExpoOut = /** @class */ (function (_super) {
    __extends(ExpoOut, _super);
    function ExpoOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return ExpoOut;
}(CubicBezierExtend_1.CubicBezier));
var ExpoInOut = /** @class */ (function (_super) {
    __extends(ExpoInOut, _super);
    function ExpoInOut(p1x, p1y, p2x, p2y) {
        return _super.call(this, p1x, p1y, p2x, p2y) || this;
    }
    return ExpoInOut;
}(CubicBezierExtend_1.CubicBezier));
var Smartisan = {
    Power1: Power1, Power2: Power2, Power3: Power3, Power4: Power4, Power5: Power5, Power6: Power6, Power7: Power7, Power8: Power8, Linear: Linear, Standard: Standard, Ease: Ease, EaseIn: EaseIn, EaseOut: EaseOut, EaseInOut: EaseInOut, SineIn: SineIn, SineOut: SineOut, SineInOut: SineInOut, QuadIn: QuadIn, QuadOut: QuadOut, QuadInOut: QuadInOut, CubicIn: CubicIn, CubicOut: CubicOut, CubicInOut: CubicInOut, QuartIn: QuartIn, QuartOut: QuartOut, QuartInOut: QuartInOut, QuintIn: QuintIn, QuintOut: QuintOut, QuintInOut: QuintInOut, ExpoIn: ExpoIn, ExpoOut: ExpoOut, ExpoInOut: ExpoInOut
};
exports["default"] = Smartisan;
