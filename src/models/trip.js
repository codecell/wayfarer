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
  getAllTrips(filter) {
    if (filter.origin) {
      return pool.query(
        'SELECT * FROM trips WHERE origin = $1 ORDER BY id ASC',
        [filter.origin]
      );
    }
    
    if (filter.destination) {
      return pool.query(
        'SELECT * FROM trips WHERE destination = $1 ORDER BY id ASC',
        [filter.destination]
      );
    }

    return pool.query(
      'SELECT * FROM trips ORDER BY id ASC'
    );
  },

  /**
   * select given trip id tripId
   * @param {number} tripId 
   */
  selectTripById(tripId) {
    return pool.query(
      'SELECT * FROM trips WHERE id = $1', 
      [tripId]
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
  },

  /**
   * remove a trip of ID tripId from trips collection
   * @param {*} tripId 
   */
  removeTripById(tripId) {
    return pool.query(
      'DELETE FROM trips WHERE id = $1 RETURNING *',
      [tripId]      
    );
  }
};

export default tripModel;
