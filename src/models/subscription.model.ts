import mongoose, { InferSchemaType, model } from 'mongoose';
import SubscriptionsStatus from '../types/subscriptionsStatus.types';




const SubscriptionSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  planId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, ref: 'Plan' 
  },
  status: {
    type: String,
    enum: Object.values(SubscriptionsStatus),
    default: SubscriptionsStatus.ACTIVE,
  },
  startDate: { 
    type: Date, 
    default: Date.now 
  },
  endDate: {
    type: Date
 },
}, {timestamps: true});


// type
type SubscriptionType = InferSchemaType<typeof SubscriptionSchema>;

// Model
const Subscription = model<SubscriptionType>('Subscription', SubscriptionSchema);


// Export
export { Subscription, SubscriptionType };