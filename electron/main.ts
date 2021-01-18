import { app, ipcMain,BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

import {execCMDPromise} from "../src/helpers/ADBCommand/ADBCommand"
import {BACKEND_SOCKET_PORT} from '../src/ws-scrcpy/GlobalConstants'

var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localAssetsPath = appPath + '/assets/';
var appResPath = path.join(process.resourcesPath, "/assets/");

let mainWindow: Electron.BrowserWindow | null
let previewerScrcpyWindow: Electron.BrowserWindow | null;
let previewerReactWindow: Electron.BrowserWindow | null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1120,
    height: 860,
    minHeight: 500,
    minWidth: 320,
    //frame: false,
    backgroundColor: '#2e2c29',
    // backgroundColor: '#191622',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:50000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createReactPreviewerWindow(width:number,height:number) {
  previewerReactWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    maxWidth:width,
    maxHeight:height,
    backgroundColor: '#000000',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // TODO
  if (process.env.NODE_ENV === 'development') {
    previewerReactWindow.loadURL('http://localhost:50002')
  } else {
    previewerReactWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/react-previewer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  previewerReactWindow.on('closed',()=>{
    //execCMDPromise(`lsof -P | grep ':${BACKEND_SOCKET_PORT}' | awk '{print $2}' | xargs kill -9`)
    previewerReactWindow = null;
  })
}

app.on('ready', createMainWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    }

    // Notice IPC Render Method is not agile
    // ipcMain.on('createCastWindow', (event,ip,port,query,udid,width,height) => {
    //   event.sender.send('nameReply', { not_right: false })
    //   console.log(ip,port,query)
    //   if(previewerWindow !=null){
    //     previewerWindow.close();
    //     createCastWindow(ip,port,query,udid,width,height)
    //   }
    //   else{
    //     createCastWindow(ip,port,query,udid,width,height)
    //   }
    // })
    ipcMain.on('createReactPreviewerWindow', (event,width,height) => {
      event.sender.send('test', { not_right: false })
      if(previewerReactWindow !=null){
        //previewerReactWindow.close();
        createReactPreviewerWindow(width,height)
      }
      else{
        createReactPreviewerWindow(width,height)
      }
    })
  })
app.allowRendererProcessReuse = true
