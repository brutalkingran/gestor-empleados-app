import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  permissions: { type: [String], default: [] }, // opcional, lista de permisos
}, { timestamps: true });

export default mongoose.models.Role || mongoose.model("Role", roleSchema);
