"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePromotion = exports.fillDbWithMockData = void 0;
const models_1 = require("./models");
const getInitialPromotions = async () => {
    const initialPromotionSize = 50;
    const initialPromotions = await models_1.Promotion
        .find({})
        .sort({ pid: 1 })
        .limit(initialPromotionSize);
    return initialPromotions;
};
const getPartialPromotions = async (fromRecordKey, getPrevious) => {
    const partialPromotionSize = 10;
    let partialPromotions = [];
    if (getPrevious) {
        partialPromotions = await models_1.Promotion
            .find({})
            .where('pid')
            .lt(fromRecordKey)
            .gte(fromRecordKey - partialPromotionSize)
            .limit(partialPromotionSize);
    }
    else {
        partialPromotions = await models_1.Promotion
            .find({})
            .where('pid')
            .gt(fromRecordKey)
            .limit(partialPromotionSize);
    }
    return partialPromotions;
};
const fillDbWithMockData = async () => {
    try {
        await models_1.Promotion.deleteMany({});
        const newRecords = [];
        for (let i = 0; i < 10000; i++) {
            const randomPromotionName = `promotion-${Math.floor(Math.random() * 200)}`;
            const randomType = ["Basic", "Common", "Epic"][Math.floor(Math.random() * 3)];
            const randomStartDate = getRandomDate(new Date(2015, 1, 1), new Date());
            const randomEndDate = getRandomDate(randomStartDate, new Date());
            const randomUserGroupName = `promotion-${Math.floor(Math.random() * 200)}`;
            const newRecord = new models_1.Promotion({
                pid: i,
                name: randomPromotionName,
                type: randomType,
                startDate: randomStartDate,
                endDate: randomEndDate,
                userGroupName: randomUserGroupName
            });
            newRecords.push(newRecord);
        }
        await models_1.Promotion.insertMany(newRecords);
    }
    catch (e) {
    }
};
exports.fillDbWithMockData = fillDbWithMockData;
const deletePromotion = async (pid) => {
    await models_1.Promotion
        .find({ pid: pid })
        .remove();
};
exports.deletePromotion = deletePromotion;
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
exports.default = {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData: exports.fillDbWithMockData,
    deletePromotion: exports.deletePromotion
};
