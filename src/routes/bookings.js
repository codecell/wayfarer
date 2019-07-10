import verifyToken from '../middleware/verifyToken';
import { validate, validateBooking } from '../middleware/validate';
import Booking from '../controllers/bookings';

export default function bookingRoutes(app) {
  app.route('/api/v1/bookings')
    .post([verifyToken, validate(validateBooking)], Booking.postBooking);
}
