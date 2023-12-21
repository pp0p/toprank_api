"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var db_1 = __importDefault(require("./config/db"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var index_1 = __importDefault(require("./Router/index"));
var cors_1 = __importDefault(require("cors"));
var config_1 = require("./config/config");
var app = (0, express_1.default)();
var port = config_1.config.port;
// connect to db
(0, db_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/public", express_1.default.static("public"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(config_1.config.corsOption));
app.use((0, cookie_parser_1.default)());
// router
// app.use(errorMiddleware);
app.use("/api", index_1.default);
app.use("*", function (req, res) {
    res.sendStatus(404);
});
app.listen(port, function () { return console.log("Server run on port: ".concat(port)); });
