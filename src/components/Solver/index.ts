// Social

import {
    setCalculatorSamplePointNumber,
    setCalculatorSampleScale,
    LookupTableCalculator,
    HorizontalLineCalculator} from '@Components/Solver/Calculator/BaseCalculator'

import {    
    LinearInterpolator,
    CustomFunctionInterpolator,
    AccelerateInterpolator,
    DecelerateInterpolator,
    AccelerateDecelerateInterpolator,
    AnticipateInterpolator,
    OvershootInterpolator,
    AnticipateOvershootInterpolator,
    BounceInterpolator,
    CycleInterpolator,
    ViscosFluidInterpolator,
    CustomSpringInterpolator,
    CustomMocosSpringInterpolator,
    CustomBounceInterpolator,
    CustomDampingInterpolator} from '@Components/Solver/Calculator/InterpolatorExtend'

import {    
    CubicBezier,
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut,
    Ease,
    FastOutSlowIn,
    LinearOutSlowIn,
    FastOutLinear} from '@Components/Solver/Calculator/CubicBezierExtend'

import {    
    AndroidSpring,
    FramerDHOSpring,
    FramerRK4Spring,
    OrigamiPOPSpring,
    UIViewSpring,
    ProtopieSpring,
    PrincipleSpring
    } from '@Components/Solver/Calculator/SpringAnimationExtend'

import {
    AndroidFling
} from '@Components/Solver/Calculator/FlingAnimationExtend'

const Solver = {
    setCalculatorSamplePointNumber,
    setCalculatorSampleScale,
    HorizontalLineCalculator,
    CubicBezier,
    CustomFunctionInterpolator,
    LinearInterpolator,
    AccelerateInterpolator,
    DecelerateInterpolator,
    AccelerateDecelerateInterpolator,
    AnticipateInterpolator,
    OvershootInterpolator,
    AnticipateOvershootInterpolator,
    BounceInterpolator,
    CycleInterpolator,
    ViscosFluidInterpolator,
    CustomSpringInterpolator,
    LookupTableCalculator,
    CustomMocosSpringInterpolator,
    CustomBounceInterpolator,
    CustomDampingInterpolator,
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut,
    Ease,
    FastOutSlowIn,
    LinearOutSlowIn,
    FastOutLinear,
    AndroidSpring,
    AndroidFling,
    FramerDHOSpring,
    FramerRK4Spring,
    OrigamiPOPSpring,
    UIViewSpring,
    ProtopieSpring,
    PrincipleSpring
}

export default Solver
