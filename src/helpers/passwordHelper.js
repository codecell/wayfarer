import bcrypt from 'bcrypt';

const passwordHelper = {
    /**
     * hash a password
     * @param {String} password 
     * @returns{String} hashed password
     */

    hashPassword(password) {
        const salt = bcrypt.genSaltSync(12);
        return bcrypt.hashSync(password, salt);
    }
}


export default passwordHelper;