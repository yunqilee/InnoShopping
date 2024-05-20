import {Schema, model} from 'mongoose'

export interface Iproduct {
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    stock: number;
}

const ProductSchema = new Schema<Iproduct>({
    title: { type: String, required: true },
    price: { type: Number, required: true, min: [0.99, "Price should be above 0.99"] },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, min: [0, "Stock can't be lower than 0"] },
})

export const ProductModel = model<Iproduct>('product', ProductSchema)