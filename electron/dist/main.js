"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var electron_devtools_installer_1 = require("electron-devtools-installer");
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 800,
        minHeight: 500,
        minWidth: 320,
        //frame: false,
        backgroundColor: '#2e2c29',
        // backgroundColor: '#191622',
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true
        }
    });
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:4000');
    }
    else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'renderer/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createWindow)
    .whenReady()
    .then(function () {
    if (process.env.NODE_ENV === 'development') {
        electron_devtools_installer_1["default"](electron_devtools_installer_1.REACT_DEVELOPER_TOOLS)
            .then(function (name) { return console.log("Added Extension:  " + name); })["catch"](function (err) { return console.log('An error occurred: ', err); });
        electron_devtools_installer_1["default"](electron_devtools_installer_1.REDUX_DEVTOOLS)
            .then(function (name) { return console.log("Added Extension:  " + name); })["catch"](function (err) { return console.log('An error occurred: ', err); });
    }
});
electron_1.app.allowRendererProcessReuse = true;
