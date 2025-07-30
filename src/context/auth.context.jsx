import authService from "@/services/auth.service";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: {
    id: null,
    username: null,
    is_author: null,
  },
  logout: () => {},
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => setUser(authService.getUser());

    updateUser();

    window.addEventListener("storage", updateUser);
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
