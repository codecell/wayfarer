import express from 'express';
import dotenv from 'dotenv';

import usersRoutes from './routes/users';
import authRoutes from './routes/auth';
import busRoutes from './routes/buses';
import tripRoutes from './routes/trips';

dotenv.config();
const app = express();
app.use(express.json());

authRoutes(app);
usersRoutes(app);
busRoutes(app);
tripRoutes(app);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;