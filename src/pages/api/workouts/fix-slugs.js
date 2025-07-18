import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout";

export default async function handler(req, res) {
  await dbConnect();

  const workouts = await Workout.find({ slug: { $exists: false } });

  const updated = [];

  for (const workout of workouts) {
    workout.slug = workout.name.toLowerCase().replace(/\s+/g, "-");
    await workout.save();
    updated.push(workout.slug);
  }

  res.status(200).json({ message: "Slugs added", updated });
}
