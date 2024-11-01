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

    const API_BASE_URL = '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

    try {
        const endpoint = isLogin ? '/login' : '/signup';
        
        console.log('Sending request to:', `${API_BASE_URL}${endpoint}`);
        console.log('Request data:', formData);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            mode: 'cors', 
            body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            if (response.status === 400) {
            const data = await response.json();
            setError(data.message || 'Invalid credentials');
            } else if (response.status === 404) {
            setError('Service not available');
            } else {
            setError('An error occurred. Please try again.');
            }
            return;
        }

        try {
            const data = await response.json();
            if (isLogin) {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/drone';
            } else {
                setMessage('Login successful');
            }
            } else {
            setMessage('Signup successful');
            setTimeout(() => {
                setIsLogin(true);
                setFormData({ email: '', password: '' });
                setMessage('');
            }, 1500);
            }
        } catch (parseError) {
            console.error('Parse error:', parseError);
            setError('Invalid server response');
        }
        } catch (err) {
        console.error('Network error:', err);
        setError('Unable to connect to the server. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value.trim()
        }));
    };

    return (
        <div className="login-container">
        <div className="login-box">
            <h1 className="login-title">Welcome to Auth App</h1>
            
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
                disabled={!formData.email || !formData.password}
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
            </form>
        </div>
        </div>
    );
};

export default Login;