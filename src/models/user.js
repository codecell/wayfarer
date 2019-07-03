import pool from '../database/db';

const UserModel = {
    /**
     * save a user to db
     * @param {Array} userProps 
     */

    createUser(userProps) {
        return pool.query(
            `INSERT INTO users(email, first_name, last_name, password, is_admin) 
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
            userProps
        );
    },

    /**
     * get all users in db
     */
    getAllUsers() {
        return pool.query('SELECT * FROM users ORDER BY id ASC');
    }
}

export default UserModel;