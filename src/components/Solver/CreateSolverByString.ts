// import {SpringAnimationCalculator,FlingAnimationCalculator,CubicBezierCalculator,HorizontalLineCalculator,InterpolatorCalculator} from '@Components/Solver/Calculator/BaseCalculator'
import Solver from '@Components/Solver'
import initState from '@Config/init_state.json'


// class AndroidSpring extends SpringAnimationCalculator {
//     constructor (stiffness:number, dampingratio:number, velocity:number) {
//         super()
  
//         this.stiffness = stiffness
//         this.dampingratio = dampingratio
//         this.velocity = velocity
//         this.mass = 1.0
//         this.fixedGraph = false
  
//         this.damping = this.computeDamping(this.stiffness, this.dampingratio, this.mass)
//         this.tension = this.stiffness
//         this.friction = this.damping
//         this.duration = this.computeDuration(this.tension, this.friction, this.mass, 2.0)

//         this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
//     }
//   }
  
// class FramerDHOSpring extends SpringAnimationCalculator {
//     constructor (stiffness:number, damping:number, mass:number, velocity:number) {
//       super()
  
//       this.stiffness = stiffness
//       this.damping = damping
//       this.mass = mass
//       this.velocity = velocity
//       this.fixedGraph = true
  
//       this.tension = this.stiffness
//       this.friction = this.damping
//       this.dampingratio = this.computeDampingRatio(this.tension, this.friction, this.mass)
//       this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)

//       // DAMPINGRATIO FIX
//       if(this.dampingratio >= 1){
//         this.friction = this.computeDamping(this.stiffness,Math.max(0.,Math.min(0.9999,this.dampingratio)),this.mass)
//         this.stiffness = this.computeOverDampingTension(this.friction,this.dampingratio,this.mass)
//         this.dampingratio = Math.max(0.,Math.min(0.9999,this.dampingratio));
//         this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass), this.mass, 1.0)
//       }

//       this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
//     }
//   }
  
// class CASpring extends FramerDHOSpring{
//     constructor (stiffness:number, damping:number, mass:number, velocity:number) {
//       super(stiffness,damping,mass,velocity)
//     }
//   }
  
// class FramerRK4Spring extends SpringAnimationCalculator {
//     constructor (tension:number, friction:number, velocity:number) {
//       super()
  
//       this.tension = tension
//       this.friction = friction
//       this.velocity = velocity
  
//       this.stiffness = this.tension
//       this.damping = this.friction
//       this.mass = 1.0
//       this.fixedGraph = true
  
//       this.dampingratio = this.computeDampingRatio(this.tension, this.friction, this.mass)
//       this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)

//       // DAMPINGRATIO FIX
//       if(this.dampingratio >= 1){
//         this.friction = this.computeDamping(this.stiffness,Math.max(0.,Math.min(0.9999,this.dampingratio)),this.mass)
//         this.stiffness = this.computeOverDampingTension(this.friction,this.dampingratio,this.mass)
//         this.dampingratio = Math.max(0.,Math.min(0.9999,this.dampingratio));
//         this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass), this.mass, 1.0)
//       }

//       this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
        
//     }
//   }
  
// class OrigamiPOPSpring extends SpringAnimationCalculator {
//     constructor (bounciness:number, speed:number) {
//       super()
  
//       this.fixedGraph = false
  
//       this.bounciness = bounciness
//       this.speed = speed
//       this.velocity = 0.0
//       let b = this.normalize(bounciness / 1.7, 0, 20.0)
//       b = this.projectNormal(b, 0.0, 0.8)
//       const s = this.normalize(speed / 1.7, 0, 20.0)
//       this.bouncyTension = this.projectNormal(s, 0.5, 200)
//       this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01)
  
//       // Output
//       this.mass = 1.0
//       this.tension = this.tensionConversion(this.bouncyTension)
//       this.friction = this.frictionConversion(this.bouncyFriction)
//       this.stiffness = this.tension
//       this.damping = this.friction
//       this.dampingratio = this.computeDampingRatio(this.tension, this.friction, this.mass)
//       this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)

//       // BUT BUGS HERE:DAMPINGRATIO FIX
//       if(this.dampingratio >= 1){
//         this.friction = this.computeDamping(this.stiffness,Math.max(0.,Math.min(0.9999,this.dampingratio)),this.mass)
//         this.stiffness = this.computeOverDampingTension(this.friction,this.dampingratio,this.mass)
//         this.dampingratio = Math.max(0.,Math.min(0.9999,this.dampingratio));
//         this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass), this.mass, 1.0)
//       }
  
