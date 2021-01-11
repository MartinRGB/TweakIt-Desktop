//import '../style/app.css';
//import * as querystring from 'querystring';
import { ScrcpyClient } from './client/ScrcpyClient';
//import { ShellClient } from './client/ShellClient';
//import { DroidDeviceTrackerClient } from './client/DroidDeviceTrackerClient';
import { ScrcpyStreamParams } from './interfaces/ScrcpyStreamParams';
//import { ShellParams } from '../common/ShellParams';
import {DroidDeviceTrackerClient} from './client/DroidDeviceTrackerClient'

//http://localhost:8000/#!action=stream&udid=00d4fe2f&decoder=mse&ip=localhost&port=8000&query=%3Faction%3Dproxy%26remote%3Dtcp%253A8886%26udid%3D00d4fe2f
// action: "stream"
// decoder: "mse"
// ip: "localhost"
// port: "8000"
// query: "?action=proxy&remote=tcp%3A8886&udid=00d4fe2f"
// udid: "00d4fe2f"

//http://localhost:8000/#!action=stream&udid=00d4fe2f&decoder=mse&ip=192.168.0.101&port=8886
// action: "stream"
// decoder: "mse"
// ip: "192.168.0.101"
// port: "8886"
// udid: "00d4fe2f"

import * as querystring from 'querystring';
import {FRONTEND_PORT,DEVICE_ID} from '../GlobalConstants'

// TODO
const testObj = {
    action: 'stream',
    decoder: 'mse',
    ip: `localhost`,
    port: `${FRONTEND_PORT}`,
    query: `?action=proxy&remote=tcp%3A8886&udid=${DEVICE_ID}`,
    udid: `${DEVICE_ID}`,
};

// IF WIFI
// const testObj = {
//     action: 'stream',
//     decoder: 'mse',
//     ip: `192.168.0.101`,
//     port: `8886`,
//     query: ``,
//     udid: `${DEVICE_ID}`,
// };


// TODO
// const testObj = {
//     action: 'stream',
//     decoder: 'mse',
//     ip: 'localhost',
//     port: '50001',
//     query: '?action=proxy&remote=tcp%3A8886&udid=00d4fe2f',
//     udid: '00d4fe2f',
// };

window.onload = function (): void {
    //DroidDeviceTrackerClient.start();
    //new ScrcpyClient(testObj as ScrcpyStreamParams);

    const hash = location.hash.replace(/^#!/, '');
    const parsedQuery = querystring.parse(hash);
    const action = parsedQuery.action;
    if (action === ScrcpyClient.ACTION && typeof parsedQuery.udid === 'string') {
        console.log(parsedQuery);
        new ScrcpyClient(parsedQuery as ScrcpyStreamParams);
    } else {
        DroidDeviceTrackerClient.start();
    }

};
