import pool from '../database/db';

const bookingModel = {
  /**
     * save a booking to the bookings collection
     * @param {array} bookingProps 
     */
  createBooking(bookingProps) {
    return pool.query(
      `INSERT INTO 
            bookings (user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      bookingProps
    );
  },

  /**
   * select all saved bookings in the DB
   */
  selectAllBookings() {
    return pool.query(
      'SELECT * FROM bookings ORDER BY booking_id ASC'
    );
  },

  /**
   * select a given booking of id bookingId
   * @param {number} bookingId 
   */
  selectBookingByUserId(userId) {
    return pool.query(
      'SELECT * FROM bookings WHERE user_id = $1', 
      [userId]
    );
  },

  /**
   * delete booking of id bookingId from the DB
   * @param {number} bookigId 
   */
  deleteBookingById(bookingId) {
    return pool.query(
      'DELETE FROM bookings WHERE booking_id = $1 RETURNING *', 
      [bookingId]
    );
  }

};

export default bookingModel;
