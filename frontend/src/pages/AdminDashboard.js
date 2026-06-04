import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaUsers,
  FaUserTie,
  FaSignOutAlt,
  FaHome,
  FaChartBar,
  FaClipboardCheck,
  FaCog,
  FaPlus
} from "react-icons/fa";

import "./admin.css";

export default function AdminDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [page, setPage] =
    useState("home");

  // FILTER
  const [selectedRole, setSelectedRole] =
    useState("inside");

  const [search, setSearch] =
    useState("");

  // EMPLOYEE FORM STATES
  const [empName, setEmpName] =
    useState("");

  const [empEmail, setEmpEmail] =
    useState("");

  const [empPassword, setEmpPassword] =
    useState("");

  const [empRole, setEmpRole] =
    useState("inside");

  const [empPhone, setEmpPhone] =
    useState("");

  const [empGender, setEmpGender] =
    useState("");


  // SETTINGS
  const [name] =
  useState(user.name || "");

const [email] =
  useState(user.email || "");

const [role] =
  useState(user.role || "");

  // DATA
  const [employees, setEmployees] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  // LOAD EMPLOYEES
  const loadEmployees = async () => {

    try {

      const res = await axios.get(
        "https://real-estate-sales-crm-vdmanoj.onrender.com/api/users/all"
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
        "https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/all"
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

    if (
      !empName ||
      !empEmail ||
      !empPassword ||
      !empRole ||
      !empPhone ||
      !empGender 
    ) {

      alert(
        "All fields are mandatory"
      );

      return;
    }

    if (
      empPhone.length !== 10 ||
      isNaN(empPhone)
    ) {

      alert(
        "Phone number must be 10 digits"
      );

      return;
    }

    try {

      const res = await axios.post(

        "https://real-estate-sales-crm-vdmanoj.onrender.com/api/users/register",

        {
          name: empName,
          email: empEmail,
          password: empPassword,
          role: empRole,
          phone: empPhone,
          gender: empGender,
          
        }
      );

      alert(res.data.message);

      loadEmployees();

      setEmpName("");
      setEmpEmail("");
      setEmpPassword("");
      setEmpRole("inside");
      setEmpPhone("");
      setEmpGender("");
      

      setPage("employees");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Employee Add Failed"
      );
    }
  };

  // ATTENDANCE
  const updateAttendance =
    async (id, status) => {

      try {

        await axios.put(
          `https://real-estate-sales-crm-vdmanoj.onrender.com/api/users/attendance/${id}`,
          {
            attendance: status
          }
        );

        loadEmployees();

      } catch (err) {

        console.log(err);
      }
    };

  // UPDATE PROFILE
  
  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (

    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="admin-sidebar">

        <h2>Admin</h2>

        <div
          className="menu"
          onClick={() =>
            setPage("home")
          }
        >
          <FaHome />
          <span>Home</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("employees")
          }
        >
          <FaUserTie />
          <span>Employees</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("customers")
          }
        >
          <FaUsers />
          <span>Customers</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("sales")
          }
        >
          <FaChartBar />
          <span>Sales</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("attendance")
          }
        >
          <FaClipboardCheck />
          <span>Attendance</span>
        </div>

        <div
          className="menu"
          onClick={() =>
            setPage("settings")
          }
        >
          <FaCog />
          <span>Settings</span>
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
      <div className="admin-main">

        {/* HOME */}
       {/* HOME */}
{page === "home" && (

  <div className="home-page">

    {/* TOP */}
    <div className="dashboard-top">

      <div>

        <h1 className="welcome-title">
          Welcome Back,
          {" "}
          {user.name}
        </h1>

        <p className="welcome-subtitle">
          Manage your employees and customers easily
        </p>

      </div>

    </div>


    {/* DASHBOARD CARDS */}
    <div className="dashboard-cards">

      {/* EMPLOYEES */}
      <div className="dash-card employees-card">

        <div className="card-top">

          <div>

            <h3>
              Employees
            </h3>

            <h1>
              {employees.length}
            </h1>

          </div>

          <FaUserTie className="dash-icon" />

        </div>

        <p>
          Total Employees
        </p>

      </div>


      {/* CUSTOMERS */}
      <div className="dash-card customers-card">

        <div className="card-top">

          <div>

            <h3>
              Customers
            </h3>

            <h1>
              {customers.length}
            </h1>

          </div>

          <FaUsers className="dash-icon" />

        </div>

        <p>
          Total Customers
        </p>

      </div>


      {/* INTERESTED */}
      <div className="sales-card interested-card">

        <div className="sales-top">

          <h3>Interested </h3>

          <span>✅</span>

        </div>

        <h1>
          {
            customers.filter(
              (c) =>
                c?.outsideAssignedTo &&
                c.outsideAssignedTo !== ""
            ).length
          }
        </h1>

      </div>

        


      {/* ADD EMPLOYEE */}
      <div
        className="dash-card add-card"
        onClick={() =>
          setPage("addEmployee")
        }
      >

        <div className="card-top">

          <div>

            <h3>
              Add Employee
            </h3>

            

          </div>

          <FaPlus className="dash-icon" />

        </div>

        <p>
          Create New Employee
        </p>

      </div>

    </div>


    {/* EMPLOYEE SECTION */}
    <div className="home-employee-section">

      <div className="employee-header">

        <button
          onClick={() =>
            setSelectedRole("inside")
          }
        >
          Inside Sales
        </button>

        <button
          onClick={() =>
            setSelectedRole("outside")
          }
        >
          Outside Sales
        </button>

      </div>


      {/* EMPLOYEE LIST */}
      <div className="employee-home-list">

        {employees
          .filter(
            (e) =>
              e.role?.toLowerCase() ===
              selectedRole
          )
          .map((e) => (

            <div
              className="employee-home-card"
              key={e._id}
            >

              <div className="employee-home-left">

                <img
                  src={
                    e.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt=""
                  className="employee-home-profile"
                />

                <div>

                  <h3>
                    {e.name}
                  </h3>

                  <p>
                    {e.email}
                  </p>

                  <span>

                    {e.role === "inside"
                      ? "Inside Sales"
                      : "Outside Sales"}

                  </span>

                </div>

              </div>

            </div>
        ))}

      </div>

    </div>

  </div>
)}

        {/* ADD EMPLOYEE */}
        {page === "addEmployee" && (

          <div className="form-container">

            <div className="form-box">

              <h2>
                Add Employee
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                value={empName}
                onChange={(e) =>
                  setEmpName(e.target.value)
                }
              />

              <input
                type="email"
                placeholder="Email Address"
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

              <input
                type="text"
                placeholder="Phone Number"
                value={empPhone}
                onChange={(e) =>
                  setEmpPhone(e.target.value)
                }
                maxLength={10}
              />

              <select
                value={empGender}
                onChange={(e) =>
                  setEmpGender(e.target.value)
                }
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>


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
                <option value="executive">
                  Executive
                </option>
                

              </select>

              <button
                onClick={addEmployee}
              >
                Add Employee
              </button>

            </div>

          </div>
        )}

       {/* EMPLOYEES */}
{page === "employees" && (

  <div className="employee-page">

    {/* TOP BUTTONS */}
    <div className="employee-header">

      <button
        onClick={() =>
          setSelectedRole("all")
        }
      >
        All Employees
      </button>

      <button
        onClick={() =>
          setSelectedRole("inside")
        }
      >
        Inside
      </button>

      <button
        onClick={() =>
          setSelectedRole("outside")
        }
      >
        Outside
      </button>

    </div>


    {/* SEARCH */}
    <div className="employee-search">

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>


    {/* EMPLOYEE LIST */}
    <div className="employee-list">

      {employees
        .filter((e) => {

          const matchesSearch =
            e.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesRole =
            selectedRole === "all"
              ? true
              : e.role?.toLowerCase() ===
                selectedRole;

          return (
            matchesSearch &&
            matchesRole
          );
        })
        .map((e) => (

          <div
            key={e._id}
            className="employee-item"
          >

            {/* LEFT */}
            <div className="employee-left">

              <img
                src={
                  e.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt=""
                className="employee-profile"
              />

              <div>

                <h3>
                  {e.name}
                </h3>

                <p>
                  {e.email}
                </p>

                <span className="employee-role">

                  {e.role === "inside"
                    ? "Inside Sales"
                    : e.role === "outside"
                    ? "Outside Sales"
                    : e.role}

                </span>

              </div>

            </div>


            {/* RIGHT */}
            <div className="employee-actions">

              <button className="view-btn">
                View
              </button>

            </div>

          </div>
      ))}

    </div>

  </div>
)}

       {/* CUSTOMERS */}
{page === "customers" && (

  <div className="customer-page">

    <h2 className="customer-title">
      Customer Details
    </h2>

    <div className="customer-list">

      {customers.length > 0 ? (
        customers.map((c) => (

          <div
            key={c._id}
            className="customer-card"
          >

            {/* LEFT */}
            <div className="customer-left">

              <div className="customer-avatar">

                {c?.name ? c.name.charAt(0) : "?"}

              </div>

              <div>

                <h3>
                  {c?.name || "No Name"}
                </h3>

                <p>
                  📞 {c?.phone || "No Phone"}
                </p>

                <p>
                  📧 {c?.email || "No Email"}
                </p>

                <span className="assigned-badge">

                  Assigned:{" "}
                  {c?.outsideAssignedTo
                    ? c.outsideAssignedTo
                    : c?.assignedTo
                      ? c.assignedTo
                      : "Not Assigned"}

                </span>

              </div>

            </div>


          </div>

        ))
      ) : (

        <div className="empty-box">
          No Customers Found in MongoDB
        </div>

      )}

    </div>

  </div>
)}
        {/* SALES */}
       {/* SALES */}
{page === "sales" && (

  <div className="sales-page">

    <h2 className="sales-title">
      Sales Report
    </h2>

    <div className="sales-grid">

      {/* TOTAL CUSTOMERS */}
      <div className="sales-card total-card">

        <div className="sales-top">

          <h3>Total Customers</h3>

          <span>👥</span>

        </div>

        <h1>{customers.length}</h1>

      </div>


      {/* INTERESTED = OUTSIDE ASSIGNED */}
      <div className="sales-card interested-card">

        <div className="sales-top">

          <h3>Interested </h3>

          <span>✅</span>

        </div>

        <h1>
          {
            customers.filter(
              (c) =>
                c?.outsideAssignedTo &&
                c.outsideAssignedTo !== ""
            ).length
          }
        </h1>

      </div>


      {/* NOT INTERESTED = TOTAL - OUTSIDE ASSIGNED */}
      <div className="sales-card not-card">

        <div className="sales-top">

          <h3>Not Interested</h3>

          <span>❌</span>

        </div>

        <h1>
          {
            customers.length -
            customers.filter(
              (c) =>
                c?.outsideAssignedTo &&
                c.outsideAssignedTo !== ""
            ).length
          }
        </h1>

      </div>

    </div>

  </div>
)}

        {/* ATTENDANCE */}
        {/* ATTENDANCE */}
{page === "attendance" && (

  <div className="attendance-page">

    <h2 className="attendance-title">
      Employee Attendance
    </h2>

    <div className="attendance-list">

      {employees.map((e) => (

        <div
          key={e._id}
          className="attendance-card"
        >

          {/* LEFT */}
          <div className="attendance-left">

            <img
              src={
                e.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt=""
              className="attendance-profile"
            />

            <div>

              <h3>
                {e.name}
              </h3>

              <p>
                {e.email}
              </p>

              <span className="attendance-role">

                {e.role === "inside"
                  ? "Inside Sales"
                  : e.role === "outside"
                  ? "Outside Sales"
                  : e.role}

              </span>

              <div
                className={
                  e.attendance === "Present"
                    ? "status-present"
                    : "status-absent"
                }
              >

                {e.attendance || "Absent"}

              </div>

            </div>

          </div>


          {/* RIGHT */}
          <div className="attendance-buttons">

            <button
              className="present-btn"
              onClick={() =>
                updateAttendance(
                  e._id,
                  "Present"
                )
              }
            >
              Present
            </button>

            <button
              className="absent-btn"
              onClick={() =>
                updateAttendance(
                  e._id,
                  "Absent"
                )
              }
            >
              Absent
            </button>

          </div>

        </div>
      ))}

    </div>

  </div>
)}

        {/* SETTINGS */}
      {/* SETTINGS */}
{page === "settings" && (

  <div className="settings-page">

    <h2 className="settings-title">
      Profile Settings
    </h2>

    <div className="settings-card">

      {/* LEFT */}
      <div className="settings-left">

        <img
          src={
            user.profilePic ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt=""
          className="settings-profile"
        />

        <h3>
          {name}
        </h3>

        <p>
          {role}
        </p>

      </div>


      {/* RIGHT */}
      <div className="settings-right">

        <div className="settings-input-box">

          <label>
            Full Name
          </label>

          <input
            type="text"
            value={name}
           
          />

        </div>


        <div className="settings-input-box">

          <label>
            Email Address
          </label>

          <input
            type="email"
            value={email}
           
          />

        </div>


        <div className="settings-input-box">

          <label>
            Role
          </label>

          <input
            type="text"
            value={role}
            
            
          />

        </div>


       
      </div>

    </div>

  </div>
)}

      </div>

    </div>
  );
}