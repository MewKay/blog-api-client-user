import { Link } from "react-router-dom";

const AuthPrompt = () => {
  return (
    <p>
      To leave a comment, you need to
      <Link to={"/log-in"}>Log in</Link>
      or
      <Link to={"/sign-up"}>Sign up</Link>.
    </p>
  );
};

export default AuthPrompt;
