"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./modules/promotions/routes"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(body_parser_1.json());
// CORS
app.use(cors_1.default());
// Cache-control
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
// Routers
app.use(routes_1.default.path, routes_1.default.router);
// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
db_1.default().then(() => {
    app.listen(3001);
});
