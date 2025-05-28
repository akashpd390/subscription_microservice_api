"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const subscription_routes_1 = require("./routes/subscription.routes");
const plan_routes_1 = require("./routes/plan.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// subsicription routes\
app.use('/api', subscription_routes_1.subscriptionRouter);
// Plans routes
app.use('/api/plans', plan_routes_1.planRouter);
// swagger routes
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Routes
app.get('/', (_req, res) => {
    res.send('Hello from Express + TypeScript!');
});
exports.default = app;
