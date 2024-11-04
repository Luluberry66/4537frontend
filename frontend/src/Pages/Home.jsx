import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");

    if (!token || !userEmail) {
      window.location.href = "/login";
      return;
    }

    const isAdminUser = userEmail === "admin@admin.com";

    setUserData({
      email: userEmail,
      role: isAdminUser ? "admin" : "user",
    });
    setIsAdmin(isAdminUser);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="brand">ML Drone Control</div>
        <div className="nav-right">
          <span className="user-email">
            {userData?.email} ({userData?.role.toUpperCase()})
          </span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome, {userData?.email}</h1>
          <p>Your API Calls Remaining: 20/20</p>
        </div>

        <div className="navigation-cards">
          <div
            className="card"
            onClick={() => (window.location.href = "https://ml.grace-su.com/demo")}
          >
            <h2>Demo</h2>
            <p>Try our ML drone demo</p>
          </div>
          <div
            className="card"
            onClick={() => (window.location.href = "https://ml.grace-su.com/gallery")}
          >
            <h2>Gallery</h2>
            <p>View saved drone paths</p>
          </div>
        </div>

        {isAdmin && (
          <div className="admin-section">
            <h2>API Usage Statistics</h2>
            <p>Admin functionality will be available soon.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;