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
exports.SOSPowerSpring = exports.PrincipleSpring = exports.ProtopieSpring = exports.iOSUIViewSpring = exports.OrigamiPOPSpring = exports.FramerRK4Spring = exports.iOSCASpring = exports.FramerDHOSpring = exports.AndroidSpring = void 0;
var BaseCalculator_1 = require("@Components/Solver/Calculator/BaseCalculator");
var AndroidSpring = /** @class */ (function (_super) {
    __extends(AndroidSpring, _super);
    function AndroidSpring(stiffness, dampingratio, velocity) {
        var _this = _super.call(this) || this;
        _this.stiffness = stiffness ? stiffness : 1500;
        _this.dampingratio = dampingratio ? dampingratio : 0.5;
        _this.velocity = velocity ? velocity : 0;
        _this.mass = 1.0;
        _this.fixedGraph = false;
        _this.damping = _this.computeDamping(_this.stiffness, _this.dampingratio, _this.mass);
        _this.tension = _this.stiffness;
        _this.friction = _this.damping;
        _this.duration = _this.computeDuration(_this.tension, _this.friction, _this.mass, 2.0);
        _this.array = _this.springCalculator(_this.stiffness, _this.dampingratio, _this.velocity, _this.duration, _this.fixedGraph);
        return _this;
    }
    return AndroidSpring;
}(BaseCalculator_1.SpringAnimationCalculator));
exports.AndroidSpring = AndroidSpring;
var FramerDHOSpring = /** @class */ (function (_super) {
    __extends(FramerDHOSpring, _super);
    function FramerDHOSpring(stiffness, damping, mass, velocity) {
        var _this = _super.call(this) || this;
        _this.stiffness = stiffness ? stiffness : 50;
        _this.damping = damping ? damping : 2;
        _this.mass = mass ? mass : 1;
        _this.velocity = velocity ? velocity : 0;
        _this.fixedGraph = true;
        _this.tension = _this.stiffness;
        _this.friction = _this.damping;
        _this.dampingratio = _this.computeDampingRatio(_this.tension, _this.friction, _this.mass);
        _this.duration = _this.computeDuration(_this.tension, _this.friction, _this.mass, 1.0);
        // DAMPINGRATIO FIX
        if (_this.dampingratio >= 1) {
            _this.friction = _this.computeDamping(_this.stiffness, Math.max(0., Math.min(0.9999, _this.dampingratio)), _this.mass);
            _this.stiffness = _this.computeOverDampingTension(_this.friction, _this.dampingratio, _this.mass);
            _this.dampingratio = Math.max(0., Math.min(0.9999, _this.dampingratio));
            _this.duration = _this.computeDuration(_this.stiffness, _this.computeDamping(_this.stiffness, _this.dampingratio, _this.mass), _this.mass, 1.0);
        }
        _this.array = _this.springCalculator(_this.stiffness, _this.dampingratio, _this.velocity, _this.duration, _this.fixedGraph);
        return _this;
    }
    return FramerDHOSpring;
}(BaseCalculator_1.SpringAnimationCalculator));
exports.FramerDHOSpring = FramerDHOSpring;
var iOSCASpring = /** @class */ (function (_super) {
    __extends(iOSCASpring, _super);
    function iOSCASpring(stiffness, damping, mass, velocity) {
        return _super.call(this, stiffness ? stiffness : 100, damping ? damping : 10, mass ? mass : 1, velocity ? velocity : 0) || this;
    }
    return iOSCASpring;
}(FramerDHOSpring));
exports.iOSCASpring = iOSCASpring;
var FramerRK4Spring = /** @class */ (function (_super) {
    __extends(FramerRK4Spring, _super);
    function FramerRK4Spring(tension, friction, velocity) {
        var _this = _super.call(this) || this;
        _this.tension = tension ? tension : 200;
        _this.friction = friction ? friction : 25;
        _this.velocity = velocity ? velocity : 0;
        _this.stiffness = _this.tension;
        _this.damping = _this.friction;
        _this.mass = 1.0;
        _this.fixedGraph = true;
        _this.dampingratio = _this.computeDampingRatio(_this.tension, _this.friction, _this.mass);
        _this.duration = _this.computeDuration(_this.tension, _this.friction, _this.mass, 1.0);
        // DAMPINGRATIO FIX
        if (_this.dampingratio >= 1) {
            _this.friction = _this.computeDamping(_this.stiffness, Math.max(0., Math.min(0.9999, _this.dampingratio)), _this.mass);
            _this.stiffness = _this.computeOverDampingTension(_this.friction, _this.dampingratio, _this.mass);
            _this.dampingratio = Math.max(0., Math.min(0.9999, _this.dampingratio));
            _this.duration = _this.computeDuration(_this.stiffness, _this.computeDamping(_this.stiffness, _this.dampingratio, _this.mass), _this.mass, 1.0);
        }
        _this.array = _this.springCalculator(_this.stiffness, _this.dampingratio, _this.velocity, _this.duration, _this.fixedGraph);
        return _this;
    }
    return FramerRK4Spring;
}(BaseCalculator_1.SpringAnimationCalculator));
exports.FramerRK4Spring = FramerRK4Spring;
var OrigamiPOPSpring = /** @class */ (function (_super) {
    __extends(OrigamiPOPSpring, _super);
    function OrigamiPOPSpring(bounciness, speed) {
        var _this = _super.call(this) || this;
        _this.fixedGraph = false;
        _this.bounciness = bounciness ? bounciness : 5;
        _this.speed = speed ? speed : 10;
        _this.velocity = 0.0;
        var b = _this.normalize(bounciness / 1.7, 0, 20.0);
        b = _this.projectNormal(b, 0.0, 0.8);
        var s = _this.normalize(speed / 1.7, 0, 20.0);
        _this.bouncyTension = _this.projectNormal(s, 0.5, 200);
        _this.bouncyFriction = _this.quadraticOutInterpolation(b, _this.b3Nobounce(_this.bouncyTension), 0.01);
        // Output
        _this.mass = 1.0;
        _this.tension = _this.tensionConversion(_this.bouncyTension);
        _this.friction = _this.frictionConversion(_this.bouncyFriction);
        _this.stiffness = _this.tension;
        _this.damping = _this.friction;
        _this.dampingratio = _this.computeDampingRatio(_this.tension, _this.friction, _this.mass);
        _this.duration = _this.computeDuration(_this.tension, _this.friction, _this.mass, 1.0);
        // BUT BUGS HERE:DAMPINGRATIO FIX
        if (_this.dampingratio >= 1) {
            _this.friction = _this.computeDamping(_this.stiffness, Math.max(0., Math.min(0.9999, _this.dampingratio)), _this.mass);
            _this.stiffness = _this.computeOverDampingTension(_this.friction, _this.dampingratio, _this.mass);
            _this.dampingratio = Math.max(0., Math.min(0.9999, _this.dampingratio));
            _this.duration = _this.computeDuration(_this.stiffness, _this.computeDamping(_this.stiffness, _this.dampingratio, _this.mass), _this.mass, 1.0);
        }
        _this.array = _this.springCalculator(_this.stiffness, _this.dampingratio, _this.velocity, _this.duration, _this.fixedGraph);
        return _this;
    }
    OrigamiPOPSpring.prototype.tensionConversion = function (oValue) {
        return (oValue - 30.0) * 3.62 + 194.0;
    };
    OrigamiPOPSpring.prototype.frictionConversion = function (oValue) {
        return (oValue - 8.0) * 3.0 + 25.0;
    };
    return OrigamiPOPSpring;
}(BaseCalculator_1.SpringAnimationCalculator));
exports.OrigamiPOPSpring = OrigamiPOPSpring;
var iOSUIViewSpring = /** @class */ (function (_super) {
    __extends(iOSUIViewSpring, _super);
    function iOSUIViewSpring(dampingratio, duration) {
        var _this = _super.call(this) || this;
        // this.stiffness = this.tensionFromOrigamiValue(stiffness);
        // this.damping = this.frictionFromOrigamiValue(damping);
        _this.dampingratio = dampingratio ? dampingratio : 0.5;
        _this.duration = duration ? duration : 0.5;
        _this.fixedGraph = false;
        // Output
        _this.mass = 1.0;
        // Method -I
        // this.friction = this.computeFriction(this.dampingRatio,this.duration);
        // this.damping = this.friction;
        // this.tension = this.computeTension(this.dampingRatio,this.friction);
        // this.stiffness = this.tension;
        // Method -II
        _this.tension = _this.computeTension(_this.dampingratio, _this.duration, _this.mass);
        _this.stiffness = _this.tension;
        // this.friction = this.computeFriction(this.dampingratio,this.tension,this.mass);
        // this.damping = this.friction;
        // Useless
        // this.bouncyTension = this.bouncyTesnionConversion(this.tension);
        // this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
        // this.s = this.getParaS(this.bouncyTension,0.5,200);
        // this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
        // this.b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
        // this.bounciness = 20*1.7*this.b/0.8;
        _this.array = _this.springCalculator(_this.stiffness, _this.dampingratio, 0.0, _this.duration, _this.fixedGraph);
        return _this;
    }
    // Method -I
    // computeFriction(dampingratio, duration) {
    //     var a = Math.sqrt(1 - Math.pow(dampingratio, 2));
    //     var d = (dampingratio/a)*1000.;
    //     return 2*Math.log(d)/duration;
    // }
    // computeTension(dampingratio, friction) {
    //     return Math.pow(friction/(dampingratio*2),2);
    // }
    // Method -II
    iOSUIViewSpring.prototype.computeTension = function (dampingratio, duration, mass) {
        var a = Math.sqrt(1 - Math.pow(dampingratio, 2));
        var d = (dampingratio / a) * 1000.0;
        var tension = Math.pow(Math.log(d) / (dampingratio * duration), 2) * mass;
        return tension;
    };
    iOSUIViewSpring.prototype.computeFriction = function (dampingratio, tension, mass) {
        var a = (2 * Math.sqrt(mass * tension));
        var friction = dampingratio * a;
        return friction;
    };
    return iOSUIViewSpring;
}(BaseCalculator_1.SpringAnimationCalculator));
exports.iOSUIViewSpring = iOSUIViewSpring;
var ProtopieSpring = /** @class */ (function (_super) {
    __extends(ProtopieSpring, _super);
    function ProtopieSpring(tension, friction) {
        return _super.call(this, tension ? tension : 300, friction ? friction : 15, 0) || this;
    }
    return ProtopieSpring;
}(FramerRK4Spring));
exports.ProtopieSpring = ProtopieSpring;
var PrincipleSpring = /** @class */ (function (_super) {
    __extends(PrincipleSpring, _super);
    function PrincipleSpring(tension, friction) {
        return _super.call(this, tension ? tension : 380, friction ? friction : 20, 0) || this;
    }
    return PrincipleSpring;
}(FramerRK4Spring));
exports.PrincipleSpring = PrincipleSpring;
var SOSPowerSpring = /** @class */ (function (_super) {
    __extends(SOSPowerSpring, _super);
    function SOSPowerSpring(stiffness, dampingratio) {
        var _this = _super.call(this) || this;
        _this.stiffness = stiffness ? stiffness : 1500;
        _this.dampingratio = dampingratio ? dampingratio : 0.5;
        _this.velocity = 0;
        _this.mass = 1.0;
        _this.fixedGraph = false;
        _this.damping = _this.computeDamping(_this.stiffness, _this.dampingratio, _this.mass);
        _this.tension = _this.stiffness;
        _this.friction = _this.damping;
        _this.duration = _this.computeDuration(_this.tension, _this.friction, _this.mass, 2.0);
        _this.array = _this.springCalculator(_this.stiffness, _this.dampingratio, _this.velocity, _this.duration, _this.fixedGraph);
        return _this;
    }
    return SOSPowerSpring;
}(BaseCalculator_1.SpringAnimationCalculator));
exports.SOSPowerSpring = SOSPowerSpring;
