import paths from "@/app/routes/paths";
import { Link } from "react-router-dom";
import styles from "./auth-prompt.module.css";

const AuthPrompt = () => {
  return (
    <p className={styles.text}>
      To leave a comment, you need to
      <Link className={styles.authLink} to={paths.login.path}>
        Log in
      </Link>
      or
      <Link className={styles.authLink} to={paths.signup.path}>
        Sign up
      </Link>
      .
    </p>
  );
};

export default AuthPrompt;
