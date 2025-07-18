import dbConnect from "../../../../../lib/mongodb";
import Workout from "../../../../../models/Workout";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "POST") {
    const { exerciseId, sets, reps } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      {
        $push: {
          exercises: {
            exerciseId, // ← يجب أن يكون ObjectId
            sets,
            reps,
          },
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedWorkout);
  }

  res.status(405).end(); // Method Not Allowed
}
