import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

function userVerification(req, res) {
    const token = req.cookies.token;
    if (!token)
    {
        return res.json({status: false});
    }

    jwt.verify(token, process.env.TOKEN_KEY ,async (err, data) => {
        if (err)
        {
            return res.json({status: false});
        } else {
            const user = await User.findById(data.id);
            if (user)
            {
                return res.json({status: true, user: user.username});
            } else {
                return res.json({status: false});
            }
        }
    })
}

export default userVerification;