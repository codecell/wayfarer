import pool from './db';

/**
 * create users table
 */
const createUsersTable = `CREATE TABLE 
    users ( 
    user_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
    )`;

const createBusesTable = `CREATE TABLE 
    buses ( 
    bus_id SERIAL PRIMARY KEY,
    number_plate TEXT UNIQUE NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    year_manufactured TEXT NOT NULL,
    capacity INT NOT NULL
    )`;

const createTripsTable = `CREATE TABLE 
    trips (
    trip_id SERIAL PRIMARY KEY,
    bus_id INT,
    origin TEXT,
    destination TEXT,
    trip_date DATE DEFAULT current_date,
    fare FLOAT,
    status TEXT
    )`;

const createBookingsTable = `CREATE TABLE 
    bookings (
    booking_id SERIAL,
    user_id INT,
    trip_id INT,
    trip_date DATE DEFAULT current_date,
    bus_id INT,
    seat_number INT,
    created_on DATE DEFAULT current_date,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    PRIMARY KEY (trip_id, user_id)
    )`;  


/**
 * toggle all collections
 */

const toggleDatabase = queryString => pool.query(queryString)
  .then(() => {
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });

toggleDatabase(`
  DROP TABLE IF EXISTS bookings;
  DROP TABLE IF EXISTS users; 
  DROP TABLE IF EXISTS trips;
  DROP TABLE IF EXISTS buses;
  ${createUsersTable};
  ${createBusesTable};
  ${createTripsTable};
  ${createBookingsTable};`);
