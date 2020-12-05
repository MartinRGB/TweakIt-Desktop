import {FlutterLinear,FlutterDecelerate,FlutterElasticIn,FlutterElasticOut,FlutterElasticInOut,FlutterBounceIn,FlutterBounceOut,FlutterBounceInOut} from '@Helpers/Solver/Calculator/type/InterpolatorExtend'
import {CubicBezier} from '@Helpers/Solver/Calculator/type/CubicBezierExtend'

class Linear extends FlutterLinear{constructor(a?:number) {super(a);}}
class Decelerate extends FlutterDecelerate{constructor(a?:number) {super(a);}}

class FastLinearToSlowEaseIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class FastOutSlowIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class SlowMiddle extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class Ease extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class StandardEasing extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class AccelerateEasing extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class DecelerateEasing extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class EaseIn extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInToLinear extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInSine extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInQuad extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInCubic extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInQuart extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInQuint extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInExpo extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInCirc extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInBack extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class EaseOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class LinearToEaseOut  extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutSine extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutQuad extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutCubic extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutQuart extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutQuint extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutExpo extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutCirc extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseOutBack extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class EaseInOut extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutSine extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutQuad extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutCubic extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutQuart extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutQuint extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutExpo extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutCirc extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}
class EaseInOutBack extends CubicBezier{constructor(p1x?:any,p1y?:any,p2x?:any,p2y?:any){super(p1x,p1y,p2x,p2y);}}

class ElasticIn extends FlutterElasticIn{constructor(a?:number) {super(a);}}
class ElasticOut extends FlutterElasticOut{constructor(a?:number) {super(a);}}
class ElasticInOut extends FlutterElasticInOut{constructor(a?:number) {super(a);}}
class BounceIn extends FlutterBounceIn{constructor(a?:number) {super(a);}}
class BounceOut extends FlutterBounceOut{constructor(a?:number) {super(a);}}
class BounceInOut extends FlutterBounceInOut{constructor(a?:number) {super(a);}}

const Flutter ={Linear,Decelerate,ElasticIn,ElasticOut,ElasticInOut,BounceIn,BounceOut,BounceInOut,FastLinearToSlowEaseIn,FastOutSlowIn,SlowMiddle,StandardEasing,AccelerateEasing,DecelerateEasing,Ease,EaseIn,EaseInToLinear,EaseInSine,EaseInQuad,EaseInCubic,EaseInQuart,EaseInQuint,EaseInExpo,EaseInCirc,EaseInBack,EaseOut,LinearToEaseOut ,EaseOutSine,EaseOutQuad,EaseOutCubic,EaseOutQuart,EaseOutQuint,EaseOutExpo,EaseOutCirc,EaseOutBack,EaseInOut,EaseInOutSine,EaseInOutQuad,EaseInOutCubic,EaseInOutQuart,EaseInOutQuint,EaseInOutExpo,EaseInOutCirc,EaseInOutBack}

export default Flutter