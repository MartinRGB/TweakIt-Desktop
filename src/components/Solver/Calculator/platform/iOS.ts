import {iOSUIViewSpring,iOSCASpring} from '@Components/Solver/Calculator/type/SpringAnimationExtend'
import {CubicBezier} from '@Components/Solver/Calculator/type/CubicBezierExtend'

class UIViewSpring extends iOSUIViewSpring{constructor(dampingratio?:number,duration?:number) {super(dampingratio,duration);}}
class CASpring extends iOSCASpring{constructor(stiffness?:number,damping?:number,mass?:number,velocity?:number) {super(stiffness,damping,mass,velocity);}}
class Linear extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

const iOS ={
    UIViewSpring,CASpring,Linear,EaseIn,EaseOut,EaseInOut
}

export default iOS