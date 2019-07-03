import Joi from 'joi';
import UserModel from './../models/user';
import passwordHelper from '../helpers/passwordHelper';

const Auth = {
    /**
   * signup a user
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} a new user
   */
  async postUser(req, res) {
    const hashedPassword = await passwordHelper.hashPassword(req.body.password);
    const { email, first_name, last_name, is_admin } = req.body;

    const { error } = validateUser(req.body);
    if(error) return res.status(401).send(error.details[0].message);

    try {
      const newUserprops = [email, first_name, last_name, hashedPassword, is_admin];
      const { rows } = await UserModel.createUser(newUserprops);

      delete rows[0].password;
      delete rows[0].is_admin;

      return res.status(201).json({ status: "SUCCESS!", data: { user: rows[0] } });
    } catch (ex) {
      if (ex) return res.status(500).send({ status: 500, error: ex.message });
    }
  },
}

function validateUser(user) {
    const schema = {
        email: Joi.string().min(2).max(255).email().required(),
        first_name: Joi.string().min(2).max(255).required(),
        last_name: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(2).max(255).required(),
        is_admin: Joi.boolean()
    };
  
    return Joi.validate(user, schema);
}

export default Auth;