const { app } = window.require('electron').remote;
var path = require("path");

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localNodeModulePath = appPath + '/node_modules/'

var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
//var localNodePath = localAssetsPath + 'node/';

var appResPath = path.join(process.resourcesPath, "/assets/");
var resADBPath = appResPath + 'adb/';
//var resNodePath = appResPath + 'node/';

export const getUserHome = () =>{
  return process.env.HOME || process.env.USERPROFILE;
}

export const SDCardTmpPath = () =>{
  return `/sdcard`;
}

export const injectPathEnvironments = () =>{
  window.appPath = appPath;
  process.env.PATH =  
  localNodeModulePath + '.bin' + ':' + 
  
  localADBPath.substring(0, localADBPath.length - 1) + ':' +
  // localNodePath.substring(0, localNodePath.length - 1) + ':' + 

  resADBPath.substring(0, resADBPath.length - 1) + ':' +
  // resNodePath.substring(0, resNodePath.length - 1) + ':' +
  
  '/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:' + 
  '/usr/bin:' +
  '/bin:' +
  '/usr/local/sbin:' +
  '/usr/local/bin:' +
  '/usr/sbin:' +
  '/sbin:' + 
  '/opt/puppetlabs/bin:' +
  '/usr/local/munki:' + 
  '/Library/Apple/usr/bin:';
}

