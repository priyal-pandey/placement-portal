import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  Building,
  Mail,
  Globe,
  MapPin,
  Briefcase,
} from "lucide-react";

function CompanyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`https://placement-portal-goj9.onrender.com/api/company/profile/${user.id}`)
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
            background: "linear-gradient(135deg, #BFDC80, #d9f5a4)",
            padding: "30px",
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
            <Building size={30} />
          </div>

          <h4 style={{ fontWeight: 800 }}>{profile.name}</h4>
          <p style={{ fontSize: "0.9rem" }}>{profile.email}</p>
        </div>

        {/* BODY */}
        <div className="p-4">

          <div className="mb-3 d-flex align-items-center gap-2">
            <Briefcase size={18} />
            <span>{profile.industry}</span>
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <MapPin size={18} />
            <span>{profile.location}</span>
          </div>

          <div className="mb-3">
            <div style={{ fontWeight: 600 }}>Description</div>
            <div
              style={{
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #eee",
                fontSize: "0.9rem",
              }}
            >
              {profile.description || "No description"}
            </div>
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <Globe size={18} />
            <a href={profile.website} target="_blank" rel="noreferrer">
              {profile.website}
            </a>
          </div>

          <div
            style={{
              padding: "8px",
              borderRadius: "6px",
              background: profile.approved ? "#e6f7ee" : "#fff4e5",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {profile.approved ? "Approved" : "Pending Approval"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;