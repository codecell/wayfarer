import pool from './db';

/**
 * create users table
 */
const createUsersTable = `CREATE TABLE 
    users ( 
    id SERIAL PRIMARY KEY UNIQUE,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
    )`;

const createBusesTable = `CREATE TABLE 
    buses ( 
    id SERIAL PRIMARY KEY UNIQUE,
    number_plate TEXT UNIQUE NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    year_manufactured TEXT NOT NULL,
    capacity INT NOT NULL
    )`;

const createTripsTable = `CREATE TABLE 
    trips (
    id SERIAL PRIMARY KEY UNIQUE ,
    bus_id INT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    trip_date DATE DEFAULT current_date,
    fare FLOAT NOT NULL,
    status TEXT,
    FOREIGN KEY (bus_id) REFERENCES buses(id)
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
DROP TABLE IF EXISTS users; 
${createUsersTable};
DROP TABLE IF EXISTS trips;
${createTripsTable};
DROP TABLE IF EXISTS buses CASCADE;
${createBusesTable};
`);
