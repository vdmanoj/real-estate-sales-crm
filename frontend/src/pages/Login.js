// frontend/src/pages/Login.js

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  // LOGIN FUNCTION
  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      console.log(res.data);

      const user = res.data.user;

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // ROLE BASED NAVIGATION
      if (user.role === "admin") {

        navigate("/admin");
      }

      else if (
        user.role === "executive"
      ) {

        navigate("/executive");
      }

      else if (
        user.role === "inside"
      ) {

        navigate("/inside");
      }

      else if (
        user.role === "outside"
      ) {

        navigate("/outside");
      }

      else {

        alert("Role not found");
      }

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login Failed (check backend)"
      );
    }
  };


  return (

    <div className="login-container">

      <div className="login-box">

        <h1>
          REAL ESTATE CRM
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

        <p
          className="register-text"
          onClick={() =>
            navigate("/register")
          }
        >
          Don't have account?
          Register
        </p>

      </div>

    </div>
  );
}