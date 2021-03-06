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
    const {
      email, first_name, last_name, is_admin 
    } = req.body;    
    
    try {
      const signupValues = [
        email,
        first_name,
        last_name,
        hashedPassword,
        is_admin
      ];
      const { rows } = await userModel.createUser(signupValues);
      const user = rows[0];

      const token = await generateAuthToken(user.id, user.is_admin);

      return res.status(201).json({
        status: 'success',
        data: {
          user_id: user.id,
          is_admin: user.is_admin,
          token,
          first_name: user.first_name,
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
      const user = rows[0];
      if (!user) { 
        return res
          .status(401)
          .json({
            status: 'error',
            error: 'Incorrect Credentials'
          });
      }

      const validPassword = await passwordHelper.comparePassword(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ status: 'error', error: 'Invalid Password' });
      }

      if (!user.is_admin) {
        user.is_admin = false;
      }

      const token = await generateAuthToken(user.id, user.is_admin);

      return res.status(200).json({
        status: 'success',
        data: {
          user_id: user.id,
          is_admin: user.is_admin,
          token,
          first_name: user.first_name,
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
