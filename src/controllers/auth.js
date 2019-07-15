/* eslint-disable camelcase */
import userModel from '../models/user';
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
    req.body.is_admin = false;
    
    try {
      const signupValues = [
        email,
        first_name,
        last_name,
        hashedPassword,
        req.body.is_admin
      ];
      const { rows } = await userModel.createUser(signupValues);

      const token = await generateAuthToken(rows[0].id, rows[0].is_admin);

      return res.status(201).json({
        status: 'success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          token,
          first_name: rows[0].first_name,
          message: 'Signed up successfully'
        }
      });
    } catch (ex) {
      if (ex) { return res.status(500).send({ status: 'error', error: ex.message }); }
    }
  },

  /**
   * login a user
   * @param {Object} req
   * @param {Object} res
   */
  async signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({
          status: 'error',
          error: 'Incomplete Login Credentials'
        });
    }

    const validEmail = await emailHelper.isValidEmail(req.body.email);
    if (!validEmail) { 
      return res
        .status(400)
        .json({ status: 'error', error: 'invalid email' }); 
    }

    try {
      const { rows } = await userModel.getUserByEmail(req.body.email);
      if (!rows[0]) { 
        return res
          .status(401)
          .json({
            status: 'error',
            error: 'Incorrect Credentials'
          });
      }

      const validPassword = await passwordHelper.comparePassword(
        req.body.password,
        rows[0].password
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ status: 'error', error: 'Invalid Password' });
      }

      if (!rows[0].is_admin) {
        rows[0].is_admin = false;
      }

      const token = await generateAuthToken(rows[0].id, rows[0].is_admin);

      return res.status(200).json({
        status: 'success',
        data: {
          user_id: rows[0].id,
          is_admin: rows[0].is_admin,
          token,
          first_name: rows[0].first_name,
          message: 'Signed in successfully'
        }
      });
    } catch (ex) {
      if (ex) {
        return res
          .status(500)
          .json({ status: 'error', error: ex.message });
      }
    }
  }
};

export default Auth;
