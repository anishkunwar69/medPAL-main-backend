import { z } from "zod";

const medicineLogSchema = z.object({
    name: z.string(),
    time: z.string(), 
    interval: z.string(),  
    dose: z.string(),  
    days: z.union([z.string(), z.array(z.string())]),
    message: z.string(),  
});

const updateMedicineLogSchema = z.object({
    name: z.string(),
    time: z.string(), 
    interval: z.string(),  
    dose: z.string(),  
    days: z.union([z.string(), z.array(z.string())]),
    message: z.string(),  
});

export {
    medicineLogSchema,
    updateMedicineLogSchema
}