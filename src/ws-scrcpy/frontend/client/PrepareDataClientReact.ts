import { ManagerClient } from './ManagerClient';
import { Message,ClientMessage,FinalMessage} from '../../server/interfaces/Message';
import { ACTION } from '../../server/Constants';
import {ScrcpyClient} from './ScrcpyClient'
import {ScrcpyStreamParams} from '../interfaces/ScrcpyStreamParams'
import {SocketEventListener} from '../interfaces/SocketEventListener'

export class PrepareDataClientReact extends ManagerClient<null>{


    //public static ACTION = ACTION.FROM_CLIENT;
    private static mSocketEventListener:SocketEventListener;

    public static ACTION = ACTION.DEVICE_LIST;

    public static start(): PrepareDataClientReact {
        return new PrepareDataClientReact(this.ACTION);
    }

    protected constructor(action:string){
        super(action);
        this.openNewWebSocket();
    }

    protected onSocketOpen(): void {
        if( PrepareDataClientReact.mSocketEventListener ){
            PrepareDataClientReact.mSocketEventListener.onSocketOpen();
        }
    }

    protected onSocketClose(e: CloseEvent): void {
        console.log(`Connection closed: ${e.reason}`);
        setTimeout(() => {
            this.openNewWebSocket();
        }, 2000);
        if( PrepareDataClientReact.mSocketEventListener ){
            PrepareDataClientReact.mSocketEventListener.onSocketClose(e);
        }
    }

    protected onSocketMessage(e: MessageEvent): void {
        let message: FinalMessage;
        try {
            message = JSON.parse(e.data);
            //console.log(message);
            
            // const paraObj = {
            //     action: 'stream',
            //     decoder: 'mse',
            //     ip: `${message.clientMsg.ip}`,
            //     port: `${message.clientMsg.port}`,
            //     query: `${message.clientMsg.query}`,
            //     udid: `${message.clientMsg.udid}`,
            // };

            if( PrepareDataClientReact.mSocketEventListener ){
                PrepareDataClientReact.mSocketEventListener.onSocketMessage(message);
            }
            //new ScrcpyClient(paraObj as ScrcpyStreamParams);
            //this.onGetStreamParams(paraObj as ScrcpyStreamParams)
        } catch (error) {
            console.error(error.message);
            console.log(e.data);
            return;
        }
    }

    public static setSocketEventListener(listener: SocketEventListener): void{
        PrepareDataClientReact.mSocketEventListener = listener;
    };
}
