export interface ScrcpyEventListener {
    onVideoParametersPrepared:(width:number,height:number)=>void;
}