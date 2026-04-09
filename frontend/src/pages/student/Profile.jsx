import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Phone,
  FileText,
} from "lucide-react";

function StudentProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`https://placement-portal-goj9.onrender.com/api/student/profile/${user.id}`)
      .then((res) => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  if (!profile) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", background: "#f7f3ee" }}
    >
      <div
        style={{
  width: "560px",
  borderRadius: "16px",
  background: "#fff",
  border: "2px solid #000",
  boxShadow: "8px 8px 0px #000",
  overflow: "hidden",
}}
      >
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #6BCFDC, #8BE3F0)",
            padding: "30px",
            color: "#000",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              border: "2px solid #000",
            }}
          >
            <User size={30} />
          </div>

          <h4 style={{ fontWeight: 800 }}>{profile.name}</h4>
          <p style={{ fontSize: "0.9rem" }}>{profile.email}</p>
        </div>

        {/* BODY */}
        <div className="p-4">

          <div className="mb-3 d-flex align-items-center gap-2">
            <GraduationCap size={18} />
            <span>{profile.branch} • {profile.passing_year}</span>
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <Briefcase size={18} />
            <span>CGPA: {profile.cgpa}</span>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-1">
              <Briefcase size={18} />
              <span style={{ fontWeight: 600 }}>Skills</span>
            </div>
            <div
              style={{
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #eee",
                fontSize: "0.9rem",
              }}
            >
              {profile.skills || "No skills added"}
            </div>
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <Phone size={18} />
            <span>{profile.phone}</span>
          </div>

          {profile.resume && (
            <a
              href={`https://placement-portal-goj9.onrender.com/uploads/${profile.resume}`}
              target="_blank"
              rel="noreferrer"
              className="btn w-100 mt-3"
              style={{
                background: "#6BCFDC",
                border: "2px solid #000",
                fontWeight: 600,
              }}
            >
              <FileText size={16} className="me-2" />
              View Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;