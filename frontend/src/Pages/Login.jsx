import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const endpoint = `https://ml.grace-su.com/${isLogin ? "login" : "signup"}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          if (data.token) {
            const isAdmin = formData.email === "admin@admin.com";

            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", formData.email);
            localStorage.setItem("userRole", isAdmin ? "admin" : "user");

            onLogin();
          }
        } else {
          setMessage("Signup successful");
          setTimeout(() => {
            setIsLogin(true);
            setFormData({ email: "", password: "" });
            setMessage("");
          }, 1500);
        }
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to Sketch to Art</h1>

        <div className="tab-buttons">
          <button
            className={`tab-button ${isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
              setMessage("");
            }}
            type="button"
          >
            Login
          </button>
          <button
            className={`tab-button ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
              setMessage("");
            }}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              className="form-input"
              required
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
          {message && (
            <div className="success-message" role="alert">
              {message}
            </div>
          )}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;