//       this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
//     }
  
//     tensionConversion (oValue:number) {
//       return (oValue - 30.0) * 3.62 + 194.0
//     }
  
//     frictionConversion (oValue:number) {
//       return (oValue - 8.0) * 3.0 + 25.0
//     }
//   }
  
// class UIViewSpring extends SpringAnimationCalculator {
//     constructor (dampingratio:number, duration:number) {
//       super()
  
//       // this.stiffness = this.tensionFromOrigamiValue(stiffness);
//       // this.damping = this.frictionFromOrigamiValue(damping);
//       this.dampingratio = dampingratio
//       this.duration = duration
//       this.fixedGraph = false
  
//       // Output
//       this.mass = 1.0
  
//       // Method -I
//       // this.friction = this.computeFriction(this.dampingRatio,this.duration);
//       // this.damping = this.friction;
//       // this.tension = this.computeTension(this.dampingRatio,this.friction);
//       // this.stiffness = this.tension;
  
//       // Method -II
//       this.tension = this.computeTension(this.dampingratio, this.duration, this.mass)
//       this.stiffness = this.tension
//       // this.damping = this.friction;
  
//       // Useless
//       // this.bouncyTension = this.bouncyTesnionConversion(this.tension);
//       // this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
  
//       // this.s = this.getParaS(this.bouncyTension,0.5,200);
//       // this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
//       // this.b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
//       // this.bounciness = 20*1.7*this.b/0.8;

//       this.array = this.springCalculator(this.stiffness, this.dampingratio, 0.0, this.duration, this.fixedGraph)
//     }
  
//     // Method -I
//     // computeFriction(dampingratio, duration) {
//     //     var a = Math.sqrt(1 - Math.pow(dampingratio, 2));
//     //     var d = (dampingratio/a)*1000.;
  
//     //     return 2*Math.log(d)/duration;
//     // }
  
//     // computeTension(dampingratio, friction) {
//     //     return Math.pow(friction/(dampingratio*2),2);
//     // }
  
//     // Method -II
//     computeTension (dampingratio:number, duration:number, mass:number) {
//       const a = Math.sqrt(1 - Math.pow(dampingratio, 2))
//       const d = (dampingratio / a) * 1000.0
//       const tension = Math.pow(Math.log(d) / (dampingratio * duration), 2) * mass
//       return tension
//     }
  
//     computeFriction (dampingratio:number, tension:number, mass:number) {
//       const a = (2 * Math.sqrt(mass * tension))
//       const friction = dampingratio * a
//       return friction
//     }
//   }
  
// class ProtopieSpring extends FramerRK4Spring {
//     constructor (tension:number, friction:number) {
//       super(tension, friction, 0)
//     }
//   }
  
// class PrincipleSpring extends FramerRK4Spring {
//     constructor (tension:number, friction:number) {
//       super(tension, friction, 0)
//     }
//   }

  
// class AndroidFling extends FlingAnimationCalculator{constructor(velocity:number, dampingRatio:number) { super(velocity,dampingRatio)}}

// class CustomBezier extends CubicBezierCalculator{constructor(p1x:any,p1y:any,p2x:any,p2y:any){super(p1x,p1y,p2x,p2y);}}
// class Linear extends CubicBezierCalculator{constructor(){super(0.25,0.25,0.75,0.75);}}
// class EaseIn extends CubicBezierCalculator{constructor(){super(0.42,0.00,1.00,1.00);}}
// class EaseOut extends CubicBezierCalculator{constructor(){super(0.00,0.00,0.58,1.00);}}
// class EaseInOut extends CubicBezierCalculator{constructor(){super(0.42,0.00,0.58,1.00);}}
// class Ease extends CubicBezierCalculator{constructor(){super(0.25,0.10,0.25,1.00);}}
// class FastOutSlowIn extends CubicBezierCalculator{constructor(){super(0.40,0.00,0.20,1.00);}}
// class LinearOutSlowIn extends CubicBezierCalculator{constructor(){super(0.00,0.00,0.20,1.00);}}
// class FastOutLinear extends CubicBezierCalculator{constructor(){super(0.40,0.00,1.00,1.00);}}
// class HorizontalLine extends HorizontalLineCalculator{constructor(){super()}}

