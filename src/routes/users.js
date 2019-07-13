import verifyToken from '../middleware/verifyToken';
import admin from '../middleware/admin';
import User from '../controllers/users';

export default function (app) {
  app.route('/api/v1/users')
    .get([verifyToken, admin], User.getUsers);

  app.route('/api/v1/users/:id')
    .get([verifyToken, admin], User.getUserById);    
}
