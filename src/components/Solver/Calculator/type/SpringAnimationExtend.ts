import { SpringAnimationCalculator } from '@Components/Solver/Calculator/BaseCalculator'

export class AndroidSpring extends SpringAnimationCalculator {
  constructor (stiffness?:number, dampingratio?:number, velocity?:number) {
    super()

    this.stiffness = stiffness?stiffness:1500;
    this.dampingratio = dampingratio?dampingratio:0.5;
    this.velocity = velocity?velocity:0;
    this.mass = 1.0
    this.fixedGraph = false

    this.damping = this.computeDamping(this.stiffness, this.dampingratio, this.mass)
    this.tension = this.stiffness
    this.friction = this.damping
    this.bouncyTension = this.bouncyTesnionConversion(this.tension);
    this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
    this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
    let b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
    this.bounciness = 20*1.7*b/0.8;

    this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)
    //this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
  }
}

export class FramerDHOSpring extends SpringAnimationCalculator {
  constructor (stiffness?:number, damping?:number, mass?:number, velocity?:number) {
    super()

    this.stiffness = stiffness?stiffness:50;
    this.damping = damping?damping:2;
    this.mass = mass?mass:1;
    this.velocity = velocity?velocity:0;
    this.fixedGraph = true

    this.tension = this.stiffness
    this.friction = this.damping
    this.dampingratio = this.computeDampingRatio(this.tension, this.friction, this.mass)
    this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)

    // DAMPINGRATIO FIX
    if(this.dampingratio >= 1){
      this.friction = this.computeDamping(this.stiffness,Math.max(0.,Math.min(0.9999,this.dampingratio)),this.mass)
      this.stiffness = this.computeOverDampingTension(this.friction,this.dampingratio,this.mass)
      this.dampingratio = Math.max(0.,Math.min(0.9999,this.dampingratio));
      this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass), this.mass, 1.0)
    }

    this.bouncyTension = this.bouncyTesnionConversion(this.tension);
    this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
    this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
    let b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
    this.bounciness = 20*1.7*b/0.8;

    //this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
  
  }
}

export class iOSCASpring extends FramerDHOSpring{
  constructor (stiffness?:number, damping?:number, mass?:number, velocity?:number) {
    super(stiffness?stiffness:100,damping?damping:10,mass?mass:1,velocity?velocity:0)
  }
}

export class FramerRK4Spring extends SpringAnimationCalculator {
  constructor (tension?:number, friction?:number, velocity?:number) {
    super()

    this.tension = tension?tension:200
    this.friction = friction?friction:25
    this.velocity = velocity?velocity:0

    this.stiffness = this.tension
    this.damping = this.friction
    this.mass = 1.0
    this.fixedGraph = true

    this.dampingratio = this.computeDampingRatio(this.tension, this.friction, this.mass)
    this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)

    // DAMPINGRATIO FIX
    if(this.dampingratio >= 1){
      this.friction = this.computeDamping(this.stiffness,Math.max(0.,Math.min(0.9999,this.dampingratio)),this.mass)
      this.stiffness = this.computeOverDampingTension(this.friction,this.dampingratio,this.mass)
      this.dampingratio = Math.max(0.,Math.min(0.9999,this.dampingratio));
      this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass), this.mass, 1.0)
    }

    this.bouncyTension = this.bouncyTesnionConversion(this.tension);
    this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
    this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
    let b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
    this.bounciness = 20*1.7*b/0.8;

    //this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
  }
}

export class OrigamiPOPSpring extends SpringAnimationCalculator {
  constructor (bounciness?:number, speed?:number) {
    super()

    this.fixedGraph = false

    this.bounciness = bounciness?bounciness:5
    this.speed = speed?speed:10
    this.velocity = 0.0
    let b = this.normalize(this.bounciness / 1.7, 0, 20.0)
    b = this.projectNormal(b, 0.0, 0.8)
    const s = this.normalize(this.speed / 1.7, 0, 20.0)
    this.bouncyTension = this.projectNormal(s, 0.5, 200)
    this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01)

    // Output
    this.mass = 1.0
    this.tension = this.tensionConversion(this.bouncyTension)
    this.friction = this.frictionConversion(this.bouncyFriction)
    this.stiffness = this.tension
    this.damping = this.friction
    this.dampingratio = this.computeDampingRatio(this.tension, this.friction, this.mass)
    this.duration = this.computeDuration(this.tension, this.friction, this.mass, 1.0)

