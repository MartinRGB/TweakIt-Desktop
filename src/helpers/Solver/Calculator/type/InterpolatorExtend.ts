import {InterpolatorCalculator} from '@Helpers/Solver/Calculator/BaseCalculator'


// e.g
// new CustomFunctionInterpolator((x:number)=>{
//     return x*x*x;
// })

export class CustomFunctionInterpolator extends InterpolatorCalculator{
    constructor(funs?:(x:number) =>void) {
        super();
        var definedFucntion:any = funs?funs:(x:number)=>{return x}
        this.def = (t:number) =>{return definedFucntion(t);}
    }
}

export class LinearInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return t;}
    }
}

export class AccelerateInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return Math.pow(t,2*c);}
    }
}


export class DecelerateInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return 1 - Math.pow(1-t,2 * c);}
    }
}

export class AccelerateDecelerateInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        this.def = (t:number) =>{return Math.cos((t + 1)*Math.PI)/2 + 0.5;}
    }
}

export class AnticipateInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return (c+1)*Math.pow(t,3) - c * Math.pow(t,2);}
    }
}

export class OvershootInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return (c + 1) * Math.pow(t - 1,3) + c * Math.pow(t - 1,2) + 1;}
    }
}

export class AnticipateOvershootInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return this.getAOSI(t,c);}
    }

    getAOSI(t:number,f:number) {
        if (t < 0.5) return 0.5 * this.aosiFunctionA(t * 2.0, f*1.5);
        else return 0.5 * (this.aosiFunctionB(t * 2.0 - 2.0, f*1.5) + 2.0);
    }

    aosiFunctionA(t:number,s:number) {
        return t * t * ((s + 1) * t - s);
    }
    aosiFunctionB(t:number,s:number) {
        return t * t * ((s + 1) * t + s);
    }
}

export class BounceInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return this.getBounce(t);}
    }

    bounce(t:number){
        return t * t * 8.0;
    }

    getBounce(t:number){
        t *= 1.1226;
        if (t < 0.3535) return this.bounce(t);
        else if (t < 0.7408) return this.bounce(t - 0.54719) + 0.7;
        else if (t < 0.9644) return this.bounce(t - 0.8526) + 0.9;
        else return this.bounce(t - 1.0435) + 0.95;
    }
}

export class CycleInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return Math.sin(2*Math.PI * c * t);}
    }
}

export class CustomSpringInterpolator extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        var c:number = a?a:0.5
        this.def = (t:number) =>{
        
            if(t == 0.0 || t == 1.0){
                return t;
            }
            else{
                var value = (Math.pow(2, -10 * t) * Math.sin((t - c / 4.0) * (2.0 * Math.PI) / c) + 1);
                return value;
            }
        
        }
    }
}

export class CustomMocosSpringInterpolator extends InterpolatorCalculator{

    private tension:number;
    private friction:number;
    private velocity:number;

    private mGamma:number;
    private mVDiv2:number;
    private mOscilative:boolean;
    private mEps:number;
    private mA:number;
    private mB:number;
    private mDuration:number;

    constructor(tension?:number,friction?:number,velocity?:number) {
        super();
        this.tension = tension?tension:100;
        this.friction = friction?friction:15;
        this.velocity = velocity?velocity:0;

        this.mGamma = 0;
        this.mVDiv2 = 0;
        this.mOscilative = false;
        this.mEps = 0;
        this.mA = 0;
        this.mB = 0;
        this.mDuration = 0;

        this.CustomMocosSpringCalculate(this.tension,this.friction,this.velocity)

        this.def = (t:number) =>{
        
            var _this = this;
            if (t >= 1) {
                return 1;
            }
            var t = t * _this.mDuration;
            return (_this.mOscilative ?
                    (_this.mA * Math.exp(-_this.mVDiv2 * t) * Math.sin(_this.mGamma * t + _this.mB) + 1) :
                    (_this.mA * Math.exp((_this.mGamma - _this.mVDiv2) * t) + _this.mB * Math.exp(-(_this.mGamma + _this.mVDiv2) * t) + 1));
        
        }
    }

    CustomMocosSpringCalculate(tension:any, damping:any, velocity:any) {
        //mEps = eps;
        var _this = this;
        _this.mEps = 0.001;
        _this.mOscilative = (4 * tension - damping * damping > 0);
        if (_this.mOscilative) {
            _this.mGamma = Math.sqrt(4 * tension - damping * damping) / 2;
            _this.mVDiv2 = damping / 2;
        } else {
            _this.mGamma = Math.sqrt(damping * damping - 4 * tension) / 2;
            _this.mVDiv2 = damping / 2;
        }
        _this.setInitialVelocity(velocity);
    }

