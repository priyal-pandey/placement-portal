import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplicationDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [student, setStudent] = useState(null);
  const [drive, setDrive] = useState(null);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const res = await axios.get(
        `https://placement-portal-goj9.onrender.com/api/admin/application/${id}`
      );
      setApplication(res.data);

      // optional: fetch related data
      if (res.data.student_id) {
        const s = await axios.get(
          `https://placement-portal-goj9.onrender.com/api/admin/student/${res.data.student_id}`
        );
        setStudent(s.data);
      }

      if (res.data.drive_id) {
        const d = await axios.get(
          `https://placement-portal-goj9.onrender.com/api/admin/drive/${res.data.drive_id}`
        );
        setDrive(d.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!application) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div style={page}>
      <h3 style={{ fontWeight: 800 }}>Application Details</h3>

      <div style={card}>
        <p><strong>Application ID:</strong> {application.id}</p>
        <p><strong>Status:</strong> {application.status}</p>
        <p><strong>Student ID:</strong> {application.student_id}</p>
        <p><strong>Drive ID:</strong> {application.drive_id}</p>
      </div>

      {/* STUDENT INFO */}
      {student && (
        <div style={card}>
          <h5>Student Info</h5>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p><strong>CGPA:</strong> {student.cgpa}</p>
          <p><strong>Skills:</strong> {student.skills}</p>
        </div>
      )}

      {/* DRIVE INFO */}
      {drive && (
        <div style={card}>
          <h5>Drive Info</h5>
          <p><strong>Title:</strong> {drive.title}</p>
          <p><strong>Status:</strong> {drive.status}</p>
          <p><strong>Company ID:</strong> {drive.company_id}</p>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetails;

/* ---------------- STYLES ---------------- */

const page = {
  background: "#f7f3ee",
  minHeight: "100vh",
  padding: "30px",
};

const card = {
  border: "1px solid #e5e5e5",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "15px",
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};