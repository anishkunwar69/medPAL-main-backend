import mongoose from "mongoose";

const medicineLogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    time: { type: String, required: true },
    interval: { type: Number, required: true },
    dose: { type: Number, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    days: [{ type: String, required: true }],
    message: { type: String },
    // consumed: { type: Boolean, default: false }, // True if the medicine was taken
    // skipped: { type: Boolean, default: false }, // True if the medicine was skipped
    // reasonForSkipping: { type: String }, // Optional: To store the reason for skipping
    // reminderSent: { type: Boolean, default: false }, // Track if a reminder was sent
},{timestamps:true});

export const MedicineLog = mongoose.model('MedicineLog', medicineLogSchema);