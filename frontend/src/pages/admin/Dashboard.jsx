import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [drives, setDrives] = useState([]);
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();

  // ---------------- FETCH ----------------
  const fetchCompanies = async () => {
    const res = await axios.get("https://placement-portal-goj9.onrender.com/api/admin/companies");
    setCompanies(res.data);
  };

  const fetchStudents = async () => {
    const res = await axios.get("https://placement-portal-goj9.onrender.com/api/admin/students");
    setStudents(res.data);
  };

  const fetchStats = async () => {
    const res = await axios.get("https://placement-portal-goj9.onrender.com/api/admin/stats");
    setStats(res.data);
  };

  const fetchDrives = async () => {
    try {
      const res = await axios.get("https://placement-portal-goj9.onrender.com/api/admin/drives");
      setDrives(res.data);
    } catch {}
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://placement-portal-goj9.onrender.com/api/admin/applications");
      setApplications(res.data);
    } catch {}
  };
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchCompanies();
    fetchStudents();
    fetchStats();
    fetchDrives();
    fetchApplications();
  }, []);

  // ---------------- ACTIONS ----------------
  const approveCompany = async (id) => {
    await axios.post(`https://placement-portal-goj9.onrender.com/api/admin/approve-company/${id}`);
    fetchCompanies();
  };

  const blacklistCompany = async (id) => {
    await axios.post(`https://placement-portal-goj9.onrender.com/api/admin/blacklist-company/${id}`);
    fetchCompanies();
  };

  const deleteCompany = async (id) => {
    await axios.delete(`https://placement-portal-goj9.onrender.com/api/admin/delete-company/${id}`);
    fetchCompanies();
  };

  const blacklistStudent = async (id) => {
    await axios.post(`https://placement-portal-goj9.onrender.com/api/admin/blacklist-student/${id}`);
    fetchStudents();
  };

  return (
    <div style={{ background: "#f7f3ee", minHeight: "100vh", padding: "30px" }}>
      
      {/* HEADER */}
      <h2 style={{ fontWeight: 800 }}>Admin Dashboard</h2>
      <p style={{ color: "#666" }}>
        Manage companies, students, drives and applications
      </p>

      {/* ---------------- STATS ---------------- */}
      {stats && (
        <div className="row mt-4 mb-4">
          {[
            { label: "Students", value: stats.total_students, icon: Users },
            { label: "Companies", value: stats.total_companies, icon: Building2 },
            { label: "Drives", value: stats.total_drives, icon: Building2 },
            { label: "Applications", value: stats.total_applications, icon: Users },
          ].map((item, i) => (
            <div className="col-md-3 mb-3" key={i}>
              <div style={statCard}>
                <item.icon size={20} />
                <h4 style={{ marginTop: "10px" }}>{item.value}</h4>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row">

        {/* ---------------- COMPANIES ---------------- */}
        <div className="col-md-6">
          <h5 style={{ fontWeight: 700 }}>Companies</h5>

          {companies.length === 0 ? (
            <Empty text="No companies registered yet" />
          ) : (
            companies.map((c) => (
              <div key={c.id} style={card}>
                <div>
                  <strong>{c.name}</strong>
                  <div style={sub}>{c.email}</div>
                  <div style={sub}>
                    <span style={{ color: c.approved ? "green" : "red", fontWeight: 600 }}>
  {c.approved ? "Approved" : "Pending"}
</span> | Blocked:{" "}
                    {c.blacklisted ? "Yes" : "No"}
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-2">

                  {!c.approved && (
                    <button style={approveBtn} onClick={() => approveCompany(c.id)}>
                      <CheckCircle size={16} /> Approve
                    </button>
                  )}

                  <button style={dangerBtn} onClick={() => blacklistCompany(c.id)}>
                    <XCircle size={16} /> Block
                  </button>

                  <button
                    style={outlineBtn}
                    onClick={() => navigate(`/admin/view/company/${c.id}`)}
                  >
                    <Eye size={16} /> View
                  </button>

                  <button style={deleteBtn} onClick={() => deleteCompany(c.id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ---------------- STUDENTS ---------------- */}
        <div className="col-md-6">
          <h5 style={{ fontWeight: 700 }}>Students</h5>

          {students.length === 0 ? (
            <Empty text="No students registered yet" />
          ) : (
            students.map((s) => (
              <div key={s.id} style={card}>
                <div>
                  <strong>{s.name}</strong>
                  <div style={sub}>{s.email}</div>
                  <div style={sub}>
                    Blocked: {s.blacklisted ? "Yes" : "No"}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <button style={dangerBtn} onClick={() => blacklistStudent(s.id)}>
                    <XCircle size={16} /> Block
                  </button>

                  <button
                    style={outlineBtn}
                    onClick={() => navigate(`/admin/view/student/${s.id}`)}
                  >
                    <Eye size={16} /> View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

       
   {/* ---------------- DRIVES ---------------- */}
<div className="col-md-6 mt-4">
  <h5 style={{ fontWeight: 700 }}>Drives</h5>

  {drives.length === 0 ? (
    <Empty text="No drives created yet" />
  ) : (
    drives.map((d) => (
      <div key={d.id} style={card}>
        <div>
          <strong>{d.title}</strong>
          <div style={sub}>Status: {d.status}</div>
        </div>

        <div className="d-flex gap-2 mt-2">

          {d.status === "Pending" && (
            <>
              <button
                style={approveBtn}
                onClick={async () => {
                  await axios.post(
                    `https://placement-portal-goj9.onrender.com/api/admin/approve-drive/${d.id}`
                  );
                  fetchDrives();
                }}
              >
                <CheckCircle size={16} /> Approve
              </button>

              <button
                style={dangerBtn}
                onClick={async () => {
                  await axios.post(
                    `https://placement-portal-goj9.onrender.com/api/admin/reject-drive/${d.id}`
                  );
                  fetchDrives();
                }}
              >
                <XCircle size={16} /> Reject
              </button>
            </>
          )}

        
          <button
            style={outlineBtn}
            onClick={async () => {
              const res = await axios.get(
                `https://placement-portal-goj9.onrender.com/api/admin/drive/${d.id}`
              );
              setSelectedItem({ ...res.data, type: "drive" });
            }}
          >
            <Eye size={16} /> View
          </button>
        </div>
      </div>
    ))
  )}
</div>

       

{/* ---------------- DETAIL VIEW ---------------- */}
{selectedItem && (
  <div style={{ ...card, marginTop: "20px" }}>
    <h5 style={{ fontWeight: 700 }}>
      {selectedItem.type === "drive"
        ? "Drive Details"
        : "Application Details"}
    </h5>

    {/* DRIVE DETAILS */}
    {selectedItem.type === "drive" && (
      <>
        <div style={sub}>Title: {selectedItem.title}</div>
        <div style={sub}>Company: {selectedItem.company}</div>
        <div style={sub}>Description: {selectedItem.description}</div>
        <div style={sub}>Requirements: {selectedItem.requirements}</div>
        <div style={sub}>Eligibility: {selectedItem.eligibility}</div>
        <div style={sub}>Salary: {selectedItem.salary}</div>
        <div style={sub}>Location: {selectedItem.location}</div>
        <div style={sub}>Deadline: {selectedItem.deadline}</div>

        <hr />

        <strong>Applications</strong>

        {selectedItem.applications?.map((app) => (
          <div key={app.id} style={{ marginTop: "10px" }}>
            <div style={sub}>Name: {app.name}</div>
            <div style={sub}>Email: {app.email}</div>
            <div style={sub}>CGPA: {app.cgpa}</div>
            <div style={sub}>Skills: {app.skills}</div>
            <div style={sub}>Status: {app.status}</div>

            
            <button
              style={{ ...outlineBtn, marginTop: "5px" }}
              onClick={() =>
                navigate(`/admin/view/student/${app.id}`)
              }
            >
              <Eye size={16} /> View Profile
            </button>
          </div>
        ))}
      </>
    )}

   
    {selectedItem.type === "application" && (
      <>
        <div style={sub}>Application ID: {selectedItem.id}</div>
        <div style={sub}>Student ID: {selectedItem.student_id}</div>
        <div style={sub}>Drive ID: {selectedItem.drive_id}</div>
        <div style={sub}>Status: {selectedItem.status}</div>

     
        <button
          style={{ ...outlineBtn, marginTop: "10px" }}
          onClick={() =>
            navigate(`/admin/view/student/${selectedItem.student_id}`)
          }
        >
          <Eye size={16} /> View Student Profile
        </button>
      </>
    )}

    <button
      style={{ ...outlineBtn, marginTop: "15px" }}
      onClick={() => setSelectedItem(null)}
    >
      Close
    </button>
  </div>
)}

      </div>
    </div>
  );
}

export default Dashboard;

/* ---------------- STYLES ---------------- */

const statCard = {
  border: "2px solid #000",
  borderRadius: "12px",
  padding: "18px",
  background: "#fff",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const card = {
  border: "2px solid #000",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "12px",
  background: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const sub = {
  fontSize: "0.85rem",
  color: "#666",
};

const Empty = ({ text }) => (
  <div
    style={{
      marginTop: "12px",
      padding: "20px",
      border: "2px dashed #ccc",
      borderRadius: "10px",
      textAlign: "center",
      color: "#777",
    }}
  >
    {text}
  </div>
);

/* BUTTONS */

const approveBtn = {
  border: "2px solid #000",
  background: "#BFDC80",
  padding: "6px 10px",
  fontWeight: 600,
};

const dangerBtn = {
  border: "2px solid #000",
  background: "#F4B9B8",
  padding: "6px 10px",
  fontWeight: 600,
};

const deleteBtn = {
  border: "2px solid #000",
  background: "#ffd6d6",
  padding: "6px 10px",
  fontWeight: 600,
};

const outlineBtn = {
  border: "2px solid #000",
  background: "#fff",
  padding: "6px 10px",
  fontWeight: 600,
};