import {Router, Request, Response } from 'express';
import {ProductModel} from "../models/product";
import {verifyToken} from "./user";
import {UserModel} from "../models/user";
import {UserErrors, ProductErrors} from "../common/errors";

const router = Router();

router.get('/', async (_, res: Response) => {
    try {
        const products = await ProductModel.find({})
        res.json({products})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.post('/checkout', verifyToken, async (req: Request, res: Response) => {
    const {customerID, cartItems} = req.body;
    try {
        const user = await UserModel.findById(customerID);
        const productIDs = Object.keys(cartItems);
        const products = await ProductModel.find({_id: {$in: productIDs}});

        if (!user) {
            return res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }

        if (products.length !== productIDs.length) {
            return res.status(400).json({type: ProductErrors.NO_PRODUCT_FOUND})
        }

        let subTotal = 0;
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item)

            if (!product) {
                return res.status(400).json({type: ProductErrors.NO_PRODUCT_FOUND})
            }

            if (product.stock < cartItems[item]) {
                return res.status(400).json({type: ProductErrors.NOT_ENOUGH_STOCK})
            }

            subTotal += product.price * cartItems[item];
        }

        if (user.balance < subTotal) {
            return res.status(400).json({type: ProductErrors.NO_AVAILABLE_MONEY})
        }

        user.balance -= subTotal
        user.purchasedItems.push(...productIDs)

        user.save()
        await ProductModel.updateMany({_id: {$in: productIDs}}, {$inc: {stock: -1}})

        res.json({purchasedItems: user.purchasedItems})

    } catch (err) {
        res.status(400).json({error: err})
    }
})

export {router as ProductRouter}