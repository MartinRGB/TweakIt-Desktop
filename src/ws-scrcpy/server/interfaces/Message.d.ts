import { NetInterface } from './NetInterface';

export enum MessageType {
    'devicelist' = 'devicelist',
    'shell' = 'shell',
    'run-wda' = 'run-wda',
}

export interface Message {
    id: number;
    type: string;
    data: any;
}

export interface FinalMessage {
    id: number;
    type: string;
    data: any;
    clientMsg:ClientMessage;
}

export interface ClientMessage{
    ip:string;
    port:number;
    query:string;
    udid:string;
}
