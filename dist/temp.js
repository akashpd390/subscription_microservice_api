"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempConfig = void 0;
const plans_model_1 = require("./models/plans.model");
const tempConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield plans_model_1.Plan.create({
        name: "Premium Plan",
        price: 1500,
        duration: 30,
        features: ["Everything from Pro ", " Feature 1", "Feature 2", "Feature 3"]
    });
    plan.save();
    console.log("Temp plan created:", plan);
});
exports.tempConfig = tempConfig;
