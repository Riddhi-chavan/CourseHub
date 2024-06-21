import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

const Admin = () => {
  const [login, setlogin] = useState(false);
  return (
    <div>
      {login ? (
        <AdminDashboard />
      ) : (
        <AdminLogin login={login} setlogin={setlogin} />
      )}
    </div>
  );
};

export default Admin;
