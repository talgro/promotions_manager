import {AxiosRequestConfig, AxiosTransformer} from "axios";
import backendClient from "../../../api/backend";
import {InitialPromotionsDataDto, PromotionRecordDto} from "./dto";
import {parseDatesInNestedObject} from "../../../utils/axios-utils";

const fillDbWithMockData = () =>
    new Promise<InitialPromotionsDataDto>(async (resolve, reject) => {
        try {
            const url = "promotions/fillMock";
            const config: AxiosRequestConfig = {
                transformResponse:
                    (backendClient.defaults.transformResponse as AxiosTransformer[]).concat(parseDatesInNestedObject)
            };

            const res = await backendClient.post<InitialPromotionsDataDto>(url, config);
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
            const config: AxiosRequestConfig = {
                transformResponse:
                    (backendClient.defaults.transformResponse as AxiosTransformer[]).concat(parseDatesInNestedObject)
            };

            const res = await backendClient.get<InitialPromotionsDataDto>(url, config);
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
                },
                transformResponse:
                    (backendClient.defaults.transformResponse as AxiosTransformer[]).concat(parseDatesInNestedObject)
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
            const requestConfig: AxiosRequestConfig = {
                transformResponse:
                    (backendClient.defaults.transformResponse as AxiosTransformer[]).concat(parseDatesInNestedObject)
            };

            await backendClient.delete(url, requestConfig);
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