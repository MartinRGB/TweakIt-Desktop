import { Message,ClientMessage,FinalMessage} from './interfaces/Message';
import WebSocket from 'ws';

export abstract class ReleasableService {
    private message:ClientMessage;
    protected constructor(protected readonly ws: WebSocket,msg:ClientMessage) {
        this.ws.onmessage = this.onSocketMessage.bind(this);
        this.ws.onclose = this.onSocketClose.bind(this);
        this.message = msg;
    }

    protected abstract onSocketMessage(event: WebSocket.MessageEvent): void;

    protected sendMessage = (data: FinalMessage): void => {
        if (this.ws.readyState !== this.ws.OPEN) {
            return;
        }
        var newData:FinalMessage;
        if(data.clientMsg === undefined){
            newData = {
                id: data.id,
                type: data.type,
                data: data.data,
                clientMsg:this.message,
            };
        }
        else{
            newData = data;
        }
        console.log(data);
        this.ws.send(JSON.stringify(newData)); //data
    };

    protected onSocketClose(): void {
        this.release();
    }

    public release(): void {
        delete this.ws.onmessage;
        this.ws.close();
    }
}
