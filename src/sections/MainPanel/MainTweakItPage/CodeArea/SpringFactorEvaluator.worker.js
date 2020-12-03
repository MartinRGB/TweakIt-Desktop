//https://github.com/brickspert/blog/issues/36
function SpringFactorEvaluator(stiffness,dampingratio){

    var stiffness = stiffness?stiffness:1500;
    var dampingratio = dampingratio?dampingratio:0.5;
    var mass = 1;
    var velocity = 0;
    var maxSpringFactor = 4;
    var epsilon = 1000;
    var damping = damping?damping:10;

    var duration = computeDuration(stiffness,computeDamping(stiffness,dampingratio,mass),mass,velocity,epsilon);
    var springMaxValue = computeDampingRatioSpringMaxValue(stiffness,dampingratio,velocity,duration,epsilon);
    //var springMaxValue = computeDampingSpringMaxValue(stiffness,damping,mass,velocity,epsilon);

    var factor = findCloseNum(springMaxValue,epsilon)

    if(dampingratio <0.75){
        factor = findCloseNum(springMaxValue,epsilon)
    }
    else{
        var interpolatorFactor = 2;
        var theresholdDampingRatio = 0.74;
        var progress = ((dampingratio - theresholdDampingRatio)/(1-theresholdDampingRatio));
        factor = decelerateFuns(progress,interpolatorFactor)*maxSpringFactor
    }

    function decelerateFuns(t,c){
        return 1 - Math.pow(1-t,2*c);
    }

    function computeDamping(stiffness,dampingRatio,mass){
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
    }

    function computeDampingRatio(tension, friction,mass) {
        return friction / (2 * Math.sqrt(mass * tension));
    }

    function computeDuration(tension, friction,mass,vel,eps) {
        var epsilon = 1/eps;
        var velocity = vel;
        var dampingRatio = computeDampingRatio(tension, friction,mass)
        var undampedFrequency = Math.sqrt(tension / mass)

        // Key Bug When dampingRatio > 1
        if (dampingRatio < 1) {
            var a = Math.sqrt(1 - Math.pow(dampingRatio, 2))
            var b = velocity / (a * undampedFrequency)
            var c = dampingRatio / a
            var d = -((b - c) / epsilon)
            if (d <= 0) {
                return 0.0
            }
            return Math.log(d) / (dampingRatio * undampedFrequency)
        } else {
            return 0.0
        }
    }

    function computeDampingRatioSpringMaxValue(stiffness,dampingratio,velocity,duration,epsilon){
        var starVal = 0;
        var endVal = 1;
        var mNaturalFreq = Math.sqrt(stiffness);
        var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - dampingratio* dampingratio);
        var lastVelocity =  velocity;
        var currentVelocity = 0;
        var maxValue = 0;
        var valueArray = [];

        for (var i = 1/epsilon ;
            //i < 1+1/(sampvarimes*sampleScale);
            i< duration;
            i += 1/epsilon
            ){
            var deltaT = i;
            var lastDisplacement  = i/epsilon -  endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E,-dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));

            var mValue = displacement + endVal;

            if(maxValue < Math.abs(mValue)){
                maxValue = Math.abs(mValue);
            }
        }

        return maxValue;
    }


    function computeDampingSpringMaxValue(stiffness,damping,mass,velocity,eps){
        var time = 0;
        var value = 0;
        var maxValue = 0;
        var epsilon = 1/eps;

        while (!(time > 0 && Math.abs(velocity) < epsilon)) {

            time += epsilon;

            var k = 0 - stiffness;
            var b = 0 - damping;
            var F_spring = k * ((value) - 1);
            var F_damper = b * (velocity);

            velocity += ((F_spring + F_damper) / mass) * epsilon;
            value += velocity * epsilon;

            if (maxValue < value) {
                maxValue = value;
            }
        }
        return maxValue;
    }

    function computeGeneralSpringMax(factor){
        var maxValue = 0;
        var epsilon = 0.001;
        var count = 1 / epsilon;
        for (var i = 0; i < count; i++) {
            var x = i * epsilon;
            var result = Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1;

            if (maxValue < result) {
                maxValue = result;
            }
        }
        return maxValue;
    }

    function findCloseNum(num,eps){
        var epsilon = 1/eps
        var arr = new Array(1/epsilon);
        for (var i = 0; i < 1/epsilon; i++) {
            arr[i] = computeGeneralSpringMax(i * epsilon)
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
                    // console.log(new_d_value === d_value)
                    // console.log(arr[i])
                    // console.log('break')
                }
                index = i;
                d_value = new_d_value;
            }
        }
        return index / (1/epsilon);
    }

    return [duration,factor];
}

onmessage = function(e) {
    //console.log('Worker: Message received from main script');
    var stiffness = e.data[0];
    var dampingratio = e.data[1];

    var value = SpringFactorEvaluator(stiffness,dampingratio);

    //console.log(value)
    postMessage([value[0].toFixed(3),value[1].toFixed(3)]);
}