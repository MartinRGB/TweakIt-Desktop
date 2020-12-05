import {OrigamiPOPSpring as OrigamiPOP,
        FramerRK4Spring as FramerRK4,
        FramerDHOSpring as FramerDHO,
        ProtopieSpring as Protopie,
        PrincipleSpring as Principle} from '@Helpers/Solver/Calculator/type//SpringAnimationExtend'

class OrigamiPOPSpring extends OrigamiPOP{constructor(bounciness?:number,speed?:number){super(bounciness,speed)}}
class FramerRK4Spring extends FramerRK4{constructor(tension?:number,friction?:number,velocity?:number){super(tension,friction,velocity)}}
class FramerDHOSpring extends FramerDHO{constructor(stiffness?:number,damping?:number,mass?:number,velocity?:number){super(stiffness,damping,mass,velocity)}}
class ProtopieSpring extends Protopie{constructor(tension?:number,friction?:number){super(tension,friction)}}
class PrincipleSpring extends Protopie{constructor(tension?:number,friction?:number){super(tension,friction)}}

const DesignTools = {
    OrigamiPOPSpring,FramerRK4Spring,FramerDHOSpring,ProtopieSpring,PrincipleSpring
}


export default DesignTools