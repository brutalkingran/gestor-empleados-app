import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, sparse: true },
  phoneNumber: { type: String },

  position: { type: String },
  rank: { type: Number },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  hireDate: { type: Date },
  isActive: { type: Boolean, default: true },
  salary: { type: Number },

  birthday: { type: Date },
  sex: { type: String, enum: ["male","female","other"] },
  age: { type: Number },
  address: { type: String },

  stressLevel: { type: Number, min: 1, max: 10 },
  photo: { type: String },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
