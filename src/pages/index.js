import styled from "styled-components";
import mongoose from "mongoose";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout";

import Exercise from "../../models/Exercise";

const Container = styled.main`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export default function HomePage({ workouts }) {
  return (
    <Container>
      <Title>Workouts</Title>
      <WorkoutList workouts={workouts} />
    </Container>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const workouts = await Workout.find().populate("exercises.exerciseId").lean();

  const serialized = workouts.map((w) => ({
    ...w,
    _id: w._id.toString(),
    exercises: w.exercises
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
  }));

  return {
    props: {
      workouts: serialized,
    },
  };
}
