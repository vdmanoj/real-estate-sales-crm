import axios from "axios";
import { useEffect, useState } from "react";

import {
  FaHome,
  FaClipboardList,
  FaUser
} from "react-icons/fa";

import "./outside.css";

export default function OutsideDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [page, setPage] = useState("home");
  const [customers, setCustomers] = useState([]);
  const [recording, setRecording] = useState(false);

  
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);


  // LOAD CUSTOMERS
  const loadCustomers = async () => {
    try {

      let url = "";

      if (page === "assigned") {
        url = `https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/outside/${user.name}/assigned`;
      } else {
        url = `https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/outside/${user.name}/assigned`;
      }

      const res = await axios.get(url);
      setCustomers(res.data);

    } catch (err) {
      console.log(err);
      setCustomers([]);
    }
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadCustomers();
}, []);

 
 

  useEffect(() => {
    loadCustomers();
  }, []);

  // MARK VISITED (FIXED)
  

  return (

    <div className="outside-container">

      {/* TOP BAR */}
      <div className="topbar">
        <h2>Outside Sales</h2>
      </div>

      <div className="outside-main">

        {/* HOME */}
   {page === "home" && (

  <div className="outside-home">

    {/* WELCOME SECTION */}
    <div className="outside-welcome">

      <div>
        <h1>Welcome, {user.name} 👋</h1>
        <p>Outside Sales Executive Dashboard</p>
      </div>

      <div className="status-badge">
        Active
      </div>

    </div>

    {/* STATS SECTION */}
    <div className="outside-stats">

      <div className="stat-card">
        <h2>{customers.length}</h2>
        <p>Total Assigned</p>
      </div>

      

      <div className="stat-card">
        <h2>
          {customers.filter(c => c.status === "completed").length}
        </h2>
        <p>Completed</p>
      </div>

    </div>

    {/* QUICK INFO SECTION */}
    <div className="outside-info">

      <div className="info-card">
        <h3>Today’s Goal</h3>
        <p>Complete all assigned customer visits and update status.</p>
      </div>

      <div className="info-card">
        <h3>Reminder</h3>
        <p>Always capture audio + selfie during visit completion.</p>
      </div>

    </div>

  </div>
)}

        {/* ASSIGNED */}
   {page === "assigned" && (

  <div className="assigned-page">

    <h2>Assigned Customers</h2>

    {
      customers.filter(c => c?.outsideAssignedTo).length === 0 && (
        <p>No Customers Assigned</p>
      )
    }

    {customers
      .filter(c => c?.outsideAssignedTo)   // ✅ ONLY ASSIGNED CUSTOMERS
      .map((c) => (

        <div key={c._id} className="visit-card">

          <div className="left">
            <h3>{c.name}</h3>
            <p>📞 ****{c.phone?.slice(-4)}</p>
            <p>🕒 {c.scheduledTime || "Not Scheduled"}</p>
            <p>Status: {c.status || "Not Interested"}</p>

            {/* OPTIONAL: show who assigned */}
            <p>
              Assigned To: {c.outsideAssignedTo}
            </p>

          </div>

          <div className="right">

            {/* REACHED LOCATION */}
            <button
              disabled={c.status === "completed"}
              onClick={async () => {
                try {
                  const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                  });

                  const recorder = new MediaRecorder(stream);
                  let chunks = [];

                  recorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                  };

                  recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: "audio/webm" });
                    setAudioBlob(blob);
                  };

                  recorder.start();
                  setMediaRecorder(recorder);
                  setRecording(true);

                  alert("Recording Started");

                } catch (err) {
                  alert("Mic permission denied");
                }
              }}
            >
              📍 Reached Location
            </button>

            {/* COMPLETED VISIT */}
            <button
              disabled={c.status === "completed"}
              onClick={async () => {

                try {

                  if (mediaRecorder) {
                    mediaRecorder.stop();
                    setRecording(false);
                  }

                  await axios.put(
                    `https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/${c._id}`,
                    {
                      visited: true,
                      status: "completed"
                    }
                  );

                  if (audioBlob) {
                    const formData = new FormData();
                    formData.append("audio", audioBlob);

                    await axios.post(
                      `https://real-estate-sales-crm-vdmanoj.onrender.com/api/customers/audio/${c._id}`,
                      formData
                    );
                  }

                  setAudioBlob(null);
                  loadCustomers();

                  alert("Visit Completed");

                } catch (err) {
                  console.log(err);
                }

              }}
            >
              {c.status === "completed"
                ? "✔ Completed"
                : "✅ Completed Visit"}
            </button>

          </div>

        </div>

      ))
    }

  </div>
)}

        {page === "profile" && (

  <div className="profile-container">

    <div className="profile-card">

      {/* PROFILE IMAGE */}
      <div className="profile-img-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
        />
      </div>

      {/* NAME + ROLE */}
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-role">{user.role}</p>

      {/* INFO GRID */}
      <div className="profile-grid">

        <div className="profile-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="profile-item">
          <span>Phone</span>
          <p>{user.phone || "Not Added"}</p>
        </div>

        <div className="profile-item">
          <span>Gender</span>
          <p>{user.gender || "Not Specified"}</p>
        </div>

      </div>

      {/* LOGOUT BUTTON */}
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>

  </div>
)}

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">

        <div onClick={() => setPage("home")}>
          <FaHome />
          <p>Home</p>
        </div>

        <div onClick={() => setPage("assigned")}>
          <FaClipboardList />
          <p>Assigned</p>
        </div>

        <div onClick={() => setPage("profile")}>
          <FaUser />
          <p>Profile</p>
        </div>

      </div>

    </div>
  );
}