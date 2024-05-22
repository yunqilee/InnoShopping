import {Schema, model, SchemaType} from 'mongoose';

export interface IUser {
    _id: string;
    username: string;
    password: string;
    balance: number;
    purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 200 },
    purchasedItems: [
        {type: Schema.Types.ObjectId, ref: 'product', default: []},
    ]
})

export const UserModel = model<IUser>('user', UserSchema);