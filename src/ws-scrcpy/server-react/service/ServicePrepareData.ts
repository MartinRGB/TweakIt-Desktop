import WebSocket from 'ws';
import { ServerDeviceConnection } from '../device-info/ServerDeviceConnection';
import { ReleasableService } from '../../server/service/ReleasableService';
import { ClientMessage,Message,FinalMessage } from '../../server/interfaces/Message';
import DroidDeviceDescriptor from '../../server/interfaces/DroidDeviceDescriptor';

enum Command {
    KILL_SERVER = 'kill_server',
    START_SERVER = 'start_server',
}

export class ServicePrepareData extends ReleasableService {
    private sdc: ServerDeviceConnection = ServerDeviceConnection.getInstance();

    constructor(ws: WebSocket,msg:ClientMessage) {
        super(ws);
        this.sdc
        .init()
        .then(() => {
            //this.sdc.addListener(ServerDeviceConnection.UPDATE_EVENT, this.buildAndSendSDCMessage);
            this.buildAndSendSDCMessage(this.sdc.getDevices(),msg);
        })
        .catch((e: Error) => {
            console.error(`Error: ${e.message}`);
        });
    }

    public static createService(ws: WebSocket,msg:ClientMessage): ReleasableService {
        return new ServicePrepareData(ws,msg);
    }

    private buildAndSendSDCMessage = (list: DroidDeviceDescriptor[],message:ClientMessage): void => {
        const msg: FinalMessage = {
            id: -1,
            type: 'devicelist',
            data: list,
            clientMsg:message,
        };
        this.sendClientMessage(msg);
    };


    protected onSocketMessage(event: WebSocket.MessageEvent): void {
        let data;
        try {
            data = JSON.parse(event.data.toString());
            console.log(data)
        } catch (e) {
            console.log(`Received message: ${event.data}`);
            return;
        }
        if (!data || !data.command) {
            console.log(`Received message: ${event.data}`);
            return;
        }

        const command = data.command;
        switch (command) {
            case Command.KILL_SERVER: {
                const { udid, pid } = data;
                if (typeof udid === 'string' && udid && typeof pid === 'number' && pid > 0) {
                    this.sdc.killServer(udid, pid).catch((e) => {
                        const { message } = e;
                        console.error(`Command: "${command}", error: ${message}`);
                        this.ws.send({ command, error: message });
                    });
                } else {
                    console.error(`Incorrect parameters for ${data.command} command: udid:"${udid}"`);
                }
                break;
            }
            case Command.START_SERVER: {
                const { udid } = data;
                if (typeof udid === 'string' && udid) {
                    this.sdc.startServer(udid).catch((e) => {
                        const { message } = e;
                        console.error(`Command: "${command}", error: ${message}`);
                        this.ws.send({ command, error: message });
                    });
                } else {
                    console.error(`Incorrect parameters for ${data.command} command: udid:"${udid}"`);
                }
                break;
            }
            default:
                console.warn(`Unsupported command: "${data.command}"`);
        }
    }

    public release(): void {
        super.release();
    }
}