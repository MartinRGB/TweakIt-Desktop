import { app, ipcMain,BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

let mainWindow: Electron.BrowserWindow | null
let previewerWindow: Electron.BrowserWindow | null;
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

function createPreviewerWindow(width:number,height:number) { //ip:string,port:number,query:string,udid:string,
  previewerWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    maxWidth:width,
    maxHeight:height,
    //frame: false,
    backgroundColor: '#000000',
    // backgroundColor: '#191622',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // TODO
  if (process.env.NODE_ENV === 'development') {
    previewerWindow.loadURL('http://localhost:50001')
  } else {
    previewerWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/previewer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  // previewerWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, 'renderer/previewer/index.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   })
  // )

  // Notice IPC Render Method is not agile
  // previewerWindow.webContents.on('did-finish-load', () => {
  //   if(previewerWindow !=null){
  //     previewerWindow.webContents.send('msg', ip,port,query,udid);
  //   }
  // });

  previewerWindow.on('closed',()=>{
    previewerWindow = null;
  })
}

function createPreviewerReactWindow(width:number,height:number) {
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
        pathname: path.join(__dirname, 'renderer/test/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  previewerReactWindow.on('closed',()=>{
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

    ipcMain.on('createPreviewerWindow', (event,width,height) => {
      event.sender.send('test', { not_right: false })
      if(previewerWindow !=null){
        previewerWindow.close();
        createPreviewerWindow(width,height)
      }
      else{
        createPreviewerWindow(width,height)
      }
    })

    ipcMain.on('createPreviewerReactWindow', (event,width,height) => {
      event.sender.send('test', { not_right: false })
      if(previewerReactWindow !=null){
        previewerReactWindow.close();
        createPreviewerReactWindow(width,height)
      }
      else{
        createPreviewerReactWindow(width,height)
      }
    })
  })
app.allowRendererProcessReuse = true
