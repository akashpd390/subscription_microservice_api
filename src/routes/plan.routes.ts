

import {Router } from 'express';
import { fetchAllPlans } from '../controller/plan.controller';

const planRouter = Router();


/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all plans
 *     description: Fetch all available plans from the database.
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: Successfully fetched plans
 *       500:
 *         description: Internal Server Error
 */
planRouter.get('/', fetchAllPlans);


export { planRouter };
