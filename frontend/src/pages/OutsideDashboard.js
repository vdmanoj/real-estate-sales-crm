import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaHome,
  FaClipboardList,
  FaUser,
  FaCheckCircle
} from "react-icons/fa";

import "./outside.css";

export default function OutsideDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [page, setPage] =
    useState("home");

  const [customers, setCustomers] =
    useState([]);


  // LOAD ASSIGNED CUSTOMERS
  const loadCustomers = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/customers/inside/${user.name}`
      );

      setCustomers(res.data);

    } catch (err) {

      console.log(err);
    }
  };


  // FIRST LOAD
  useEffect(() => {

    loadCustomers();

  }, []);


  // MARK VISITED
  const markVisited = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/customers/${id}`,
        {
          visited: true
        }
      );

      alert("Visit Updated");

      loadCustomers();

    } catch (err) {

      console.log(err);
    }
  };


  return (

    <div className="outside-container">

      {/* TOPBAR */}
      <div className="topbar">

        <h2>Outside Sales</h2>

      </div>


      {/* MAIN */}
      <div className="outside-main">

        {/* HOME */}
        {page === "home" && (

          <div className="home-page">

            <h1>
              Welcome {user.name}
            </h1>

            <p>
              Outside Sales Dashboard
            </p>

          </div>
        )}


        {/* ASSIGNED */}
        {page === "assigned" && (

          <div>

            <h2>
              Assigned Customers
            </h2>

            {customers.length === 0 && (

              <p>
                No Customers Assigned
              </p>
            )}

            {customers.map((c) => (

              <div
                key={c._id}
                className="customer-card"
              >

                <div>

                  <h3>{c.name}</h3>

                  <p>{c.phone}</p>

                  <small>
                    Status: {c.status}
                  </small>

                </div>

                <button
                  className="visit-btn"
                  onClick={() =>
                    markVisited(c._id)
                  }
                >
                  <FaCheckCircle />
                  Mark Visited
                </button>

              </div>
            ))}

          </div>
        )}


        {/* PROFILE */}
        {page === "profile" && (

          <div className="profile-page">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className="profile-img"
            />

            <h2>{user.name}</h2>

            <p>
              <b>Email:</b> {user.email}
            </p>

            <p>
              <b>Gender:</b>{" "}
              {user.gender || "Male"}
            </p>

            <p>
              <b>Phone:</b>{" "}
              {user.phone || "9876543210"}
            </p>

            <button
              className="logout-btn"
              onClick={() => {

                localStorage.removeItem(
                  "user"
                );

                window.location.href = "/";
              }}
            >
              Logout
            </button>

          </div>
        )}

      </div>


      {/* BOTTOM NAV */}
      <div className="bottom-nav">

        <div
          onClick={() =>
            setPage("home")
          }
        >
          <FaHome />
          <p>Home</p>
        </div>

        <div
          onClick={() =>
            setPage("assigned")
          }
        >
          <FaClipboardList />
          <p>Assigned</p>
        </div>

        <div
          onClick={() =>
            setPage("profile")
          }
        >
          <FaUser />
          <p>Profile</p>
        </div>

      </div>

    </div>
  );
}