import {Router, Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IUser, UserModel} from "../models/user";
import {UserErrors} from "../common/errors";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username});

        if (user) {
            return res.status(400).json({type: UserErrors.USERNAME_ALREADY_EXISTS})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({username, password: hashedPassword});
        await newUser.save();

        res.json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/login", async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try {
        const user: IUser = await UserModel.findOne({username});

        if (!user) {
            return res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({type: UserErrors.WRONG_CREDENTIALS})
        }

        const token = jwt.sign({id: user._id}, "secret")
        res.json({token, userId: user._id})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export {router as userRouter};