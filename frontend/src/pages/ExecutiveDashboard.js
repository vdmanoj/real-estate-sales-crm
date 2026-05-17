import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt
} from "react-icons/fa";

import "./executive.css";

export default function ExecutiveDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [page, setPage] =
    useState("home");

  // EMPLOYEE STATES
  const [empName, setEmpName] =
    useState("");

  const [empEmail, setEmpEmail] =
    useState("");

  const [empPassword, setEmpPassword] =
    useState("");

  const [empRole, setEmpRole] =
    useState("inside");


  // CUSTOMER STATES
  const [custName, setCustName] =
    useState("");

  const [custEmail, setCustEmail] =
    useState("");

  const [custPhone, setCustPhone] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");


  // DATA
  const [employees, setEmployees] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);


  // LOAD EMPLOYEES
  const loadEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/auth/all"
      );

      setEmployees(res.data);

    } catch (err) {

      console.log(err);
    }
  };


  // LOAD CUSTOMERS
  const loadCustomers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/customers/all"
      );

      setCustomers(res.data);

    } catch (err) {

      console.log(err);
    }
  };


  // FIRST LOAD
  useEffect(() => {

    loadEmployees();
    loadCustomers();

  }, []);


  // ADD EMPLOYEE
  const addEmployee = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: empName,
          email: empEmail,
          password: empPassword,
          role: empRole
        }
      );

      alert(res.data.message);

      loadEmployees();

      setEmpName("");
      setEmpEmail("");
      setEmpPassword("");
      setEmpRole("inside");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Employee Add Failed"
      );
    }
  };


  // ADD CUSTOMER
  const addCustomer = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/customers/add",
        {
          name: custName,
          email: custEmail,
          phone: custPhone,
          assignedTo,
          createdBy: user.name
        }
      );

      alert(res.data.message);

      loadCustomers();

      setCustName("");
      setCustEmail("");
      setCustPhone("");
      setAssignedTo("");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Customer Add Failed"
      );
    }
  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };


  return (

    <div className="exec-container">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2>Executive</h2>

        <div
          className="menu"
          onClick={() => setPage("home")}
        >
          <FaHome />
          <span>Home</span>
        </div>

        <div
          className="menu"
          onClick={() => setPage("employee")}
        >
          <FaUserPlus />
          <span>Add Employee</span>
        </div>

        <div
          className="menu"
          onClick={() => setPage("customer")}
        >
          <FaUserPlus />
          <span>Add Customer</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("allEmployees")
          }
        >
          <FaUsers />
          <span>All Employees</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("allCustomers")
          }
        >
          <FaClipboardList />
          <span>All Customers</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("assigned")
          }
        >
          <FaClipboardList />
          <span>Assigned</span>
        </div>

        <div
          className="menu logout"
          onClick={logout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>

      </div>


      {/* MAIN */}
      <div className="main-content">

        {/* HOME */}
        {page === "home" && (

          <div className="home-box">

            <h1>
              Welcome {user.name}
            </h1>

            <p>
              Executive Dashboard
            </p>

          </div>
        )}


        {/* ADD EMPLOYEE */}
        {page === "employee" && (

          <div className="form-box">

            <h2>Add Employee</h2>

            <input
              type="text"
              placeholder="Name"
              value={empName}
              onChange={(e) =>
                setEmpName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={empEmail}
              onChange={(e) =>
                setEmpEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={empPassword}
              onChange={(e) =>
                setEmpPassword(e.target.value)
              }
            />

            <select
            value={empRole}
           onChange={(e) =>
           setEmpRole(e.target.value)
         }
>
           <option value="inside">
            Inside Sales
            </option>

            <option value="outside">
             Outside Sales
            </option>
         </select>

            <button
              onClick={addEmployee}
            >
              Add Employee
            </button>

          </div>
        )}


        {/* ADD CUSTOMER */}
        {page === "customer" && (

          <div className="form-box">

            <h2>Add Customer</h2>

            <input
              type="text"
              placeholder="Customer Name"
              value={custName}
              onChange={(e) =>
                setCustName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Customer Email"
              value={custEmail}
              onChange={(e) =>
                setCustEmail(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={custPhone}
              onChange={(e) =>
                setCustPhone(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Assign To"
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(e.target.value)
              }
            />

            <button
              onClick={addCustomer}
            >
              Add Customer
            </button>

          </div>
        )}


       {page === "allEmployees" && (
  <div>

    <h2>All Employees</h2>

    <div className="list-grid">

      {employees.map((e) => (

        <div key={e._id} className="card clean-card">

          <div className="left">
            <h3>{e.name}</h3>
            <p>{e.email}</p>
          </div>

          <div className="right">
            <span className="badge">
              {e.role}
            </span>
          </div>

        </div>

      ))}

    </div>

  </div>
)}

      {page === "allCustomers" && (
  <div>

    <h2>All Customers</h2>

    <div className="list-grid">

      {customers.map((c) => (

        <div key={c._id} className="card clean-card">

          <div className="left">
            <h3>{c.name}</h3>
            <p>{c.phone}</p>
          </div>

          <div className="right">
            <span className="small-text">
              {c.assignedTo}
            </span>
          </div>

        </div>

      ))}

    </div>

  </div>
)}


       {page === "assigned" && (
  <div>

    <h2>Assigned Customers</h2>

    <div className="list-grid">

      {customers.map((c) => (

        <div key={c._id} className="card clean-card">

          <div className="left">
            <h3>{c.name}</h3>
            <p>{c.phone}</p>
          </div>

          <div className="right">

            <span className="small-text">
              {c.assignedTo}
            </span>

            <span className="status">
              {c.status || "pending"}
            </span>

          </div>

        </div>

      ))}

    </div>

  </div>
)}
      </div>

    </div>
  );
}