import { Link } from "react-router-dom";
import styles from "./auth-prompt.module.css";

const AuthPrompt = () => {
  return (
    <p className={styles.text}>
      To leave a comment, you need to
      <Link className={styles.authLink} to={"/log-in"}>
        Log in
      </Link>
      or
      <Link className={styles.authLink} to={"/sign-up"}>
        Sign up
      </Link>
      .
    </p>
  );
};

export default AuthPrompt;
