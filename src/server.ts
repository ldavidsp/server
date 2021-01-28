
import express from 'express';
import http from 'http'
import socketIO from 'socket.io'

import * as socket from './sockets/sockets'

export class SocketServer {

    public static readonly PORT: number = 3000;

    private static _intance: SocketServer;

    private app: express.Application;

    private httpServer: http.Server;

    //encargada de eventos de los sockets
    public io: SocketIO.Server;
    private socketID: any;
    private socketMessage: string;
    public port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.sockets();
        this.listen();
    }

    public static get instance() {
        return this._intance || (this._intance = new this())
    }


    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || SocketServer.PORT;
        this.httpServer = new http.Server(this.app);
    }

    private sockets(): void {
        this.io = socketIO(this.httpServer);
    }

    private listen(): void {

        this.io.on('connection', cliente => {
        // this.io.on('connect', (cliente: any) => {
            this.socketID = cliente.id

            console.log('Connected client on socket id %s.', cliente.id);

            socket.conectarCliente(cliente, this.io);
            socket.desconectar(cliente, this.io);

            

        });
    }


    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }

    public getApp(): express.Application {
        return this.app;
    }
}