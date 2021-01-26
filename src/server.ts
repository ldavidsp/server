import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model';
import { GameController } from './controllers/GameController';

import * as socket from './sockets/sockets'

export class SocketServer {

    public static readonly PORT:number = 3000;

    private server: Server;

    private app: express.Application;

    //encargada de eventos de los sockets
    private io: SocketIO.Server;
    private socketID: any;
    private socketMessage: string;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || SocketServer.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }


    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            this.socketID = socket.id
            let game = new GameController(socket, this.io);
            //let jaula = new JaulaController(socket, this.socketID)

            this.io.emit('test', {msn: "from sockets"})
            

            console.log('Connected client on socket id %s.', socket.id);
            socket.on("Start Game", (m: Message) => {
                game.start();
                 console.log("Client wants to play game");
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}