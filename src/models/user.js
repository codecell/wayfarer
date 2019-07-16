import pool from '../database/db';

const userModel = {
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
    return pool.query(
      'SELECT id, email, first_name, last_name, is_admin FROM users ORDER BY id ASC'
    );
  },

  /**
   * find a user by id
   * @param {Number} id
   */
  findUserById(id) {
    return pool.query(
      'SELECT id, is_admin, first_name, last_name, email FROM users WHERE id = $1',
      [id]
    );
  },

  /**
   * get a user by email
   * @param {String} email
   */
  getUserByEmail(email) {
    return pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
  }
};

export default userModel;
