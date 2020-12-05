import {FastOutExtraSlowInInterpolator} from '@Helpers/Solver/Calculator/type/DoubleCubicBezierExtend'
import {AndroidSpring} from '@Helpers/Solver/Calculator/type/SpringAnimationExtend'
import {AndroidFling} from '@Helpers/Solver/Calculator/type/FlingAnimationExtend'
import {CustomFunctionInterpolator,LinearInterpolator,AccelerateInterpolator,DecelerateInterpolator,AccelerateDecelerateInterpolator,AnticipateInterpolator,OvershootInterpolator,AnticipateOvershootInterpolator,BounceInterpolator,CycleInterpolator,ViscosFluidInterpolator,CustomSpringInterpolator,CustomMocosSpringInterpolator,CustomBounceInterpolator,CustomDampingInterpolator} from '@Helpers/Solver/Calculator/type//InterpolatorExtend'
import {CubicBezier} from '@Helpers/Solver/Calculator/type//CubicBezierExtend'

class Spring extends AndroidSpring {constructor (stiffness?:number, dampingratio?:number, velocity?:number) {super(stiffness, dampingratio, velocity)}}
class Fling extends AndroidFling {constructor (velocity?:number, friction?:number) {super(velocity, friction)}}

class Linear extends LinearInterpolator{constructor(a?:number) {super(a);}}
class Accelerate extends AccelerateInterpolator{constructor(a?:number) {super(a);}}
class Decelerate extends DecelerateInterpolator{constructor(a?:number) {super(a);}}
class AccelerateDecelerate extends AccelerateDecelerateInterpolator{constructor(a?:number) {super(a);}}
class Anticipate extends AnticipateInterpolator{constructor(a?:number) {super(a);}}
class Overshoot extends OvershootInterpolator{constructor(a?:number) {super(a);}}
class AnticipateOvershoot extends AnticipateOvershootInterpolator{constructor(a?:number) {super(a);}}
class Bounce extends BounceInterpolator{constructor(a?:number) {super(a);}}
class Cycle extends CycleInterpolator{constructor(a?:number) {super(a);}}

class FastOutSlowIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class FastOutExtraSlowIn extends FastOutExtraSlowInInterpolator{constructor(b1x:any,b1y:any,b2x:any,b2y:any,a1x:any,a1y:any,a2x:any,a2y:any,bpX:any,bpY:any){
    super(b1x,b1y,b2x,b2y,a1x,a1y,a2x,a2y,bpX,bpY);}}
class LinearOutSlowIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class FastOutLinear extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class CustomFunction extends CustomFunctionInterpolator{constructor(funs?:(x:number) =>void) {super(funs);}}
class CustomSpring extends CustomSpringInterpolator{constructor(a?:number) {super(a);}}
class CustomMocosSpring extends CustomMocosSpringInterpolator{constructor(tension?:number,friction?:number,velocity?:number) {super(tension,friction,velocity);}}
class CustomBounce extends CustomBounceInterpolator {constructor(tension?:any,friction?:any) {super(tension,friction);}}
class CustomDamping extends CustomDampingInterpolator {constructor(tension?:any,friction?:any) {super(tension,friction);}}
class ViscosFluid extends ViscosFluidInterpolator{constructor(a?:number){super(a);}}

const Android = {
    Spring,Fling,Linear,Accelerate,Decelerate,AccelerateDecelerate,Anticipate,Overshoot,AnticipateOvershoot,Bounce,Cycle,FastOutSlowIn,FastOutExtraSlowIn,LinearOutSlowIn,FastOutLinear,CustomFunction,CustomSpring,CustomMocosSpring,CustomBounce,CustomDamping,ViscosFluid
}

export default Android