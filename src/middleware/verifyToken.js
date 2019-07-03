import jwt from 'jsonwebtoken';
import  UserModel from '../models/user';

require('dotenv').config();

/**
 * verify token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export default async function verifyToken (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(400).json({ status: "Error", data: { message: "No token Provided"}});
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const { rows } =  await UserModel.findUserById(decoded.id);
        if(!rows[0]) {
            return res.status(400).json({ status: "Error", data: { message: 'Invalid Token'}});
        }

        req.user = { id: decoded.id, is_admin: decoded.is_admin };

        next();

    } catch(ex) {
        if(ex) return res.status(500).json({ status: "Error", data: { message: ex.message}});
    }
}
