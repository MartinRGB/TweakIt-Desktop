import {FlingAnimationCalculator} from './BaseCalculator'

export class AndroidFling extends FlingAnimationCalculator{
    constructor(velocity:number, dampingRatio:number) {
        super(velocity,dampingRatio)
    }
}
