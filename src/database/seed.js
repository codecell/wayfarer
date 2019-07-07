import pool from './db';
import passwordHelper from '../helpers/passwordHelper';

require('dotenv').config();

const hashPassword = passwordHelper.hashPassword(process.env.ADMIN_PASS);

const seedQuery = `INSERT INTO users(email, first_name, last_name, password, is_admin) 
VALUES($1, $2, $3, $4, $5)`;
const values = [process.env.ADMIN_EMAIL, 'alfred', 'noble', hashPassword, true];

pool.query(seedQuery, values)
  .then(() => {
    pool.end();
  })
  .catch((err) => {
    pool.end();
  });
