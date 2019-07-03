import jwt from 'jsonwebtoken';

require('dotenv').config();

/**
 * generate an auth token
 * @param {Number} id 
 * @param {Boolean} is_admin 
 */
export default function generateAuthToken (id, is_admin) {
    const token = jwt.sign(
        {id, is_admin}, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d'}
    );
    return token;
}