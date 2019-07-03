import Joi from 'joi';

import UserModel from "../models/user";

const User = {
  
  /**
   * request all users in db
   * @param {Objest} req
   * @param {Object} res
   * @returns{Array} all users
   */

  async getUsers(req, res) {
    try {
      const { rows } = await UserModel.getAllUsers();
      return res.status(200).json({ status: "Success", data: { users: rows } });
    } catch (ex) {
      if (ex)
        return res.status(500).json({ status: "Error", error: ex.message });
    }
  }
};



export default User;
