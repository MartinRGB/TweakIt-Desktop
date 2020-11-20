const sampleTimes:number = 100;

export class CubicBezierCalculator {
    private epsilon:number;
    private array:any;
    private bezier:any;
    private editable:boolean;
    private duration:number;
    private cx:any;
    private bx:any;
    private ax:any;
    private cy:any;
    private by:any;
    private ay:any;

    constructor(p1x:any,p1y:any,p2x:any,p2y:any,duration:any) {
      
      this.epsilon = 1e-6;
      this.UnitBezier(p1x,p1y,p2x,p2y);
      this.array = this.bezierCalculator(); //p1x,p1y,p2x,p2y
      this.bezier = [p1x,p1y,p2x,p2y];
      this.editable = true;
      this.duration = duration;
      
    }

    private setDuration(duration:number){
      this.duration = duration;
    }



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
        var transitionArray = [];
        var sampleScale = 1.;

        for (var i = 1/(sampleTimes*sampleScale);i < 1+1/(sampleTimes*sampleScale);i += 1/(sampleTimes*sampleScale)){
            // transitionArray.push([Number(i),Number(this.solve(i,this.epsilon))]);

            transitionArray.push(i);
            transitionArray.push(this.solve(i,this.epsilon));
        }

        return transitionArray;

    }

    public getDataArray() {
        return this.array.slice(1);
    }

    public getMergedDataArray(){
        // return this.array.slice(1).toString().split(',');
        return this.array;
    }

}

export class SpringAnimationCalculator{

    private stiffness:number;
    private array:any;
    private stepArray:any;
    private valueArray:any;
    private dampingratio:number;
    private velocity:any;
    private mass:any;
    private damping:any;
    private tension:any;
    private friction:any;
    private duration:any;
    private durationForUIView:any;

    constructor(stiffness:any,dampingratio:any,velocity:any) {

        this.stiffness = stiffness;
        this.dampingratio = dampingratio;
        this.velocity = velocity;
        this.mass = 1.0;


        //this.yAxisDimensionData = [];

        // Output
        this.damping = this.computeDamping(stiffness,dampingratio);
        this.tension = this.stiffness;
        this.friction = this.damping;
        this.duration = this.computeDuration(this.tension, this.friction,2);
        this.array = this.springCalculator(this.stiffness,this.dampingratio,this.velocity,this.duration);
        this.durationForUIView = this.computeDuration(this.tension, this.friction,1);
        //this.interpolator = new LookupTableCalculator(this.yAxisDimensionData).data;
    }

    computeDamping(stiffness:any,dampingRatio:any){
        let mass = this.mass;
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
    }

    computeDampingRatio(tension:any, friction:any) {
        let mass = this.mass;
        return friction / (2 * Math.sqrt(mass * tension));
    }

    computeDuration(tension:any, friction:any,duration:any) {
        var durationFactor = duration;
        let epsilon = 0.001/durationFactor;
        let velocity = 0.0;
        let mass = this.mass
        let dampingRatio = this.computeDampingRatio(tension, friction)
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

    springCalculator(stiffness:any,dampingratio:any,velocity:any,duration:any){
        // var transitionArray = [[0,0]];
        var transitionArray = [];
        var starVal = 0;
        var endVal = 1;
        var mNaturalFreq = Math.sqrt(stiffness);
        var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - dampingratio* dampingratio);
        var lastVelocity =  velocity;
        var currentVelocity = 0;
        var sampleScale = 3; //1.5
        var mTheresholdValue = 0;

        //duration+10/(60*sampleScale);
        // i< duration + mTheresholdValue/(sampleTimes*sampleScale)
        // i < 1+1/(sampleTimes*sampleScale)
        for (var i = 1/(sampleTimes*sampleScale) ;
            //i < 1+1/(sampleTimes*sampleScale);
            i< duration + mTheresholdValue/(sampleTimes*sampleScale);
            i += 1/(sampleTimes*sampleScale)){
            var deltaT = i;
            var lastDisplacement  = i/(5*sampleTimes) -  endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E,-dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));

            var mValue = displacement + endVal;

            //currentVelocity = displacement * (-mNaturalFreq) * dampingratio + Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT) * (-mDampedFreq * cosCoeff * Math.sin(mDampedFreq * deltaT)+ mDampedFreq * sinCoeff * Math.cos(mDampedFreq * deltaT));

            //duration+10/(60*sampleScale)
            //transitionArray.push([i/(duration + mTheresholdValue/(sampleTimes*sampleScale)),Math.abs(mValue)]);
            transitionArray.push(i/(duration + mTheresholdValue/(sampleTimes*sampleScale)));
            transitionArray.push(Math.abs(mValue));
        }
        return transitionArray;
    }

    public getDataArray() {
        return this.array.slice(1);
    }

    public getMergedDataArray(){
        // return this.array.slice(1).toString().split(',');
        return this.array;
    }

    public getStepArray(){
        var stepArray = this.array.filter(function(v:any, i:any) {
            return i % 2 == 0;
        });
        return stepArray;
    }

    public getValueArray(){
        var valueArray = this.array.filter(function(v:any, i:any) {
            return i % 2 != 0;
        });
        return valueArray
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

        // console.log('================1================')
        // console.log(roundVal)
        // console.log('================2================')
        // console.log(roundNextVal)
        // console.log('================3================')
        // console.log(weight * (roundNextVal - roundVal))
        // console.log('================4================')
        // console.log(roundVal + weight * (roundNextVal - roundVal))

        // Linearly interpolate between the table values
        //return values[Math.round(position)] + weight * (values[Math.round(position) + 1] - values[position]);
        return roundVal + weight * (roundNextVal - roundVal);
    }
}

