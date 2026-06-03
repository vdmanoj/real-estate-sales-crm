import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import InsideDashboard from "./pages/InsideDashboard";
import OutsideDashboard from "./pages/OutsideDashboard";
import AddCustomer from "./pages/AddCustomer";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/executive"
          element={<ExecutiveDashboard />}
        />

        <Route
          path="/inside"
          element={<InsideDashboard />}
        />

        <Route
          path="/outside"
          element={<OutsideDashboard />}
        />
        <Route
             path="/add-customer"
            element={<AddCustomer />}
             />

      </Routes>

    </BrowserRouter>
  );
}

export default App;