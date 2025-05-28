"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRouter = void 0;
const express_1 = require("express");
const subscription_conroller_1 = require("../controller/subscription.conroller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const subscriptionRouter = (0, express_1.Router)();
exports.subscriptionRouter = subscriptionRouter;
/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     description: Create a new subscription for the current user.
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - planId
 *     responses:
 *       200:
 *         description: Subscription created successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.post('/subscriptions', auth_middleware_1.authMiddleware, subscription_conroller_1.createSubscription);
/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get user subscriptions details
 *     description: Fetch the current user's subscription details.
 *     tags: [Subscriptions]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched subscription
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.get('/subscriptions', auth_middleware_1.authMiddleware, subscription_conroller_1.getSubscription);
/**
 * @swagger
 * /subscriptions:
 *   put:
 *     summary: Create a new subscription
 *     description: Create a new subscription for the current user.
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - planId
 *     responses:
 *       200:
 *         description: Subscription update successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.put('/subscriptions', auth_middleware_1.authMiddleware, subscription_conroller_1.updateSubscription);
/**
 * @swagger
 * /subscriptions:
 *   delete:
 *     summary: Cancel the subscription
 *     description: Cancel the subscription.
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription cancel successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.delete('/subscriptions', auth_middleware_1.authMiddleware, subscription_conroller_1.cancelSubscription);
// TODO will be deleted only for testing purposes
/**
 * @swagger
 * /subscriptions/all:
 *   get:
 *     summary: Get all subscription plans
 *     description: Fetch all available subscription plans that user made from client site. it is only for testing purpose. can be deleted in production.
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Successfully fetched plans
 *       500:
 *         description: Internal Server Error
 */
subscriptionRouter.get('/subscriptions/all', subscription_conroller_1.getAllSubscriptions);
