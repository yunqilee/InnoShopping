import {Router, Request, Response } from 'express';
import {ProductModel} from "../models/product";

const router = Router();

router.get('/', async (_, res: Response) => {
    try {
        const products = await ProductModel.find({})
        res.json(products)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

export {router as ProductRouter}