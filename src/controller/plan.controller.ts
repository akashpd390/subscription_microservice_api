import { Request, Response } from "express";
import { Plan } from "../models/plans.model";



const fetchAllPlans = async (req : Request, res : Response) => {

    try {
        // Assuming you have a Plan model imported
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export { fetchAllPlans };