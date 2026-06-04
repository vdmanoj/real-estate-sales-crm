import axios from "axios";
import { useEffect, useState, useCallback } from "react";

import {
  FaHome,
  FaPhone,
  FaThumbsUp,
  FaThumbsDown,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./inside.css";

export default function InsideDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [page, setPage] =
    useState("home");

  const [customers, setCustomers] =
    useState([]);
    const changePage = (p) => {

  setPage(p);

  if (p === "calls") {
    loadCustomers("all");
  }

  if (p === "interested") {
    loadCustomers("interested");
  }

  if (p === "notInterested") {
    loadCustomers("notInterested");
  }

  if (p === "home") {
    loadCustomers("all");
  }
};

  // =========================
  // LOAD CUSTOMERS
 // =========================
// LOAD CUSTOMERS (FIXED)
// =========================
const loadCustomers = useCallback(async (type = "all") => {
  try {

    let url = "";

    if (type === "all") {
      url = "https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/all";
    }

    else if (type === "interested") {
      url = "https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/inside/" + user.name + "/interested";
    }

    else if (type === "notInterested") {
      url = "https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/inside/" + user.name + "/not-interested";
    }

    const res = await axios.get(url);

    setCustomers(res.data);

  } catch (err) {
    console.log(err);
    setCustomers([]);
  }
}, [user.name]);;

  // =========================
  // FIRST LOAD
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {

  if (page === "home") {
    loadCustomers("all");
  }

  if (page === "calls") {
    loadCustomers("all");
  }

  if (page === "interested") {
    loadCustomers("interested");
  }

  if (page === "notInterested") {
    loadCustomers("notInterested");
  }

}, [page, loadCustomers]);
  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (
    id,
    status,
    phone
  ) => {

    try {
const res = await axios.put(
  `https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/${id}`,
  { status }
);

if (!res.data.success) {
  alert("Status update failed");
  return;
}
    

      // WHATSAPP MESSAGE
      let message = "";

      if (
        status === "interested"
      ) {

        message =
          "Thank you for showing interest in our property. We will contact you shortly with property documents and visit details.";
      }

      else {

        message =
          "Thank you for your valuable time. If you are interested in future, please contact us anytime.";
      }

      window.open(

        `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,

        "_blank"
      );

      // REFRESH
      if (page === "calls") {
        loadCustomers("all");
      }

      else if (
        page === "interested"
      ) {

        loadCustomers("interested");
      }

      else if (
        page === "notInterested"
      ) {

        loadCustomers("notInterested");
      }

    } catch (err) {

      console.log(err);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div className="inside-container">

      {/* TOPBAR */}
      <div className="topbar">

        <h2>
          Inside Sales Dashboard
        </h2>

      </div>

      <div className="inside-main">

        {/* HOME */}
        {page === "home" && (

          <div className="outside-home">

            <div className="outside-welcome">

              <div>

                <h1>
                  Welcome, {user.name} 👋
                </h1>

                <p>
                  Inside Sales Executive Dashboard
                </p>

              </div>

              <div className="status-badge">
                Active
              </div>

            </div>

            <div className="outside-stats">

              <div className="stat-card">

                <h2>
                  {customers.length}
                </h2>

                <p>
                  Total Customers
                </p>

              </div>

              <div className="stat-card">

                <h2>
                  {
                    customers.filter(
                      (c) =>
                        c.status === "interested"
                    ).length
                  }
                </h2>

                <p>
                  Interested
                </p>

              </div>

              <div className="stat-card">

                <h2>
                  {
                    customers.filter(
                      (c) =>
                        c.status === "not interested"
                    ).length
                  }
                </h2>

                <p>
                  Not Interested
                </p>

              </div>

              <div className="stat-card">

                <h2>
                  {
                    customers.filter(
                      (c) =>
                        c.status === "pending"
                    ).length
                  }
                </h2>

                <p>
                  Pending
                </p>

              </div>

            </div>

          </div>
        )}

        {/* CALLS PAGE */}
        {page === "calls" && (

  <div className="calls-page">

    <div className="calls-header">

      <h2>All Customers</h2>

      <p>Click 👍 Interested or 👎 Not Interested</p>

    </div>

    <div className="calls-grid">

      {customers.length === 0 ? (

        <div className="empty-box">
          No Customers Found
        </div>

      ) : (

        customers.map((c) => (

          <div
            key={c._id}
            className="call-card"
          >

            {/* LEFT */}
            <div className="call-left">

              <div className="avatar">
                {c.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>

                <h3>{c.name}</h3>

                <p>
                  📞 XXXX{c.phone?.slice(-4)}
                </p>

                <span
                  className={`status ${
                    c.status === "interested"
                      ? "green"
                      : c.status === "not interested"
                      ? "red"
                      : "gray"
                  }`}
                >
                  {c.status || "pending"}
                </span>

              </div>

            </div>

            {/* RIGHT - ACTIONS */}
            <div className="call-actions">

              {/* ✅ SHOW BUTTONS ONLY IF NOT DECIDED */}
              {(!c.status || c.status === "pending") ? (

                <>
                  <button
                    className="btn green"
                    onClick={() =>
                      updateStatus(c._id, "interested", c.phone)
                    }
                  >
                    👍 Interested
                  </button>

                  <button
                    className="btn red"
                    onClick={() =>
                      updateStatus(c._id, "not interested", c.phone)
                    }
                  >
                    👎 Not Interested
                  </button>
                </>

              ) : (

                // AFTER ASSIGNMENT / DECISION
                <span className="locked-text">
                  Response Locked
                </span>

              )}

            </div>

          </div>

        ))

      )}

    </div>

  </div>
)}

        {/* INTERESTED PAGE */}
        {page === "interested" && (

          <div className="customer-page">

            <div className="page-header">

              <h2>
                Interested Customers
              </h2>

              <p>
                Assign customers to outside sales executives
              </p>

            </div>

            <div className="customer-grid">

              {customers.length === 0 ? (

                <div className="empty-box">
                  No Interested Customers
                </div>

              ) : (

                customers.map((c) => (

                  <div
                    key={c._id}
                    className="interested-card"
                  >

                    {/* LEFT */}
                    <div className="customer-top">

                      <div className="customer-avatar">

                        {
                          c.name
                            ?.charAt(0)
                            ?.toUpperCase()
                        }

                      </div>

                      <div className="customer-details">

                        <h3>
                          {c.name}
                        </h3>

                        <p>
                          📞 XXXX
                          {c.phone?.slice(-4)}
                        </p>

                        <span className="badge green">
                          Interested
                        </span>

                      </div>

                    </div>

                    {/* ASSIGNED INFO */}
                    {/* ASSIGNED INFO */}
{(c.outsideAssignedTo || c.visitDate) && (

  <div className="assigned-box">

    <div className="assign-row">

      <span>Assigned To</span>

      <strong>
        {c.outsideAssignedTo || "Not Assigned"}
      </strong>

    </div>

    <div className="assign-row">

      <span>Visit Date & Time</span>

      <strong>
        {c.visitDate || "Not Scheduled"}
      </strong>

    </div>

    <div className="assign-row">

      <span>Status</span>

      <strong style={{ color: "green" }}>
        {c.outsideAssignedTo ? "Assigned Successfully" : "Pending"}
      </strong>

    </div>

  </div>
)}

                    {/* BUTTON */}
                    <button

                      className="assign-btn"

                      onClick={async () => {

                        try {

                          const res =
                            await axios.get(

                              "https://real-estate-sales-crm-vdmanoj.onrender.com/api/users/outside"
                            );

                          const users =
                            res.data;

                          if (
                            users.length === 0
                          ) {

                            return alert(
                              "No Outside Sales Employees Found"
                            );
                          }

                          const selected =
                            window.prompt(

                              "Assign Customer To:\n\n" +

                              users
                                .map(
                                  (u) => u.name
                                )
                                .join("\n")
                            );

                          if (!selected)
                            return;

                          const visitDate =
                            window.prompt(

                              "Enter Visit Date & Time\n\nExample:\n20 May 2026 - 4 PM"
                            );

                          if (!visitDate)
                            return;

                          const assignRes =
                            await axios.put(

                              `https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/assign/${c._id}`,

                              {
                                outsideAssignedTo:
                                  selected,

                                visitDate
                              }
                            );

                          if (assignRes.data.success) {

  alert("Customer Assigned Successfully");

  setPage("interested");
  loadCustomers("interested");
}

                        } catch (err) {

                          console.log(err);

                          alert(
                            "Assignment Failed"
                          );
                        }
                      }}
                    >

                      {c.outsideAssignedTo && c.visitDate
  ? "Reassign Customer"
  : "Assign To Outside"}

                    </button>

                  </div>

                ))
              )}

            </div>

          </div>
        )}

        {/* NOT INTERESTED */}
        {page === "notInterested" && (

          <div className="customer-section">

            <h2>
              Not Interested Customers
            </h2>

            {customers.map((c) => (

              <div
                key={c._id}
                className="customer-card"
              >

                <div>

                  <h3>
                    {c.name}
                  </h3>

                  <p>
                    📞 XXXX
                    {c.phone?.slice(-4)}
                  </p>

                </div>

                <div className="red">
                  Not Interested
                </div>

              </div>
            ))}

          </div>
        )}

        {/* PROFILE PAGE */}
        {page === "profile" && (

          <div className="profile-page">

            <div className="modern-profile-card">

              {/* TOP */}
              <div className="profile-top">

                <div className="profile-image-wrapper">

                  <img

                    src={
                      user.profilePic ||

                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }

                    alt="profile"

                    className="profile-image"
                  />

                </div>

                <h2 className="profile-name">
                  {user.name}
                </h2>

                <p className="profile-role">
                  INSIDE SALES EXECUTIVE
                </p>

              </div>

              {/* DETAILS */}
              <div className="profile-details">

                <div className="detail-box">

                  <span className="detail-label">
                    Email Address
                  </span>

                  <div className="detail-value">
                    {user.email}
                  </div>

                </div>

                <div className="detail-box">

                  <span className="detail-label">
                    Phone Number
                  </span>

                  <div className="detail-value">
                    {user.phone}
                  </div>

                </div>

                <div className="detail-box">

                  <span className="detail-label">
                    Role
                  </span>

                  <div className="detail-value">
                    {user.role}
                  </div>

                </div>

                {/* LOGOUT BUTTON */}
                <button
                  className="logout-btn"
                  onClick={logout}
                >

                  <FaSignOutAlt />

                  Logout

                </button>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">

        <div
          onClick={() =>
            changePage("home")
          }
        >

          <FaHome />

          <p>
            Home
          </p>

        </div>

        <div
          onClick={() =>
            changePage("calls")
          }
        >

          <FaPhone />

          <p>
            Calls
          </p>

        </div>

        <div
          onClick={() =>
            changePage("interested")
          }
        >

          <FaThumbsUp />

          <p>
            Interested
          </p>

        </div>

        <div
          onClick={() =>
            changePage("notInterested")
          }
        >

          <FaThumbsDown />

          <p>
            Not Interested
          </p>

        </div>

        <div
          onClick={() =>
            changePage("profile")
          }
        >

          <FaUser />

          <p>
            Profile
          </p>

        </div>

      </div>

    </div>
  );
}