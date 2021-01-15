import { ReleasableService } from './ReleasableService';
import WebSocket from 'ws';
import { Util } from '../Util';
import { ClientMessage} from '../interfaces/Message';

export class ServiceWebsocketProxy extends ReleasableService {
    private remoteSocket?: WebSocket;
    private released = false;
    private storage: WebSocket.MessageEvent[] = [];

    public static createService(ws: WebSocket, udid: string, remote: string): ServiceWebsocketProxy {
        return new ServiceWebsocketProxy(ws, udid, remote);
    }

    constructor(ws: WebSocket, private readonly udid: string, private readonly remote: string) {
        super(ws);
    }

    public async init(callback?:()=>void): Promise<void> {
        const port = await Util.forward(this.udid, this.remote);
        const remoteSocket = new WebSocket(`ws://127.0.0.1:${port}`);

        remoteSocket.onopen = () => {
            console.log('proxy service on opened');
            if(callback !=null){
                callback()
            }
            this.remoteSocket = remoteSocket;
            this.flush();
        };
        remoteSocket.onmessage = (event) => {
            //console.log('proxy service on message');
            if (this.ws && this.ws.readyState === this.ws.OPEN) {
                this.ws.send(event.data);
            }
        };
        remoteSocket.onclose = (e) => {
            console.log('proxy service on closed');
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws.close(e.wasClean ? 1000 : 4010);
            }
        };
        remoteSocket.onerror = (e) => {
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws.close(4011, e.message);
            }
        };
    }

    private flush(): void {
        if (this.remoteSocket) {
            while (this.storage.length) {
                const event = this.storage.shift();
                if (event && event.data) {
                    this.remoteSocket.send(event.data);
                }
            }
            if (this.released) {
                this.remoteSocket.close();
            }
        }
        this.storage.length = 0;
    }

    protected onSocketMessage(event: WebSocket.MessageEvent): void {
        if (this.remoteSocket) {
            this.remoteSocket.send(event.data);
        } else {
            this.storage.push(event);
        }
    }

    public release() {
        super.release();
        this.released = true;
        this.flush();
    }
}
