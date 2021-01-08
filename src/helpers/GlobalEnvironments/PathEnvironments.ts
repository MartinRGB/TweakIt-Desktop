const { app } = window.require('electron').remote;
var path = require("path");

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localNodePath = appPath + '/node_modules/'

var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
var localScrcpyBinPath = localAssetsPath + 'scrcpy/1.16/bin/';

var localResAssetsPath = path.join(process.resourcesPath, "/assets/");
var resADBPath = localResAssetsPath + 'adb/';
var resScrcpyPath = localResAssetsPath + 'scrcpy/1.16/bin/';

export const getUserHome = () =>{
  return process.env.HOME || process.env.USERPROFILE;
}

export const SDCardTmpPath = () =>{
  return `/sdcard`;
}

export const injectPathEnvironments = () =>{
  window.appPath = appPath;
  process.env.PATH =  
  '/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:' + 
  localNodePath + '.bin' + ':' + 
  // localADBPath.substring(0, localADBPath.length - 1) + ':' + 
  // localScrcpyBinPath.substring(0, localScrcpyBinPath.length - 1) + ':' +

  localADBPath.substring(0, localADBPath.length - 1) + ':' +
  localScrcpyBinPath.substring(0, localScrcpyBinPath.length - 1) + ':' + 

  resADBPath.substring(0, resADBPath.length - 1) + ':' +
  resScrcpyPath.substring(0, resScrcpyPath.length - 1) + ':' +

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

