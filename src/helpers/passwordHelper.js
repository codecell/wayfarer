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
    },

    /**
     * compare password
     * @param {String} password
     * @param {String} hashedPassword
     * @returns {Boolean}
     */

    comparePassword (password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);         
    }
}


export default passwordHelper;