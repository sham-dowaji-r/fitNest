import dbConnect from "@/lib/mongodb";
import Exercise from "@/models/Exercise";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, imageUrl, instructions, muscleGroups } = req.body;
    const updated = await Exercise.findByIdAndUpdate(
      id,
      { name, imageUrl, instructions, muscleGroups },
      { new: true }
    );
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await Exercise.findByIdAndDelete(id);
    return res.status(204).end();
  }
  res.status(405).end();
}
