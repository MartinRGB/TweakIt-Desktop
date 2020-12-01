//https://github.com/brickspert/blog/issues/36
export default class SpringFactorEvaluator{

    springMaxValue?:number;
    interpolatorMaxArr?:any;
    stiffness?:number;
    dampingratio?:number;
    velocity?:number;
    mass?:number;
    duration?:number;
    factor?:number;
    epsilon?:number;
    valueArray?:any;
    damping?:number;

    // 75 - 143
    // 85 - 1.64
    // 0.92 - 2.3
    // 1.0 - 2.3

    constructor(stiffness?:number,dampingratio?:number,damping?:number,duration?:number,velocity?:number,mass?:number) {
        this.stiffness = stiffness?stiffness:1500;
        this.dampingratio = dampingratio?dampingratio:0.5;
        this.velocity = velocity?velocity:0;
        this.mass = mass?mass:1;
        this.epsilon = 1000;
        this.duration = duration?duration:0.5;
        this.damping = damping?damping:10;

        // this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass),this.mass,1);





        // this.springMaxValue = this.springMax(this.stiffness,this.dampingratio,this.velocity,this.duration,this.epsilon);

        // this.springMaxValue = this.computeMaxValue(this.stiffness,this.computeDamping(this.stiffness,this.dampingratio,this.mass),this.mass,this.velocity,this.epsilon);

        this.springMaxValue = this.computeMaxValue(this.stiffness,this.damping,this.mass,this.velocity,this.epsilon);

        




        this.factor = this.findCloseNum(this.springMaxValue,this.epsilon)

        if(this.dampingratio <0.75){
            this.factor = this.findCloseNum(this.springMaxValue,this.epsilon)
        }
        else{
            var progress = ((this.dampingratio - 0.75)/0.25)
            this.factor = (1 - Math.pow(1-progress,2 * 2))*4
        }


        
   

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

        // Key Bug When dampingRatio > 1
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

    


    interpolatorMax(factor:number){
        let maxValue = 0;
        let epsilon = 0.001;
        let count = 1 / epsilon;
        for (let i = 0; i < count; i++) {
            let x = i * epsilon;
            let result = Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1;

            if (maxValue < result) {
                maxValue = result;
            }
        }
        return maxValue;
    }

    springMax(stiffness:number,dampingratio:number,velocity:number,duration:number,epsilon:number){
        var starVal = 0;
        var endVal = 1;
        var mNaturalFreq = Math.sqrt(stiffness);
        var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - dampingratio* dampingratio);
        var lastVelocity =  velocity;
        var currentVelocity = 0;
        var maxValue = 0;
        var valueArray = [];

        for (var i = 1/epsilon ;
            //i < 1+1/(sampleTimes*sampleScale);
            i< duration;
            i += 1/epsilon
            ){
            var deltaT = i;
            var lastDisplacement  = i/epsilon -  endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E,-dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));

            var mValue = displacement + endVal;


            // useless
            currentVelocity = displacement * (-mNaturalFreq) * dampingratio + Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT) * (-mDampedFreq * cosCoeff * Math.sin(mDampedFreq * deltaT)+ mDampedFreq * sinCoeff * Math.cos(mDampedFreq * deltaT));

            var timeStep = i/(duration);
            var valueStep = Math.abs(mValue);
            //valueArray.push(valueStep)

            if(maxValue < Math.abs(mValue)){
                maxValue = Math.abs(mValue);
            }
        }

        return maxValue;
    }


    public computeMaxValue(stiffness:number,damping:number,mass:number,velocity:number,eps:number){
        let time = 0;
        let value = 0;
        let maxValue = 0;
        let epsilon = 1/eps;

        while (!(time > 0 && Math.abs(velocity) < epsilon)) {

            time += epsilon;

            let k = 0 - stiffness;
            let b = 0 - damping;
            let F_spring = k * ((value) - 1);
            let F_damper = b * (velocity);

            velocity += ((F_spring + F_damper) / mass) * epsilon;
            value += velocity * epsilon;

            if (maxValue < value) {
                maxValue = value;
            }
        }
        return maxValue;
    }

    computeSpringMax(factor:number){
        let maxValue = 0;
        let epsilon = 0.001;
        let count = 1 / epsilon;
        for (let i = 0; i < count; i++) {
            let x = i * epsilon;
            let result = Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1;

            if (maxValue < result) {
                maxValue = result;
            }
        }
        return maxValue;
    }

    public findCloseNum(num:number,eps:number){
        let epsilon = 1/eps
        let arr = new Array(1/epsilon);
        for (let i = 0; i < 1/epsilon; i++) {
            arr[i] = this.computeSpringMax(i * epsilon)
        }
        var index = 0;
        var d_value = Number.MAX_VALUE;
        for (var i = 0; i < arr.length; i++) {
            var new_d_value = Math.abs(arr[i] - num);
            if (new_d_value < d_value) {
                if (new_d_value === d_value && arr[i] < arr[index]) {
                    continue;
                }
                else{
                    console.log(new_d_value === d_value)
                    console.log(arr[i])
                    console.log('break')
                }
                index = i;
                d_value = new_d_value;
            }
        }
        return index / (1/epsilon);
    }


}