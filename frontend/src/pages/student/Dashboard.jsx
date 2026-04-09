import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Briefcase, FileText, Eye } from "lucide-react";

function Dashboard() {
  const { user } = useAuth();

  const [drives, setDrives] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    resume: null,
    cover_letter: "",
    expected_salary: "",
  });

  // ---------------- FETCH ----------------
  const fetchDrives = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/student/drives");
      setDrives(Array.isArray(res.data) ? res.data : []);
    } catch {
      setDrives([]);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student/applications/${user.id}`
      );
      setApplications(Array.isArray(res.data) ? res.data : []);
    } catch {
      setApplications([]);
    }
  };

  useEffect(() => {
    Promise.all([fetchDrives(), fetchApplications()]).finally(() =>
      setLoading(false)
    );
  }, []);

  // ---------------- APPLY ----------------
  const handleApply = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("student_id", user.id);
    formData.append("drive_id", selectedItem.id);
    formData.append("cover_letter", form.cover_letter);
    formData.append("expected_salary", form.expected_salary);

    if (form.resume) {
      formData.append("resume", form.resume);
    }

    try {
      await axios.post("http://localhost:5000/api/student/apply", formData);
      alert("Applied successfully");

      setSelectedItem(null);
      setForm({
        resume: null,
        cover_letter: "",
        expected_salary: "",
      });

      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Application failed");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
    <div style={{ background: "#f7f3ee", minHeight: "100vh", padding: "30px" }}>
      
      {/* HEADER */}
      <h2 style={{ fontWeight: 800 }}>Student Dashboard</h2>
      <p style={{ color: "#666" }}>
        Explore opportunities and track your applications
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
            <FileText size={20} />
            <h4>{applications.length}</h4>
            <p>My Applications</p>
          </div>
        </div>
      </div>

      <div className="row g-4">

        {/* ---------------- DRIVES ---------------- */}
        <div className="col-md-7">
          <h5 style={{ fontWeight: 700 }}>Available Drives</h5>

          {loading ? (
            <Empty text="Loading drives..." />
          ) : drives.length === 0 ? (
            <Empty text="No drives available yet" />
          ) : (
            drives.map((d) => (
              <div key={d.id} className="card-custom mt-3">
                <div style={topBar("#6BCFDC")} />

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{d.title}</strong>
                    <div style={sub}>Company: {d.company}</div>
                    <div style={sub}>{d.description}</div>
                    <div style={sub}>Salary: {d.salary}</div>
                    <div style={sub}>Location: {d.location}</div>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <button
                      className="btn btn-outline-custom btn-sm"
                      onClick={() => setSelectedItem({ ...d, type: "drive", mode: "view" })}
                    >
                      <Eye size={16} /> View
                    </button>

                    <button
                      className="btn btn-primary-custom btn-sm"
                      onClick={() => setSelectedItem({ ...d, type: "drive", mode: "apply" })}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ---------------- APPLICATIONS ---------------- */}
        <div className="col-md-5">
          <h5 style={{ fontWeight: 700 }}>My Applications</h5>

          {loading ? (
            <Empty text="Loading applications..." />
          ) : applications.length === 0 ? (
            <Empty text="No applications yet" />
          ) : (
            applications.map((a) => (
              <div key={a.application_id} className="card-custom mt-3">
                <div style={topBar("#BFDC80")} />

                <strong>{a.job_title}</strong>
                <div style={sub}>Company: {a.company}</div>
                <div style={sub}>
  Status:{" "}
  <span style={getStatusStyle(a.status)}>
    {a.status}
  </span>
</div>

                <button
                  className="btn btn-outline-custom btn-sm mt-2"
                  onClick={() => setSelectedItem({ ...a, type: "application" })}
                >
                  <Eye size={16} /> View Application
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ---------------- DRIVE VIEW / APPLY ---------------- */}
      {selectedItem?.type === "drive" && (
        <div className="card-custom mt-4">
          <div style={topBar("#000")} />

          <h5 style={{ fontWeight: 700 }}>{selectedItem.title}</h5>

          <div style={sub}>Company: {selectedItem.company}</div>
          <div style={sub}>Description: {selectedItem.description}</div>
          <div style={sub}>Requirements: {selectedItem.requirements}</div>
          <div style={sub}>Eligibility: {selectedItem.eligibility}</div>
          <div style={sub}>Salary: {selectedItem.salary}</div>
          <div style={sub}>Location: {selectedItem.location}</div>
          <div style={sub}>Deadline: {selectedItem.deadline}</div>

          {selectedItem.mode === "apply" && (
            <form onSubmit={handleApply} className="mt-3">
              <textarea
                className="form-control mb-2"
                name="cover_letter"
                placeholder="Cover Letter"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="expected_salary"
                placeholder="Expected Salary"
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                type="file"
                name="resume"
                onChange={handleChange}
              />

              <button className="btn btn-primary-custom me-2">
                Submit Application
              </button>
            </form>
          )}

          <button
            className="btn btn-outline-custom mt-3"
            onClick={() => setSelectedItem(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* ---------------- APPLICATION VIEW ---------------- */}
      {selectedItem?.type === "application" && (
        <div className="card-custom mt-4">
          <div style={topBar("#6BCFDC")} />

          <h5 style={{ fontWeight: 700 }}>Application Details</h5>

          <div style={sub}>Job: {selectedItem.job_title}</div>
          <div style={sub}>Company: {selectedItem.company}</div>
          <div style={sub}>
  Status:{" "}
  <span style={getStatusStyle(selectedItem.status)}>
    {selectedItem.status}
  </span>
</div>

          <div style={sub}>
            Cover Letter: {selectedItem.cover_letter || "N/A"}
          </div>

          <div style={sub}>
            Resume:{" "}
            {selectedItem.resume ? (
              <a
                href={`http://localhost:5000/uploads/${selectedItem.resume}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            ) : (
              "Not uploaded"
            )}
          </div>

          <button
            className="btn btn-outline-custom mt-3"
            onClick={() => setSelectedItem(null)}
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
const getStatusStyle = (status) => {
  switch (status) {
    case "Applied":
      return {
        background: "#eee",
        padding: "3px 8px",
        borderRadius: "6px",
        fontWeight: 600,
      };

    case "Shortlisted":
      return {
        background: "#fff3cd",
        color: "#856404",
        padding: "3px 8px",
        borderRadius: "6px",
        fontWeight: 600,
      };

    case "Selected":
      return {
        background: "#d4edda",
        color: "#155724",
        padding: "3px 8px",
        borderRadius: "6px",
        fontWeight: 600,
      };

    case "Rejected":
      return {
        background: "#f8d7da",
        color: "#721c24",
        padding: "3px 8px",
        borderRadius: "6px",
        fontWeight: 600,
      };

    default:
      return {};
  }
};