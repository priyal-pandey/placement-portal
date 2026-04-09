import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const data = res.data;
      login(data);

      if (data.role === "student") navigate("/student");
      else if (data.role === "company") navigate("/company");
      else navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "#f7f3ee" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-5"
        style={{
          width: "380px",
          border: "2px solid #000",
          borderRadius: "6px",
          background: "#fff",
          boxShadow: "6px 6px 0px #000",
        }}
      >
        <h3 style={{ fontWeight: "800" }}>Welcome Back</h3>
        <p style={{ color: "#555" }}>Login to continue</p>

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button
          className="btn w-100 mb-2"
          style={{
            background: "#6BCFDC",
            border: "2px solid #000",
            fontWeight: "600",
          }}
        >
          Login
        </button>

        <p style={{ fontSize: "0.9rem" }}>
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", fontWeight: "600" }}
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;