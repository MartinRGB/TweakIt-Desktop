import WebSocket from 'ws';
import * as os from 'os';
import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
import * as querystring from 'querystring';
import * as readline from 'readline';
import { IncomingMessage, ServerResponse, STATUS_CODES } from 'http';
import { ServiceDeviceTracker } from './ServiceDeviceTracker';
import { ClientDataService } from './ClientDataService';
import { ACTION } from './Constants';
import { ServiceWebsocketProxy } from './ServiceWebsocketProxy';

import {FRONTEND_PORT} from '../GlobalConstants'

//const port = parseInt(process.argv[2], 10) || portNum;
const serverPort = parseInt(process.argv[2], 10) || FRONTEND_PORT;
const map: Record<string, string> = {
    '.wasm': 'application/wasm',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jar': 'application/java-archive',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
};

//TODO
//const PUBLIC_DIR = path.join(__dirname, '../public');
//const PUBLIC_DIR = path.join(__dirname, 'renderer/public');

//const PUBLIC_DIR = '/Users/MartinRGB/Documents/GitHub/TweakIt-Desktop/dist/public';
//const PUBLIC_DIR = '/Users/MartinRGB/Documents/GitHub/TweakIt-Desktop/dist/renderer/previewer'

const { app } = window.require('electron').remote;
var appPath = app.getAppPath().replace(/ /g,"\\ ");
var localAssetsPath = appPath + '/assets/';
var appResPath = path.join(process.resourcesPath, "/assets/");
var localDistRendererPath = appPath + '/dist/renderer/';

var mWebSocket:WebSocket.Server;
var server;


export function getPath(){
    var DIR;
    DIR = path.join(__dirname, localDistRendererPath + 'previewer');
    console.log(DIR)

    return DIR;
}

const PUBLIC_DIR = getPath();

function setWSSConnection(wss:WebSocket.Server,id:string,ip:string,port:number,query:string){
    wss.on('connection', async (ws: WebSocket, req) => {
        if (!req.url) {
            ws.close(4001, 'Invalid url');
            return;
        }
        const parsed = url.parse(req.url);
        const parsedQuery = querystring.parse(parsed.query || '');
        if (typeof parsedQuery.action === 'undefined') {
            ws.close(4002, `Missing required parameter "action"`);
        }
        //ServiceDeviceTracker.createService(ws);
        switch (parsedQuery.action) {
            case ACTION.FROM_CLIENT:
                ClientDataService.createService(ws,id,ip,port,query);
                break;
            case ACTION.DEVICE_LIST:
                ServiceDeviceTracker.createService(ws);
                break;
            case ACTION.PROXY: {
                const remote = parsedQuery.remote;
                if (typeof remote !== 'string' || !remote) {
                    ws.close(4003, `Invalid value "${remote}" for "remote" parameter`);
                    break;
                }
                const udid = id; //parsedQuery.udid
                if (typeof udid !== 'string' || !udid) {
                    ws.close(4003, `Invalid value "${udid}" for "udid" parameter`);
                    break;
                }
                const service = ServiceWebsocketProxy.createService(ws, udid, remote);
                service.init().catch((e) => {
                    const msg = `Failed to start service: ${e.message}`;
                    console.error(msg);
                    ws.close(4005, msg);
                });
                break;
            }
            default:
                ws.close(4003, `Invalid value "${parsedQuery.action}" for "action" parameter`);
                return;
        }
    });
}

export function startScrcpyServer(id:string,ip:string,port:number,query:string,callback?:()=>void){
    if(mWebSocket != undefined){
        mWebSocket.close();
    }
    if(server != undefined){
        server.close();
    }

    server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        if (!req.url) {
            res.statusCode = 400;
            res.end(STATUS_CODES[400]);
            return;
        }
        const parsedUrl = url.parse(req.url);
        let pathname = path.join(PUBLIC_DIR, (parsedUrl.pathname || '.').replace(/^(\.)+/, '.'));
        fs.stat(pathname, (statErr, stat) => {
            if (statErr) {
                if (statErr.code === 'ENOENT') {
                    // if the file is not found, return 404
                    res.statusCode = 404;
                    res.end(`File ${pathname} not found!`);
                } else {
                    res.statusCode = 500;
                    res.end(`Error getting the file: ${statErr}.`);
                }
                return;
            }
            if (stat.isDirectory()) {
                pathname = path.join(pathname, 'index.html');
            }
            const ext = path.parse(pathname).ext;
            fs.readFile(pathname, (readErr, data) => {
                if (readErr) {
                    res.statusCode = 500;
                    res.end(`Error getting the file: ${statErr}.`);
                } else {
                    // if the file is found, set Content-type and send data
                    res.setHeader('Content-type', map[ext] || 'text/plain');
                    res.end(data);
                }
            });
        });
    });


    server.listen(serverPort);
    server.on('listening', function() {
        printListeningMsg(()=>{
            mWebSocket = new WebSocket.Server({server});
            setWSSConnection(mWebSocket,id,ip,port,query);
            if(callback) callback()
        })
    });


}

function fixedEncodeURI(str: string): string {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

function printListeningMsg(callback?:()=>void):void{
    const list: string[] = [];
    const formatAddress = (ip: string, ipv6: boolean): void => {
        const host = ipv6 ? `[${ip}]` : ip;
        list.push(`http://${host}:${serverPort}`);
    };
    formatAddress(os.hostname(), false);
    Object.keys(os.networkInterfaces())
        .map((key) => os.networkInterfaces()[key])
        .forEach((info) => {
            info.forEach((iface) => {
                const ipv4 = iface.family === 'IPv4';
                const ipv6 = iface.family === 'IPv6';
                if (!ipv4 && !ipv6) {
                    return;
                }
                formatAddress(iface.address, ipv6);
            });
        });
    console.log('Listening on:', list.map(fixedEncodeURI).join(' '));
    if(callback!=null)callback();
}

if (process.platform === 'win32') {
    readline
        .createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        .on('SIGINT', () => {
            process.exit();
        });
}

process.on('SIGINT', () => {
    process.exit();
});

process.on('SIGTERM', () => {
    process.exit();
});
