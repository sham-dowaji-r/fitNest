import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, required: true, unique: true },
  imageUrl: String,
  exercises: [
    {
      exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
      sets: Number,
      reps: Number,
    },
  ],
});

// توليد slug تلقائي من الاسم
WorkoutSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.models.Workout ||
  mongoose.model("Workout", WorkoutSchema, "worksout");
