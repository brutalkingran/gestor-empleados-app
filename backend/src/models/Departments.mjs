import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  head: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model("Department", departmentSchema);
