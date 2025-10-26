import React, { useState } from "react";
import { getUsers, setSession, showToast } from "../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if(!email || !password){
      showToast("Please fill in all fields.", "error");
      return;
    }
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      showToast("Invalid email or password. Please try again.", "error");
      return;
    }

    setSession(email);
    showToast("Login successful! Redirecting...", "success");
    setTimeout(() => (window.location.href = "/dashboard"), 1200);
  }
  

  return (
    <div>
      <section className="auth-section">
        <div className="container auth-container">
          <div className="auth-box">
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to access your dashboard</p>

            <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small className="error-message" id="emailError"></small>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="error-message" id="passwordError"></small>
              </div>

              <button type="submit" className="btn primary full">
                Login
              </button>
            </form>

            <p className="auth-switch">
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>

        <div id="toast" className="toast"></div>
      </section>
    </div>
  );
};

export default Login;
