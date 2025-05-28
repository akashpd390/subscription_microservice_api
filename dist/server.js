"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./lib/db"); // Import the database connection
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// connect to the database
(0, db_1.connectDB)();
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
