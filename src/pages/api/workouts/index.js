import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout";

import Exercise from "../../../../models/Exercise";

export default async function handler(req, res) {
  await dbConnect();

  const workouts = await Workout.find().lean();

  const formatted = workouts.map((w) => ({
    ...w,
    _id: w._id.toString(),
  }));

  res.status(200).json(formatted);
}
