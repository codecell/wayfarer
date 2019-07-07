import { validate, validateBus } from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';
import admin from '../middleware/admin';
import Bus from '../controllers/buses';

export default function busRoutes(app) {
  app.route('/api/v1/buses')
    .post([validate(validateBus), verifyToken, admin], Bus.postBus);
}
