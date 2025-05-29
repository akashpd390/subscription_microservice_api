
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
  res.send(`
    <h1> Subscriptions API</h1>
      <p>Welcome to the Subscriptions API. Below are the available endpoints:</p>
      
      <div class="endpoint">
        <strong>Swagger Documentation:</strong><br />
        <a href="/api-docs" target="_blank">/api-docs</a>
      </div>
      
      <div class="endpoint">
        <strong> Plans Endpoint:</strong><br />
        <a href="/api/plans" target="_blank">/api/plans</a>
      </div>

      <div class="endpoint">
        <strong> Subscriptions Endpoint:</strong><br />
        <a href="/api/subscriptions" target="_blank">/api/subscriptions</a>
      </div>

      <p>Use Swagger to test requests and explore schemas</p>
  `
  );
});

export default app;
