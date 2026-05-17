import axios from "axios";
import { useState } from "react";

export default function AddCustomer() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const addCustomer = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/customers/add",
        {
          name,
          email,
          phone,
          assignedTo
        }
      );

      alert("Customer Added");

      setName("");
      setEmail("");
      setPhone("");
      setAssignedTo("");

    } catch (err) {

      console.log(err);

      alert("Failed");
    }
  };

  return (

    <div
      style={{
        padding: "30px",
        background: "#0f172a",
        height: "100vh",
        color: "white"
      }}
    >

      <h2>Add Customer</h2>

      <input
        placeholder="Customer Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={style}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={style}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        style={style}
      />

      <input
        placeholder="Assign To Inside User"
        value={assignedTo}
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
        style={style}
      />

      <button
        onClick={addCustomer}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          border: "none",
          color: "white",
          borderRadius: "6px"
        }}
      >
        Add Customer
      </button>

    </div>
  );
}

const style = {
  display: "block",
  width: "300px",
  padding: "10px",
  marginBottom: "15px"
};