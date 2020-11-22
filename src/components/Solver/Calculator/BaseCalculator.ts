//const sampleTimes:number = 100;
var samplePointNumber:number = 100;
var sampleScale:number = 3;

export const setCalculatorSamplePointNumber = (num:number) => {
    samplePointNumber = num;
}

export const setCalculatorSampleScale = (num:number) => {
    sampleScale = num;
}

export class SpringAnimationCalculator{

    array:any;
    stiffness?:number;
    dampingratio?:number;
    velocity?:number;
    mass?:number;
    damping?:number;
    tension?:number;
    friction?:number;
    duration?:number;
    durationForUIView?:number;
    fixedGraph?:boolean;
    bouncyTension?:number;
    bouncyFriction?:number;
    bounciness?:number;
    speed?:number;

    constructor(stiffness?:number,dampingratio?:number,velocity?:number,mass?:number) {
        this.stiffness = stiffness;
        this.dampingratio = dampingratio;
        this.velocity = velocity;
        this.mass = mass;

        //Output
        // this.damping = this.computeDamping(this.stiffness,this.dampingratio,this.mass);
        // this.tension = this.stiffness;
        // this.friction = this.damping;
        // this.duration = this.computeDuration(this.tension, this.friction,this.mass,2);
        // this.durationForUIView = this.computeDuration(this.tension, this.friction,this.mass,1);

        // this.array = this.springCalculator(this.stiffness,this.dampingratio,this.velocity,this.duration);
    }

    computeDamping(stiffness:number,dampingRatio:number,mass:number){
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
    }

    computeDampingRatio(tension:number, friction:number,mass:number) {
        return friction / (2 * Math.sqrt(mass * tension));
    }

    computeDuration(tension:number, friction:number,mass:number,factor:number) {
        let epsilon = 0.001/factor;
        let velocity = 0.0;
        let dampingRatio = this.computeDampingRatio(tension, friction,mass)
        let undampedFrequency = Math.sqrt(tension / mass)
        if (dampingRatio < 1) {
            let a = Math.sqrt(1 - Math.pow(dampingRatio, 2))
            let b = velocity / (a * undampedFrequency)
            let c = dampingRatio / a
            let d = -((b - c) / epsilon)
            if (d <= 0) {
                return 0.0
            }
            return Math.log(d) / (dampingRatio * undampedFrequency)
        } else {
            return 0.0
        }
    }

    bouncyTesnionConversion(tension:number){
        return (tension - 194.0)/3.62 + 30.;
    }
    bouncyFrictionConversion(friction:number){
        return (friction - 25.)/3. + 8.;
    }

    getParaS(n:number,start:number,end:number){
        return (n - start)/(end - start);
    }

    getParaB(final:number, start:number, end:number) {
        var a = 1;
		var b = -2;
		var c = (final - start)/(end-start);
 
		var root_part = Math.sqrt(b * b - 4 * a * c);
		var denom = 2 * a;
 
		var root1 = ( -b + root_part ) / denom;
        var root2 = ( -b - root_part ) / denom;
        
        if(root2 <0) return root1
        if(root1 <0) return root2
        return Math.min(root1,root2)
    }

    computeSpeed(value:number,startValue:number,endValue:number){
        return (value * (endValue - startValue) + startValue)*1.7 ;
    }

    normalize(value:number, startValue:number, endValue:number) {
        return (value - startValue) / (endValue - startValue);
    }

    projectNormal(n:number, start:number, end:number) {
        return start + (n * (end - start));
    }

    linearInterpolation(t:number, start:number, end:number) {
        return t * end + (1.0 - t) * start;
    }

    quadraticOutInterpolation(t:number, start:number, end:number) {
        return this.linearInterpolation(2 * t - t * t, start, end);

    }

    b3Friction1(x:number) {
        return (0.0007 * Math.pow(x, 3)) -
            (0.031 * Math.pow(x, 2)) + 0.64 * x + 1.28;
    }

    b3Friction2(x:number) {
        return (0.000044 * Math.pow(x, 3)) -
            (0.006 * Math.pow(x, 2)) + 0.36 * x + 2.;
    }

    b3Friction3(x:number) {
        return (0.00000045 * Math.pow(x, 3)) -
            (0.000332 * Math.pow(x, 2)) + 0.1078 * x + 5.84;
    }

