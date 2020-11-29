// Social

import {
    setCalculatorSamplePointNumber,
    setCalculatorSampleScale,
    LookupTableCalculator,
    HorizontalLineCalculator} from '@Components/Solver/Calculator/BaseCalculator'

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

import {
    CreateSolverByString
} from '@Components/Solver/CreateSolverByString'

// class FastOutExtraSlowIn extends DoubleCubicBezierCalculator{constructor(){super(0.30, 0.00, 0.80, 0.15,0.05, 0.70, 0.10, 1.00,0.1666,0.5);}}

import Android from'@Components/Solver/Calculator/platform/Android'
import iOS from'@Components/Solver/Calculator/platform/iOS'
import Fluent from'@Components/Solver/Calculator/platform/Fluent'
import Flutter from'@Components/Solver/Calculator/platform/Flutter'
import Smartisan from'@Components/Solver/Calculator/platform/Smartisan'
import Web from'@Components/Solver/Calculator/platform/Web'
import BezierCurve from'@Components/Solver/Calculator/platform/BezierCurve'
import DesignTools from'@Components/Solver/Calculator/platform/DesignTools'
import Default from'@Components/Solver/Calculator/platform/Default'

const Solver = {
    Android,
    iOS,
    Fluent,
    Flutter,
    Smartisan,
    Web,
    BezierCurve,
    DesignTools,
    Default,
    setCalculatorSamplePointNumber,
    setCalculatorSampleScale,
    CreateSolverByString,
    LookupTableCalculator,
    HorizontalLineCalculator,
    // CustomBezier,
    // CustomFunctionInterpolator,
    // LinearInterpolator,
    // AccelerateInterpolator,
    // DecelerateInterpolator,
    // AccelerateDecelerateInterpolator,
    // AnticipateInterpolator,
    // OvershootInterpolator,
    // AnticipateOvershootInterpolator,
    // BounceInterpolator,
    // CycleInterpolator,
    // ViscosFluidInterpolator,
    // CustomSpringInterpolator,
    // LookupTableCalculator,
    // CustomMocosSpringInterpolator,
    // CustomBounceInterpolator,
    // CustomDampingInterpolator,
    // Linear,
    // EaseIn,
    // EaseOut,
    // EaseInOut,
    // Ease,
    // FastOutSlowIn,
    // LinearOutSlowIn,
    // FastOutLinear,
    // FastOutExtraSlowIn,
    // AndroidSpring,
    // AndroidFling,
    // FramerDHOSpring,
    // FramerRK4Spring,
    // OrigamiPOPSpring,
    // iOSUIViewSpring,
    // iOSCASpring,
    // ProtopieSpring,
    // PrincipleSpring,
    // DoubleCubicBezierCalculator,
    // CustomDoubleBezier,
}

export default Solver
