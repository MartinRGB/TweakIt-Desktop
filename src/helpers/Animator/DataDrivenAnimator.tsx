export default class DataDrivenPropertyAnimator{
  private data:any;
  private dataLength:number;
  private stepSize:number;
  private from:any;
  private to:any;
  private duration:number;
  private animationFrame:number;
  private timeProgress:number;
  private valueProgress:number;
  private startCallback:any;
  private endCallback:any;
  private frameCallback:any;
  private animating:boolean;

  constructor(calculator:any){
      this.data = calculator;
      this.dataLength = this.data.length;
      this.stepSize = 1 / (this.dataLength - 1)
      this.from = 0;
      this.to = 1;
      this.duration = 1;
      this.animationFrame = 0;
      this.timeProgress = 0;
      this.valueProgress = 0;
      this.startCallback = null;
      this.endCallback = null;
      this.frameCallback = null;
      this.animating = false;

  }

  // ############ Init animator with data ############

  public setFromToDuration(from:number,to:number,duration:number){
    this.from = from;
    this.to = to;
    this.duration = duration/1000.;
  }

  // ############ Animator state ############

  public start(){
      var count = 0
      var _this = this;
      _this.reset();
      _this.animating = true;
      _this.onStart()
      function animate () {
          if (count/60 > _this.duration) {
              _this.stop(_this.animationFrame)
              _this.onEnd();

              return
          }

          // timeProgresss
          _this.timeProgress = (count/60)/_this.duration;

          var interpolation = _this.getInterpolation(_this.timeProgress,_this.data,_this.dataLength,_this.stepSize);
  
          // valueProgress
          _this.setValueProgress(_this.from + interpolation*(_this.to-_this.from));

  
          count++

          // console.log(_this.progress + 'progress')
          // console.log(count + 'frame')
          // console.log(count * 16 + 'ms')
          
          _this.animationFrame = requestAnimationFrame(animate)

           _this.onFrame()
          
      }
      
      animate()
  }

  public delayStart(delay:number){

      var _this = this;
      
      var timeOut = setTimeout(function() {
          _this.start();
          clearTimeout(timeOut)
      }, delay);

  }

  stop(frame:number){
      cancelAnimationFrame(frame) //this.animationFrame
      this.animating = false;
  }

  public reset(){
      var _this = this;

      _this.stop(_this.animationFrame)
      _this.timeProgress = 0;
      _this.setValueProgress(_this.timeProgress)

  }


  onStart(){
    if(this.startCallback){
        this.startCallback()
    }
  }

  onFrame(){
    if(this.frameCallback){
        this.frameCallback()
    }
  }

  onEnd(){
    if(this.endCallback){
        this.endCallback()
    }
  }

  public setOnEndCallback(callback:any){
      this.endCallback = callback;
  }

  public setOnFrameCallback(callback:any){
      this.frameCallback = callback;
  }

  public setOnStartCallback(callback:any){
    this.startCallback = callback;
  }

  public isAnimating(){
      return this.animating;
  }

  // ############ 0~1 Progress based interpolation ############

  public setValueProgress(progress:number){
      this.valueProgress = progress;
  }

  public getValueProgress(){
    return this.valueProgress;
  }

  // ############ Lookuptable Interpolation Method ############

  getInterpolation(progress:number,data:any,length:number,step:number) {
      if (progress >= 1.0) {
          return 1.0;
      }
      if (progress <= 0) {
          return 0;
      }

      // Calculate index - We use min with length - 2 to avoid IndexOutOfBoundsException when
      // we lerp (linearly interpolate) in the return statement
      var position = parseInt(Math.min((progress * (length - 1)), length - 2).toString());
      // Calculate values to account for small offsets as the lookup table has discrete values
      var quantized = position * step;
      var diff = progress - quantized;
      var weight = diff / step;

      // Linearly interpolate between the table values
      return data[position] + weight * (data[position + 1] - data[position]);
  }


}