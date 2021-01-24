export type PromotionRecordDto = {
    pid: string,
    [k: string]: any
}

export interface InitialPromotionsDataDto {
    fields: string[];
    records: PromotionRecordDto[];
}