import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    DOB: { type: Date, required: true },
    majorDisease: { type: String, required: true },
    medicineLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicineLog' }],
    isVerified:{type: Boolean, default:false}
}, { timestamps: true });

export const Patient = mongoose.model('Patient',patientSchema);