import {RequestHandler} from "express";
import InitialPromotionsDataDto from "./dtos/InitialPromotionsDataDto";
import PromotionDto from "./dtos/PromotionDto";
import service from "./service";
import InitialPromotionsData from "./models/InitialPromotionsData";

const getInitialPromotions: RequestHandler = async (req, res, next) => {
    const initialPromotionsData: InitialPromotionsData = await service.getInitialPromotions();

    const dto: InitialPromotionsDataDto = {
        fields: initialPromotionsData.fields,
        records: initialPromotionsData.records.map(record => record as any as PromotionDto)
    };

    res.status(200).json(dto);
};

const getPartialPromotions: RequestHandler = async (req, res, next) => {
    const fromRecordKey = Number(req.query.fromRecordKey)
    const getPrevious = (req.query.getPrevious === "true");

    const partialPromotions = await service.getPartialPromotions(fromRecordKey, getPrevious);
    const dtos = partialPromotions.map(promotion => promotion as any as PromotionDto);

    res.status(200).json(dtos);
}

const fillDbWithMockData: RequestHandler = async (req, res, next) => {
    await service.fillDbWithMockData();

    const initialPromotionsData: InitialPromotionsData = await service.getInitialPromotions();
    const dto: InitialPromotionsDataDto = {
        fields: initialPromotionsData.fields,
        records: initialPromotionsData.records.map(record => record as any as PromotionDto)
    };

    // Return 201 (as data created) with initial promotions
    res.status(201).json(dto);
};

const deletePromotion: RequestHandler = async (req, res, next) => {
    const pid: number = Number(req.params.pid);
    await service.deletePromotion(pid);
    res.status(200).json({
        deletedPid: pid
    });
};

export default {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData,
    deletePromotion
}