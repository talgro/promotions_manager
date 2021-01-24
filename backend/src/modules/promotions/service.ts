import {IPromotion, Promotion} from "./models";

const getInitialPromotions = async (): Promise<IPromotion[]> => {
    const initialPromotionSize = 50;
    const initialPromotions: IPromotion[] =
        await Promotion
            .find({})
            .sort({pid: 1})
            .limit(initialPromotionSize);

    return initialPromotions;
};

const getPartialPromotions = async (fromRecordKey: number, getPrevious: boolean): Promise<IPromotion[]> => {
    const partialPromotionSize = 10;
    let partialPromotions: IPromotion[] = [];
    if (getPrevious) {
        partialPromotions = await Promotion
            .find({})
            .where('pid')
            .lt(fromRecordKey)
            .gte(fromRecordKey - partialPromotionSize)
            .limit(partialPromotionSize);
    } else {
        partialPromotions = await Promotion
            .find({})
            .where('pid')
            .gt(fromRecordKey)
            .limit(partialPromotionSize);
    }
    return partialPromotions;
};

export const fillDbWithMockData = async () => {
    try {
        await Promotion.deleteMany({});
        const newRecords: IPromotion[] = [];

        for (let i = 0; i < 10000; i++) {
            const randomPromotionName = `promotion-${Math.floor(Math.random() * 200)}`;
            const randomType = ["Basic", "Common", "Epic"][Math.floor(Math.random() * 3)];
            const randomStartDate = getRandomDate(new Date(2015, 1, 1), new Date());
            const randomEndDate = getRandomDate(randomStartDate, new Date());
            const randomUserGroupName = `promotion-${Math.floor(Math.random() * 200)}`;

            const newRecord = new Promotion({
                pid: i,
                name: randomPromotionName,
                type: randomType,
                startDate: randomStartDate,
                endDate: randomEndDate,
                userGroupName: randomUserGroupName
            });

            newRecords.push(newRecord);
        }

        await Promotion.insertMany(newRecords);
    } catch (e) {
    }
};

export const deletePromotion = async (pid: number) => {
    await Promotion
        .find({pid: pid})
        .remove();
};

const getRandomDate =
    (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export default {
    getInitialPromotions,
    getPartialPromotions,
    fillDbWithMockData,
    deletePromotion
}