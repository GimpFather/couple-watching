import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <form onSubmit={(event) => handleLogout(event)}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default DashboardPage;
