import {Router, Request, Response, NextFunction} from "express";
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
        res.json({token, userID: user._id})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        jwt.verify(authorization, "secret", (err) => {
            if (err) return res.sendStatus(403).json({error: "Unauthorized"})

            next();
        })
    }

    res.status(401).json({error: authorization})
}

export {router as userRouter};