import pool from './db';

/**
 * create users table
 */
const createUsersTable = `CREATE TABLE 
    users ( 
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
    )`;

const createBusesTable = `CREATE TABLE 
    buses ( 
    id SERIAL PRIMARY KEY,
    number_plate TEXT UNIQUE NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    year TEXT NOT NULL,
    capacity INT NOT NULL
    )`;

const createTripsTable = `CREATE TABLE 
    trips (
    id SERIAL PRIMARY KEY,
    bus_id INT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    trip_date DATE DEFAULT current_date,
    fare FLOAT,
    status TEXT
    )`;

const createBookingsTable = `CREATE TABLE 
    bookings (
    id SERIAL,
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    trip_date DATE DEFAULT current_date,
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
