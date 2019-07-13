import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool;
let database;

if (process.env.NODE_ENV === 'development') {
  database = process.env.DB_DEV;
} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'TEST') {
  database = process.env.DB_TEST;
} 


pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database,
  password: process.env.DB_PASS,
  port: 5432,
});

if (process.env.NODE_ENV === 'production') { 
  pool = new Pool(process.env.DATABASE_URL);
}

pool.on('connect', () => {
  console.log(`Connected to ${database} DB!!!`);
});

module.exports = pool;
