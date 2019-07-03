import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'wayfarer',
    password:  process.env.DB_PASS,
    port: 5432
});

pool.on('connect', () => {
    console.log("connected to wayfarer DB!");
    }
);
module.exports = pool;