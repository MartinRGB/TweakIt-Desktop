import { ParsedUrlQueryInput } from 'querystring';

export interface ScrcpyStreamParams extends ParsedUrlQueryInput {
    action: 'stream';
    udid: string;
    decoder: 'mse';
    ip: string;
    port: string;
    query: string;
}
