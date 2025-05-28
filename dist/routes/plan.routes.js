"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRouter = void 0;
const express_1 = require("express");
const plan_controller_1 = require("../controller/plan.controller");
const planRouter = (0, express_1.Router)();
exports.planRouter = planRouter;
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
planRouter.get('/', plan_controller_1.fetchAllPlans);
