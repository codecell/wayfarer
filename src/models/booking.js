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
  }
};

export default bookingModel;
