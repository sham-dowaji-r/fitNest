import { useRouter } from "next/router";
import ExerciseForm from "components/ExerciseForm/ExerciseForm";
import dbConnect from "@/lib/mongodb";
import MuscleGroup from "@/models/MuscleGroup";

export default function CreateExercise({ muscleOptions }) {
  const router = useRouter();
  const { workoutId, workoutSlug } = router.query;

  const handleSubmit = async (data) => {
    const res = await fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newExercise = await res.json();

    if (workoutId) {
      await fetch(`/api/workouts/${workoutId}/add-exercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: newExercise._id,
          sets: data.sets,
          reps: data.reps,
        }),
      });

      router.push(`/workouts/${workoutId}`);
    } else {
      router.push("/");
    }
  };

  return <ExerciseForm onSubmit={handleSubmit} muscleOptions={muscleOptions} />;
}

export async function getServerSideProps() {
  await dbConnect();
  const muscles = await MuscleGroup.find().lean();
  const muscleOptions = muscles.map((m) => ({
    _id: m._id.toString(),
    name: m.name,
  }));

  return {
    props: {
      muscleOptions,
    },
  };
}
