"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promotion = exports.promotionsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.promotionsSchema = {
    pid: { type: Number, required: true },
    name: { type: String, required: false },
    type: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    userGroupName: { type: String, required: false }
};
const mongoosePromotionsSchema = new mongoose_1.Schema(exports.promotionsSchema);
exports.Promotion = mongoose_1.model('Promotion', mongoosePromotionsSchema);
