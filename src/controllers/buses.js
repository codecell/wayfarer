/* eslint-disable camelcase */
import busModel from '../models/bus';

const Bus = {
  /**
     * create a new bus
     * @param {object} req 
     * @param {object} res 
     */
  async postBus(req, res) {
    const {
      number_plate, manufacturer, model, year_manufactured, capacity 
    } = req.body;
    try {
      const busValues = [number_plate, manufacturer, model, year_manufactured, capacity];
      const { rows } = await busModel.createBus(busValues);
      return res.status(201).json({ 
        status: 'success',
        data: {
          bus: rows[0]
        }
      });
    } catch (ex) {
      if (ex) {
        return res.status(500).json({ status: 'error', data: { message: ex.message } });
      }   
    }
  }
};

export default Bus;
