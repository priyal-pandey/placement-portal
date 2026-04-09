import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewDrive() {
  const { id } = useParams();
  const [drive, setDrive] = useState(null);

  useEffect(() => {
    fetchDrive();
  }, []);

  const fetchDrive = async () => {
    const res = await axios.get(
      `https://placement-portal-goj9.onrender.com/api/admin/drive/${id}`
    );
    setDrive(res.data);
  };

  if (!drive) return <p>Loading...</p>;

  return (
    <div style={{ background: "#f7f3ee", minHeight: "100vh", padding: "30px" }}>
      
      <h2 style={{ fontWeight: 800 }}>{drive.title}</h2>
      <p style={{ color: "#666" }}>Company: {drive.company}</p>

      {/* ---------------- DRIVE DETAILS ---------------- */}
      <div className="card-custom mt-3">
        <div style={topBar("#6BCFDC")} />

        <p><strong>Description:</strong> {drive.description}</p>
        <p><strong>Requirements:</strong> {drive.requirements}</p>
        <p><strong>Eligibility:</strong> {drive.eligibility}</p>
        <p><strong>Salary:</strong> {drive.salary}</p>
        <p><strong>Location:</strong> {drive.location}</p>
        <p><strong>Deadline:</strong> {drive.deadline}</p>
        <p><strong>Status:</strong> {drive.status}</p>
      </div>

      {/* ---------------- APPLICANTS ---------------- */}
      <h5 className="mt-4" style={{ fontWeight: 700 }}>
        Applicants
      </h5>

      {drive.applications.length === 0 ? (
        <Empty text="No applicants yet" />
      ) : (
        drive.applications.map((a) => (
          <div key={a.id} className="card-custom mt-2">
            <div style={topBar("#BFDC80")} />

            <strong>{a.name}</strong>
            <div style={sub}>{a.email}</div>
            <div style={sub}>CGPA: {a.cgpa}</div>
            <div style={sub}>Skills: {a.skills}</div>
            <div style={sub}>
              Status: <b>{a.status}</b>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewDrive;

/* STYLES */
const topBar = (color) => ({
  height: "5px",
  background: color,
  marginBottom: "10px",
});

const sub = {
  fontSize: "0.85rem",
  color: "#666",
};

const Empty = ({ text }) => (
  <div style={{
    marginTop: "12px",
    padding: "20px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    textAlign: "center",
    color: "#777",
  }}>
    {text}
  </div>
);