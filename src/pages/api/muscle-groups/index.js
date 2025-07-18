import dbConnect from "../../../../lib/mongodb";
import MuscleGroup from "../../../../models/MuscleGroup";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const muscles = await MuscleGroup.find().lean();
    console.log("Loaded muscle groups:", muscles); // ✅ أضف هذا
    res.status(200).json(muscles);
  } catch (error) {
    console.error("Error fetching muscle groups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
