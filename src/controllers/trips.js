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
      const tripValues = [bus_id, origin, destination, req.body.trip_date, fare, req.body.status];
      const { rows } = await tripModel.createTrip(tripValues);
      return res.status(201).json({ 
        status: 'success',
        data: { 
          trip_id: rows[0].trip_id,
          bus_id: rows[0].bus_id,
          origin: rows[0].origin,
          destination: rows[0].destination,
          trip_date: rows[0].trip_date,
          fare: rows[0].fare,
          status: rows[0].status
        } 
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  },

  /**
   * request all trips in the DB
   * @param {object} req 
   * @param {object} res 
   */
  async getTrips(req, res) {
    try {
      const { rows } = await tripModel.getAllTrips();
      return rows.length === 0
        ? res.status(202).json({ message: 'No trip created yet' })
        : res.status(200).json({ status: 'success', data: rows });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  },

  /**
     * request a given trip
     * @param {object} req 
     * @param {object} res 
     */
  async getTripById(req, res) {
    try {
      const { rows } = await tripModel.selectTripById(req.params.tripId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', data: { message: 'TRIP WITH GIVEN ID NOT FOUND' } });
      }
      
      return res.status(200).json({ status: 'success', data: rows[0] });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  },  

  /**
   * update a trip
   * @param {*} req 
   * @param {*} res 
   */
  async cancelTrip(req, res) {
    const { status } = req.body;

    try {
      const { rows } = await tripModel.selectTripById(req.params.tripId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', data: { message: 'Trip with given id not found' } });
      }

      await tripModel.updateTripStatusById(req.params.id, [status]);
      return res.status(200).json({ status: 'success', data: { message: 'Trip cancelled successfully' } });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } });
    }
  },

  /**
   * Delete a given trip
   * @param {*} req 
   * @param {*} res 
   */
  async deleteTrip(req, res) {
    try {
      const { rows } = await tripModel.selectTripById(req.params.tripId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', data: { message: 'Trip with given id not found' } });
      }

      await tripModel.removeTripById(req.params.tripId);
      return res.status(200).json({ status: 'success', data: { message: 'Trip deleted successfully' } });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', data: { message: ex.message } }); 
    }
  }
};

export default Trip;
