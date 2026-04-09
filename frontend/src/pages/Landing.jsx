import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Users, ShieldCheck } from "lucide-react";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f7f3ee, #f3efe9)",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <div
        className="container text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "85vh" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontWeight: "800",
            fontSize: "3.4rem",
            color: "#1f1f1f",
            letterSpacing: "-1px",
          }}
        >
          PlacementHub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: "620px",
            marginTop: "14px",
            color: "#555",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          A seamless platform connecting students, companies, and placement
          cells — built for clarity, speed, and better hiring decisions.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="d-flex gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className="btn btn-primary-custom"
            style={{
              padding: "10px 22px",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-outline-custom"
            style={{
              padding: "10px 22px",
            }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="container mb-5">
        <div className="row text-center">
          {[
            { label: "Students", value: "500+", color: "#6BCFDC" },
            { label: "Companies", value: "100+", color: "#BFDC80" },
            { label: "Placements", value: "300+", color: "#F1DA8E" },
          ].map((item, i) => (
            <div className="col-md-4 mb-3" key={i}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="card-custom"
              >
                {/* TOP STRIP */}
                <div
                  style={{
                    height: "5px",
                    background: item.color,
                    marginBottom: "10px",
                  }}
                />

                <h3 style={{ fontWeight: "800" }}>{item.value}</h3>
                <p style={{ color: "#555" }}>{item.label}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="container pb-5">
        <div className="row text-center">
          {[
            {
              icon: <Users size={26} />,
              title: "Student First",
              desc: "Apply, track, and manage all your applications in one place.",
              color: "#6BCFDC",
            },
            {
              icon: <Briefcase size={26} />,
              title: "Company Hiring",
              desc: "Post jobs and streamline candidate selection effortlessly.",
              color: "#F4B9B8",
            },
            {
              icon: <ShieldCheck size={26} />,
              title: "Admin Control",
              desc: "Manage approvals, track analytics, and maintain quality.",
              color: "#BFDC80",
            },
          ].map((item, i) => (
            <div className="col-md-4 mb-3" key={i}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="card-custom h-100"
              >
                {/* TOP STRIP */}
                <div
                  style={{
                    height: "5px",
                    background: item.color,
                    marginBottom: "12px",
                  }}
                />

                <div
                  style={{
                    background: item.color,
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "2px solid #000",
                    marginBottom: "10px",
                  }}
                >
                  {item.icon}
                </div>

                <h5 style={{ fontWeight: "700" }}>{item.title}</h5>
                <p style={{ color: "#555", fontSize: "0.95rem" }}>
                  {item.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="container pb-5 text-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card-custom"
          style={{
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          {/* TOP STRIP */}
          <div
            style={{
              height: "5px",
              background: "#F4B9B8",
              marginBottom: "12px",
            }}
          />

          <p style={{ fontStyle: "italic", color: "#444" }}>
            “This platform simplified our entire placement process. Clean,
            efficient, and genuinely easy to use.”
          </p>
          <h6 style={{ fontWeight: "700", marginTop: "10px" }}>
            — Placement Cell
          </h6>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;