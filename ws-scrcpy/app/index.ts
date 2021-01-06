import '../style/app.css';
//import * as querystring from 'querystring';
import { ScrcpyClient } from './client/ScrcpyClient';
//import { ShellClient } from './client/ShellClient';
//import { DroidDeviceTrackerClient } from './client/DroidDeviceTrackerClient';
import { ScrcpyStreamParams } from '../common/ScrcpyStreamParams';
//import { ShellParams } from '../common/ShellParams';


// TODO
const testObj = {
    action: 'stream',
    decoder: 'mse',
    ip: 'localhost',
    port: '4001',
    query: '?action=proxy&remote=tcp%3A8886&udid=00d4fe2f',
    udid: '00d4fe2f',
}

window.onload = function (): void {
    // const hash = location.hash.replace(/^#!/, '');

    // const parsedQuery = querystring.parse(hash);
    // const action = parsedQuery.action;
    
    new ScrcpyClient(testObj as ScrcpyStreamParams);

    // if (action === ScrcpyClient.ACTION && typeof parsedQuery.udid === 'string') {
    //     console.log(parsedQuery);
    //     console.log(hash);
    //     new ScrcpyClient(testObj as ScrcpyStreamParams);
    // } else if (action === ShellClient.ACTION && typeof parsedQuery.udid === 'string') {
    //     ShellClient.start(parsedQuery as ShellParams);
    // } else {
    //     DroidDeviceTrackerClient.start();
    // }
};
