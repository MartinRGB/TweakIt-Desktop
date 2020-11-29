import {CubicBezier} from '@Components/Solver/Calculator/type//CubicBezierExtend'
import {DoubleCubicBezier} from '@Components/Solver/Calculator/type//DoubleCubicBezierExtend'

class CustomCubicBezier extends CubicBezier{constructor(p1x:any,p1y:any,p2x:any,p2y:any){super(p1x,p1y,p2x,p2y);}}
class CustomDoubleCubicBezier extends DoubleCubicBezier{constructor(b1x:any,b1y:any,b2x:any,b2y:any,a1x:any,a1y:any,a2x:any,a2y:any,bpX:any,bpY:any){super(b1x,b1y,b2x,b2y,a1x,a1y,a2x,a2y,bpX,bpY);}}

const BezierCurve ={
    CustomCubicBezier,CustomDoubleCubicBezier
}
export default BezierCurve