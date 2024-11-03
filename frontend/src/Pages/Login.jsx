import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? 'https://ml.grace-su.com/login' : 'https://ml.grace-su.com/signup';
      
      console.log('Sending request to:', endpoint);
      console.log('Request data:', formData);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        if (isLogin) {
          if (data.token) {
            // Store token if needed
            localStorage.setItem('token', data.token);
            // Redirect to demo page
            window.location.href = '/';
          } else {
            setMessage('Login successful');
          }
        } else {
          setMessage(data.message || 'Signup successful');
          // If signup successful, switch to login form after delay
          setTimeout(() => {
            setIsLogin(true);
            setFormData({ email: '', password: '' });
            setMessage('');
          }, 1500);
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Remove any potentially harmful characters
    const sanitizedValue = value.replace(/[<>]/g, '');
    setFormData(prevState => ({
      ...prevState,
      [name]: sanitizedValue
    }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const isFormValid = () => {
    return formData.email && formData.password && validateEmail(formData.email);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to Sketch to Art</h1>
        
        <div className="tab-buttons">
          <button 
            className={`tab-button ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setMessage('');
            }}
            type="button"
          >
            Login
          </button>
          <button 
            className={`tab-button ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setMessage('');
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
              onChange={handleInputChange}
              placeholder="Email"
              className="form-input"
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="form-input"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              disabled={isLoading}
              minLength="3"
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

          <button 
            type="submit" 
            className="submit-button"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;