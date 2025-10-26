import React, { useEffect, useState } from 'react'
import { clearSession, showToast } from '../utils/helper';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [openCount, setOpenCount] = useState(0);
    const [progressCount, setProgressCount] = useState(0);
    const [closedCount, setClosedCount] = useState(0);
    const [recentTickets, setRecentTickets] = useState([]);
    const navigate = useNavigate();
    function logout() {
      clearSession();
      showToast("You have been logged out.", "info");
      navigate("/login");
    }
    const getTickets = () => {
      try {
        return JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
      } catch (e) {
        console.error("Error parsing tickets:", e);
        return [];
      }
    };
    useEffect(()=>{
        const tickets = getTickets();

        // Count tickets by status
        setOpenCount(tickets.filter((t) => t.status === "open").length);
        setProgressCount(tickets.filter(
          (t) => t.status === "in_progress"
        ).length)
        setClosedCount(tickets.filter((t) => t.status === "closed").length);

        // Recent 5 tickets
        setRecentTickets(tickets.slice(-5).reverse());
    }, [])
  return (
    <section className="dashboard-section">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>TicketApp</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="active">
            Dashboard
          </a>
          <a href="/tickets">Tickets</a>
          <a href="#" onClick={logout}>
            Logout
          </a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome Back 👋</h1>
          <p>Here’s an overview of your tickets</p>
        </header>

        <div className="stats-grid">
          <div className="stat-card open">
            <h3>Open Tickets</h3>
            <p>{openCount}</p>
          </div>

          <div className="stat-card progress">
            <h3>In Progress</h3>
            <p>{progressCount}</p>
          </div>

          <div className="stat-card closed">
            <h3>Closed Tickets</h3>
            <p>{closedCount}</p>
          </div>
        </div>

        <div className="recent-tickets">
          <h2>Recent Tickets</h2>

          {recentTickets.length === 0 ? (
            <div className="ticket-list">
              <p className="placeholder">
                No tickets found. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="ticket-list">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className={`ticket-item ${ticket.status}`}>
                  <h4>{ticket.title}</h4>
                  <p>{ticket.description || "No description provided."}</p>
                  <span className={`status ${ticket.status}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div id="toast" className="toast"></div>
    </section>
  );
}

export default Dashboard