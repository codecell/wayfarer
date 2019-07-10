import pool from '../database/db';


const tripModel = {
  /**
     * save a trip to the DB
     * @param {array} tripProps 
     */
  createTrip(tripProps) {
    return pool.query(
      `INSERT INTO
       trips( bus_id, origin, destination, trip_date, fare, status ) 
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
  },

  /**
   * select trip with id
   * @param {string || number} id 
   */
  selectTripById(id) {
    return pool.query(
      'SELECT * FROM trips WHERE id = $1', 
      [id]
    );
  },
  

  /**
   * select trip update
   * @param {string} id 
   * @param {object} trip 
   */
  updateTripStatusById(id, trip) {
    return pool.query(
      `UPDATE trips SET 
           status = $1 
          WHERE id = $2 RETURNING *`,
      [...Object.values(trip), id]
    );
  }
};


export default tripModel;
