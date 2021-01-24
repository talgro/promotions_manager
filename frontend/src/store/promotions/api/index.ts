import {AxiosRequestConfig} from "axios";
import backendClient from "../../../api/backend";
import {InitialPromotionsDataDto, PromotionRecordDto} from "./dto";

const fillDbWithMockData = () =>
    new Promise<InitialPromotionsDataDto>(async (resolve, reject) => {
        try {
            const url = "promotions/fillMock";
            const res = await backendClient.post<InitialPromotionsDataDto>(url);
            resolve(res.data);
        } catch (e) {
            reject();
            // todo: display an error
        }
    });

const getInitialPromotions = () =>
    new Promise<InitialPromotionsDataDto>(async (resolve, reject) => {
        try {
            const url = `promotions/`;
            const res = await backendClient.get<InitialPromotionsDataDto>(url);
            resolve(res.data);
        } catch (e) {
            reject();
            // todo: display an error
        }
    });

const getPartialPromotions = (
    fromRecordKey: string,
    getPrevious: boolean
) =>
    new Promise<PromotionRecordDto[]>(async (resolve, reject) => {
        try {
            const url = `promotions/partial`;
            const requestConfig: AxiosRequestConfig = {
                params: {
                    fromRecordKey,
                    getPrevious
                }
            };

            const res = await backendClient.get<PromotionRecordDto[]>(url, requestConfig);
            resolve(res.data);
        } catch (e) {
            reject();
            // todo: display an error
        }
    });

const deletePromotion = (promotionId: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const url = `promotions/${promotionId}`;

            await backendClient.delete(url);
            resolve(true);
        } catch (e) {
            reject();
            // todo: display an error
        }
    });

const backendApi = {
    fillDbWithMockData,
    getInitialPromotions,
    getPartialPromotions,
    deletePromotion
}

export default backendApi;