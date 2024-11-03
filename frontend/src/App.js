import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import "./App.css";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    if (!isAuthenticated() && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* login route */}
          <Route path="/login" element={<Login />} />

          {/* Demo route */}
          <Route
            path="/demo"
            element={
              isAuthenticated() ? (
                (window.location.href = "/demo")
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* redirect all to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
