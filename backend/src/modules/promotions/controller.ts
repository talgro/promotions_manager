import {RequestHandler} from "express";
import {InitialPromotionsDataDto, PromotionRecordDto} from "./dtos";
import service from "./service";
import {IPromotion, promotionsSchema} from "./models";

const getInitialPromotions: RequestHandler = async (req, res, next) => {
    const initialPromotions: IPromotion[] = await service.getInitialPromotions();

    const dto: InitialPromotionsDataDto = {
        fields: Object.keys(promotionsSchema),
        records: initialPromotions.map(promotion => promotion as any as PromotionRecordDto)
    };

    res.status(200).json(dto);
};

const getPartialPromotions: RequestHandler = async (req, res, next) => {
    const fromRecordKey = Number(req.query.fromRecordKey)
    const getPrevious = (req.query.getPrevious === "true");

    const partialPromotions = await service.getPartialPromotions(fromRecordKey, getPrevious);
    const dtos = partialPromotions.map(promotion => promotion as any as PromotionRecordDto);

    res.status(200).json(dtos);
}

const fillDbWithMockData: RequestHandler = async (req, res, next) => {
    await service.fillDbWithMockData();
    res.status(200);
};

const deletePromotion: RequestHandler = async (req, res, next) => {
    const pid: number = Number(req.params.pid);
    await service.deletePromotion(pid);
    res.status(200);
};

export default {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData,
    deletePromotion
}