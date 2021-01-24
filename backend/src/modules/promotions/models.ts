import { model, Schema, Model, Document } from 'mongoose';

export const promotionsSchema = {
    pid: {type: Number, required: true},
    name: {type: String, required: false},
    type: {type: String, required: false},
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    userGroupName: {type: String, required: false}
}

export interface IPromotion extends Document {
    pid: number
    name: string,
    type: string,
    startDate: Date,
    endDate: Date,
    userGroupName: string
}

const mongoosePromotionsSchema: Schema = new Schema(promotionsSchema);

export const Promotion: Model<IPromotion> = model('Promotion', mongoosePromotionsSchema);
