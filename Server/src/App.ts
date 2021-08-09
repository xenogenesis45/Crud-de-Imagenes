import express, { Application, Router } from "express";
import cors from "cors";
import morgan from 'morgan';
import { indexRoute } from "./routes/index_routes";

import mysql from 'mysql'
import path from "path/posix";
const mycoon = require('express-myconnection')

class Server {

    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.router();
        this.start();
    }

    config(): void {

        this.app.set('port', process.env.PORT || 5000)
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        this.app.use(express.static(path.join(__dirname,'../dbImages')))
        
        // this.app.use(mycoon(mysql, {
        //     host: 'localhost',
        //     user: 'root',
        //     password: '',
        //     database: 'images'
        // }))
    }

    router(): void {
        this.app.use('/', indexRoute.router);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Puerto', 'http://localhost:5000')
        })
    }

}
const server = new Server();