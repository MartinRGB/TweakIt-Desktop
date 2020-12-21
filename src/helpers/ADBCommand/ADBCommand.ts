const childProcess = require('child_process');
export const exec = childProcess.exec;
const fs = require("fs");

export const execCMD = (cmd:any,log?:any,successCallback?:(e:any) => void,errorCallback?:(e:any)=>void) =>{
    
    exec(cmd, function(error:any, stdout:any, stderr:any){
      if(error) {
          console.error('error: ' + error);
          if(errorCallback){
            errorCallback(error);
          }
          return;
      }
      console.log(log + ':\n' + stdout);
      if(successCallback){
        successCallback(stdout);
      }
    });
    
}



export const execCMDPromise = (cmd:any,successCallback?:(e:any) => void,errorCallback?:(e:any)=>void,log?:any) =>{
    var execution:any;
    var promise = new Promise((resolve, reject) =>{
      execution = exec(cmd, function(error:any, stdout:any, stderr:any){
        if(error) {
            reject(error);
            return;
        }
        resolve(stdout);
      });
    });
  
    promise.then(function(value) {
      //console.log(log + ':\n' + value);
      if(successCallback){
        successCallback(value);
        execution.kill()
      }               
    }).catch(function(error) {
      //console.error('error: ' + error);
      if(errorCallback){
        errorCallback(error);
        execution.kill()
      }             
    });

}
