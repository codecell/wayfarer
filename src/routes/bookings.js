import verifyToken from '../middleware/verifyToken';
import Booking from '../controllers/bookings';

export default function bookingRoutes(app) {
  app.route('/api/v1/bookings')
    .post(verifyToken, Booking.postBooking);
}
