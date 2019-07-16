import busModel from '../models/bus';

const Bus = {
  /**
     * create a new bus
     * @param {object} req 
     * @param {object} res 
     */
  async postBus(req, res) {
    const {
      number_plate, manufacturer, model, year, capacity 
    } = req.body;
    try {
      const busValues = [number_plate, manufacturer, model, year, capacity];
      const { rows } = await busModel.createBus(busValues);
      return res.status(201).json({ 
        status: 'success',
        data: {
          message: 'Bus successfully added!',
          bus: rows[0]
        }
      });
    } catch (ex) {
      if (ex) {
        return res.status(500).json({ status: 'error', error: ex.message });
      }   
    }
  },

  /**
   * request all buses in the buses collection
   * @param {object} req 
   * @param {object} res 
   */
  async getBuses(req, res) {
    try {
      const { rows } = await busModel.selectAllBuses();
      return res.status(200).json({ status: 'success', data: rows });
    } catch (ex) {
      if (ex) {
        return res.status(500).json({ status: 'error', error: ex.message });
      }
    }
  },
  
  /**
   * request a particular bus
   * @param {*} req 
   * @param {*} res 
   */
  async getBusById(req, res) {
    try {
      const { rows } = await busModel.selectBusById(req.params.busId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Bus with given ID not found ' });
      }

      return res.status(200).json({ status: 'success', data: rows[0] });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', error: ex.message });        
    }
  },

  /**
   * pass in the update values
   * @param {object} req 
   * @param {object} res 
   */
  async patchBus(req, res) {
    const {
      number_plate, manufacturer, model, year, capacity 
    } = req.body;

    try {
      const { rows } = await busModel.selectBusById(req.params.busId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Bus with given ID not found ' });
      }

      const busUpdateValues = [number_plate, manufacturer, model, year, capacity];
      const result = await busModel.updateBusById(busUpdateValues, req.params.busId);

      return res.status(200).json({ 
        status: 'success', 
        data: {
          message: 'Bus updated successfully',
          pimpedBus: result.rows[0]
        }       
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', error: ex.message });
    }
  },

  /**
   * delete bus request
   * @param {*} req 
   * @param {*} res 
   */
  async deleteBus(req, res) {
    try {
      const { rows } = await busModel.selectBusById(req.params.busId);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', error: 'Bus with given ID not found ' });
      }
      await busModel.removeBusById(req.params.busId);
      return res.status(200).json({ 
        status: 'sucess',
        data: { message: 'Bus deleted successfully' } 
      });
    } catch (ex) {
      if (ex) return res.status(500).json({ status: 'error', error: ex.message });
    }
  }
};

export default Bus;
