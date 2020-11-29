"use strict";
// Social
exports.__esModule = true;
var BaseCalculator_1 = require("@Components/Solver/Calculator/BaseCalculator");
// import {    
//     LinearInterpolator,
//     CustomFunctionInterpolator,
//     AccelerateInterpolator,
//     DecelerateInterpolator,
//     AccelerateDecelerateInterpolator,
//     AnticipateInterpolator,
//     OvershootInterpolator,
//     AnticipateOvershootInterpolator,
//     BounceInterpolator,
//     CycleInterpolator,
//     ViscosFluidInterpolator,
//     CustomSpringInterpolator,
//     CustomMocosSpringInterpolator,
//     CustomBounceInterpolator,
//     CustomDampingInterpolator} from '@Components/Solver/Calculator/InterpolatorExtend'
// import {    
//     CustomBezier,
//     CustomDoubleBezier,
//     Linear,
//     EaseIn,
//     EaseOut,
//     EaseInOut,
//     Ease,
//     FastOutSlowIn,
//     LinearOutSlowIn,
//     FastOutLinear} from '@Components/Solver/Calculator/BezierCurveExtend'
// import {    
//     AndroidSpring,
//     FramerDHOSpring,
//     FramerRK4Spring,
//     OrigamiPOPSpring,
//     iOSUIViewSpring,
//     iOSCASpring,
//     ProtopieSpring,
//     PrincipleSpring
//     } from '@Components/Solver/Calculator/SpringAnimationExtend'
// import {
//     AndroidFling
// } from '@Components/Solver/Calculator/FlingAnimationExtend'
var CreateSolverByString_1 = require("@Components/Solver/CreateSolverByString");
// class FastOutExtraSlowIn extends DoubleCubicBezierCalculator{constructor(){super(0.30, 0.00, 0.80, 0.15,0.05, 0.70, 0.10, 1.00,0.1666,0.5);}}
var Android_1 = require("@Components/Solver/Calculator/platform/Android");
var iOS_1 = require("@Components/Solver/Calculator/platform/iOS");
var Fluent_1 = require("@Components/Solver/Calculator/platform/Fluent");
var Flutter_1 = require("@Components/Solver/Calculator/platform/Flutter");
var Smartisan_1 = require("@Components/Solver/Calculator/platform/Smartisan");
var Web_1 = require("@Components/Solver/Calculator/platform/Web");
var BezierCurve_1 = require("@Components/Solver/Calculator/platform/BezierCurve");
var DesignTools_1 = require("@Components/Solver/Calculator/platform/DesignTools");
var Default_1 = require("@Components/Solver/Calculator/platform/Default");
var Solver = {
    Android: Android_1["default"],
    iOS: iOS_1["default"],
    Fluent: Fluent_1["default"],
    Flutter: Flutter_1["default"],
    Smartisan: Smartisan_1["default"],
    Web: Web_1["default"],
    BezierCurve: BezierCurve_1["default"],
    DesignTools: DesignTools_1["default"],
    Default: Default_1["default"],
    setCalculatorSamplePointNumber: BaseCalculator_1.setCalculatorSamplePointNumber,
    setCalculatorSampleScale: BaseCalculator_1.setCalculatorSampleScale,
    CreateSolverByString: CreateSolverByString_1.CreateSolverByString,
    LookupTableCalculator: BaseCalculator_1.LookupTableCalculator,
    HorizontalLineCalculator: BaseCalculator_1.HorizontalLineCalculator
};
exports["default"] = Solver;
