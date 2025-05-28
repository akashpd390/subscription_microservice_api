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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubscriptions = exports.cancelSubscription = exports.updateSubscription = exports.getSubscription = exports.createSubscription = void 0;
const plans_model_1 = require("../models/plans.model");
const subscription_model_1 = require("../models/subscription.model");
const subscriptionsStatus_types_1 = __importDefault(require("../types/subscriptionsStatus.types"));
// create new subscriptions
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; //  middleware will set this
        const { planId } = req.body;
        // TODO remove this 
        // console.log("user id ", userId);
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // check if user is already subscribed to any subscription
        const existingSubscription = yield subscription_model_1.Subscription.findOne({ userId });
        if (existingSubscription) {
            if (existingSubscription.status === subscriptionsStatus_types_1.default.ACTIVE) {
                res.status(400).json({ message: 'User already has an active subscription', existingSubscription });
                return;
            }
        }
        if (!planId) {
            res.status(400).json({ message: 'planId is required' });
            return;
        }
        const plan = yield plans_model_1.Plan.findById(planId);
        if (!plan) {
            res.status(404).json({ message: 'Plan not found' });
            return;
        }
        // Calculate endDate
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // add duration in days
        const subscription = yield subscription_model_1.Subscription.create({
            userId,
            planId,
            startDate,
            endDate,
            status: subscriptionsStatus_types_1.default.ACTIVE,
        });
        res.status(201).json(subscription);
    }
    catch (error) {
        console.error('Subscription creation error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createSubscription = createSubscription;
// get user subscriptions details
const getSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const subscription = yield subscription_model_1.Subscription.findOne({ userId }).populate('planId');
        if (!subscription) {
            res.status(404).json({ message: 'Subscription not found' });
            return;
        }
        res.status(200).json(subscription);
    }
    catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getSubscription = getSubscription;
// update subscriptions
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { planId } = req.body;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        if (!planId) {
            res.status(400).json({ message: 'New planId is required' });
            return;
        }
        const newPlan = yield plans_model_1.Plan.findById(planId);
        if (!newPlan) {
            res.status(404).json({ message: 'Plan not found' });
            return;
        }
        const subscription = yield subscription_model_1.Subscription.findOne({ userId });
        if (!subscription) {
            res.status(404).json({ message: 'Subscription not found' });
            return;
        }
        const newStartDate = new Date();
        const newEndDate = new Date(newStartDate.getTime() + newPlan.duration * 24 * 60 * 60 * 1000);
        subscription.planId = planId;
        subscription.startDate = newStartDate;
        subscription.endDate = newEndDate;
        subscription.status = subscriptionsStatus_types_1.default.ACTIVE;
        const updatedSubscription = yield subscription.save();
        res.status(200).json(updatedSubscription);
        return;
    }
    catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ message: 'Server error', error });
        return;
    }
});
exports.updateSubscription = updateSubscription;
// cancel subscriptions
const cancelSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const subscription = yield subscription_model_1.Subscription.findOne({ userId });
        if (!subscription) {
            res.status(404).json({ message: 'Subscription not found' });
            return;
        }
        subscription.status = subscriptionsStatus_types_1.default.CANCELLED;
        yield subscription.save();
        res.status(200).json({ message: 'Subscription cancelled successfully', subscription });
    }
    catch (error) {
        console.error('Error cancelling subscription:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.cancelSubscription = cancelSubscription;
// TODO only for testing purposes will be deleted in productions
// get all subscriptions 
const getAllSubscriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield subscription_model_1.Subscription.find();
        res.status(200).json(subscriptions);
    }
    catch (error) {
    }
});
exports.getAllSubscriptions = getAllSubscriptions;
