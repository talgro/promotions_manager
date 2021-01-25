import {ThunkAction} from 'redux-thunk'
import {
    DeleteRecordActionData,
    FillDbMockDataActionData,
    GetInitialRecordsActionData,
    GetPartialRecordsActionData, PromotionActionTypes,
    SetFetchingInitialRecordsActionData, SetFetchingNextRecordsActionData, SetFetchingPreviousRecordsActionData
} from "./types";
import {Action} from "redux";
import {Promotion, PromotionsState} from "../types";
import backendApi from "../api";
import {InitialPromotionsDataDto} from "../api/dto";

type PromotionsThunk = ThunkAction<void, PromotionsState, unknown, Action<any>>

const setFetchingInitialRecords = (): SetFetchingInitialRecordsActionData => ({
    type: PromotionActionTypes.SET_FETCHING_INITIAL_RECORDS
});

const setFetchingNextRecords = (): SetFetchingNextRecordsActionData => ({
    type: PromotionActionTypes.SET_FETCHING_NEXT_RECORDS
});

const setFetchingPreviousRecords = (): SetFetchingPreviousRecordsActionData => ({
    type: PromotionActionTypes.SET_FETCHING_PREVIOUS_RECORDS
});

const fillDbWithMockData = (): PromotionsThunk =>
    async dispatch => {
        try {
            dispatch(setFetchingInitialRecords());

            const dto: InitialPromotionsDataDto = await backendApi.fillDbWithMockData();

            dispatch<FillDbMockDataActionData>({
                type: PromotionActionTypes.FILL_DB_MOCK_DATA,
                payload: {
                    promotionFields: dto.fields,
                    promotions: dto.records
                }
            });
        } catch (e) {
            // todo: add handler
        }
    };

const getInitialPromotions = (): PromotionsThunk =>
    async (dispatch) => {
        try {
            dispatch(setFetchingInitialRecords());

            const dto = await backendApi.getInitialPromotions();

            dispatch<GetInitialRecordsActionData>({
                type: PromotionActionTypes.GET_INITIAL_PROMOTIONS,
                payload: {
                    promotionFields: dto.fields,
                    promotions: dto.records
                }
            });
        } catch (e) {
            // todo: add handler
        }
    };

const getPartialPromotions = (
    fromRecordKey: string,
    getPrevious: boolean
): PromotionsThunk =>
    async (dispatch) => {
        try {
            dispatch(getPrevious ? setFetchingPreviousRecords() : setFetchingNextRecords());
            const dtos = await backendApi.getPartialPromotions(fromRecordKey, getPrevious);
            const newRecords: Promotion[] = dtos;
            dispatch<GetPartialRecordsActionData>({
                type: PromotionActionTypes.GET_PARTIAL_PROMOTIONS,
                payload: {
                    newRecords,
                    getPrevious
                }
            });
        } catch (e) {
            // todo: add handler
        }
    };

const deletePromotion = (promotionId: string): PromotionsThunk =>
    async (dispatch) => {
        try {
            await backendApi.deletePromotion(promotionId);
            dispatch<DeleteRecordActionData>({
                type: PromotionActionTypes.DELETE_PROMOTION,
                payload: {
                    deletedPromotionId: promotionId
                }
            });
        } catch (e) {
            // todo: add handler
            console.log("error in deletePromotion", e);
        }
    };

const promotionsActions = {
    fillDbWithMockData,
    getInitialPromotions,
    getPartialPromotions,
    deletePromotion
}

export default promotionsActions;