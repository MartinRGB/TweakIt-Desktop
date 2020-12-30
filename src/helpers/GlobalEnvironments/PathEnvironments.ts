const { app } = window.require('electron').remote;
var path = require("path");

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localNodePath = appPath + '/node_modules/'
var localAssetsPath = appPath + '/assets/';
var localADBPath = localAssetsPath + 'adb/';
var localScrcpyBinPath = localAssetsPath + 'scrcpy/1.16/bin/';

var localResAssetsPath = path.join(process.resourcesPath, "/assets/");
var adbPathInRes = localResAssetsPath + 'adb/';
var scrcpyPathInRes = localResAssetsPath + 'scrcpy/1.16/bin/';
var ffmpegBinPathInRes = localResAssetsPath + 'ffmpeg/4.3.1/bin/';
var ffmpegLibPathInRes = localResAssetsPath + 'ffmpeg/4.3.1/lib/';

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

  adbPathInRes.substring(0, adbPathInRes.length - 1) + ':' +
  scrcpyPathInRes.substring(0, scrcpyPathInRes.length - 1) + ':' + 
  ffmpegBinPathInRes.substring(0, ffmpegBinPathInRes.length - 1) + ':' + 
  ffmpegLibPathInRes.substring(0, ffmpegLibPathInRes.length - 1) + ':' +

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

