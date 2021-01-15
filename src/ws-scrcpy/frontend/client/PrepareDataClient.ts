import { ManagerClient } from './ManagerClient';
import { Message,ClientMessage,FinalMessage} from '../../server/interfaces/Message';
import { ACTION } from '../../GlobalConstants';
import {ScrcpyClient} from './ScrcpyClient'
import {ScrcpyStreamParams} from '../interfaces/ScrcpyStreamParams'

export class PrepareDataClient extends ManagerClient<null>{


    public static ACTION = ACTION.FROM_CLIENT;

    public static start(): PrepareDataClient {
        return new PrepareDataClient(this.ACTION);
    }

    protected constructor(action:string){
        super(action);
        this.openNewWebSocket();
    }

    protected onSocketOpen(): void {
    }

    protected onSocketClose(e: CloseEvent): void {
        console.log(`Connection closed: ${e.reason}`);
        setTimeout(() => {
            this.openNewWebSocket();
        }, 2000);
    }

    protected onSocketMessage(e: MessageEvent): void {
        let message: FinalMessage;
        try {
            message = JSON.parse(e.data);
            //console.log(message);
            const paraObj = {
                action: 'stream',
                decoder: 'mse',
                ip: `${message.clientMsg.ip}`,
                port: `${message.clientMsg.port}`,
                query: `${message.clientMsg.query}`,
                udid: `${message.clientMsg.udid}`,
            };

            new ScrcpyClient(paraObj as ScrcpyStreamParams);
        } catch (error) {
            console.error(error.message);
            console.log(e.data);
            return;
        }
    }

}
