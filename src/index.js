import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});