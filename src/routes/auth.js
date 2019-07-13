/* eslint-disable import/named */
import Auth from '../controllers/auth';
import { validate, validateUser } from '../middleware/validate';

export default function (app) {
  app.route('/api/v1/auth/signup')
    .post([validate(validateUser)], Auth.postUser);
        
  app.route('/api/v1/auth/signin')
    .post(Auth.signin);
}
