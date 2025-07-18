import mongoose from "mongoose";

const MuscleGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

// 👇 لاحظ اسم الـ collection صريح هنا: "muscle-groups"
export default mongoose.models.MuscleGroup ||
  mongoose.model("MuscleGroup", MuscleGroupSchema, "muscle-groups");
