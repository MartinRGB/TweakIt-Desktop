import {CubicBezierCalculator} from './BaseCalculator'


export class CustomBezier extends CubicBezierCalculator{
    constructor(p1x:any,p1y:any,p2x:any,p2y:any){
        super(p1x,p1y,p2x,p2y);
    }
}

export class Linear extends CubicBezierCalculator{constructor(){super(0.25,0.25,0.75,0.75);}}
export class EaseIn extends CubicBezierCalculator{constructor(){super(0.42,0.00,1.00,1.00);}}
export class EaseOut extends CubicBezierCalculator{constructor(){super(0.00,0.00,0.58,1.00);}}
export class EaseInOut extends CubicBezierCalculator{constructor(){super(0.42,0.00,0.58,1.00);}}
export class Ease extends CubicBezierCalculator{constructor(){super(0.25,0.10,0.25,1.00);}}
export class FastOutSlowIn extends CubicBezierCalculator{constructor(){super(0.40,0.00,0.20,1.00);}}
export class LinearOutSlowIn extends CubicBezierCalculator{constructor(){super(0.00,0.00,0.20,1.00);}}
export class FastOutLinear extends CubicBezierCalculator{constructor(){super(0.40,0.00,1.00,1.00);}}
