import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout";

import Exercise from "../../../models/Exercise";
import ExerciseList from "../../../components/ExerciseList/ExerciseList";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.main`
  padding: 2rem;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default function WorkoutDetail({ workout }) {
  const router = useRouter();
  const workoutId = router.query.id;

  const exercisesWithSets = workout.exercises.map((ex) => ({
    ...ex.exerciseId,
    sets: ex.sets,
    reps: ex.reps,
  }));

  return (
    <Container>
      <Title>{workout.name}</Title>
      <ExerciseList exercises={exercisesWithSets} />
      <div style={{ margin: "1rem 0" }}>
        <Link
          href={`/exercises/create?workoutId=${workout._id}&workoutSlug=${workout.slug}`}
        >
          <button>➕ Add Exercise</button>
        </Link>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id; // ✅ عرّف id أولًا

  await dbConnect();

  const workout = await Workout.findById(id)
    .populate("exercises.exerciseId")
    .lean();
  console.log("📦 التمارين:", workout.exercises);

  if (!workout) {
    return {
      notFound: true,
    };
  }

  const serialized = {
    ...workout,
    _id: workout._id.toString(),
    exercises: workout.exercises
      .filter((ex) => ex.exerciseId !== null)
      .map((ex) => ({
        ...ex,
        _id: ex._id?.toString() || null,
        exerciseId: {
          ...ex.exerciseId,
          _id: ex.exerciseId._id.toString(),
          muscleGroups:
            ex.exerciseId.muscleGroups?.map((mg) => mg.toString()) || [],
        },
      })),
  };

  return {
    props: {
      workout: serialized,
    },
  };
}
