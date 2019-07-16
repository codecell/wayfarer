import bookingModel from '../models/booking';
import userModel from '../models/user';

const Booking = {
  /**
     * make a booking request
     * @param {object} req 
     * @param {object} res 
     */
  async postBooking(req, res) {
    
    const {
      user_id, trip_id, trip_date, seat_number
    } = req.body;
    req.body.created_on = new Date().toLocaleString();

    try {
      const { rows: allBookings } = await bookingModel.selectAllBookings();
      allBookings.forEach((booking) => { 
        if (booking.trip_id === req.body.trip_id && booking.email === req.body.email) {
          return res.status(400).json({ 
            status: 'error',
            error: 'Booking with this Email and Trip Id already made'
          });
        }
      });

      const { rows: user } = await userModel.findUserById(user_id);      
      const bookingValues = [user_id, trip_id, trip_date, seat_number, user[0].first_name, user[0].last_name, user[0].email, req.body.created_on];
      const { rows } = await bookingModel.createBooking(bookingValues);
      const newBooking = rows[0];
      return res.status(201).json({ 
        status: 'success',
        data: {
          id: newBooking.id,
          booking_id: newBooking.id,
          user_id: newBooking.user_id,
          trip_id: newBooking.id,
          trip_date: newBooking.trip_date,
          seat_number: newBooking.seat_number,
          first_name: newBooking.first_name,
          last_name: newBooking.last_name,
          email: newBooking.email,
          created_on: req.body.created_on,
          message: 'Booking successfully made!'
        } 
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', error: ex.message });
    }
  },

  /**
   * request all saved bookings
   * @param {object} req 
   * @param {object} res 
   */
  async getBookings(req, res) {
    try {
      let result;

      if (!req.body.is_admin) {
        result = await bookingModel.selectBookingsByUserId(req.body.user_id);
      } else {
        result = await bookingModel.selectAllBookings(); 
      }
      
      const { rows } = result;
      const bookings = rows.map((row) => {
        const newRow = row;
        newRow.booking_id = row.id;
        delete row.id;
        return newRow;
      });
      return rows.length === 0
        ? res.status(200).json({ message: 'No booking made yet' })
        : res.status(200).json({ status: 'success', data: bookings });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', error: ex.message });
    }
  },

  /**
   * delete a saved booking request
   * @param {object} req 
   * @param {object} res 
   */
  async removeBooking(req, res) {
    try {
      const { rows } = await bookingModel.deleteBookingById(req.params.bookingId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Booking with the given ID not found' });
      }

      return res.status(200).json({ status: 'success', data: { message: 'Booking deleted successfully' } });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', error: ex.message });
    }
  }
};

export default Booking;
