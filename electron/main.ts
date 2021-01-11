import { app, ipcMain,BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

let mainWindow: Electron.BrowserWindow | null
let castWindow: Electron.BrowserWindow | null;

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

function createCastWindow(width:number,height:number) { //ip:string,port:number,query:string,udid:string,
  castWindow = new BrowserWindow({
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
    castWindow.loadURL('http://localhost:50001')
  } else {
    castWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/previewer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }
  // castWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, 'renderer/previewer/index.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   })
  // )

  // Notice IPC Render Method is not agile
  // castWindow.webContents.on('did-finish-load', () => {
  //   if(castWindow !=null){
  //     castWindow.webContents.send('msg', ip,port,query,udid);
  //   }
  // });

  castWindow.on('closed',()=>{
    castWindow = null;
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
    //   if(castWindow !=null){
    //     castWindow.close();
    //     createCastWindow(ip,port,query,udid,width,height)
    //   }
    //   else{
    //     createCastWindow(ip,port,query,udid,width,height)
    //   }
    // })

    ipcMain.on('createCastWindow', (event,width,height) => {
      event.sender.send('test', { not_right: false })
      if(castWindow !=null){
        castWindow.close();
        createCastWindow(width,height)
      }
      else{
        createCastWindow(width,height)
      }
    })
  })
app.allowRendererProcessReuse = true
