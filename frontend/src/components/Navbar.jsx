import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      style={{
        background: "linear-gradient(to right, #f7f3ee, #f3efe9)",
        borderBottom: "2px solid #000",
        padding: "20px 36px", 
      }}
      className="d-flex justify-content-between align-items-center"
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{
          fontWeight: "800",
          fontSize: "1.7rem",
          cursor: "pointer",
          letterSpacing: "-0.5px",
        }}
      >
        PlacementHub
      </div>

      {/* RIGHT SECTION */}
      <div className="d-flex align-items-center gap-3">

        {user ? (
          <>
            {/* ROLE BADGE */}
            <span
              style={{
                background: "#F1DA8E",
                border: "2px solid #000",
                borderRadius: "6px",
                padding: "5px 12px",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
            >
              {user.role.toUpperCase()}
            </span>

            {/* DASHBOARD LINKS */}
            {user.role === "student" && (
              <Link className="nav-link-custom" to="/student">
                Dashboard
              </Link>
            )}
            {user.role === "company" && (
              <Link className="nav-link-custom" to="/company">
                Dashboard
              </Link>
            )}
            {user.role === "admin" && (
              <Link className="nav-link-custom" to="/admin">
                Dashboard
              </Link>
            )}

            {/* PROFILE */}
            <Link
  className="nav-link-custom"
  to={`/${user.role}/profile`}
>
  Profile
</Link>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="btn btn-outline-custom btn-sm"
              style={{
                padding: "6px 14px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-outline-custom btn-sm"
              style={{ padding: "6px 14px" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary-custom btn-sm"
              style={{ padding: "6px 14px" }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* STYLES */}
      <style>
        {`
          .nav-link-custom {
            text-decoration: none;
            color: #1f1f1f;
            font-weight: 600;
            position: relative;
            transition: all 0.2s ease;
          }

          .nav-link-custom:hover {
            color: #000;
          }

          .nav-link-custom::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 0%;
            height: 2px;
            background: #6BCFDC;
            transition: width 0.25s ease;
          }

          .nav-link-custom:hover::after {
            width: 100%;
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;