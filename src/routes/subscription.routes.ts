import { Router } from 'express';
import { createSubscription, getSubscription, updateSubscription, cancelSubscription, getAllSubscriptions } from '../controller/subscription.conroller';
// import { authMiddleware } from '../middlewares/auth.middleware';

const subscriptionRouter = Router();

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     description: Create a new subscription for the current user.
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *                 description: The ID of the plan to subscribe to.
 *               userId:
 *                 type: string
 *                 description: The ID of the user subscribing to the plan.
 *             required:
 *               - planId
 *               - userId
 *     responses:
 *       200:
 *         description: Subscription created successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.post('/subscriptions', createSubscription);

/**
 * @swagger
 * /subscriptions/{userId}:
 *   get:
 *     summary: Get user subscription details
 *     description: Fetch the subscription details for a specific user.
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose subscription details are to be fetched.
 *     responses:
 *       200:
 *         description: Successfully fetched subscription
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.get('/subscriptions/:userId', getSubscription);

/**
 * @swagger
 * /subscriptions/{userId}:
 *   put:
 *     summary: Update a user subscription
 *     description: Update the subscription for a specific user.
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose subscription is to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *                 description: The ID of the new subscription plan.
 *             required:
 *               - planId
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.put('/subscriptions/:userId', updateSubscription);

/**
 * @swagger
 * /subscriptions/{userId}:
 *   delete:
 *     summary: Cancel the subscription
 *     description: Cancel the subscription for a specific user.
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose subscription is to be canceled.
 *     responses:
 *       200:
 *         description: Subscription canceled successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.delete('/subscriptions/:userId', cancelSubscription);

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Get all subscription plans (testing only)
 *     description: Fetch all subscriptions for testing purposes. This should be removed in production.
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Successfully fetched subscriptions
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.get('/all', getAllSubscriptions);

export { subscriptionRouter };
