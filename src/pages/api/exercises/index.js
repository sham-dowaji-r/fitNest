import dbConnect from "@/lib/mongodb";
import Exercise from "@/models/Exercise";
import MuscleGroup from "@/models/MuscleGroup";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const exercises = await Exercise.find().populate("muscleGroups").lean();
    return res.status(200).json(exercises);
  }
  if (req.method === "POST") {
    const { name, imageUrl, instructions, muscleGroups } = req.body;
    const exercise = await Exercise.create({
      name,
      imageUrl,
      instructions,
      muscleGroups,
    });
    return res.status(201).json(exercise);
  }
  res.status(405).end();
}
