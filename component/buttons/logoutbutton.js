import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Clear token from local storage or wherever you store it
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};