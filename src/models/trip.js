import pool from '../database/db';


const tripModel = {
  /**
     * save a trip to the DB
     * @param {array} tripProps 
     */
  createTrip(tripProps) {
    return pool.query(
      `INSERT INTO trips( bus_id, origin, destination, trip_date, fare, status ) 
            VALUES( $1, $2, $3, $4, $5, $6) RETURNING *`,
      tripProps            
    );
  },
  
  /**
   * view all trips in the DB
   */
  getAllTrips() {
    return pool.query(
      'SELECT * FROM trips ORDER BY id ASC'
    );
  }
};


export default tripModel;
