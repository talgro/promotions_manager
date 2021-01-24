import {Promotion, PromotionsState} from "./types";
import {
    DeleteRecordActionData,
    GetInitialRecordsActionData,
    GetPartialRecordsActionData,
    PromotionActionsData,
    PromotionActionTypes
} from "./actions/types";

const initialState: PromotionsState = {
    test: "tal",
    promotionFields: [],
    promotions: [],
    isFetchingInitialRecords: false,
    isFetchingNextRecords: false,
    isFetchingPreviousRecords: false
}

const promotionsReducer = (state: PromotionsState = initialState, action: PromotionActionsData) => {
    switch (action.type) {
        case PromotionActionTypes.SET_FETCHING_INITIAL_RECORDS:
            return {
                ...state,
                isFetchingInitialRecords: true
            };

        case PromotionActionTypes.SET_FETCHING_NEXT_RECORDS:
            return {
                ...state,
                isFetchingNextRecords: true
            };

        case PromotionActionTypes.SET_FETCHING_PREVIOUS_RECORDS:
            return {
                ...state,
                isFetchingPreviousRecords: true
            };

        case PromotionActionTypes.FILL_DB_MOCK_DATA:
            return {
                ...state,
                promotions: [],
                isFetchingInitialRecords: false
            };

        case PromotionActionTypes.GET_INITIAL_PROMOTIONS:
            const getInitialRecordsPayload = (action as GetInitialRecordsActionData).payload;
            return {
                ...state,
                promotionFields: getInitialRecordsPayload.promotionFields,
                promotions: getInitialRecordsPayload.promotions,
                isFetchingInitialRecords: false
            };

        case PromotionActionTypes.GET_PARTIAL_PROMOTIONS:
            const getPartialRecordsPayload = (action as GetPartialRecordsActionData).payload;
            const existingRecordsSet = new Set(state.promotions.map(promotion => promotion.pid));
            const newRecordsFilteredExisting = getPartialRecordsPayload.newRecords.filter(record => !(existingRecordsSet.has(record.pid)));
            const fetchedPrevious = getPartialRecordsPayload.getPrevious;
            const finalRecordsSize = 50;
            const combinedPromotions = getPartialRecordsPayload.getPrevious ?
                [...newRecordsFilteredExisting, ...state.promotions] :
                [...state.promotions, ...newRecordsFilteredExisting];
            let finalPromotionsList: Promotion[];
            if (getPartialRecordsPayload.getPrevious) {
                finalPromotionsList = combinedPromotions.slice(0, finalRecordsSize);
            } else {
                const lastIndex = combinedPromotions.length - 1;
                const shouldSliceList = lastIndex > finalRecordsSize;
                finalPromotionsList = shouldSliceList ?
                    combinedPromotions.slice(lastIndex - finalRecordsSize, lastIndex + 1) :
                    combinedPromotions;
            }
            return {
                ...state,
                promotions: finalPromotionsList,
                isFetchingNextRecords: !fetchedPrevious ? false : state.isFetchingNextRecords,
                isFetchingPreviousRecords: fetchedPrevious ? false : state.isFetchingPreviousRecords
            };

        case PromotionActionTypes.DELETE_PROMOTION:
            const deletePromotionIdStr = (action as DeleteRecordActionData).payload.deletedPromotionId;
            const index = state.promotions.findIndex((p) => p.pid === deletePromotionIdStr);
            const updatedPromotions = [...state.promotions];
            updatedPromotions.splice(index, 1);

            return {
                ...state,
                promotions: updatedPromotions,
                isFetchingInitialRecords: false
            };

        default:
            return state;
    }
};

export default promotionsReducer;