// class CustomFunctionInterpolator extends InterpolatorCalculator{
//     constructor(funs?:(x:number) =>void) {
//         super();
//         var def:any = funs?funs:(x:number)=>{return x}
//         this.array = this.interpolatorCalculator((t:number) =>{return def(t);});
//     }
// }

// class LinearInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return t;});
//     }
// }

// class AccelerateInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return Math.pow(t,2*c);});
//     }
// }


// class DecelerateInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return 1 - Math.pow(1-t,2 * c);});
//     }
// }

// class AccelerateDecelerateInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         this.array = this.interpolatorCalculator((t:number) =>{return Math.cos((t + 1)*Math.PI)/2 + 0.5;});
//     }
// }

// class AnticipateInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return (c+1)*Math.pow(t,3) - c * Math.pow(t,2);});
//     }
// }

// class OvershootInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return (c + 1) * Math.pow(t - 1,3) + c * Math.pow(t - 1,2) + 1;});
//     }
// }

// class AnticipateOvershootInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return this.getAOSI(t,c);});
//     }

//     getAOSI(t:number,f:number) {
//         if (t < 0.5) return 0.5 * this.aosiFunctionA(t * 2.0, f*1.5);
//         else return 0.5 * (this.aosiFunctionB(t * 2.0 - 2.0, f*1.5) + 2.0);
//     }

//     aosiFunctionA(t:number,s:number) {
//         return t * t * ((s + 1) * t - s);
//     }
//     aosiFunctionB(t:number,s:number) {
//         return t * t * ((s + 1) * t + s);
//     }
// }

// class BounceInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return this.getBounce(t);});
//     }

//     bounce(t:number){
//         return t * t * 8.0;
//     }

//     getBounce(t:number){
//         t *= 1.1226;
//         if (t < 0.3535) return this.bounce(t);
//         else if (t < 0.7408) return this.bounce(t - 0.54719) + 0.7;
//         else if (t < 0.9644) return this.bounce(t - 0.8526) + 0.9;
//         else return this.bounce(t - 1.0435) + 0.95;
//     }
// }

// class CycleInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return Math.sin(2*Math.PI * c * t);});
//     }
// }

// class ViscosFluidInterpolator extends InterpolatorCalculator{

//     constructor(a?:number) {
//         super();
//         var c:number = a?a:2
//         this.array = this.interpolatorCalculator((t:number) =>{return this.getViscosFluid(t,c);});
//     }

//     viscousFluid(x:number,c:number) {
//         x *= c ;
//         if (x < 1.0) {
//             x -= (1.0 - Math.exp(-x));
//         } else {
//             var start = 0.36787944117;   // 1/e == exp(-1)
//             x = 1.0 - Math.exp(1.0 - x);
//             x = start + x * (1.0 - start);
//         }
//         return x;
//       }

//     getViscosFluid(t:number,c:number){
//         var VISCOUS_FLUID_NORMALIZE = 1.0 / this.viscousFluid(1.0,c);
//         // account for very small floating-point error
//         var VISCOUS_FLUID_OFFSET = 1.0 - VISCOUS_FLUID_NORMALIZE * this.viscousFluid(1.0,c);
  
//         var interpolated = VISCOUS_FLUID_NORMALIZE * this.viscousFluid(t,c);
//         if (interpolated > 0) {
//             return interpolated + VISCOUS_FLUID_OFFSET;
//         }
//         return interpolated;
//     }
// }


// class CustomSpringInterpolator extends InterpolatorCalculator{
//     constructor(a?:number) {
//         super();
//         var c:number = a?a:0.5
//         this.array = this.interpolatorCalculator((t:number) =>{
        
//             if(t == 0.0 || t == 1.0){
//                 return t;
//             }
//             else{
//                 var value = (Math.pow(2, -10 * t) * Math.sin((t - c / 4.0) * (2.0 * Math.PI) / c) + 1);
//                 return value;
//             }
        
//         });
//     }
// }

// class CustomMocosSpringInterpolator extends InterpolatorCalculator{

//     private tension:number;
//     private friction:number;
//     private velocity:number;

//     private mGamma:number;
//     private mVDiv2:number;
//     private mOscilative:boolean;
//     private mEps:number;
//     private mA:number;
//     private mB:number;
//     private mDuration:number;

//     constructor(tension?:number,friction?:number,velocity?:number) {
//         super();
//         this.tension = tension?tension:100;
//         this.friction = friction?friction:15;
//         this.velocity = velocity?velocity:0;

