"use strict";
exports.__esModule = true;
exports.HorizontalLineCalculator = exports.CubicBezierCalculator = exports.LookupTableCalculator = exports.FlingAnimationCalculator = exports.InterpolatorCalculator = exports.SpringAnimationCalculator = exports.setCalculatorSampleScale = exports.setCalculatorSamplePointNumber = void 0;
//const sampleTimes:number = 100;
var samplePointNumber = 100;
var sampleScale = 3;
exports.setCalculatorSamplePointNumber = function (num) {
    samplePointNumber = num;
};
exports.setCalculatorSampleScale = function (num) {
    sampleScale = num;
};
var SpringAnimationCalculator = /** @class */ (function () {
    function SpringAnimationCalculator(stiffness, dampingratio, velocity, mass) {
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
    SpringAnimationCalculator.prototype.computeDamping = function (stiffness, dampingRatio, mass) {
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
    };
    SpringAnimationCalculator.prototype.computeDampingRatio = function (tension, friction, mass) {
        return friction / (2 * Math.sqrt(mass * tension));
    };
    SpringAnimationCalculator.prototype.computeDuration = function (tension, friction, mass, factor) {
        var epsilon = 0.001 / factor;
        var velocity = 0.0;
        var dampingRatio = this.computeDampingRatio(tension, friction, mass);
        var undampedFrequency = Math.sqrt(tension / mass);
        if (dampingRatio < 1) {
            var a = Math.sqrt(1 - Math.pow(dampingRatio, 2));
            var b = velocity / (a * undampedFrequency);
            var c = dampingRatio / a;
            var d = -((b - c) / epsilon);
            if (d <= 0) {
                return 0.0;
            }
            return Math.log(d) / (dampingRatio * undampedFrequency);
        }
        else {
            return 0.0;
        }
    };
    SpringAnimationCalculator.prototype.bouncyTesnionConversion = function (tension) {
        return (tension - 194.0) / 3.62 + 30.;
    };
    SpringAnimationCalculator.prototype.bouncyFrictionConversion = function (friction) {
        return (friction - 25.) / 3. + 8.;
    };
    SpringAnimationCalculator.prototype.getParaS = function (n, start, end) {
        return (n - start) / (end - start);
    };
    SpringAnimationCalculator.prototype.getParaB = function (final, start, end) {
        var a = 1;
        var b = -2;
        var c = (final - start) / (end - start);
        var root_part = Math.sqrt(b * b - 4 * a * c);
        var denom = 2 * a;
        var root1 = (-b + root_part) / denom;
        var root2 = (-b - root_part) / denom;
        if (root2 < 0)
            return root1;
        if (root1 < 0)
            return root2;
        return Math.min(root1, root2);
    };
    SpringAnimationCalculator.prototype.computeSpeed = function (value, startValue, endValue) {
        return (value * (endValue - startValue) + startValue) * 1.7;
    };
    SpringAnimationCalculator.prototype.normalize = function (value, startValue, endValue) {
        return (value - startValue) / (endValue - startValue);
    };
    SpringAnimationCalculator.prototype.projectNormal = function (n, start, end) {
        return start + (n * (end - start));
    };
    SpringAnimationCalculator.prototype.linearInterpolation = function (t, start, end) {
        return t * end + (1.0 - t) * start;
    };
    SpringAnimationCalculator.prototype.quadraticOutInterpolation = function (t, start, end) {
        return this.linearInterpolation(2 * t - t * t, start, end);
    };
    SpringAnimationCalculator.prototype.b3Friction1 = function (x) {
        return (0.0007 * Math.pow(x, 3)) -
            (0.031 * Math.pow(x, 2)) + 0.64 * x + 1.28;
    };
    SpringAnimationCalculator.prototype.b3Friction2 = function (x) {
        return (0.000044 * Math.pow(x, 3)) -
            (0.006 * Math.pow(x, 2)) + 0.36 * x + 2.;
    };
    SpringAnimationCalculator.prototype.b3Friction3 = function (x) {
        return (0.00000045 * Math.pow(x, 3)) -
            (0.000332 * Math.pow(x, 2)) + 0.1078 * x + 5.84;
    };
    SpringAnimationCalculator.prototype.b3Nobounce = function (tension) {
        var friction = 0;
        if (tension <= 18) {
            friction = this.b3Friction1(tension);
        }
        else if (tension > 18 && tension <= 44) {
            friction = this.b3Friction2(tension);
        }
        else {
            friction = this.b3Friction3(tension);
        }
        return friction;
    };
    SpringAnimationCalculator.prototype.springCalculator = function (stiffness, dampingratio, velocity, duration, isFixed) {
        // var transitionArray = [[0,0]];
        var transitionArray = [], stepArray = [], valueArray = [];
        var starVal = 0;
        var endVal = 1;
        var mNaturalFreq = Math.sqrt(stiffness);
        var mDampedFreq = mNaturalFreq * Math.sqrt(1.0 - dampingratio * dampingratio);
        var lastVelocity = velocity;
        var currentVelocity = 0;
        var mTheresholdValue = 0.5;
        //duration+10/(60*sampleScale);
        // i< duration + mTheresholdValue/(sampleTimes*sampleScale)
        // i < 1+1/(sampleTimes*sampleScale)
        var maxIterationTimes = (isFixed) ? Math.max(1., duration + mTheresholdValue / (samplePointNumber * sampleScale)) : duration + mTheresholdValue / (samplePointNumber * sampleScale);
        for (var i = 1 / (samplePointNumber * sampleScale); 
        //i < 1+1/(sampleTimes*sampleScale);
        i < maxIterationTimes; //duration + mTheresholdValue/(samplePointNumber*sampleScale)
         i += 1 / (samplePointNumber * sampleScale)) {
            var deltaT = i;
            var lastDisplacement = i / (5 * samplePointNumber) - endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));
            var mValue = displacement + endVal;
            // useless
            // currentVelocity = displacement * (-mNaturalFreq) * dampingratio + Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT) * (-mDampedFreq * cosCoeff * Math.sin(mDampedFreq * deltaT)+ mDampedFreq * sinCoeff * Math.cos(mDampedFreq * deltaT));
            // orig - duration+10/(60*sampleScale)
            var valX = i / (duration + mTheresholdValue / (samplePointNumber * sampleScale));
            //var valX = i;
            var valY = Math.abs(mValue);
            transitionArray.push([valX, valY]);
            stepArray.push(valX);
            valueArray.push(valY);
        }
        return [stepArray, valueArray, transitionArray];
    };
    SpringAnimationCalculator.prototype.getFinalDuration = function () {
        return this.duration;
    };
    SpringAnimationCalculator.prototype.getFinalDurationForUIView = function () {
        return this.durationForUIView;
    };
    SpringAnimationCalculator.prototype.getStepArray = function () {
        return getFixedStepArray(this.array[0]);
        //return this.array[0]
    };
    SpringAnimationCalculator.prototype.getValueArray = function () {
        return getFixedValueArray(this.array[1]);
    };
    SpringAnimationCalculator.prototype.getFullArray = function () {
        return this.array[2];
    };
    SpringAnimationCalculator.prototype.getMergedFullArray = function () {
        return this.array[2].toString().split(',').map(Number);
    };
    return SpringAnimationCalculator;
}());
exports.SpringAnimationCalculator = SpringAnimationCalculator;
var InterpolatorCalculator = /** @class */ (function () {
    //private duration:number;
    function InterpolatorCalculator() {
        //this.factor = factor;
        //this.duration = duration;
        this.array = this.interpolatorCalculator(function (t) { return t; });
    }
    InterpolatorCalculator.prototype.interpolatorCalculator = function (funs) {
        var transitionArray = [], stepArray = [], valueArray = [];
        for (var i = 1 / (samplePointNumber * sampleScale); i < 1; i += 1 / (samplePointNumber * sampleScale)) {
            var valX = i;
            var valY = funs(i);
            transitionArray.push([valX, valY]);
            stepArray.push(valX);
            valueArray.push(valY);
        }
        return [stepArray, valueArray, transitionArray];
    };
    InterpolatorCalculator.prototype.getStepArray = function () {
        return getFixedStepArray(this.array[0]);
    };
    InterpolatorCalculator.prototype.getValueArray = function () {
        return getFixedValueArray(this.array[1]);
    };
    InterpolatorCalculator.prototype.getFullArray = function () {
        return this.array[2];
    };
    InterpolatorCalculator.prototype.getMergedFullArray = function () {
        return this.array[2].toString().split(',').map(Number);
    };
    return InterpolatorCalculator;
}());
exports.InterpolatorCalculator = InterpolatorCalculator;
var FlingAnimationCalculator = /** @class */ (function () {
    function FlingAnimationCalculator(velocity, dampingRatio) {
        this.friction = dampingRatio * -4.2;
        this.velocity = velocity;
        this.array = this.flingCalculator(this.velocity, this.friction);
        this.duration = this.array[3];
        this.transition = this.array[4];
    }
    FlingAnimationCalculator.prototype.flingCalculator = function (velocity, friction) {
        var transitionArray = [], stepArray = [], valueArray = [];
        //var sampleScale = 1.5;
        var maxItertation = 0;
        var maxValue = 0;
        var finalTransition = 0;
        for (var i = 1 / (samplePointNumber * sampleScale); i < 20.; i += 1 / (samplePointNumber * sampleScale)) {
            var currentVelocity = velocity * Math.exp(i * friction);
            var currentTransition = (velocity / friction) * (Math.exp(friction * i) - 1);
            var speedThereshold = 2.3;
            if (Math.abs(currentVelocity) <= speedThereshold) {
                maxItertation = i;
                maxValue = Math.abs(currentTransition);
                // transitionArray = transitionArray.map(normalizeArray);
                transitionArray.map(function (item) {
                    item[0] = item[0] / maxItertation;
                    item[1] = item[1] / maxValue;
                    return item;
                });
                finalTransition = currentTransition;
                // return [transitionArray,maxItertation,currentTransition];
                break;
            }
            else {
                var valX = i;
                var valY = Math.abs(currentTransition);
                transitionArray.push([valX, valY]);
                stepArray.push(valX);
                valueArray.push(valY);
            }
        }
        var maxStep = Math.max.apply(Math, stepArray);
        if (maxStep > 1.) {
            stepArray.map(function (val, index) {
                stepArray[index] /= maxStep;
                transitionArray[index][0] /= maxStep;
            });
        }
        var maxValue = Math.max.apply(Math, valueArray);
        if (maxValue > 1.) {
            valueArray.map(function (val, index) {
                valueArray[index] /= maxValue;
                transitionArray[index][1] /= maxValue;
            });
        }
        return [stepArray, valueArray, transitionArray, maxItertation, finalTransition];
    };
    FlingAnimationCalculator.prototype.getFinalTransition = function () {
        return this.transition;
    };
    FlingAnimationCalculator.prototype.getFinalDuration = function () {
        return this.duration;
    };
    FlingAnimationCalculator.prototype.getStepArray = function () {
        return getFixedStepArray(this.array[0]);
    };
    FlingAnimationCalculator.prototype.getValueArray = function () {
        return getFixedValueArray(this.array[1]);
    };
    FlingAnimationCalculator.prototype.getFullArray = function () {
        return this.array[2];
    };
    FlingAnimationCalculator.prototype.getMergedFullArray = function () {
        return this.array[2].toString().split(',').map(Number);
    };
    return FlingAnimationCalculator;
}());
exports.FlingAnimationCalculator = FlingAnimationCalculator;
var LookupTableCalculator = /** @class */ (function () {
    function LookupTableCalculator(value, outLength) {
        this.mValues = value;
        this.mLength = value.length;
        this.mStepSize = 1 / (this.mLength - 1);
        this.outputLength = outLength;
        // #####  Map another array's length to 60 #####
        //this.data = this.getAnimationArray(this.mValues,this.mLength,this.mStepSize);
    }
    LookupTableCalculator.prototype.getAnimationArray = function () {
        var mArray = [];
        for (var i = 1 / this.outputLength; i < 1; i += 1 / this.outputLength) {
            // mArray.push(this.getInterpolation(i,values,length,stepSize))
            mArray.push(this.getInterpolation(i, this.mValues, this.mLength, this.mStepSize));
        }
        //mArray.push(1.0);
        mArray.push(mArray[mArray.length - 1]);
        //console.log(mArray)
        return mArray;
    };
    LookupTableCalculator.prototype.getInterpolation = function (input, values, length, step) {
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
    };
    return LookupTableCalculator;
}());
exports.LookupTableCalculator = LookupTableCalculator;
var CubicBezierCalculator = /** @class */ (function () {
    function CubicBezierCalculator(p1x, p1y, p2x, p2y) {
        this.epsilon = 0.001; //1e-6
        this.UnitBezier(p1x, p1y, p2x, p2y);
        this.array = this.bezierCalculator(); //p1x,p1y,p2x,p2y
        this.bezier = [p1x, p1y, p2x, p2y];
        this.editable = true;
        //   this.duration = duration;
    }
    // private setDuration(duration:number){
    //   this.duration = duration;
    // }
    CubicBezierCalculator.prototype.UnitBezier = function (p1x, p1y, p2x, p2y) {
        // pre-calculate the polynomial coefficients
        // First and last control points are implied to be (0,0) and (1.0, 1.0)
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx - this.bx;
        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;
    };
    CubicBezierCalculator.prototype.sampleCurveX = function (t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    };
    CubicBezierCalculator.prototype.sampleCurveY = function (t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    };
    CubicBezierCalculator.prototype.sampleCurveDerivativeX = function (t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    };
    CubicBezierCalculator.prototype.solveCurveX = function (x, epsilon) {
        var t0;
        var t1;
        var t2;
        var x2;
        var d2;
        var i;
        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon)
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
        if (t2 < t0)
            return t0;
        if (t2 > t1)
            return t1;
        while (t0 < t1) {
            x2 = this.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2)
                t0 = t2;
            else
                t1 = t2;
            t2 = (t1 - t0) * .5 + t0;
        }
        // Give up
        return t2;
    };
    CubicBezierCalculator.prototype.solve = function (iterationTime, epsilon) {
        return this.sampleCurveY(this.solveCurveX(iterationTime, epsilon));
    };
    CubicBezierCalculator.prototype.bezierCalculator = function () {
        //var transitionArray = [[0,0]];
        var transitionArray = [], stepArray = [], valueArray = [];
        for (var i = 1 / (samplePointNumber * sampleScale); i < 1. + 2 / (samplePointNumber * sampleScale); i += 1 / (samplePointNumber * sampleScale)) {
            // transitionArray.push([Number(i),Number(this.solve(i,this.epsilon))]);
            var valX = i;
            var valY = this.solve(i, this.epsilon);
            //console.log(valY)
            transitionArray.push([valX, valY]);
            stepArray.push(valX);
            valueArray.push(valY);
        }
        var lastValue = valueArray[valueArray.length - 1];
        if (lastValue > 1.) {
            valueArray.map(function (val, index) {
                valueArray[index] /= lastValue;
            });
        }
        return [stepArray, valueArray, transitionArray];
    };
    // public getStepArray(){
    //     return this.array[0];
    // }
    // public getValueArray(){
    //     return this.array[1];
    // }
    CubicBezierCalculator.prototype.getStepArray = function () {
        return getFixedValueArray(this.array[0]);
    };
    CubicBezierCalculator.prototype.getValueArray = function () {
        return getFixedValueArray(this.array[1]);
    };
    CubicBezierCalculator.prototype.getFullArray = function () {
        return this.array[2];
    };
    CubicBezierCalculator.prototype.getMergedFullArray = function () {
        return this.array[2].toString().split(',').map(Number);
    };
    return CubicBezierCalculator;
}());
exports.CubicBezierCalculator = CubicBezierCalculator;
var HorizontalLineCalculator = /** @class */ (function () {
    function HorizontalLineCalculator() {
        this.array = this.calculator();
    }
    HorizontalLineCalculator.prototype.calculator = function () {
        // var transitionArray = [[0,0]];
        var transitionArray = [], stepArray = [], valueArray = [];
        for (var i = 1 / (samplePointNumber * sampleScale); i < 1 + 1 / (samplePointNumber * sampleScale); i += 1 / (samplePointNumber * sampleScale)) {
            // transitionArray.push([Number(i),Number(this.solve(i,this.epsilon))]);
            var valX = i;
            var valY = 0.001;
            //console.log(valY)
            transitionArray.push([valX, valY]);
            stepArray.push(valX);
            valueArray.push(valY);
        }
        return [stepArray, valueArray, transitionArray];
    };
    HorizontalLineCalculator.prototype.getStepArray = function () {
        return getFixedStepArray(this.array[0]);
    };
    HorizontalLineCalculator.prototype.getValueArray = function () {
        return getFixedValueArrayUnLitmited(this.array[1]);
    };
    HorizontalLineCalculator.prototype.getFullArray = function () {
        return this.array[2];
    };
    HorizontalLineCalculator.prototype.getMergedFullArray = function () {
        return this.array[2].toString().split(',').map(Number);
    };
    return HorizontalLineCalculator;
}());
exports.HorizontalLineCalculator = HorizontalLineCalculator;
var getFixedStepArray = function (array) {
    var fixedStepArray = new LookupTableCalculator(array, samplePointNumber).getAnimationArray();
    var maxStep = Math.max.apply(Math, fixedStepArray);
    fixedStepArray.map(function (val, index) {
        fixedStepArray[index] /= maxStep;
    });
    return fixedStepArray;
};
var getFixedValueArray = function (array) {
    var fixedValueArray = new LookupTableCalculator(array, samplePointNumber).getAnimationArray();
    if (fixedValueArray[fixedValueArray.length - 1] != 1) {
        fixedValueArray[fixedValueArray.length - 1] = 1.00;
    }
    //var maxValue = Math.max(...fixedValueArray);
    // if(maxValue > 1.){
    //     fixedValueArray.map(function (val:any,index:number) {
    //         fixedValueArray[index] /= maxValue;
    //     })
    // }
    return fixedValueArray;
};
var getFixedValueArrayUnLitmited = function (array) {
    var fixedValueArray = new LookupTableCalculator(array, samplePointNumber).getAnimationArray();
    return fixedValueArray;
};