    b3Nobounce(tension:number) {
        let friction = 0;
        if (tension <= 18) {
            friction = this.b3Friction1(tension);
        } else if (tension > 18 && tension <= 44) {
            friction = this.b3Friction2(tension);
        } else {
            friction = this.b3Friction3(tension);
        }
        return friction;
    }

    springCalculator(stiffness:number,dampingratio:number,velocity:number,duration:number,isFixed:boolean){
        // var transitionArray = [[0,0]];
        var transitionArray = [],stepArray = [],valueArray = [];
        var starVal = 0;
        var endVal = 1;
        var mNaturalFreq = Math.sqrt(stiffness);
        var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - dampingratio* dampingratio);
        var lastVelocity =  velocity;
        var currentVelocity = 0;
        var mTheresholdValue = 0.5;

        //duration+10/(60*sampleScale);
        // i< duration + mTheresholdValue/(sampleTimes*sampleScale)
        // i < 1+1/(sampleTimes*sampleScale)

        var maxIterationTimes = (isFixed)?Math.max(1.,duration + mTheresholdValue/(samplePointNumber*sampleScale)):duration + mTheresholdValue/(samplePointNumber*sampleScale);
        
        console.log(duration)
        for (var i = 1/(samplePointNumber*sampleScale) ;
            //i < 1+1/(sampleTimes*sampleScale);
            i< maxIterationTimes; //duration + mTheresholdValue/(samplePointNumber*sampleScale)
            i += 1/(samplePointNumber*sampleScale)
            ){
            var deltaT = i;
            var lastDisplacement  = i/(5*samplePointNumber) -  endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E,-dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));

            var mValue = displacement + endVal;

            // useless
            // currentVelocity = displacement * (-mNaturalFreq) * dampingratio + Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT) * (-mDampedFreq * cosCoeff * Math.sin(mDampedFreq * deltaT)+ mDampedFreq * sinCoeff * Math.cos(mDampedFreq * deltaT));

            // orig - duration+10/(60*sampleScale)
            var valX = i/(duration + mTheresholdValue/(samplePointNumber*sampleScale));
            //var valX = i;
            var valY = Math.abs(mValue);
            transitionArray.push([valX,valY]);
            stepArray.push(valX);
            valueArray.push(valY);
        }

        return [stepArray,valueArray,transitionArray];
    }

    public getFinalDuration(){
        return this.duration;
    }

    public getFinalDurationForUIView(){
        return this.durationForUIView;
    }

    public getStepArray(){
        return getFixedStepArray(this.array[0])
        //return this.array[0]
    }

    public getValueArray(){
        return getFixedValueArray(this.array[1])
    }

    public getFullArray() {
        return this.array[2];
    }

    public getMergedFullArray(){
        return this.array[2].toString().split(',').map(Number);
    }

}

export class InterpolatorCalculator {

    //factor:number;
    array:any;
    def:any;
    //private duration:number;

    constructor() { //,duration:number
        //this.factor = factor;
        //this.duration = duration;
        this.array = this.interpolatorCalculator((t:number) =>{return t;});
    }

    interpolatorCalculator(funs:(a:number) =>void) {  
        var transitionArray = [],stepArray = [],valueArray = [];

        for (var i = 1/(samplePointNumber*sampleScale);i < 1;i += 1/(samplePointNumber*sampleScale)){

            var valX = i;
            var valY = funs(i);

            transitionArray.push([valX,valY]);
            stepArray.push(valX);
            valueArray.push(valY);
        }

        return [stepArray,valueArray,transitionArray];
    }

    public getStepArray(){
        return getFixedStepArray(this.array[0])
    }

    public getValueArray(){
        return getFixedValueArray(this.array[1])
    }

    public getFullArray() {
        return this.array[2];
    }

    public getMergedFullArray(){
        return this.array[2].toString().split(',').map(Number);
    }
}


export class FlingAnimationCalculator {
    private array:any;
    private friction:number;
    private velocity:number;
    private duration:any;
    private transition:any;

    constructor(velocity:number, dampingRatio:number) {
        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.array = this.flingCalculator(this.velocity,this.friction);
        this.duration = this.array[3];
        this.transition = this.array[4];
    }

