import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./register.css";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");

 

  // IMAGE HANDLER (FIXED)


  // REGISTER
 const register = async () => {
  try {

    const res = await axios.post(
      "https://real-estate-sales-crm-vdmanoj.onrender.com",
      {
        name,
        email,
        password,
        role,
        gender,
        phone
      }
    );

    alert(res.data.message);
    navigate("/");

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Register Failed");
  }
};

  return (

    <div className="register-container">

      <div className="register-box">

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* GENDER */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
         
        </select>


        <button onClick={register}>
          Register
        </button>

        <p
          onClick={() => navigate("/")}
          className="login-link"
        >
          Back to Login
        </p>

      </div>

    </div>
  );
}