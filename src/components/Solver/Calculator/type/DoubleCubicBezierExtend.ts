import {DoubleCubicBezierCalculator} from '@Components/Solver/Calculator/BaseCalculator'

export class DoubleCubicBezier extends DoubleCubicBezierCalculator{
    constructor(b1x:any,b1y:any,b2x:any,b2y:any,a1x:any,a1y:any,a2x:any,a2y:any,bpX:any,bpY:any){
    super(b1x,b1y,b2x,b2y,a1x,a1y,a2x,a2y,bpX,bpY);
}}

export class FastOutExtraSlowInInterpolator extends DoubleCubicBezierCalculator{
    constructor(b1x:any,b1y:any,b2x:any,b2y:any,a1x:any,a1y:any,a2x:any,a2y:any,bpX:any,bpY:any){
        super(b1x,b1y,b2x,b2y,a1x,a1y,a2x,a2y,bpX,bpY);
}}