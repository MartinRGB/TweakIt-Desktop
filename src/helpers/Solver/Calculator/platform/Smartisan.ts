import {SOSPowerSpring} from '@Helpers/Solver/Calculator/type/SpringAnimationExtend'
import {CubicBezier} from '@Helpers/Solver/Calculator/type/CubicBezierExtend'


class Power1 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power2 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power3 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power4 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power5 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power6 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power7 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}
class Power8 extends SOSPowerSpring{constructor (stiffness?:number, dampingratio?:number) {super(stiffness, dampingratio)}}

class Linear extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class Standard extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class Ease extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class SineIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class SineOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class SineInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuadIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuadOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuadInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class CubicIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class CubicOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class CubicInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuartIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuartOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuartInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuintIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuintOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class QuintInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class ExpoIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class ExpoOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class ExpoInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

const Smartisan ={
    Power1,Power2,Power3,Power4,Power5,Power6,Power7,Power8,Linear,Standard,Ease,EaseIn,EaseOut,EaseInOut,SineIn,SineOut,SineInOut,QuadIn,QuadOut,QuadInOut,CubicIn,CubicOut,CubicInOut,QuartIn,QuartOut,QuartInOut,QuintIn,QuintOut,QuintInOut,ExpoIn,ExpoOut,ExpoInOut
}

export default Smartisan