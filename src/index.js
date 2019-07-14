import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import busRoutes from './routes/buses';
import tripRoutes from './routes/trips';
import bookingRoutes from './routes/bookings';
import swaggerDocument from '../swagger.json';

dotenv.config();
const app = express();
app.use(express.json());

app.all('/api/v1/', (req, res) => res.status(200).send({
  message: 'Welcome to Wayfarer, the elite public bus transportation booking service'
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

authRoutes(app);
usersRoutes(app);
busRoutes(app);
tripRoutes(app);
bookingRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`Listening on PORT ${PORT}`);
});

export default app;
