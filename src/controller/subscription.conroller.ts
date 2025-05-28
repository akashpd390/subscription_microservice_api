import { Request, Response } from 'express';
import { Plan } from '../models/plans.model';
import { Subscription } from '../models/subscription.model';
import SubscriptionsStatus from '../types/subscriptionsStatus.types';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

// create new subscriptions

const createSubscription = async (req: AuthenticatedRequest, res: Response) => {
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
    const existingSubscription = await Subscription.findOne({ userId });
    if (existingSubscription) { 
     if ( existingSubscription.status === SubscriptionsStatus.ACTIVE ){

       res.status(400).json({ message: 'User already has an active subscription', existingSubscription });
       return;
      }
    }

    if (!planId) {
      res.status(400).json({ message: 'planId is required' });
      return;
    }


    const plan = await Plan.findById(planId);
    if (!plan) {
      res.status(404).json({ message: 'Plan not found' });
      return;
    }

    // Calculate endDate
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // add duration in days

    const subscription = await Subscription.create({
      userId,
      planId,
      startDate,
      endDate,
      status: SubscriptionsStatus.ACTIVE,
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// get user subscriptions details

const getSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const subscription = await Subscription.findOne({ userId }).populate('planId');

    if (!subscription) {
      res.status(404).json({ message: 'Subscription not found' });
      return;
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// update subscriptions

const updateSubscription = async (req: AuthenticatedRequest, res: Response) => {

  try {
    const userId = req.userId;
    const { planId } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!planId) {
      res.status(400).json({ message: 'New planId is required' });
      return
    }

    const newPlan = await Plan.findById(planId);
    if (!newPlan) {
      res.status(404).json({ message: 'Plan not found' });
      return
    }

    const subscription = await Subscription.findOne({ userId });
    if (!subscription) {
      res.status(404).json({ message: 'Subscription not found' });
      return
    }

    const newStartDate = new Date();
    const newEndDate = new Date(newStartDate.getTime() + newPlan.duration * 24 * 60 * 60 * 1000);

    subscription.planId = planId;
    subscription.startDate = newStartDate;
    subscription.endDate = newEndDate;
    subscription.status = SubscriptionsStatus.ACTIVE

    const updatedSubscription = await subscription.save();

    res.status(200).json(updatedSubscription);
    return
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ message: 'Server error', error });
    return
  }

}


// cancel subscriptions

const cancelSubscription = async (req: AuthenticatedRequest, res: Response) => {

  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
      res.status(404).json({ message: 'Subscription not found' });
      return;
    }

    subscription.status = SubscriptionsStatus.CANCELLED;
    await subscription.save();

    res.status(200).json({ message: 'Subscription cancelled successfully', subscription });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Server error', error });
  }

};



// TODO only for testing purposes will be deleted in productions
// get all subscriptions 
const getAllSubscriptions = async (req: Request, res: Response) => { 

  try {

    const subscriptions = await Subscription.find();

    res.status(200).json(subscriptions);

  } catch (error) {
    
  }

 };



// exports
export {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  getAllSubscriptions
};


