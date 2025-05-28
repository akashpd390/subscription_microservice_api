
// src/app.ts
import express from 'express';
import cors from 'cors';
import { subscriptionRouter } from './routes/subscription.routes';
import { planRouter } from './routes/plan.routes';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// subsicription routes\
app.use('/api', subscriptionRouter)

// Plans routes
app.use('/api/plans', planRouter);


// swagger routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (_req, res) => {
  res.send('/api-docs for the swagger documentation \n /api/plans for the plans \n /api/subscriptions for the subscriptions');
});

export default app;
