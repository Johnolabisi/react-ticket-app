export function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);
}
export const getUsers = () =>
  JSON.parse(localStorage.getItem("ticketapp_users")) || [];
export const saveUsers = (users) =>
  localStorage.setItem("ticketapp_users", JSON.stringify(users));
export const setSession = (email) =>
  localStorage.setItem("ticketapp_session", JSON.stringify({ user: email }));
export const getSession = () => JSON.parse(localStorage.getItem("ticketapp_session"));
export const clearSession = () => localStorage.removeItem("ticketapp_session");