    setInitialVelocity(v0:any) {
        var _this = this;
        if (_this.mOscilative) {
            _this.mB = Math.atan(-_this.mGamma / (v0 - _this.mVDiv2));
            _this.mA = -1 / Math.sin(_this.mB);
            _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / _this.mVDiv2;
        } else {
            _this.mA = (v0 - (_this.mGamma + _this.mVDiv2)) / (2 * _this.mGamma);
            _this.mB = -1 - _this.mA;
            _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / (_this.mVDiv2 - _this.mGamma);
        }
    }

    getDesiredDuration() {
        var _this = this;
        return _this.mDuration;
    }
}


export class CustomBounceInterpolator extends InterpolatorCalculator {
    private tension:number;
    private friction:number;
    private originalTension:number;
    private originalFriction:number;

    private maxStifness:number;
    private maxFrictionMultipler:number;
    private mTension:number;
    private mFriction:number;

    private amplitude:number;
    private phase:number;

    private originalStiffness:number;
    private originalFrictionMultipler:number;
    private mass:number;

    private pulsation:number;


    constructor(tension?:any,friction?:any) {
        super();
        this.tension = tension?tension:0;
        this.friction = friction?friction:0;
        this.originalTension = tension;
        this.originalFriction = friction;

        this.maxStifness = 50;
        this.maxFrictionMultipler = 1;
        this.mTension = 0;
        this.mFriction = 0;
    
        //Curve Position parameters(No Adjust)
        this.amplitude = 1;
        this.phase = 0;
    
        //Original Scale parameters(Better No Adjust)
        this.originalStiffness = 12;
        this.originalFrictionMultipler = 0.3;
        this.mass = 0.058;
    
        //Internal parameters
        this.pulsation = 0;
        // this.friction = 0;

        this.CustomPhysicsCalculate(this.tension,this.friction)
        //this.def = );

        this.def = (t:number) =>{
            if (t == 0.0 || t == 1.0){
                return t;
            }else{
                var value = this.amplitude *  Math.exp(-this.friction * t) *
                        Math.cos(this.pulsation * t + this.phase) ;
                //var result = funs(value)
                return -Math.abs(value)+1;
            }
        }

    }

   computePulsation() {
        this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
    }

    computeFriction() {
        this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
    }

    computeInternalParameters() {
        // never call computeFriction() without
        // updating the pulsation
        this.computePulsation();
        this.computeFriction();
    }

    CustomPhysicsCalculate(tension:number,friction:number) {

        this.mTension = Math.min(Math.max(tension,0),100) * (this.maxStifness - this.originalStiffness)/100;
        this.mFriction = Math.min(Math.max(friction,0),100) * (this.maxFrictionMultipler - this.originalFrictionMultipler)/100;

        this.computeInternalParameters();
    }

}

export class CustomDampingInterpolator extends InterpolatorCalculator {
    private tension:number;
    private friction:number;
    private originalTension:number;
    private originalFriction:number;

    private maxStifness:number;
    private maxFrictionMultipler:number;
    private mTension:number;
    private mFriction:number;

    private amplitude:number;
    private phase:number;

    private originalStiffness:number;
    private originalFrictionMultipler:number;
    private mass:number;

    private pulsation:number;


    constructor(tension?:any,friction?:any) {
        super();
        this.tension = tension?tension:0;
        this.friction = friction?friction:0;
        this.originalTension = tension;
        this.originalFriction = friction;

        this.maxStifness = 50;
        this.maxFrictionMultipler = 1;
        this.mTension = 0;
        this.mFriction = 0;
    
        //Curve Position parameters(No Adjust)
        this.amplitude = 1;
        this.phase = 0;
    
        //Original Scale parameters(Better No Adjust)
        this.originalStiffness = 12;
        this.originalFrictionMultipler = 0.3;
        this.mass = 0.058;
    
        //Internal parameters
        this.pulsation = 0;
        // this.friction = 0;

        this.CustomPhysicsCalculate(this.tension,this.friction)
        //this.def = );

        this.def = (t:number) =>{
            if (t == 0.0 || t == 1.0){
                return t;
            }else{
                var value = this.amplitude *  Math.exp(-this.friction * t) *
                        Math.cos(this.pulsation * t + this.phase) ;
                //var result = funs(value)
                return -(value)+1;
            }
        }

    }

