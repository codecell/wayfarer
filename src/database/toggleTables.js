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
    bus_id INT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    trip_date DATE DEFAULT current_date,
    fare FLOAT NOT NULL,
    status TEXT,
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id)
    )`;

const createBookingsTable = `CREATE TABLE 
    bookings (
    booking_id SERIAL,
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    trip_date DATE DEFAULT current_date,
    bus_id INT NOT NULL,
    seat_number INT NOT NULL,
    created_on DATE DEFAULT current_date,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
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
