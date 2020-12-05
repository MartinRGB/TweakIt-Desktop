const childProcess = require('child_process');
const exec = childProcess.exec;
const fs = require("fs");

import { useContext } from "react";
import {ADBConnectStateContext} from '@Context/ADBConnectContext'

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



export const execCMDPromise = (cmd:any,log?:any,successCallback?:(e:any) => void,errorCallback?:(e:any)=>void) =>{
    var promise = new Promise((resolve, reject) =>{
      exec(cmd, function(error:any, stdout:any, stderr:any){
        if(error) {
            reject(error);
            return;
        }
        resolve(stdout);
      });
    });
  
    promise.then(function(value) {
      console.log(log + ':\n' + value);
      if(successCallback){
        successCallback(value);
      }
      // success                       
    }).catch(function(error) {
      console.error('error: ' + error);
      if(errorCallback){
        errorCallback(error);
      }
      // failure                       
    });
}

export const registWindowCMDConsole = (funs:any) =>{
  window.cmdConsole = funs;
}

export const simpleRunCMD = (cmd:any,cbIsShow:boolean) =>{
  if(window.cmdConsole && cbIsShow){
    window.cmdConsole(cmd)
  }
  else{
    execCMD(cmd)
  }
}
