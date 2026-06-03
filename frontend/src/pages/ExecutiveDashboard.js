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
  const [empPhone, setEmpPhone] =
    useState("");

  const [empRole, setEmpRole] =
    useState("inside");
  const [empGender, setEmpGender] =
    useState("male");
  


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
  const [empRoleFilter, setEmpRoleFilter] = 
    useState("all");
  const [customers, setCustomers] =
    useState([]);


  // LOAD EMPLOYEES
  const loadEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users/all"
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

const addEmployee = async () => {

  // REQUIRED CHECK
  if (
    !empName ||
    !empEmail ||
    !empPassword ||
    !empRole ||
    !empGender ||
    !empPhone
  ) {
    alert("All fields are required");
    return;
  }

  // PHONE VALIDATION
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(empPhone)) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  try {

    const res = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        name: empName,
        email: empEmail,
        password: empPassword,
        role: empRole,
        gender: empGender,
        phone: empPhone
      }
    );

    alert(res.data.message);

    // RESET
    setEmpName("");
    setEmpEmail("");
    setEmpPassword("");
    setEmpRole("inside");
    setEmpGender("male");
    setEmpPhone("");

    setPage("allEmployees");

    loadEmployees();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Register Failed"
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

       {/* HOME DASHBOARD */}
{/* HOME DASHBOARD */}
{page === "home" && (

  <div className="home-dashboard">

    <div className="home-hero">
      <h1>Welcome, {user.name} 👋</h1>
      <p>CRM Overview Based on Outside Sales Assignment</p>
    </div>

    {(() => {

      // TOTAL CUSTOMERS FROM MONGODB
      const totalCustomers = customers.length;

      // ✅ INTERESTED = ASSIGNED TO OUTSIDE SALES
      const interestedCustomers = customers.filter(
        (c) => c.outsideAssignedTo && c.outsideAssignedTo.trim() !== ""
      ).length;

      // ❌ NOT INTERESTED = NOT ASSIGNED
      const notInterestedCustomers = totalCustomers - interestedCustomers;

      return (

        <div className="home-stats">

          <div className="stat-box blue">
            <h2>{employees.length}</h2>
            <p>Employees</p>
          </div>

          <div className="stat-box purple">
            <h2>{totalCustomers}</h2>
            <p>Total Customers</p>
          </div>

          {/* ✅ INTERESTED = OUTSIDE ASSIGNED */}
          <div className="stat-box green">
            <h2>{interestedCustomers}</h2>
            <p>Interested </p>
          </div>

          {/* ❌ NOT INTERESTED = NOT ASSIGNED */}
          <div className="stat-box red">
            <h2>{notInterestedCustomers}</h2>
            <p>Not Interested </p>
          </div>

        </div>

      );

    })()}

  </div>

)}


      {/* ADD EMPLOYEE */}
{page === "employee" && (

  <div className="add-employee-page">

    <div className="add-employee-card">

      {/* LEFT */}
      <div className="add-left">

        <h2>
          Add Employee
        </h2>

        <p>
          Create new employee account
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt=""
          className="add-employee-image"
        />

      </div>


      {/* RIGHT */}
      <div className="add-right">

        {/* NAME */}
        <div className="input-box">

          <label>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter Full Name"
            value={empName}
            onChange={(e) =>
              setEmpName(e.target.value)
            }
          />

        </div>


        {/* EMAIL */}
        <div className="input-box">

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            value={empEmail}
            onChange={(e) =>
              setEmpEmail(e.target.value)
            }
          />

        </div>


        {/* PASSWORD */}
        <div className="input-box">

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={empPassword}
            onChange={(e) =>
              setEmpPassword(e.target.value)
            }
          />

        </div>


        {/* PHONE */}
        <div className="input-box">

          <label>
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter Phone Number"
            value={empPhone}
            maxLength={10}
            onChange={(e) =>
              setEmpPhone(e.target.value)
            }
          />

        </div>


        {/* GENDER */}
        <div className="input-box">

          <label>
            Gender
          </label>

          <select
            value={empGender}
            onChange={(e) =>
              setEmpGender(e.target.value)
            }
          >

            <option value="">
              Select Gender
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>

            <option value="other">
              Other
            </option>

          </select>

        </div>


        {/* ROLE */}
        <div className="input-box">

          <label>
            Role
          </label>

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

        </div>


        

        


        {/* BUTTON */}
        <button
          className="add-employee-btn"
          onClick={addEmployee}
        >
          Add Employee
        </button>

      </div>

    </div>

  </div>
)}


        {/* ADD CUSTOMER */}
       {/* ADD CUSTOMER */}
{page === "customer" && (

  <div className="add-customer-page">

    <div className="add-customer-card">

      {/* LEFT SIDE */}
      <div className="customer-left-panel">

        <h2>
          Add Customer
        </h2>

        <p>
          Create and assign new customer
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
          alt=""
          className="customer-img"
        />

      </div>


      {/* RIGHT SIDE FORM */}
      <div className="customer-right-panel">

        {/* NAME */}
        <div className="input-group">

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter Customer Name"
            value={custName}
            onChange={(e) =>
              setCustName(e.target.value)
            }
          />

        </div>


        {/* EMAIL */}
        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Customer Email"
            value={custEmail}
            onChange={(e) =>
              setCustEmail(e.target.value)
            }
          />

        </div>


        {/* PHONE */}
        {/* PHONE */}
<div className="input-group">

  <label>Phone</label>

  <input
    type="text"
    placeholder="10 digit phone number"
    value={custPhone}
    maxLength={10}
    onChange={(e) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      setCustPhone(value);
    }}
  />

</div>


        


        {/* BUTTON */}
        <button
          className="customer-btn"
          onClick={addCustomer}
        >
          Add Customer
        </button>

      </div>

    </div>

  </div>
)}
{/* ALL EMPLOYEES */}
{page === "allEmployees" && (

  <div className="employees-page">

    {/* TOP */}
    <div className="employees-top">

      <div>

        <h2 className="employees-title">
          Employees
        </h2>

        <p className="employees-subtitle">
          Manage all employee details
        </p>

      </div>


      {/* FILTERS */}
      <div className="employees-filters">

        <button
          onClick={() =>
            setEmpRoleFilter("all")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setEmpRoleFilter("inside")
          }
        >
          Inside
        </button>

        <button
          onClick={() =>
            setEmpRoleFilter("outside")
          }
        >
          Outside
        </button>

      </div>

    </div>


    {/* GRID */}
    <div className="employees-grid">

      {employees &&
      employees.length > 0 ? (

        employees

          .filter((e) => {

            if (
              empRoleFilter === "all"
            )
              return true;

            return e.role
              ?.toLowerCase()
              .includes(
                empRoleFilter
              );
          })

          .map((e) => (

            <div
              key={e._id}
              className="employee-card-new"
            >

              {/* PROFILE */}
              <div className="employee-profile-section">

                <img
                  src={
                    e.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt=""
                  className="employee-profile-img"
                />

              </div>


              {/* DETAILS */}
              <div className="employee-details">

                <h3>
                  {e.name}
                </h3>

                <p>
                  {e.email}
                </p>

                <span>

                  {e.role === "inside"
                    ? "Inside Sales"
                    : e.role === "outside"
                    ? "Outside Sales"
                    : e.role}

                </span>

              </div>

            </div>
        ))

      ) : (

        <div className="employee-empty">

          <h3>
            No Employees Found
          </h3>

        </div>
      )}

    </div>

  </div>
)}


{/* ALL CUSTOMERS */}
{page === "allCustomers" && (

  <div className="customers-page">

    {/* HEADER */}
    <div className="customers-top">

      <div>

        <h2 className="customers-title">
          All Customers
        </h2>

        <p className="customers-subtitle">
          Customer management overview
        </p>

      </div>

    </div>

    {/* GRID */}
    <div className="customers-grid">

      {customers &&
      customers.length > 0 ? (

        customers.map((c) => (

          <div
            key={c._id}
            className="customer-box"
          >

            {/* TOP SECTION */}
            <div className="customer-card-top">

              <div className="customer-avatar">

                {c.name
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <div className="customer-main-info">

                <h3>
                  {c.name || "No Name"}
                </h3>

               

              </div>

            </div>

            {/* DETAILS */}
            <div className="customer-info-list">

              <div className="info-item">

                <span className="info-label">
                  Phone
                </span>

                <span className="info-value">
                 {c.phone || "No Phone"}
                </span>

              </div>

              <div className="info-item">

                <span className="info-label">
                  Email
                </span>

                <span className="info-value">
                  {c.email || "No Email"}
                </span>

              </div>

            </div>

          </div>

        ))

      ) : (

        <div className="empty-customers">

          <h3>
            No Customers Found
          </h3>

        </div>

      )}

    </div>

  </div>

)}

  


    {/* ASSIGNED CUSTOMERS */}
{/* ASSIGNED CUSTOMERS */}
{page === "assigned" && (

  <div className="assigned-wrapper">

    <div className="assigned-header">

      <h2>
        Outside Sales Assignments
      </h2>

      <p>
        Customers assigned for property visits
      </p>

    </div>

    {customers &&
    customers.filter(
      (c) => c.outsideAssignedTo
    ).length > 0 ? (

      <div className="assigned-list-new">

        {customers

          .filter(
            (c) => c.outsideAssignedTo
          )

          .map((c) => (

            <div
              key={c._id}
              className="assigned-row"
            >

              {/* LEFT */}
              <div className="assigned-user">

                <div className="assigned-circle">

                  {c.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                <div>

                  <h3>
                    {c.name}
                  </h3>

                  <p>
                    📞 XXXX{c.phone?.slice(-4)}
                  </p>

                </div>

              </div>

             

              {/* OUTSIDE */}
              <div className="assigned-center">

                <span>
                  Outside Sales
                </span>

                <h4>
                  {c.outsideAssignedTo}
                </h4>

              </div>

              {/* DATE */}
              <div className="assigned-center">

                <span>
                  Visit Schedule
                </span>

                <h4>
                  {c.visitDate ||
                    "Not Scheduled"}
                </h4>

              </div>

              {/* STATUS */}
              <div className="right">

                <span
                  className={`status-pill ${
                    c.status === "interested"
                      ? "green"
                      : c.status === "not interested"
                      ? "red"
                      : "gray"
                  }`}
                >
                  {c.status === "not interested"
                  ? "Not Interested"
                  : "Interested"}
                </span>

              </div>

            </div>
        ))}

      </div>

    ) : (

      <div className="no-assigned">

        <h3>
          No Outside Sales Assignments
        </h3>

      </div>
    )}

  </div>
)}

  
      </div>

    </div>
  );
}