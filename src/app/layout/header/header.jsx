import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import styles from "./header.module.css";
import LoggedMenu from "@/components/logged-menu/logged-menu";

const AuthLinks = () => {
  return (
    <div className={styles.authLinkContainer}>
      <Link to={"/log-in"}>Log in</Link>
      <Link to={"/sign-up"}>Sign Up</Link>
    </div>
  );
};

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1 className={styles.brand}>ThyBlog</h1>

      {!user ? (
        <AuthLinks />
      ) : (
        <LoggedMenu logout={logout} username={user.username} />
      )}
    </header>
  );
};

export default Header;
