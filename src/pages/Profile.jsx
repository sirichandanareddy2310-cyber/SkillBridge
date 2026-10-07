import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "../api/profile";

function TagInput({ label, values, onChange, placeholder }) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const v = draft.trim();

    if (!v) return;

    onChange([...values, v]);
    setDraft("");
  }

  function removeTag(i) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div>
      <label>{label}</label>

      <div style={{ marginBottom: 8 }}>
        {values.map((v, i) => (
          <span
            key={i}
            className="skill-tag have"
            style={{ cursor: "pointer" }}
            onClick={() => removeTag(i)}
          >
            {v} ✕
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="secondary"
          onClick={addTag}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [interests, setInterests] = useState([]);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");

    getProfile()
      .then((data) => {
        setEducation(data.education || "");
        setSkills(data.skills || []);
        setProjects(data.projects || []);
        setInterests(data.interests || []);
      })
      .catch(() => {})
      .finally(() => setStatus("idle"));
  }, []);

  async function handleSave(e) {
    e.preventDefault();

    setStatus("saving");

    try {
      await saveProfile({
        education,
        skills,
        projects,
        interests,
      });

      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h1>Your profile</h1>

      <p className="muted">
        This is what SkillBridge matches against job roles — the more
        specific, the better your recommendations.
      </p>

      <form onSubmit={handleSave}>
        <label htmlFor="education">
          Education
        </label>

        <input
          id="education"
          placeholder="e.g. B.Tech Data Science, 3rd year"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />

        <TagInput
          label="Skills"
          values={skills}
          onChange={setSkills}
          placeholder="e.g. Python, React, SQL"
        />

        <TagInput
          label="Projects"
          values={projects}
          onChange={setProjects}
          placeholder="e.g. SkillBridge, NyayaVerse"
        />

        <TagInput
          label="Interests"
          values={interests}
          onChange={setInterests}
          placeholder="e.g. Data Science, Web Development"
        />

        {status === "error" && (
          <p className="error-text">
            Couldn't save your profile. Try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          style={{ marginTop: 20 }}
        >
          {status === "saving"
            ? "Saving…"
            : "Save profile"}
        </button>

        {status === "saved" && (
          <span
            className="muted"
            style={{ marginLeft: 12 }}
          >
            Saved.
          </span>
        )}
      </form>
    </div>
  );
}