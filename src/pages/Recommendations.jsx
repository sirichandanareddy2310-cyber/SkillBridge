import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecommendations } from "../api/careers";

export default function Recommendations() {
  const [roles, setRoles] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecommendations()
      .then(setRoles)
      .catch(() => setError("Couldn't load recommendations. Is the backend running?"));
  }, []);

  return (
    <div>
      <h1>Recommended for you</h1>
      <p className="muted">Ranked by how closely your profile matches each role's requirements.</p>

      {error && <p className="error-text">{error}</p>}
      {!error && roles === null && <p className="muted">Loading…</p>}
      {roles?.length === 0 && (
        <p className="muted">
          No recommendations yet — <Link to="/profile">complete your profile</Link> to get matched.
        </p>
      )}

      {roles?.map((role) => (
        <div className="role-row" key={role.roleId}>
          <div>
            <h3 style={{ marginBottom: 4 }}>
              <Link to={`/roles/${role.roleId}`}>{role.title}</Link>
            </h3>
            <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>{role.summary}</p>
          </div>
          <div className="match-score">{role.matchScore}%</div>
        </div>
      ))}
    </div>
  );
}