   computePulsation() {
        this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
    }

    computeFriction() {
        this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
    }

    computeInternalParameters() {
        // never call computeFriction() without
        // updating the pulsation
        this.computePulsation();
        this.computeFriction();
    }

    CustomPhysicsCalculate(tension:number,friction:number) {

        this.mTension = Math.min(Math.max(tension,0),100) * (this.maxStifness - this.originalStiffness)/100;
        this.mFriction = Math.min(Math.max(friction,0),100) * (this.maxFrictionMultipler - this.originalFrictionMultipler)/100;

        this.computeInternalParameters();
    }

}

export class ViscosFluidInterpolator extends InterpolatorCalculator{

    constructor(a?:number) {
        super();
        var c:number = a?a:2
        this.def = (t:number) =>{return this.getViscosFluid(t,c);}
    }

    viscousFluid(x:number,c:number) {
        x *= c ;
        if (x < 1.0) {
            x -= (1.0 - Math.exp(-x));
        } else {
            var start = 0.36787944117;   // 1/e == exp(-1)
            x = 1.0 - Math.exp(1.0 - x);
            x = start + x * (1.0 - start);
        }
        return x;
      }

    getViscosFluid(t:number,c:number){
        var VISCOUS_FLUID_NORMALIZE = 1.0 / this.viscousFluid(1.0,c);
        // account for very small floating-point error
        var VISCOUS_FLUID_OFFSET = 1.0 - VISCOUS_FLUID_NORMALIZE * this.viscousFluid(1.0,c);
  
        var interpolated = VISCOUS_FLUID_NORMALIZE * this.viscousFluid(t,c);
        if (interpolated > 0) {
            return interpolated + VISCOUS_FLUID_OFFSET;
        }
        return interpolated;
    }
}

export class FlutterLinear extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        this.def = (t:number) =>{return t}
    }
}


export class FlutterDecelerate extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        this.def = (t:number) =>{
            t = 1.0 - t;
            return 1.0 - t * t;
        }
    }
}

export class FlutterElasticIn extends InterpolatorCalculator{
    private period:number;
    constructor(a?:number) {
        super();
        this.period = 0.4;
        this.def = (t:number) =>{
            var s:number = this.period / 4.0;
            t = t - 1.0;
            return -Math.pow(2.0, 10.0 * t) * Math.sin((t - s) * (Math.PI * 2.0) / this.period);
        }
    }
}

export class FlutterElasticOut extends InterpolatorCalculator{
    private period:number;
    constructor(a?:number) {
        super();
        this.period = 0.4;
        this.def = (t:number) =>{
            var s:number = this.period / 4.0;
            return Math.pow(2.0, -10 * t) * Math.sin((t - s) * (Math.PI * 2.0) / this.period) + 1.0;
        }
    }
}

export class FlutterElasticInOut extends InterpolatorCalculator{
    private period:number;
    constructor(a?:number) {
        super();
        this.period = 0.4;
        this.def = (t:number) =>{
            var s:number = this.period / 4.0;
            t = 2.0 * t - 1.0;
            if (t < 0.0)
              return -0.5 * Math.pow(2.0, 10.0 * t) * Math.sin((t - s) * (Math.PI * 2.0) / this.period);
            else
              return Math.pow(2.0, -10.0 * t) * Math.sin((t - s) * (Math.PI * 2.0) / this.period) * 0.5 + 1.0;
        }
    }
}

export class FlutterBounceIn extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        this.def = (t:number) =>{return 1.0 - this._bounce(1.0 - t)}
    }

    _bounce(t:number) {
        if (t < 1.0 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
}

export class FlutterBounceOut extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        this.def = (t:number) =>{return this._bounce(t)}
    }

    _bounce(t:number) {
        if (t < 1.0 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
}

export class FlutterBounceInOut extends InterpolatorCalculator{
    constructor(a?:number) {
        super();
        this.def = (t:number) =>{
            if (t < 0.5)
                return (1.0 - this._bounce(1.0 - t * 2.0)) * 0.5;
            else
                return this._bounce(t * 2.0 - 1.0) * 0.5 + 0.5;
        }
    }

    _bounce(t:number) {
        if (t < 1.0 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
}

