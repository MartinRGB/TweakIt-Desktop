import {CubicBezier} from '@Helpers/Solver/Calculator/type/CubicBezierExtend'

class Linear extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class Ease extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

const Web = {
    Linear,Ease,EaseIn,EaseOut,EaseInOut
}

export default Web;