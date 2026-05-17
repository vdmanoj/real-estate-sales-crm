import axios from "axios";
import { useEffect, useState } from "react";

export default function Employees() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", role: "" });

  // Load data
  const loadData = () => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setData(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete
  const deleteEmp = async (id) => {
    await axios.delete('http://localhost:5000/api/users/${id}');
    loadData();
  };

  // Start edit
  const startEdit = (emp) => {
    setEditId(emp._id);
    setEditData(emp);
  };

  // Save edit
  const saveEdit = async () => {
    await axios.put('http://localhost:5000/api/users/${editId}', editData);
    setEditId(null);
    loadData();
  };

  // Filtered data
    const filtered = data.filter(emp =>
     (emp.name || "").toLowerCase().includes(search.toLowerCase()) &&
     (roleFilter === "" || emp.role === roleFilter)
    );
  

  return (
    <div style={{ padding: "20px", color: "white" }}>

      <h2>Employees</h2>

      {/* SEARCH + FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search by name..."
          onChange={e => setSearch(e.target.value)}
        />

        <select onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="inside">Inside</option>
          <option value="outside">Outside</option>
          <option value="executive">Executive</option>
        </select>
      </div>

      {/* TABLE */}
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(emp => (
            <tr key={emp._id}>

              <td>
                {editId === emp._id ? (
                  <input
                    value={editData.name}
                    onChange={e => setEditData({...editData, name: e.target.value})}
                  />
                ) : emp.name}
              </td>

              <td>
                {editId === emp._id ? (
                  <input
                    value={editData.email}
                    onChange={e => setEditData({...editData, email: e.target.value})}
                  />
                ) : emp.email}
              </td>

              <td>
                {editId === emp._id ? (
                  <select
                    value={editData.role}
                    onChange={e => setEditData({...editData, role: e.target.value})}
                  >
                    <option value="inside">Inside</option>
                    <option value="outside">Outside</option>
                    <option value="executive">Executive</option>
                  </select>
                ) : emp.role}
              </td>

              <td>
                {editId === emp._id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button onClick={() => startEdit(emp)}>Edit</button>
                    <button onClick={() => deleteEmp(emp._id)}>Delete</button>
                  </>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}