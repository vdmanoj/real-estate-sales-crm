import React, { useState } from "react";
import axios from "axios";

function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "inside",
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/add", form);
      alert("Employee Added ✅");
    } catch (err) {
      alert("Error adding employee");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="inside">Inside</option>
        <option value="outside">Outside</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddEmployee;