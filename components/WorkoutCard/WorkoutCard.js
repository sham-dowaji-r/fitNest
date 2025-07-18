import styled from "styled-components";
import Link from "next/link";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px gray;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px orange;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
  color: #333;
`;

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workouts/${workout._id}`}>
      <Card>
        <Image
          src={
            workout.imageUrl && workout.imageUrl.trim() !== ""
              ? workout.imageUrl
              : "https://source.unsplash.com/400x200/?fitness"
          }
          alt={workout.name}
        />
        <CardTitle>{workout.name}</CardTitle>
      </Card>
    </Link>
  );
}
