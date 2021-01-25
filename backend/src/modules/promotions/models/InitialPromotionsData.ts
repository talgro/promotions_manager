import {PromotionDto} from "./PromotionDto";

export default interface InitialPromotionsDataDto {
    fields: string[];
    records: PromotionDto[];
}