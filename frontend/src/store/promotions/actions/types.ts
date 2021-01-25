import {Promotion} from "../types";

export enum PromotionActionTypes {
    SET_FETCHING_INITIAL_RECORDS = 'SET_FETCHING_INITIAL_RECORDS',
    SET_FETCHING_NEXT_RECORDS = 'SET_FETCHING_NEXT_RECORDS',
    SET_FETCHING_PREVIOUS_RECORDS = 'SET_FETCHING_PREVIOUS_RECORDS',
    FILL_DB_MOCK_DATA = 'FILL_DB_MOCK_DATA',
    GET_INITIAL_PROMOTIONS = 'GET_INITIAL_PROMOTIONS',
    GET_PARTIAL_PROMOTIONS = 'GET_PARTIAL_PROMOTIONS',
    EDIT_PROMOTION = 'EDIT_PROMOTION',
    ADD_PROMOTION = 'ADD_PROMOTION',
    DELETE_PROMOTION = 'DELETE_PROMOTION'
}

export type SetFetchingInitialRecordsActionData = {
    type: PromotionActionTypes.SET_FETCHING_INITIAL_RECORDS
}

export type SetFetchingNextRecordsActionData = {
    type: PromotionActionTypes.SET_FETCHING_NEXT_RECORDS
}

export type SetFetchingPreviousRecordsActionData = {
    type: PromotionActionTypes.SET_FETCHING_PREVIOUS_RECORDS
}

export type FillDbMockDataActionData = {
    type: PromotionActionTypes.FILL_DB_MOCK_DATA,
    payload: {
        promotionFields: string[],
        promotions: Promotion[]
    }
}

export type GetInitialRecordsActionData = {
    type: PromotionActionTypes.GET_INITIAL_PROMOTIONS,
    payload: {
        promotionFields: string[],
        promotions: Promotion[]
    }
}

export type GetPartialRecordsActionData = {
    type: PromotionActionTypes.GET_PARTIAL_PROMOTIONS,
    payload: {
        newRecords: Promotion[],
        getPrevious: boolean
    }
}

export type DeleteRecordActionData = {
    type: PromotionActionTypes.DELETE_PROMOTION,
    payload: {
        deletedPromotionId: string
    }
}

export type PromotionActionsData =
    SetFetchingInitialRecordsActionData
    | SetFetchingNextRecordsActionData
    | SetFetchingPreviousRecordsActionData
    | FillDbMockDataActionData
    | GetInitialRecordsActionData
    | GetPartialRecordsActionData
    | DeleteRecordActionData;