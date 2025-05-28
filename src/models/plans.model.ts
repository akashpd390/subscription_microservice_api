import mongoose, { Schema, model, InferSchemaType } from 'mongoose';

// Schema
const PlanSchema = new Schema({
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
    type: Number,       // In days
    required: true 
}, 
},{ timestamps: true });



// type
type PlanType = InferSchemaType<typeof PlanSchema>;

// Model
const Plan = model<PlanType>('Plan', PlanSchema);


// Export
export { Plan, PlanType };
