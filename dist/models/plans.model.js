"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
// Schema
const PlanSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    duration: {
        type: Number, // In days
        required: true
    },
}, { timestamps: true });
// Model
const Plan = (0, mongoose_1.model)('Plan', PlanSchema);
exports.Plan = Plan;
