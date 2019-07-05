import { validate, validateBus } from '../middleware/validate';
import Bus from '../controllers/buses';

export default function busRoutes(app) {
  app.route('/api/v1/buses')
    .post([validate(validateBus)], Bus.postBus);
}
