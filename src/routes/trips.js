/* eslint-disable import/named */
import { validate, validateTrip } from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';
import admin from '../middleware/admin';
import Trip from '../controllers/trips';

export default function tripRoutes(app) {
  app.route('/api/v1/trips')
    .post([verifyToken, admin], Trip.postTrip)
    .get([verifyToken], Trip.getTrips);

  app.route('/api/v1/trips/:tripId')
    .get([verifyToken], Trip.getTripById)
    .patch([verifyToken, admin], Trip.cancelTrip)
    .delete([verifyToken, admin], Trip.deleteTrip); 
}
