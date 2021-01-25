"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePromotion = exports.fillDbWithMockData = void 0;
const Promotion_1 = require("./models/Promotion");
const INITIAL_PROMOTION_SIZE = 50;
const NOCK_DATA_SIZE = 10000;
const PARTIAL_PROMOTIONS_SIZE = 10;
const getInitialPromotions = async () => {
    // Fetch <INITIAL_PROMOTION_SIZE> first records
    try {
        const initialPromotions = await Promotion_1.Promotion
            .find({})
            .sort({ pid: 1 })
            .limit(INITIAL_PROMOTION_SIZE);
        return {
            fields: Object.keys(Promotion_1.promotionsSchema),
            records: initialPromotions
        };
    }
    catch (e) {
        // todo: handle error
        console.log("error in getInitialPromotions", e);
        return {
            fields: [],
            records: []
        };
    }
};
const getPartialPromotions = async (fromRecordKey, getPrevious) => {
    let partialPromotions = [];
    if (getPrevious) {
        partialPromotions = await Promotion_1.Promotion
            .find({})
            .where('pid')
            .lt(fromRecordKey)
            .gte(fromRecordKey - PARTIAL_PROMOTIONS_SIZE)
            .limit(PARTIAL_PROMOTIONS_SIZE);
    }
    else {
        partialPromotions = await Promotion_1.Promotion
            .find({})
            .where('pid')
            .gt(fromRecordKey)
            .limit(PARTIAL_PROMOTIONS_SIZE);
    }
    return partialPromotions;
};
const fillDbWithMockData = async () => {
    try {
        // Drop collection
        await Promotion_1.Promotion.deleteMany({});
        // Generate new Records
        const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const newRecords = [...Array(NOCK_DATA_SIZE).keys()].map(i => {
            const randomPromotionName = `promotion-${Math.floor(Math.random() * 200)}`;
            const randomType = ["Basic", "Common", "Epic"][Math.floor(Math.random() * 3)];
            const randomStartDate = getRandomDate(new Date(2015, 1, 1), new Date());
            const randomEndDate = getRandomDate(randomStartDate, new Date());
            const randomUserGroupName = `promotion-${Math.floor(Math.random() * 200)}`;
            return new Promotion_1.Promotion({
                pid: i,
                name: randomPromotionName,
                type: randomType,
                startDate: randomStartDate,
                endDate: randomEndDate,
                userGroupName: randomUserGroupName
            });
        });
        // Recreate collection with newly generated records
        await Promotion_1.Promotion.insertMany(newRecords);
    }
    catch (e) {
        // todo: handle error
        console.log("error in fillDbWithMockData", e);
    }
};
exports.fillDbWithMockData = fillDbWithMockData;
const deletePromotion = async (pid) => {
    await Promotion_1.Promotion
        .find({ pid: pid })
        .remove();
};
exports.deletePromotion = deletePromotion;
exports.default = {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData: exports.fillDbWithMockData,
    deletePromotion: exports.deletePromotion
};
