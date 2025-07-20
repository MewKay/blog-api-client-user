import authService from "@/services/auth.service";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: {
    id: null,
    username: null,
    is_author: null,
  },
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
