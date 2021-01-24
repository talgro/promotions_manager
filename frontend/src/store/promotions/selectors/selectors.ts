import {Promotion} from "../types";
import {RootState} from "../../rootReducer";

const getPromotions = (state: RootState): Promotion[] => state.promotionsReducer.promotions;
const getPromotionFields = (state: RootState) => state.promotionsReducer.promotionFields;
const isFetchingInitialRecords = (state: RootState): boolean => state.promotionsReducer.isFetchingInitialRecords;
const isFetchingNextRecords = (state: RootState): boolean => state.promotionsReducer.isFetchingNextRecords;
const isFetchingPreviousRecords = (state: RootState): boolean => state.promotionsReducer.isFetchingPreviousRecords;

const promotionsSelectors = {
    getPromotions,
    getPromotionFields,
    isFetchingInitialRecords,
    isFetchingNextRecords,
    isFetchingPreviousRecords
}

export default promotionsSelectors;