import express from 'express';

const app = express();


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
})