import Joi from 'joi';
import Auth from '../controllers/auth';
import validate from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(2)
      .max(255)
      .email()
      .required(),
    first_name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    last_name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    password: Joi.string()
      .min(2)
      .max(255)
      .required(),
    is_admin: Joi.boolean()
  };
    
  return Joi.validate(user, schema);
}


export default function (app) {
  app.route('/api/v1/auth/signup')
    .post([validate(validateUser)], Auth.postUser);
        
  app.route('/api/v1/auth/signin')
    .post([verifyToken], Auth.login);
}