    flingCalculator(velocity:number,friction:number){
        var transitionArray:any = [],stepArray:any = [],valueArray:any = [];
        //var sampleScale = 1.5;
        var maxItertation = 0;
        var maxValue = 0;
        var finalTransition = 0;


        for (var i = 1/(samplePointNumber*sampleScale);i < 20.;i += 1/(samplePointNumber*sampleScale)){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;
            if(Math.abs(currentVelocity) <= speedThereshold){

                maxItertation = i;
                maxValue = Math.abs(currentTransition);
                // transitionArray = transitionArray.map(normalizeArray);
                transitionArray.map(function(item:any){
                    item[0] = item[0]/maxItertation;
                    item[1] = item[1]/maxValue;
                    return item;
                });

                finalTransition = currentTransition;
                // return [transitionArray,maxItertation,currentTransition];
                break;

            }
            else{
                var valX = i;
                var valY = Math.abs(currentTransition);
                transitionArray.push([valX,valY]);
                stepArray.push(valX);
                valueArray.push(valY);
            }
        }

        var maxStep = Math.max(...stepArray);

        if(maxStep > 1.){
            stepArray.map(function (val:any,index:number) {
                stepArray[index] /= maxStep;
                transitionArray[index][0] /= maxStep;
            })
        }

        var maxValue = Math.max(...valueArray);

        if(maxValue > 1.){
            valueArray.map(function (val:any,index:number) {
                valueArray[index] /= maxValue;
                transitionArray[index][1] /= maxValue;
            })
        }

        return [stepArray,valueArray,transitionArray,maxItertation,finalTransition];

    }

    public getFinalTransition(){
        return this.transition;
    }

    public getFinalDuration(){
        return this.duration;
    }

    public getStepArray(){
        return getFixedStepArray(this.array[0])
    }

    public getValueArray(){
        return getFixedValueArray(this.array[1])
    }

    public getFullArray() {
        return this.array[2];
    }

    public getMergedFullArray(){
        return this.array[2].toString().split(',').map(Number);
    }

}

export class LookupTableCalculator{

    private mValues:any;
    private mLength:number;
    private mStepSize:number;
    private outputLength:number;

    constructor(value:any,outLength:number){
        this.mValues = value;
        this.mLength = value.length;
        this.mStepSize = 1 / (this.mLength - 1)
        this.outputLength = outLength;

        // #####  Map another array's length to 60 #####
        //this.data = this.getAnimationArray(this.mValues,this.mLength,this.mStepSize);

    }

    public getAnimationArray(){ //values:any,length:number,stepSize:number

        var mArray = [];

        for (var i=1/this.outputLength;i<1;i += 1/this.outputLength){
            // mArray.push(this.getInterpolation(i,values,length,stepSize))
            mArray.push(this.getInterpolation(i,this.mValues,this.mLength,this.mStepSize))
        }
        //mArray.push(1.0);

        mArray.push(mArray[mArray.length-1])
        //console.log(mArray)

        return mArray;
    }


    getInterpolation(input:any,values:any,length:any,step:any) {
        if (input >= 1.0) {
            return 1.0;
        }
        if (input <= 0) {
            return 0;
        }

        // Calculate index - We use min with length - 2 to avoid IndexOutOfBoundsException when
        // we lerp (linearly interpolate) in the return statement
        var position = (Math.min((input * (length - 1)), length - 2));
        // Calculate values to account for small offsets as the lookup table has discrete values
        var quantized = position * step;
        var diff = input - quantized;
        var weight = diff / step;

        var roundVal = values[Math.round(position)];
        var roundNextVal = values[Math.round(position) + 1];

        // Linearly interpolate between the table values
        //return values[Math.round(position)] + weight * (values[Math.round(position) + 1] - values[position]);
        return roundVal + weight * (roundNextVal - roundVal);
    }
}

export class CubicBezierCalculator {
    private epsilon:number;
    private array:any;
    private bezier:any;
    private editable:boolean;
    //private duration:number;
    private cx:any;
    private bx:any;
    private ax:any;
    private cy:any;
    private by:any;
    private ay:any;
    
    constructor(p1x:any,p1y:any,p2x:any,p2y:any) { //,duration:any
      
      this.epsilon = 1e-6;
      this.UnitBezier(p1x,p1y,p2x,p2y);
      this.array = this.bezierCalculator(); //p1x,p1y,p2x,p2y
      this.bezier = [p1x,p1y,p2x,p2y];
      this.editable = true;
    //   this.duration = duration;
      
    }

    // private setDuration(duration:number){
    //   this.duration = duration;
    // }

