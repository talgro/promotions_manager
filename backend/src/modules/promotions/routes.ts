import {Router} from "express";
import controller from "./controller";

const promotionsRouter = Router();

const basePath = '/promotions';

promotionsRouter.get('/', controller.getInitialPromotions);
promotionsRouter.get('/partial', controller.getPartialPromotions);
promotionsRouter.post('/fillMock', controller.fillDbWithMockData);
promotionsRouter.delete('/:pid', controller.deletePromotion);

export default {
    router: promotionsRouter,
    path: basePath
};