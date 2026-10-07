import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSkillGap, getRoadmap } from "../api/careers";

export default function RoleDetail() {
  const { roleId } = useParams();
  const [gap, setGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setGap(null);
    setRoadmap(null);
    Promise.all([getSkillGap(roleId), getRoadmap(roleId)])
      .then(([gapData, roadmapData]) => {
        setGap(gapData);
        setRoadmap(roadmapData);
      })
      .catch(() => setError("Couldn't load this role's details."));
  }, [roleId]);

  return (
    <div>
      <p className="muted" style={{ marginBottom: 4 }}>
        <Link to="/recommendations">← Back to recommendations</Link>
      </p>

      {error && <p className="error-text">{error}</p>}
      {!error && !gap && <p className="muted">Loading…</p>}

      {gap && (
        <>
          <h1>{gap.role?.title}</h1>

          <h2 style={{ marginTop: 28 }}>Skill gap</h2>
          <p className="muted">What you already have, and what to build next.</p>
          <div style={{ marginBottom: 8 }}>
            {gap.haveSkills?.map((s) => (
              <span key={s} className="skill-tag have">{s}</span>
            ))}
          </div>
          <div>
            {gap.gapSkills?.map((s) => (
              <span key={s} className="skill-tag gap">{s}</span>
            ))}
          </div>
        </>
      )}

      {roadmap && (
        <>
          <h2 style={{ marginTop: 36 }}>Learning roadmap</h2>
          <p className="muted">Suggested order to close the gap above.</p>
          {roadmap.map((step, i) => (
            <div className="roadmap-step" key={i}>
              <div className="index">{i + 1}</div>
              <div>
                <h3 style={{ marginBottom: 3 }}>{step.topic}</h3>
                <p className="muted" style={{ margin: "0 0 4px" }}>{step.description}</p>
                {step.resourceUrl && (
                  <a href={step.resourceUrl} target="_blank" rel="noreferrer">
                    View resource
                  </a>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
