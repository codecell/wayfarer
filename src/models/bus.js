import pool from '../database/db';

const busModel = {
  /**
     * save a bus to the buses collection
     * @param {array} busProps 
     */
  createBus(busProps) {
    return pool.query(
      'INSERT INTO buses(number_plate, manufacturer, model, year_manufactured, capacity) VALUES($1, $2, $3, $4, $5) RETURNING *',
      busProps
    );
  }
};

export default busModel;
