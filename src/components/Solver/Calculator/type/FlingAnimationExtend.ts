import {FlingAnimationCalculator} from '@Components/Solver/Calculator/BaseCalculator'


export class AndroidFling extends FlingAnimationCalculator{
    constructor(velocity?:number, friction?:number) {
        super(velocity?velocity:-2000,friction?friction:0.5)
        this.duration = this.getDuration()
    }
}
