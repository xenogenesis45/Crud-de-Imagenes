"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var index_routes_1 = require("./routes/index_routes");
var mysql_1 = __importDefault(require("mysql"));
var mycoon = require('express-myconnection');
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.router();
        this.start();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 8000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(mycoon(mysql_1.default, {
            host: 'localhost',
            port: '',
            user: 'root',
            password: '',
            database: 'images'
        }));
    };
    Server.prototype.router = function () {
        this.app.use('/', index_routes_1.indexRoute.router);
    };
    Server.prototype.start = function () {
        this.app.listen(this.app.get('port'), function () {
            console.log('Puerto', 'http://localhost:8000');
        });
    };
    return Server;
}());
var server = new Server();