    // BUT BUGS HERE:DAMPINGRATIO FIX
    if(this.dampingratio >= 1){
      this.friction = this.computeDamping(this.stiffness,Math.max(0.,Math.min(0.9999,this.dampingratio)),this.mass)
      this.stiffness = this.computeOverDampingTension(this.friction,this.dampingratio,this.mass)
      this.dampingratio = Math.max(0.,Math.min(0.9999,this.dampingratio));
      this.duration = this.computeDuration(this.stiffness, this.computeDamping(this.stiffness,this.dampingratio,this.mass), this.mass, 1.0)
    }

    //this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
  }

  tensionConversion (oValue:number) {
    return (oValue - 30.0) * 3.62 + 194.0
  }

  frictionConversion (oValue:number) {
    return (oValue - 8.0) * 3.0 + 25.0
  }
}

export class iOSUIViewSpring extends SpringAnimationCalculator {
  constructor (dampingratio?:number, duration?:number) {
    super()

    // this.stiffness = this.tensionFromOrigamiValue(stiffness);
    // this.damping = this.frictionFromOrigamiValue(damping);
    this.dampingratio = dampingratio?dampingratio:0.5
    this.duration = duration?duration:0.5
    this.fixedGraph = false

    // Output
    this.mass = 1.0

    // Method -I
    // this.friction = this.computeFriction(this.dampingRatio,this.duration);
    // this.damping = this.friction;
    // this.tension = this.computeTension(this.dampingRatio,this.friction);
    // this.stiffness = this.tension;

    // Method -II
    this.tension = this.computeTension(this.dampingratio, this.duration, this.mass)
    this.stiffness = this.tension
    this.friction = this.computeFriction(this.dampingratio,this.tension,this.mass);
    this.damping = this.friction;

    this.bouncyTension = this.bouncyTesnionConversion(this.tension);
    this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
    this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
    let b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
    this.bounciness = 20*1.7*b/0.8;


    //this.array = this.springCalculator(this.stiffness, this.dampingratio, 0.0, this.duration, this.fixedGraph)
  }

  // Method -I
  // computeFriction(dampingratio, duration) {
  //     var a = Math.sqrt(1 - Math.pow(dampingratio, 2));
  //     var d = (dampingratio/a)*1000.;

  //     return 2*Math.log(d)/duration;
  // }

  // computeTension(dampingratio, friction) {
  //     return Math.pow(friction/(dampingratio*2),2);
  // }

  // Method -II
  computeTension (dampingratio:number, duration:number, mass:number) {
    const a = Math.sqrt(1 - Math.pow(dampingratio, 2))
    const d = (dampingratio / a) * 1000.0
    const tension = Math.pow(Math.log(d) / (dampingratio * duration), 2) * mass
    return tension
  }

  computeFriction (dampingratio:number, tension:number, mass:number) {
    const a = (2 * Math.sqrt(mass * tension))
    const friction = dampingratio * a
    return friction
  }
}

export class ProtopieSpring extends FramerRK4Spring {
  constructor (tension?:number, friction?:number) {
    super(tension?tension:300, friction?friction:15, 0)
  }
}

export class PrincipleSpring extends FramerRK4Spring {
  constructor (tension?:number, friction?:number) {
    super(tension?tension:380, friction?friction:20, 0)
  }
}

export class SOSPowerSpring extends SpringAnimationCalculator {
  constructor (stiffness?:number, dampingratio?:number) {
    super()

    this.stiffness = stiffness?stiffness:1500;
    this.dampingratio = dampingratio?dampingratio:0.5;
    this.velocity = 0;
    this.mass = 1.0
    this.fixedGraph = false

    this.damping = this.computeDamping(this.stiffness, this.dampingratio, this.mass)
    this.tension = this.stiffness
    this.friction = this.damping
    this.bouncyTension = this.bouncyTesnionConversion(this.tension);
    this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
    this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
    let b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
    this.bounciness = 20*1.7*b/0.8;
    
    this.damping = this.computeDamping(this.stiffness, this.dampingratio, this.mass)
    this.tension = this.stiffness
    this.friction = this.damping
    this.duration = this.computeDuration(this.tension, this.friction, this.mass, 2.0)
    //this.array = this.springCalculator(this.stiffness, this.dampingratio, this.velocity, this.duration, this.fixedGraph)
  }
}
