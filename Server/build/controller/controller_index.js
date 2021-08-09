"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
var multer_1 = __importDefault(require("multer"));
var posix_1 = __importDefault(require("path/posix"));
var diskstorage = multer_1.default.diskStorage({
    destination: posix_1.default.join(__dirname, '../images'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '--' + file.originalname);
    }
});
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        res.json('App de imagenes');
    };
    return IndexController;
}());
exports.indexController = new IndexController();
