import {IPromotion, Promotion, promotionsSchema} from "./models/Promotion";
import InitialPromotionsData from "./models/InitialPromotionsData";

const INITIAL_PROMOTION_SIZE: number = 50;
const NOCK_DATA_SIZE: number = 10000;
const PARTIAL_PROMOTIONS_SIZE: number = 10;

const getInitialPromotions = async (): Promise<InitialPromotionsData> => {
    // Fetch <INITIAL_PROMOTION_SIZE> first records
    try {
        const initialPromotions: IPromotion[] =
            await Promotion
                .find({})
                .sort({pid: 1})
                .limit(INITIAL_PROMOTION_SIZE);
        return {
            fields: Object.keys(promotionsSchema),
            records: initialPromotions
        };
    } catch (e) {
        // todo: handle error
        console.log("error in getInitialPromotions", e);
        return {
            fields: [],
            records: []
        };
    }
};

const getPartialPromotions = async (fromRecordKey: number, getPrevious: boolean): Promise<IPromotion[]> => {
    let partialPromotions: IPromotion[] = [];
    if (getPrevious) {
        partialPromotions = await Promotion
            .find({})
            .where('pid')
            .lt(fromRecordKey)
            .gte(fromRecordKey - PARTIAL_PROMOTIONS_SIZE)
            .limit(PARTIAL_PROMOTIONS_SIZE);
    } else {
        partialPromotions = await Promotion
            .find({})
            .where('pid')
            .gt(fromRecordKey)
            .limit(PARTIAL_PROMOTIONS_SIZE);
    }
    return partialPromotions;
};

export const fillDbWithMockData = async (): Promise<void> => {
    try {
        // Drop collection
        await Promotion.deleteMany({});

        // Generate new Records
        const getRandomDate =
            (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        const newRecords: IPromotion[] = [...Array(NOCK_DATA_SIZE).keys()].map(i => {
            const randomPromotionName = `promotion-${Math.floor(Math.random() * 200)}`;
            const randomType = ["Basic", "Common", "Epic"][Math.floor(Math.random() * 3)];
            const randomStartDate = getRandomDate(new Date(2015, 1, 1), new Date());
            const randomEndDate = getRandomDate(randomStartDate, new Date());
            const randomUserGroupName = `promotion-${Math.floor(Math.random() * 200)}`;

            return new Promotion({
                pid: i,
                name: randomPromotionName,
                type: randomType,
                startDate: randomStartDate,
                endDate: randomEndDate,
                userGroupName: randomUserGroupName
            });
        });

        // Recreate collection with newly generated records
        await Promotion.insertMany(newRecords);
    } catch (e) {
        // todo: handle error
        console.log("error in fillDbWithMockData", e);
    }
};

export const deletePromotion = async (pid: number) => {
    await Promotion
        .find({pid: pid})
        .remove();
};

export default {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData,
    deletePromotion
}