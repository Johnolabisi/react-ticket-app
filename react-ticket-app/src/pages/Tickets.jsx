import { useCallback, useEffect, useState } from "react";
import { clearSession, showToast } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    status: "open",
  });
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTicket, setEditTicket] = useState({
    id: null,
    title: "",
    description: "",
    status: "open",
  });

  // ===== LocalStorage Helpers =====
  const getTickets = () =>
    JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];

  const saveTickets = (data) =>
    localStorage.setItem("ticketapp_tickets", JSON.stringify(data));

  const renderTickets = useCallback(() => setTickets(getTickets()), []);

  // ===== Create Ticket =====
  function addTicket(e) {
    e.preventDefault();

    if (!newTicket.title || !newTicket.status) {
      showToast("Title and status are required.", "error");
      return;
    }

    const updated = [
      ...getTickets(),
      {
        id: Date.now(),
        title: newTicket.title.trim(),
        description: newTicket.description.trim(),
        status: newTicket.status,
      },
    ];

    saveTickets(updated);
    renderTickets();
    showToast("Ticket added successfully!", "success");
    setNewTicket({ title: "", description: "", status: "open" });
  }

  // ===== Edit Ticket =====
  function openEditModal(ticket) {
    setEditTicket({ ...ticket });
    setIsEditModalVisible(true);
  }

  function saveEdit(e) {
    e.preventDefault();

    if (
      !editTicket.title ||
      !["open", "in_progress", "closed"].includes(editTicket.status)
    ) {
      showToast("Invalid input or status.", "error");
      return;
    }

    const updated = getTickets().map((t) =>
      t.id === editTicket.id ? { ...editTicket } : t
    );

    saveTickets(updated);
    renderTickets();
    setIsEditModalVisible(false);
    showToast("Ticket updated successfully!", "success");
  }

  // ===== Delete Ticket =====
  function deleteTicket(id) {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updated = getTickets().filter((t) => t.id !== id);
      saveTickets(updated);
      renderTickets();
      showToast("Ticket deleted successfully.", "info");
    }
  }

  // ===== Logout =====
  function logout() {
    clearSession();
    showToast("You have been logged out.", "info");
    navigate("/login");
  }

  // ===== Lifecycle =====
  useEffect(() => {
    renderTickets();
  }, [renderTickets]);

  // ===== Render =====
  return (
    <div>
      <section className="tickets-page container">
        <h1>Ticket Management</h1>

        {/* ===== New Ticket Form ===== */}
        <div className="ticket-form">
          <h2>Create New Ticket</h2>
          <form onSubmit={addTicket}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                placeholder="Enter ticket title"
                required
                value={newTicket.title}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter description (optional)"
                value={newTicket.description}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, description: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                required
                value={newTicket.status}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, status: e.target.value })
                }
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">
              Add Ticket
            </button>
          </form>
        </div>

        <hr />

        {/* ===== Ticket List ===== */}
        <div className="ticket-list">
          <h2>Existing Tickets</h2>
          {tickets.length ? (
            <div className="ticket-grid">
              {tickets.map((ticket) => (
                <div className={`ticket-card ${ticket.status}`} key={ticket.id}>
                  <div className="ticket-info">
                    <h3>{ticket.title}</h3>
                    <p>{ticket.description || "No description provided."}</p>
                  </div>

                  <div className="ticket-footer">
                    <span className={`status ${ticket.status}`}>
                      {ticket.status.replace("_", " ")}
                    </span>

                    <div className="ticket-actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(ticket)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTicket(ticket.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-tickets">No tickets yet.</p>
          )}
        </div>

        {/* ===== Logout Button ===== */}
        <button id="logoutBtn" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </section>

      {/* ===== Edit Modal ===== */}
      {isEditModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Ticket</h2>
            <form onSubmit={saveEdit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  required
                  value={editTicket.title}
                  onChange={(e) =>
                    setEditTicket({ ...editTicket, title: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  required
                  value={editTicket.description}
                  onChange={(e) =>
                    setEditTicket({
                      ...editTicket,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  required
                  value={editTicket.status}
                  onChange={(e) =>
                    setEditTicket({
                      ...editTicket,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsEditModalVisible(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Toast Placeholder ===== */}
      <div id="toast" className="toast"></div>
    </div>
  );
};

export default Tickets;
