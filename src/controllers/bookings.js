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
    req.body.created_on = new Date().toLocaleString();

    try {
      const bookingValues = [user_id, trip_id, trip_date, bus_id, seat_number, first_name, last_name, email, req.body.created_on];
      const { rows } = await bookingModel.createBooking(bookingValues);
      return res.status(201).json({ 
        status: 'success',
        data: {
          booking_id: rows[0].booking_id,
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
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  },

  /**
   * request all saved bookings
   * @param {object} req 
   * @param {object} res 
   */
  async getBookings(req, res) {
    try {
      const { rows } = await bookingModel.selectAllBookings();
      return res.status(200).json({ status: 'success', data: rows });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  },

  /**
   * request booking(s) made from a specific id
   * @param {object} req 
   * @param {object} res 
   */
  async getBookingByUserId(req, res) {
    try {
      const { rows } = await bookingModel.selectBookingByUserId(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', data: { message: 'booking with given not found' } });
      }
      return res.status(200).json({ status: 'success', data: rows });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  }
};

export default Booking;
