import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Hi{user?.name ? `, ${user.name}` : ""}.</h1>
      <p className="muted">
        Keep your profile current, then check your recommendations to find your next step.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <Link to="/recommendations"><button>See recommendations</button></Link>
        <Link to="/profile"><button className="secondary">Edit profile</button></Link>
      </div>
    </div>
  );
}
