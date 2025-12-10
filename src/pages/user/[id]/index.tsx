import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="user-profile">
      <h1>User id:</h1>
      {id}
    </div>

  );
}
