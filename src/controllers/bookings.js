/* eslint-disable camelcase */
import bookingModel from '../models/booking';

const Booking = {
  /**
     * make a booking request
     * @param {object} req 
     * @param {object} res 
     */
  async postBooking(req, res) {
    const {
      user_id, trip_id, trip_date, bus_id, seat_number, first_name, last_name, email 
    } = req.body;
    req.body.created_on = new Date();

    try {
      const bookingValues = [user_id, trip_id, trip_date, bus_id, seat_number, first_name, last_name, email, req.body.created_on];
      const { rows } = await bookingModel.createBooking(bookingValues);
      return res.status(201).json({ 
        status: 'success',
        data: {
          booking_id: rows[0].id,
          user_id: rows[0].user_id,
          trip_id: rows[0].id,
          trip_date: rows[0].trip_date,
          seat_number: rows[0].seat_number,
          first_name: rows[0].first_name,
          last_name: rows[0].last_name,
          email: rows[0].email,
          created_on: req.body.created_on
        } 
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'Error', data: { message: ex.message } });
    }
  }
};

export default Booking;