//         this.mGamma = 0;
//         this.mVDiv2 = 0;
//         this.mOscilative = false;
//         this.mEps = 0;
//         this.mA = 0;
//         this.mB = 0;
//         this.mDuration = 0;

//         this.CustomMocosSpringCalculate(this.tension,this.friction,this.velocity)

//         this.array = this.interpolatorCalculator((t:number) =>{
        
//             var _this = this;
//             if (t >= 1) {
//                 return 1;
//             }
//             var t = t * _this.mDuration;
//             return (_this.mOscilative ?
//                     (_this.mA * Math.exp(-_this.mVDiv2 * t) * Math.sin(_this.mGamma * t + _this.mB) + 1) :
//                     (_this.mA * Math.exp((_this.mGamma - _this.mVDiv2) * t) + _this.mB * Math.exp(-(_this.mGamma + _this.mVDiv2) * t) + 1));
        
//         });
//     }

//     CustomMocosSpringCalculate(tension:any, damping:any, velocity:any) {
//         //mEps = eps;
//         var _this = this;
//         _this.mEps = 0.001;
//         _this.mOscilative = (4 * tension - damping * damping > 0);
//         if (_this.mOscilative) {
//             _this.mGamma = Math.sqrt(4 * tension - damping * damping) / 2;
//             _this.mVDiv2 = damping / 2;
//         } else {
//             _this.mGamma = Math.sqrt(damping * damping - 4 * tension) / 2;
//             _this.mVDiv2 = damping / 2;
//         }
//         _this.setInitialVelocity(velocity);
//     }

//     setInitialVelocity(v0:any) {
//         var _this = this;
//         if (_this.mOscilative) {
//             _this.mB = Math.atan(-_this.mGamma / (v0 - _this.mVDiv2));
//             _this.mA = -1 / Math.sin(_this.mB);
//             _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / _this.mVDiv2;
//         } else {
//             _this.mA = (v0 - (_this.mGamma + _this.mVDiv2)) / (2 * _this.mGamma);
//             _this.mB = -1 - _this.mA;
//             _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / (_this.mVDiv2 - _this.mGamma);
//         }
//     }

//     getDesiredDuration() {
//         var _this = this;
//         return _this.mDuration;
//     }
// }


// class CustomBounceInterpolator extends InterpolatorCalculator {
//     private tension:number;
//     private friction:number;
//     private originalTension:number;
//     private originalFriction:number;

//     private maxStifness:number;
//     private maxFrictionMultipler:number;
//     private mTension:number;
//     private mFriction:number;

//     private amplitude:number;
//     private phase:number;

//     private originalStiffness:number;
//     private originalFrictionMultipler:number;
//     private mass:number;

//     private pulsation:number;


//     constructor(tension?:any,friction?:any) {
//         super();
//         this.tension = tension?tension:0;
//         this.friction = friction?friction:0;
//         this.originalTension = tension;
//         this.originalFriction = friction;

//         this.maxStifness = 50;
//         this.maxFrictionMultipler = 1;
//         this.mTension = 0;
//         this.mFriction = 0;
    
//         //Curve Position parameters(No Adjust)
//         this.amplitude = 1;
//         this.phase = 0;
    
//         //Original Scale parameters(Better No Adjust)
//         this.originalStiffness = 12;
//         this.originalFrictionMultipler = 0.3;
//         this.mass = 0.058;
    
//         //Internal parameters
//         this.pulsation = 0;
//         // this.friction = 0;

//         this.CustomPhysicsCalculate(this.tension,this.friction)
//         //this.array = this.interpolatorCalculator();

//         this.array = this.interpolatorCalculator((t:number) =>{
//             if (t == 0.0 || t == 1.0){
//                 return t;
//             }else{
//                 var value = this.amplitude *  Math.exp(-this.friction * t) *
//                         Math.cos(this.pulsation * t + this.phase) ;
//                 //var result = funs(value)
//                 return -Math.abs(value)+1;
//             }
//         });

//     }

//    computePulsation() {
//         this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
//     }

//     computeFriction() {
//         this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
//     }

//     computeInternalParameters() {
//         // never call computeFriction() without
//         // updating the pulsation
//         this.computePulsation();
//         this.computeFriction();
//     }

//     CustomPhysicsCalculate(tension:number,friction:number) {

