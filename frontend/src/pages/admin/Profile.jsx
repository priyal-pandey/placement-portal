import { useAuth } from "../../context/AuthContext";
import { Shield } from "lucide-react";

function AdminProfile() {
  const { user } = useAuth();

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
            background: "linear-gradient(135deg, #F4B9B8, #ffd6d6)",
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
            <Shield size={30} />
          </div>

          <h4 style={{ fontWeight: 800 }}>Administrator</h4>
        </div>

        {/* BODY */}
        <div className="p-4 text-center">
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Admin ID: {user.id}
          </p>

          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              borderRadius: "6px",
              background: "#f9f9f9",
              border: "1px solid #eee",
            }}
          >
            Full system access enabled
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;