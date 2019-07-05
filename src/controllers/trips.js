/* eslint-disable camelcase */
import tripModel from '../models/trip';

const Trip = {
  /**
     * create a trip
     * @param {Object} req 
     * @param {object} res 
     */
  async postTrip(req, res) {
    const {
      bus_id, origin, destination, fare
    } = req.body;
    req.body.trip_date = new Date();
    req.body.status = 'active';

    try {
      const newTripProps = [bus_id, origin, destination, req.body.trip_date, fare, req.body.status];
      const { rows } = await tripModel.createTrip(newTripProps);
      return res.status(201).json({ 
        status: 'Success',
        data: { 
          trip_id: rows[0].id,
          bus_id: rows[0].bus_id,
          origin: rows[0].origin,
          destination: rows[0].destination,
          trip_date: rows[0].trip_date,
          fare: rows[0].fare,
          status: rows[0].status
        } 
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'Error', data: { message: ex.message } });
    }
  }
};

export default Trip;