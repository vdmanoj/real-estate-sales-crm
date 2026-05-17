import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // CHECK SUCCESS
      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      const user = res.data.user;

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // ROLE BASED LOGIN
      if (user.role === "admin") {
        navigate("/admin");
      }

      else if (user.role === "executive") {
        navigate("/exec");
      }

      else if (user.role === "inside") {
        navigate("/inside");
      }

      else if (user.role === "outside") {
        navigate("/outside");
      }

      else {
        alert("Role not found");
      }

    }

    catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login Failed (check backend)"
      );
    }
  };

  return (

    <div className="login-container">

      <div className="overlay">

        <div className="login-box">

          <h2>REAL ESTATE</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={login}>
            Login
          </button>

          <p
            onClick={() => navigate("/register")}
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              marginTop: "15px"
            }}
          >
            Don't have an account? Register
          </p>

        </div>

      </div>

    </div>
  );
}