
import { FinalMessage} from '../../server/interfaces/Message';
export interface SocketEventListener {
    onSocketOpen:()=>void;
    onSocketClose:(e:CloseEvent)=>void;
    onSocketMessage:(e:FinalMessage)=>void;
}