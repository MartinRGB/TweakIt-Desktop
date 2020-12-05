import {CubicBezier} from '@Helpers/Solver/Calculator/type/CubicBezierExtend'

class Linear extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class Standard extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class Accelerate extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class Decelerate extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

const Fluent = {
    Linear,
    Standard,
    Accelerate,
    Decelerate
}

export default Fluent