"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const getInitialPromotions = async (req, res, next) => {
    const initialPromotionsData = await service_1.default.getInitialPromotions();
    const dto = {
        fields: initialPromotionsData.fields,
        records: initialPromotionsData.records.map(record => record)
    };
    res.status(200).json(dto);
};
const getPartialPromotions = async (req, res, next) => {
    const fromRecordKey = Number(req.query.fromRecordKey);
    const getPrevious = (req.query.getPrevious === "true");
    const partialPromotions = await service_1.default.getPartialPromotions(fromRecordKey, getPrevious);
    const dtos = partialPromotions.map(promotion => promotion);
    res.status(200).json(dtos);
};
const fillDbWithMockData = async (req, res, next) => {
    await service_1.default.fillDbWithMockData();
    const initialPromotionsData = await service_1.default.getInitialPromotions();
    const dto = {
        fields: initialPromotionsData.fields,
        records: initialPromotionsData.records.map(record => record)
    };
    // Return 201 (as data created) with initial promotions
    res.status(201).json(dto);
};
const deletePromotion = async (req, res, next) => {
    const pid = Number(req.params.pid);
    await service_1.default.deletePromotion(pid);
    res.status(200).json({
        deletedPid: pid
    });
};
exports.default = {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData,
    deletePromotion
};
