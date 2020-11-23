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
    AndroidFling,
} from '@Components/Solver/Calculator/FlingAnimationExtend'




export const CreateSolverByString = (calculator:string,name:string,data:any) =>{
    console.log(calculator)
    console.log(name)
    console.log(data)


    const para1 = 50;
    const para2 = 2;
    //const clzNam = 'mProtopieSpring';

    // class mProtopieSpring extends ProtopieSpring{
    //     constructor(tension:number, friction:number){
    //         super(tension, friction)
    //     }
    // };

    
    //const bar = new ProtopieSpring(para1,para2)

    //console.log(`new ${clzNam}(${para1},${para2})`)
    //const bar = eval(`new ProtopieSpring(50,2)`);

    //const bar = eval(`new ${clzNam}(50,2)`)
    
    //console.log(bar);


    // const foo = 'Foo';
    // const bar = eval(`new ${foo}()`);
    // console.log(bar);

    return new EaseOut();
}