//         this.mTension = Math.min(Math.max(tension,0),100) * (this.maxStifness - this.originalStiffness)/100;
//         this.mFriction = Math.min(Math.max(friction,0),100) * (this.maxFrictionMultipler - this.originalFrictionMultipler)/100;

//         this.computeInternalParameters();
//     }

// }

// class CustomDampingInterpolator extends InterpolatorCalculator {
//     private tension:number;
//     private friction:number;
//     private originalTension:number;
//     private originalFriction:number;

//     private maxStifness:number;
//     private maxFrictionMultipler:number;
//     private mTension:number;
//     private mFriction:number;

//     private amplitude:number;
//     private phase:number;

//     private originalStiffness:number;
//     private originalFrictionMultipler:number;
//     private mass:number;

//     private pulsation:number;


//     constructor(tension?:any,friction?:any) {
//         super();
//         this.tension = tension?tension:0;
//         this.friction = friction?friction:0;
//         this.originalTension = tension;
//         this.originalFriction = friction;

//         this.maxStifness = 50;
//         this.maxFrictionMultipler = 1;
//         this.mTension = 0;
//         this.mFriction = 0;
    
//         //Curve Position parameters(No Adjust)
//         this.amplitude = 1;
//         this.phase = 0;
    
//         //Original Scale parameters(Better No Adjust)
//         this.originalStiffness = 12;
//         this.originalFrictionMultipler = 0.3;
//         this.mass = 0.058;
    
//         //Internal parameters
//         this.pulsation = 0;
//         // this.friction = 0;

//         this.CustomPhysicsCalculate(this.tension,this.friction)
//         //this.array = this.interpolatorCalculator();

//         this.array = this.interpolatorCalculator((t:number) =>{
//             if (t == 0.0 || t == 1.0){
//                 return t;
//             }else{
//                 var value = this.amplitude *  Math.exp(-this.friction * t) *
//                         Math.cos(this.pulsation * t + this.phase) ;
//                 //var result = funs(value)
//                 return -(value)+1;
//             }
//         });

//     }

//    computePulsation() {
//         this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
//     }

//     computeFriction() {
//         this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
//     }

//     computeInternalParameters() {
//         // never call computeFriction() without
//         // updating the pulsation
//         this.computePulsation();
//         this.computeFriction();
//     }

//     CustomPhysicsCalculate(tension:number,friction:number) {

//         this.mTension = Math.min(Math.max(tension,0),100) * (this.maxStifness - this.originalStiffness)/100;
//         this.mFriction = Math.min(Math.max(friction,0),100) * (this.maxFrictionMultipler - this.originalFrictionMultipler)/100;

//         this.computeInternalParameters();
//     }

// }


export const CreateSolverByString = (calculator:string,platform:string,name:string,data:any) =>{


    // console.log(calculator)
    // console.log(platform)
    // console.log(name)
    console.log(data)

    const mSolver = Solver;

    var solverStr = `mSolver`

    var platformStr = `${platform}`

    var initClazzStr = ``;

    if(name){
        initClazzStr = (trimEmptyStr(name));

        // if(calculator == 'InterpolatorCalculator'){
        //     initClazzStr += `Interpolator`;
        // }
    }

    var initParaStr = ``;

    if(data){
        // data.map(function (data:any,index:number) {
        //     initParaStr += (index === 0?`${data[1].default}`:`,${data[1].default}`)
        // })
        data.map(function (val:any,index:number) {
            if(Array.isArray(val)){
                val.map(function(d:any,i:number){
                    //initParaStr += (i === 0?`${d}`:`,${d}`)
                    initParaStr += `${d},`
                })
            }else{
                //initParaStr += (index === 0?`${val}`:`,${val}`)
                initParaStr += `${val},`
            }
        })
        initParaStr.slice(0, -1);
        console.log(initParaStr)
    }

    console.log(`new ${solverStr}.${trimEmptyStr(platform)}.${initClazzStr}(${initParaStr})`)

    if(platform){
        return eval(`new ${solverStr}.${trimEmptyStr(platform)}.${initClazzStr}(${initParaStr})`);
        //return new Solver.HorizontalLineCalculator()
    }
    else{
        return eval(`new ${solverStr}.${'Default'}.${'HorizontalLine'}(${initParaStr})`);
    }

}

const trimEmptyStr = (str:string) => {
    return str.replace(/\s+/g,"");
}

const trimInterpolatorStr = (str:string) => {
    return str.replace("Interpolator","")
}
