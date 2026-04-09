import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Register() {
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",

    // student
    cgpa: "",
    skills: "",
    branch: "",
    passing_year: "",
    phone: "",
    resume: null,

    // company
    description: "",
    industry: "",
    location: "",
    website: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (role === "student") {
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });

        res = await axios.post(
          "https://placement-portal-goj9.onrender.com/api/auth/student-register",
          formData
        );
      } else {
        res = await axios.post(
          "https://placement-portal-goj9.onrender.com/api/auth/company-register",
          form
        );
      }

      login(res.data);

      if (res.data.role === "student") navigate("/student");
      else navigate("/company");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "#f7f3ee" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
        style={{
          width: "520px",
          border: "2px solid #000",
          borderRadius: "8px",
          background: "#fff",
          boxShadow: "8px 8px 0px #000",
        }}
      >
        <h3 style={{ fontWeight: "800" }}>Create Account</h3>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          Fill details to get started
        </p>

        {/* ROLE TOGGLE */}
        <div className="d-flex gap-2 mb-3">
          <button
            type="button"
            className="btn w-100"
            style={{
              background: role === "student" ? "#F4B9B8" : "#fff",
              border: "2px solid #000",
              fontWeight: "600",
            }}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            type="button"
            className="btn w-100"
            style={{
              background: role === "company" ? "#BFDC80" : "#fff",
              border: "2px solid #000",
              fontWeight: "600",
            }}
            onClick={() => setRole("company")}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* COMMON */}
          <input
            className="form-control mb-2"
            name="name"
            placeholder={role === "student" ? "Full Name" : "Company Name"}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {/* STUDENT */}
          {role === "student" && (
            <>
              <input
                className="form-control mb-2"
                name="cgpa"
                placeholder="CGPA"
                onChange={handleChange}
              />

              {/* STUDENT */}
            <textarea
              className="form-control mb-2"
              name="skills"
              placeholder="Skills (comma separated)"
              rows="2"
              onChange={handleChange}
            />

              <input
                className="form-control mb-2"
                name="branch"
                placeholder="Branch"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="passing_year"
                placeholder="Passing Year"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
              />

              {/* FILE */}
              <input
                type="file"
                className="form-control mb-3"
                name="resume"
                onChange={handleChange}
              />
            </>
          )}

          
          {role === "company" && (
            <>
             {/* COMPANY */}


              <input
                className="form-control mb-2"
                name="industry"
                placeholder="Industry"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="location"
                placeholder="Location"
                onChange={handleChange}
              />
              {            <textarea
            className="form-control mb-2"
            name="description"
            placeholder="Company Description"
            rows="3"
            onChange={handleChange}
            />}

              <input
                className="form-control mb-3"
                name="website"
                placeholder="Website"
                onChange={handleChange}
              />
            </>
          )}

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn w-100"
            style={{
              background: "#6BCFDC",
              border: "2px solid #000",
              fontWeight: "700",
            }}
          >
            Register →
          </motion.button>
        </form>

        <p className="mt-3 text-center" style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", fontWeight: "600" }}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;