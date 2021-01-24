export type Promotion = {
    pid: string,
    [k: string]: any
}

export interface PromotionsState {
    promotionFields: string[];
    promotions: Promotion[];
    test: string;
    isFetchingInitialRecords: boolean;
    isFetchingNextRecords: boolean;
    isFetchingPreviousRecords: boolean;
}