import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaHome,
  FaPhone,
  FaThumbsUp,
  FaThumbsDown,
  FaUser
} from "react-icons/fa";

import "./inside.css";

export default function InsideDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [page, setPage] = useState("home");

  const [customers, setCustomers] = useState([]);

  // LOAD CUSTOMERS
  const loadCustomers = async (
    type = "all"
  ) => {

    try {

      let url =
        `http://localhost:5000/api/customers/inside/${user.name}`;

      // INTERESTED
      if (type === "interested") {

        url =
          `http://localhost:5000/api/customers/inside/${user.name}/interested`;
      }

      // NOT INTERESTED
      if (type === "notInterested") {

        url =
          `http://localhost:5000/api/customers/inside/${user.name}/not-interested`;
      }

      const res = await axios.get(url);

      setCustomers(res.data);

    } catch (err) {

      console.log(err);

      setCustomers([]);
    }
  };

  // FIRST LOAD
  useEffect(() => {

    loadCustomers();

  }, []);

  // PAGE CHANGE
  const changePage = (p) => {

    setPage(p);

    if (p === "calls") {
      loadCustomers();
    }

    if (p === "interested") {
      loadCustomers("interested");
    }

    if (p === "notInterested") {
      loadCustomers("notInterested");
    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/customers/${id}`,
        {
          status
        }
      );

      // RELOAD DATA
      if (page === "interested") {

        loadCustomers("interested");
      }

      else if (
        page === "notInterested"
      ) {

        loadCustomers("notInterested");
      }

      else {

        loadCustomers();
      }

    } catch (err) {

      console.log(err);
    }
  };

  // WHATSAPP
  const sendWhatsapp = (
    phone,
    type
  ) => {

    let message = "";

    if (type === "interested") {

      message =
        "Thank you for your interest in our property.";
    }

    else {

      message =
        "Thank you for your time. Contact us anytime.";
    }

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`
    );
  };

  return (

    <div className="inside-container">

      {/* TOPBAR */}
      <div className="topbar">

        <h2>Inside Sales Dashboard</h2>

      </div>

      {/* MAIN */}
      <div className="inside-main">

        {/* HOME */}
        {page === "home" && (

          <div className="home-page">

            <img
              src="/logo.png"
              alt="logo"
              className="logo"
            />

            <h2>
              Welcome {user.name}
            </h2>

            <p>
              Inside Sales Executive
            </p>

          </div>
        )}

        {/* CALLS */}
        {page === "calls" && (

          <div className="customer-section">

            <h2>
              Assigned Customers
            </h2>

            {customers.length === 0 && (

              <p>
                No Customers Found
              </p>
            )}

            {customers.map((c) => (

              <div
                key={c._id}
                className="customer-card"
              >

                <div>

                  <h3>{c.name}</h3>

                  <p>
                    XXXX
                    {c.phone?.slice(-4)}
                  </p>

                  <small>
                    {c.status}
                  </small>

                </div>

                <div className="actions">

                  {/* CALL */}
                  <button
                    className="call-btn"
                    onClick={() =>
                      window.open(
                        `tel:${c.phone}`
                      )
                    }
                  >
                    <FaPhone />
                  </button>

                  {/* INTERESTED */}
                  <button
                    className="green"
                    onClick={() => {

                      updateStatus(
                        c._id,
                        "interested"
                      );

                      sendWhatsapp(
                        c.phone,
                        "interested"
                      );
                    }}
                  >
                    <FaThumbsUp />
                  </button>

                  {/* NOT INTERESTED */}
                  <button
                    className="red"
                    onClick={() => {

                      updateStatus(
                        c._id,
                        "not interested"
                      );

                      sendWhatsapp(
                        c.phone,
                        "not"
                      );
                    }}
                  >
                    <FaThumbsDown />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* INTERESTED */}
        {page === "interested" && (

          <div className="customer-section">

            <h2>
              Interested Customers
            </h2>

            {customers.length === 0 && (

              <p>
                No Interested Customers
              </p>
            )}

            {customers.map((c) => (

              <div
                key={c._id}
                className="customer-card"
              >

                <div>

                  <h3>{c.name}</h3>

                  <p>
                    XXXX
                    {c.phone?.slice(-4)}
                  </p>

                </div>

                <button className="green">

                  Interested

                </button>

              </div>
            ))}

          </div>
        )}

        {/* NOT INTERESTED */}
        {page === "notInterested" && (

          <div className="customer-section">

            <h2>
              Not Interested Customers
            </h2>

            {customers.length === 0 && (

              <p>
                No Data Found
              </p>
            )}

            {customers.map((c) => (

              <div
                key={c._id}
                className="customer-card"
              >

                <div>

                  <h3>{c.name}</h3>

                  <p>
                    XXXX
                    {c.phone?.slice(-4)}
                  </p>

                </div>

                <button className="red">

                  Not Interested

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

            <p>{user.email}</p>

            <p>{user.role}</p>

          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">

        {/* HOME */}
        <div
          onClick={() =>
            changePage("home")
          }
        >
          <FaHome />
          <p>Home</p>
        </div>

        {/* CALLS */}
        <div
          onClick={() =>
            changePage("calls")
          }
        >
          <FaPhone />
          <p>Calls</p>
        </div>

        {/* INTERESTED */}
        <div
          onClick={() =>
            changePage("interested")
          }
        >
          <FaThumbsUp />
          <p>Interested</p>
        </div>

        {/* NOT INTERESTED */}
        <div
          onClick={() =>
            changePage("notInterested")
          }
        >
          <FaThumbsDown />
          <p>Not Interested</p>
        </div>

        {/* PROFILE */}
        <div
          onClick={() =>
            changePage("profile")
          }
        >
          <FaUser />
          <p>Profile</p>
        </div>

      </div>

    </div>
  );
}