import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import "./App.css";

const ExternalRedirect = ({ to }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = `${to}?token=${token}`;
    } else {
      window.location.href = "/login";
    }
  }, [to, token]);

  return <div className="loading-indicator">Redirecting...</div>;
};

function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  useEffect(() => {
    // 检查认证状态
    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 默认路由 */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 登录路由 */}
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/home" /> : <Login />}
          />

          {/* Home 路由 */}
          <Route
            path="/home"
            element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
          />

          {/* Demo 路由 - 使用包装组件 */}
          <Route
            path="/demo"
            element={
              isAuthenticated() ? (
                <ExternalRedirect to="https://ml.grace-su.com/demo" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Gallery 路由 - 类似处理 */}
          <Route
            path="/gallery"
            element={
              isAuthenticated() ? (
                <ExternalRedirect to="https://ml.grace-su.com/gallery" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 404 路由 */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
