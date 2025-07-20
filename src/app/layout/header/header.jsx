import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const AuthLinks = () => {
  return (
    <div>
      <Link to={"/log-in"}>Log in</Link>
      <Link to={"/sign-up"}>Sign Up</Link>
    </div>
  );
};

const LoggedMenu = ({ logout, username }) => {
  return (
    <div>
      <button>Open</button>
      <ul>
        <li>{username}</li>
        <li>
          <button onClick={logout}>Log out</button>
        </li>
      </ul>
    </div>
  );
};

const Header = () => {
  const { user } = useAuth();

  const logout = () => {}; // TO DO: Implement logout inside context

  return (
    <header>
      <h1>ThyBlog</h1>

      {!user ? (
        <AuthLinks />
      ) : (
        <LoggedMenu logout={logout} username={user.username} />
      )}
    </header>
  );
};

LoggedMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Header;
