import React, { useState } from "react";
import { getUsers, saveUsers, showToast } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password || !name) {
      showToast("All fields are required.", "error");
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      showToast("Email already exists. Please log in.", "error");
      return;
    }

    users.push(
      users.push({
        name: name,
        email: email,
        password: password,
      })
    );
    saveUsers(users);
    showToast("Signup successful! Please log in.", "success");
    setTimeout(() => navigate("/login"), 1200);
  }
  return (
    <div>
      <section className="auth-section">
        <div className="container auth-container">
          <div className="auth-box">
            <h2>Create an Account</h2>
            <p className="subtitle">Join TicketApp to manage tickets easily</p>

            <form id="signupForm" className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
                <small className="error-message" id="nameError"></small>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                <small className="error-message" id="emailError"></small>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a strong password"
                  required
                />
                <small className="error-message" id="passwordError"></small>
              </div>

              <button type="submit" className="btn primary full">
                Sign Up
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>

        <div id="toast" className="toast"></div>
      </section>
    </div>
  );
};

export default SignUp;
