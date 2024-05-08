import {Schema, model} from 'mongoose';

export interface IUser {
    _id: string;
    username: string;
    password: string;
    balance: number;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 200 },
})

export const UserModel = model<IUser>('user', UserSchema);