    private UnitBezier(p1x:number, p1y:number, p2x:number, p2y:number) {
        // pre-calculate the polynomial coefficients
        // First and last control points are implied to be (0,0) and (1.0, 1.0)
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx -this.bx;

        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;
    }

    private sampleCurveX(t:any) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    }
    private sampleCurveY(t:any) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    }

    private sampleCurveDerivativeX(t:any) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    }

    private solveCurveX(x:any, epsilon:any) {
        var t0; 
        var t1;
        var t2;
        var x2;
        var d2;
        var i;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x;
            if (Math.abs (x2) < epsilon)
                return t2;
            d2 = this.sampleCurveDerivativeX(t2);
            if (Math.abs(d2) < epsilon)
                break;
            t2 = t2 - x2 / d2;
        }

        // No solution found - use bi-section
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;
        if (t2 < t0) return t0;
        if (t2 > t1) return t1;

        while (t0 < t1) {
            x2 = this.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2) t0 = t2;
            else t1 = t2;

            t2 = (t1 - t0) * .5 + t0;
        }

        // Give up
        return t2;
    }

    private solve(iterationTime:any, epsilon:any) {
        return this.sampleCurveY( this.solveCurveX(iterationTime, epsilon) );
    }

    private bezierCalculator() {  
        //var transitionArray = [[0,0]];
        var transitionArray = [],stepArray = [],valueArray:any = [];

        for (
        var i = 1/(samplePointNumber*sampleScale);
        i < 1+1/(samplePointNumber*sampleScale);
        i += 1/(samplePointNumber*sampleScale)
        ){
            // transitionArray.push([Number(i),Number(this.solve(i,this.epsilon))]);

            var valX = i;
            var valY = this.solve(i,this.epsilon);
            //console.log(valY)
            transitionArray.push([valX,valY]);

            stepArray.push(valX);
            valueArray.push(valY);
        }

        var lastValue = valueArray[valueArray.length-1]
        if(lastValue > 1.){
            valueArray.map(function (val:any,index:number) {
                valueArray[index] /= lastValue;
            })
        }

        return [stepArray,valueArray,transitionArray];
    }

    // public getStepArray(){
    //     return this.array[0];
    // }

    // public getValueArray(){
    //     return this.array[1];
    // }
    public getStepArray(){
        return getFixedStepArray(this.array[0])
    }

    public getValueArray(){
        return getFixedValueArray(this.array[1])
    }

    public getFullArray() {
        return this.array[2];
    }

    public getMergedFullArray(){
        return this.array[2].toString().split(',').map(Number);
    }
}

export class HorizontalLineCalculator{

    array:any;

    constructor(){
        this.array = this.calculator();
    }

    calculator(){
        // var transitionArray = [[0,0]];
        var transitionArray = [],stepArray = [],valueArray = [];

        for (var i = 1/(samplePointNumber*sampleScale);i < 1+1/(samplePointNumber*sampleScale);i += 1/(samplePointNumber*sampleScale))
        {
                // transitionArray.push([Number(i),Number(this.solve(i,this.epsilon))]);
    
                var valX = i;
                var valY = 0.;
                //console.log(valY)
                transitionArray.push([valX,valY]);
    
                stepArray.push(valX);
                valueArray.push(valY);
        }
    
        console.log(stepArray)

        return [stepArray,valueArray,transitionArray];
    }

    public getStepArray(){
        return getFixedStepArray(this.array[0])
    }

    public getValueArray(){
        return getFixedValueArray(this.array[1])
    }

    public getFullArray() {
        return this.array[2];
    }

    public getMergedFullArray(){
        return this.array[2].toString().split(',').map(Number);
    }
}


const getFixedStepArray = (array:any) => {
    var fixedStepArray = new LookupTableCalculator(array,samplePointNumber).getAnimationArray();

    var maxStep = Math.max(...fixedStepArray);

    fixedStepArray.map(function (val:any,index:number) {
        fixedStepArray[index] /= maxStep;
    })

    return fixedStepArray;
}

const getFixedValueArray = (array:any) => {
    var fixedValueArray = new LookupTableCalculator(array,samplePointNumber).getAnimationArray();

    //var maxValue = Math.max(...fixedValueArray);

    // if(maxValue > 1.){
    //     fixedValueArray.map(function (val:any,index:number) {
    //         fixedValueArray[index] /= maxValue;
    //     })
    // }

    return fixedValueArray;
}
