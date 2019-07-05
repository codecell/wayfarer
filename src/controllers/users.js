import userModel from '../models/user';

const User = {
  
  /**
   * request all users in db
   * @param {Objest} req
   * @param {Object} res
   * @returns{Array} all users
   */

  async getUsers(req, res) {
    try {
      const { rows } = await userModel.getAllUsers();
      return res.status(200).json({ status: 'Success', data: { users: rows } });
    } catch (ex) {
      if (ex) {
        return res.status(500).json({ status: 'Error', error: ex.message });
      }
    }
  },

  /**
   * request a user by id
   * @param {*} req 
   * @param {*} res 
   */
  async getUserById(req, res) {
    try {
      const { rows } = await userModel.findUserById(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({ status: 'Error', data: { message: 'User With Given ID Not Found' } });
      }
  
      return res.status(200).json({
        status: 'Success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          first_name: rows[0].first_name
        }
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'Error', data: { message: ex.message } });
    }
  }
};

export default User;
