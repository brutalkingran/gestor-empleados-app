import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, // opcional para dept_head
  mustChangePassword: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("Users", userSchema);
