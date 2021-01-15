import { ManagerClient } from '../../frontend/client/ManagerClient';
import { FinalMessage} from '../../server/interfaces/Message';
import { ACTION } from '../../GlobalConstants';
import {SocketEventListener} from '../../frontend/interfaces/SocketEventListener'

export class PrepareDataClientReact extends ManagerClient<null>{

    private static mSocketEventListener:SocketEventListener;

    public static ACTION = ACTION.FROM_CLIENT;

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
            console.log(message);
            if( PrepareDataClientReact.mSocketEventListener ){
                PrepareDataClientReact.mSocketEventListener.onSocketMessage(message);
            }
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
