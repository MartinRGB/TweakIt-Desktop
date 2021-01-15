import * as querystring from 'querystring';
import { ScrcpyClient } from './client/ScrcpyClient';
import { DroidDeviceTrackerClient } from './client/DroidDeviceTrackerClient';
import { ScrcpyStreamParams } from './interfaces/ScrcpyStreamParams';
import {PrepareDataClient} from './client/PrepareDataClient'
// import {FRONTEND_PORT,DEVICE_ID} from '../GlobalConstants'


window.onload = function (): void {

    document.body.style.margin = '0px';
    document.body.style.maxHeight = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.background = 'white';
    // Notice IPC Render Method is not agile
    //const { ipcRenderer } = require('electron')
    // ipcRenderer.on('msg', function (event, ip,port,query,udid){
    //     console.log(ip,port,query,udid);

    // Test Method
    //     const testObj = {
    //         action: 'stream',
    //         decoder: 'mse',
    //         ip: `${ip}`,
    //         port: `${port}`,
    //         query: `${query}`,
    //         udid: `${udid}`,
    //     };
    //     new ScrcpyClient(testObj as ScrcpyStreamParams);
    // });

    // Direct Method
    //DroidDeviceTrackerClient.start();
    //new ScrcpyClient(testObj as ScrcpyStreamParams);
    
    PrepareDataClient.start();


};
