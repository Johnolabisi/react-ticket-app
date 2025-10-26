import React from "react";
import waveImage from "../assets/wave.svg";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Manage Your Tickets Effortlessly</h1>
            <p>
              TicketApp helps you create, track, and resolve tickets easily —
              whether you’re managing tasks, customers, or project issues.
            </p>
            <div className="cta-buttons">
              <a href="/login" className="btn primary">
                Login
              </a>
              <a href="/signup" className="btn secondary">
                Get Started
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <img src={waveImage} alt="Decorative Wave" className="hero-wave" />
            <div className="circle-decor"></div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container features-grid">
          <div className="feature-card">
            <h3>Create Tickets</h3>
            <p>
              Submit new tickets instantly with validation and automatic
              tracking.
            </p>
          </div>
          <div className="feature-card">
            <h3>View & Manage</h3>
            <p>
              See open, in-progress, and closed tickets all in one organized
              dashboard.
            </p>
          </div>
          <div className="feature-card">
            <h3>Secure & Simple</h3>
            <p>
              All your ticket data is safely stored in local sessions — quick
              and secure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
