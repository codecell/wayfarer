import verifyToken from '../middleware/verifyToken';
import { validate, validateBooking } from '../middleware/validate';
import admin from '../middleware/admin';
import Booking from '../controllers/bookings';

export default function bookingRoutes(app) {
  app.route('/api/v1/bookings')
    .post([verifyToken, validate(validateBooking)], Booking.postBooking)
    .get([verifyToken, admin], Booking.getBookings);

  app.route('/api/v1/users/:id/bookings')
    .get([verifyToken], Booking.getBookingByUserId);
}
