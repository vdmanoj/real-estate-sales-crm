import axios from "axios";
import { useEffect, useState } from "react";

export default function Customers() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Customers</h2>

      {data.map(c => (
        <div key={c._id} style={{
          background: "#1e293b",
          margin: "10px 0",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <p><b>Name:</b> {c.name}</p>
          <p><b>Phone:</b> {c.phone}</p>
          <p><b>Status:</b> {c.status}</p>
        </div>
      ))}

    </div>
  );
}