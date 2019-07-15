import pool from '../database/db';

const busModel = {
  /**
     * save a bus to the buses collection
     * @param {array} busProps 
     */
  createBus(busProps) {
    return pool.query(
      'INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      busProps
    );
  },

  /**
   * select all buses in the buses table
   */
  selectAllBuses() {
    return pool.query(
      'SELECT * FROM buses ORDER BY id ASC'
    );
  },

  /**
   * select a particular bus of ID busId
   * @param {number} busId 
   */
  selectBusById(busId) {
    return pool.query(
      'SELECT * FROM buses WHERE id = $1',
      [busId]
    );
  },

  /**
   * update bus in the db
   * @param {number} busId 
   */
  updateBusById(bus, busId) {
    return pool.query(
      `UPDATE buses 
      SET number_plate = $1, manufacturer = $2, model = $3, year = $4, capacity = $5
      WHERE id = $6 RETURNING *`,
      [...Object.values(bus), busId]
    );
  },

  /**
   * delete a bus from the DB
   * @param {*} busId 
   */
  removeBusById(busId) {
    return pool.query(
      'DELETE FROM buses WHERE id = $1 RETURNING *',
      [busId]
    );
  }
};

export default busModel;
