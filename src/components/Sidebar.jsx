import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout, user } = useAuth();

  return (
    <nav className="sidebar">
      <div className="brand">SkillBridge</div>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
        Dashboard
      </NavLink>
      <NavLink to="/recommendations" className={({ isActive }) => (isActive ? "active" : "")}>
        Recommendations
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
        My profile
      </NavLink>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: "0.82rem", opacity: 0.7, marginBottom: 8 }}>
        {user?.name}
      </div>
      <button className="secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} onClick={logout}>
        Log out
      </button>
    </nav>
  );
}
