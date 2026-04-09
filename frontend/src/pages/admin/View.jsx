

import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

function AdminView() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://placement-portal-goj9.onrender.com/api/admin/${type}/${id}`)
      .then((res) => setData(res.data));
  }, [type, id]);


  if (!data) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div style={{ border: "2px solid #000", padding: "20px" }}>
        {Object.keys(data).map((key) => (
          <p key={key}>
            <b>{key}:</b> {String(data[key])}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AdminView;