/* eslint-disable camelcase */
import UserModel from '../models/user';
import passwordHelper from '../helpers/passwordHelper';
import emailHelper from '../helpers/emailHelper';
import generateAuthToken from '../helpers/jwtHelper';

const Auth = {
  /**
   * signup a user
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} a new user
   */
  async postUser(req, res) {
    const hashedPassword = await passwordHelper.hashPassword(req.body.password);
    const { email, first_name, last_name } = req.body;
    const is_admin = false;
    
    try {
      const newUserprops = [
        email,
        first_name,
        last_name,
        hashedPassword,
        is_admin
      ];
      const { rows } = await UserModel.createUser(newUserprops);

      const token = await generateAuthToken(rows[0].id, rows[0].is_admin);

      return res.status(201).json({
        status: 'SUCCESS!',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          token,
          first_name: rows[0].first_name
        }
      });
    } catch (ex) {
      if (ex) { return res.status(500).send({ status: 'Error', error: ex.message }); }
    }
  },

  /**
   * login a user
   * @param {Object} req
   * @param {Object} res
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({
          status: 'Error',
          data: { message: 'Incomplete Login Credentials' }
        });
    }

    const validEmail = await emailHelper.isValidEmail(req.body.email);
    if (!validEmail) { 
      return res
        .status(400)
        .json({ status: 'Error', data: { message: 'Invalid Email' } }); 
    }

    try {
      const { rows } = await UserModel.getUserByEmail(req.body.email);
      if (!rows[0]) { 
        return res
          .status(401)
          .json({
            status: 'Error',
            data: { message: 'Incorrect Credentials' }
          });
      }

      const validPassword = await passwordHelper.comparePassword(
        req.body.password,
        rows[0].password
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ status: 'Error', data: { message: 'Invalid Password' } });
      }

      if (!rows[0].is_admin) {
        rows[0].is_admin = false;
      }

      const token = await generateAuthToken(rows[0].id, rows[0].is_admin);

      return res.status(200).json({
        status: 'Success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          token,
          first_name: rows[0].first_name
        }
      });
    } catch (ex) {
      if (ex) {
        return res
          .status(500)
          .json({ status: 'Error', data: { message: ex.message } });
      }
    }
  }
};

export default Auth;
