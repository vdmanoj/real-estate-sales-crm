import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaUsers,
  FaUserTie,
  FaPhone,
  FaSignOutAlt,
  FaHome,
  FaChartBar,
  FaClipboardCheck,
  FaCog
} from "react-icons/fa";

import "./admin.css";

export default function AdminDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [page, setPage] =
    useState("home");

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
            setPage("calls")
          }
        >
          <FaPhone />
          <span>Call Status</span>
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
        {page === "home" && (

          <div className="welcome-box">

            <h1>
              Welcome {user.name}
            </h1>

            <p>
              Admin Dashboard
            </p>

          </div>
        )}


        {/* EMPLOYEES */}
        {page === "employees" && (

          <div>

            <h2>
              All Employees
            </h2>

            {employees.map((e) => (

              <div
                key={e._id}
                className="card"
              >

                <img
                  src={
                    e.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt=""
                  className="profile"
                />

                <div>

                  <h3>{e.name}</h3>

                  <p>{e.email}</p>

                  <small>
                    {e.role}
                  </small>

                </div>

              </div>
            ))}

          </div>
        )}


        {/* CUSTOMERS */}
        {page === "customers" && (

          <div>

            <h2>
              All Customers
            </h2>

            {customers.map((c) => (

              <div
                key={c._id}
                className="card"
              >

                <div>

                  <h3>{c.name}</h3>

                  <p>{c.phone}</p>

                  <small>
                    Assigned To:
                    {" "}
                    {c.assignedTo}
                  </small>

                </div>

              </div>
            ))}

          </div>
        )}


        {/* CALL STATUS */}
        {page === "calls" && (

          <div>

            <h2>
              Customer Status
            </h2>

            {customers.map((c) => (

              <div
                key={c._id}
                className="card"
              >

                <div>

                  <h3>{c.name}</h3>

                  <p>{c.phone}</p>

                  <small>
                    Assigned To:
                    {" "}
                    {c.assignedTo}
                  </small>

                  <p>

                    Status:
                    {" "}

                    <b>
                      {c.status ||
                        "No Status"}
                    </b>

                  </p>

                </div>

              </div>
            ))}

          </div>
        )}


        {/* SALES */}
        {page === "sales" && (

          <div>

            <h2>
              Sales Report
            </h2>

            <div className="card">

              <h3>
                Total Customers:
                {" "}
                {customers.length}
              </h3>

            </div>

            <div className="card">

              <h3>

                Interested Customers:
                {" "}

                {
                  customers.filter(
                    (c) =>
                      c.status ===
                      "interested"
                  ).length
                }

              </h3>

            </div>

            <div className="card">

              <h3>

                Not Interested:
                {" "}

                {
                  customers.filter(
                    (c) =>
                      c.status ===
                      "not interested"
                  ).length
                }

              </h3>

            </div>

          </div>
        )}


        {/* ATTENDANCE */}
        {page === "attendance" && (

          <div>

            <h2>
              Employee Attendance
            </h2>

            {employees.map((e) => (

              <div
                key={e._id}
                className="card"
              >

                <div>

                  <h3>{e.name}</h3>

                  <p>{e.email}</p>

                  <small>
                    Present
                  </small>

                </div>

              </div>
            ))}

          </div>
        )}


        {/* SETTINGS */}
        {page === "settings" && (

          <div>

            <h2>
              Settings
            </h2>

            <div className="card">

              <img
                src={
                  user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt=""
                className="profile"
              />

              <div>

                <h3>
                  {user.name}
                </h3>

                <p>
                  {user.email}
                </p>

                <small>
                  {user.role}
                </small>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}