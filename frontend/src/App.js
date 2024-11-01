import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* login path */}
          <Route path="/login" element={<Login />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div>
                <h1>404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
