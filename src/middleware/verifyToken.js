import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

require('dotenv').config();

/**
 * verify token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export default async function verifyToken(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(400)
      .json({ status: 'error', error: 'No token Provided' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const { rows } = await UserModel.findUserById(decoded.id);
    if (!rows[0]) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Invalid Token' });
    }

    req.body.token = token;
    req.body.user_id = decoded.id;
    req.body.is_admin = decoded.is_admin;


    next();
  } catch (ex) {
    if (ex) {
      return res
        .status(500)
        .json({ status: 'error', error: ex.message });
    }          
  }
}
