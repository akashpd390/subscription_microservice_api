

import { Plan } from "./models/plans.model";



const tempConfig = async () => {



    const plan = await Plan.create(
        {
            name: "Premium Plan",
            price: 1500,
            duration: 30,
            features: [ "Everything from Pro "," Feature 1", "Feature 2", "Feature 3"]
        }
    )

    plan.save();
    console.log("Temp plan created:", plan);
}

export { tempConfig };