import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config({path: '.env'})

function createSectetToken(id) {
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};

export default createSectetToken;

