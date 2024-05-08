import {Router, Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../models/user";
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

export {router as userRouter};