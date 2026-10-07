import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(form);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="muted">Set up your profile to get matched with career paths.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={submitting} style={{ marginTop: 20, width: "100%" }}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="muted" style={{ marginTop: 18, fontSize: "0.88rem" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
