import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Briefcase, Users, Eye } from "lucide-react";

function Dashboard() {
  const { user } = useAuth();

  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    eligibility: "",
    salary: "",
    location: "",
    deadline: "",
  });

  // ---------------- FETCH ----------------
  const fetchDrives = async () => {
    const res = await axios.get(
      `https://placement-portal-goj9.onrender.com/api/company/drives/${user.id}`
    );
    setDrives(res.data);
  };

  const fetchApplications = async (driveId) => {
    const res = await axios.get(
      `https://placement-portal-goj9.onrender.com/api/company/applications/${driveId}`
    );
    setApplications(res.data);
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  // ---------------- CREATE DRIVE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://placement-portal-goj9.onrender.com/api/company/create-drive", {
        company_id: user.id,
        ...form,
      });

      alert("Drive created");

      setForm({
        title: "",
        description: "",
        requirements: "",
        eligibility: "",
        salary: "",
        location: "",
        deadline: "",
      });

      fetchDrives();
    } catch {
      alert("Failed to create drive");
    }
  };

  const updateStatus = async (appId, status) => {
    await axios.post(
      `https://placement-portal-goj9.onrender.com/api/company/update-status/${appId}`,
      { status }
    );
    fetchApplications(selectedDrive.id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ background: "#f7f3ee", minHeight: "100vh", padding: "30px" }}>
      
      {/* HEADER */}
      <h2 style={{ fontWeight: 800 }}>Company Dashboard</h2>
      <p style={{ color: "#666" }}>
        Manage hiring drives and review applicants
      </p>

      {/* ---------------- STATS ---------------- */}
      <div className="row mt-4 mb-4">
        <div className="col-md-6">
          <div style={statCard}>
            <Briefcase size={20} />
            <h4>{drives.length}</h4>
            <p>Total Drives</p>
          </div>
        </div>

        <div className="col-md-6">
          <div style={statCard}>
            <Users size={20} />
            <h4>{applications.length}</h4>
            <p>Applicants (selected drive)</p>
          </div>
        </div>
      </div>

      <div className="row">

        {/* ---------------- CREATE DRIVE ---------------- */}
        <div className="col-md-4">
          <div className="card-custom">
            <div style={topBar("#6BCFDC")} />

            <h5 style={{ fontWeight: 700 }}>Create Drive</h5>

            <form onSubmit={handleSubmit}>
              <input className="form-control mb-2" name="title" placeholder="Title" onChange={handleChange} required />
              <textarea className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange} />
              <textarea className="form-control mb-2" name="requirements" placeholder="Requirements" onChange={handleChange} />
              <input className="form-control mb-2" name="eligibility" placeholder="Eligibility" onChange={handleChange} />
              <input className="form-control mb-2" name="salary" placeholder="Salary" onChange={handleChange} />
              <input className="form-control mb-2" name="location" placeholder="Location" onChange={handleChange} />
              <input className="form-control mb-3" name="deadline" placeholder="Deadline" onChange={handleChange} />

              <button className="btn btn-primary-custom w-100">
                Create Drive
              </button>
            </form>
          </div>
        </div>

        {/* ---------------- DRIVES ---------------- */}
        <div className="col-md-8">
          <h5 style={{ fontWeight: 700 }}>My Drives</h5>

          {drives.length === 0 ? (
            <Empty text="No drives created yet" />
          ) : (
            drives.map((d) => (
              <div key={d.id} className="card-custom mt-2">
                <div style={topBar("#BFDC80")} />

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{d.title}</strong>
                    <div style={sub}>Status: {d.status}</div>
                  </div>

                  <div className="d-flex gap-2 flex-wrap">

  {/* VIEW DETAILS */}
  <button
    className="btn btn-outline-custom btn-sm"
    onClick={() => {
      setSelectedDrive(d);
      setShowApplicants(false);
    }}
  >
    View Details
  </button>

  {/* VIEW APPLICANTS */}
  <button
    className="btn btn-outline-custom btn-sm"
    onClick={() => {
      setSelectedDrive(d);
      setShowApplicants(true);
      fetchApplications(d.id);
    }}
  >
    <Eye size={16} /> Applicants
  </button>

  {/* ✅ EXPORT EXCEL */}
  <button
    className="btn btn-primary-custom btn-sm"
    onClick={() =>
      window.open(
        `https://placement-portal-goj9.onrender.com/api/company/export-excel/${d.id}`,
        "_blank"
      )
    }
  >
    Export Excel
  </button>

  
  <button
    className="btn btn-outline-custom btn-sm"
    onClick={() =>
      window.open(
        `https://placement-portal-goj9.onrender.com/api/company/download-resumes/${d.id}`,
        "_blank"
      )
    }
  >
    Download ZIP
  </button>

</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

     
      {selectedDrive && !showApplicants && (
        <div className="card-custom mt-4">
          <div style={topBar("#6BCFDC")} />

          <h5 style={{ fontWeight: 800 }}>{selectedDrive.title}</h5>
          <p style={sub}>Status: <b>{selectedDrive.status}</b></p>

          <div style={detailBox}>
            <p><strong>Description:</strong> {selectedDrive.description || "N/A"}</p>
            <p><strong>Requirements:</strong> {selectedDrive.requirements || "N/A"}</p>
            <p><strong>Eligibility:</strong> {selectedDrive.eligibility || "N/A"}</p>
            <p><strong>Salary:</strong> {selectedDrive.salary || "N/A"}</p>
            <p><strong>Location:</strong> {selectedDrive.location || "N/A"}</p>
            <p><strong>Deadline:</strong> {selectedDrive.deadline || "N/A"}</p>
          </div>

          <button
            className="btn btn-outline-custom btn-sm mt-2"
            onClick={() => setSelectedDrive(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* ---------------- APPLICATIONS ---------------- */}
{selectedDrive && showApplicants && (
  <div className="mt-4">
    <h5 style={{ fontWeight: 700 }}>
      Applicants for {selectedDrive.title}
    </h5>

    {/* FILTER BUTTONS */}
    <div className="d-flex gap-2 mb-3">
      {["All", "Shortlisted", "Selected"].map((f) => (
        <button
          key={f}
          className="btn btn-outline-custom btn-sm"
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>

    {applications.length === 0 ? (
      <Empty text="No applicants yet" />
    ) : (
      applications
        .filter((app) => {
          if (filter === "All") return true;
          return app.status === filter;
        })
        .map((app) => (
          <div key={app.application_id} className="card-custom mt-3">
            <div style={topBar("#F4B9B8")} />

            {/* BASIC INFO */}
            <div className="d-flex justify-content-between">
              <div>
                <strong>{app.name}</strong>
                <div style={sub}>{app.email}</div>
                <div style={sub}>CGPA: {app.cgpa}</div>
                <div style={sub}>Branch: {app.branch}</div>
                <div style={sub}>Skills: {app.skills}</div>
                <div style={sub}>
                  Status: <b>{app.status}</b>
                </div>
              </div>

              {/* VIEW FULL DETAILS */}
              <button
                className="btn btn-outline-custom btn-sm"
                onClick={() => setSelectedApplicant(app)}
              >
                <Eye size={16} /> View
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-green btn-sm"
                onClick={() =>
                  updateStatus(app.application_id, "Shortlisted")
                }
              >
                Shortlist
              </button>

              <button
                className="btn btn-primary-custom btn-sm"
                onClick={() =>
                  updateStatus(app.application_id, "Selected")
                }
              >
                Select
              </button>

              <button
                className="btn btn-pink btn-sm"
                onClick={() =>
                  updateStatus(app.application_id, "Rejected")
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))
    )}
  </div>
)}
{/* ---------------- APPLICANT DETAIL VIEW ---------------- */}
{selectedApplicant && (
  <div className="card-custom mt-4">
    <div style={topBar("#6BCFDC")} />

    <h5 style={{ fontWeight: 800 }}>
      Applicant Details
    </h5>

    {/* PROFILE */}
    <div style={detailBox}>
      <p><strong>Name:</strong> {selectedApplicant.name}</p>
      <p><strong>Email:</strong> {selectedApplicant.email}</p>
      <p><strong>CGPA:</strong> {selectedApplicant.cgpa}</p>
      <p><strong>Branch:</strong> {selectedApplicant.branch}</p>
      <p><strong>Skills:</strong> {selectedApplicant.skills}</p>
    </div>

    {/* APPLICATION DETAILS */}
    <div style={detailBox}>
      <p><strong>Cover Letter:</strong> {selectedApplicant.cover_letter || "N/A"}</p>
      <p><strong>Expected Salary:</strong> {selectedApplicant.expected_salary || "N/A"}</p>

      <p>
        <strong>Resume:</strong>{" "}
        {selectedApplicant.resume ? (
          <a
            href={`https://placement-portal-goj9.onrender.com/uploads/${selectedApplicant.resume}`}
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
        ) : (
          "Not uploaded"
        )}
      </p>
    </div>

    {/* ACTIONS AGAIN */}
    <div className="d-flex gap-2 mt-3">
      <button
        className="btn btn-green btn-sm"
        onClick={() =>
          updateStatus(selectedApplicant.application_id, "Shortlisted")
        }
      >
        Shortlist
      </button>

      <button
        className="btn btn-primary-custom btn-sm"
        onClick={() =>
          updateStatus(selectedApplicant.application_id, "Selected")
        }
      >
        Select
      </button>

      <button
        className="btn btn-pink btn-sm"
        onClick={() =>
          updateStatus(selectedApplicant.application_id, "Rejected")
        }
      >
        Reject
      </button>
    </div>

    <button
      className="btn btn-outline-custom mt-3"
      onClick={() => setSelectedApplicant(null)}
    >
      Close
    </button>
  </div>
)}
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
};

const sub = {
  fontSize: "0.85rem",
  color: "#666",
};

const topBar = (color) => ({
  height: "5px",
  background: color,
  marginBottom: "10px",
});

const detailBox = {
  marginTop: "10px",
  background: "#f9f9f9",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #eee",
  fontSize: "0.9rem",
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