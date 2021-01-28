import "reflect-metadata";
import {createConnection} from "typeorm";
import * as bodyParser from "body-parser";
import helmet from "helmet"
import  cors from "cors"
import routes from "./routes/";
import { SocketServer } from './server';

createConnection().then(async connection => {

    const server = SocketServer.instance;

    server.getApp().use(cors());
    server.getApp().use(helmet());
    server.getApp().use(bodyParser.json());
    server.getApp().use(bodyParser.urlencoded({extended: true}));
    server.getApp().use("/api", routes);
    server.start(()=> {
        console.log(`Servidor en puerto ${server.port}`);    
    });
    

}).catch(error => console.log(error));


