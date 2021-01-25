"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const promotionsRouter = express_1.Router();
const basePath = '/promotions';
promotionsRouter.get('/', controller_1.default.getInitialPromotions);
promotionsRouter.get('/partial', controller_1.default.getPartialPromotions);
promotionsRouter.post('/fillMock', controller_1.default.fillDbWithMockData);
promotionsRouter.delete('/:pid', controller_1.default.deletePromotion);
exports.default = {
    router: promotionsRouter,
    path: basePath
};
