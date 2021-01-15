import { BaseClient } from './BaseClient';
import {BACKEND_SOCKET_PORT} from '../../GlobalConstants'

export abstract class ManagerClient<T> extends BaseClient<T> {
    public static ACTION = 'unknown';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    public static start(..._rest: any[]): void {
        throw Error('Not implemented');
    }

    protected ws?: WebSocket;

    protected constructor(protected readonly action?: string) {
        super();
    }

    public hasConnection(): boolean {
        return !!(this.ws && this.ws.readyState === this.ws.OPEN);
    }

    protected openNewWebSocket(): WebSocket {
        if (this.hasConnection()) {
            console.log('close soket');
            (this.ws as WebSocket).close();
        }
        this.ws = new WebSocket(this.buildWebSocketUrl());
        this.ws.onopen = this.onSocketOpen.bind(this);
        this.ws.onmessage = this.onSocketMessage.bind(this);
        this.ws.onclose = this.onSocketClose.bind(this);
        return this.ws;
    }

    protected buildWebSocketUrl(): string {
        const proto = location.protocol === 'https:' ? 'wss' : 'ws';
        const query = this.action ? `?action=${this.action}` : '';
        //console.log(`current ${proto}://${location.host}${query}`);
        //console.log(`${proto}://localhost:${FRONTEND_PORT}/${location.host}${query}`);
        console.log(`current ${proto}://localhost:${BACKEND_SOCKET_PORT}${query}`);
        return `${proto}://localhost:${BACKEND_SOCKET_PORT}${query}`;
    }

    protected abstract onSocketOpen(e: Event): void;
    protected abstract onSocketMessage(e: MessageEvent): void;
    protected abstract onSocketClose(e: CloseEvent): void;
}
