/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

function validate(validator) {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(401).json({ status: 'error', error: error.details[0].message }); 
    next();
  };
}

function validateUser(user) {
  const schema = {
    email: Joi.string().min(2).max(255).email(),
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(2).max(255).required(),
    is_admin: Joi.boolean()
  };
    
  return Joi.validate(user, schema);
}

function validateBus(bus) {
  const validationOptions = {
    allowUnknown: true,
    stripUnknown: true
  };
  const schema = {
    number_plate: Joi.string().min(1).max(255),
    manufacturer: Joi.string().min(1).max(255),
    model: Joi.string().min(1).max(255),
    year: Joi.string().min(1).max(255),
    capacity: Joi.number().min(1).max(255)
  };

  return Joi.validate(bus, schema, validationOptions);
}

function validateTrip(trip) {
  const validationOptions = {
    allowUnknown: true,
    stripUnknown: true
  };
  const schema = {
    bus_id: Joi.number().min(1).max(10000),
    origin: Joi.string().min(1).max(255),
    destination: Joi.string().min(1).max(255),
    trip_date: Joi.date(),
    fare: Joi.number(),
    status: Joi.string().min(1).max(255)
  };

  return Joi.validate(trip, schema, validationOptions);
}

function validateBooking(booking) {
  const validationOptions = {
    allowUnknown: true,
    stripUnknown: true
  };
  const schema = {
    user_id: Joi.number().min(1).max(10000),
    trip_id: Joi.number().min(1).max(10000),
    bus_id: Joi.number().min(1).max(10000),
    trip_date: Joi.date(),
    seat_number: Joi.number().min(1).max(10000),
    first_name: Joi.string().min(1).max(255),
    last_name: Joi.string().min(1).max(255),
    email: Joi.string().min(2).max(255).email()
  };

  return Joi.validate(booking, schema, validationOptions);
}

module.exports = {
  validate,
  validateUser,
  validateBus,
  validateTrip,
  validateBooking
};
