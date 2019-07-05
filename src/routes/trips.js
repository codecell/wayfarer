import { validate, validateTrip } from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';
import admin from '../middleware/admin';
import Trip from '../controllers/trips';

export default function tripRoutes(app) {
  app.route('/api/v1/trips')
    .post([verifyToken, admin, validate(validateTrip)], Trip.postTrip)
    .get([verifyToken], Trip.getTrips);
}
