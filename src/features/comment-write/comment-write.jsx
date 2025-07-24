import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const CommentWrite = () => {
  const { user } = useAuth();
  const isUserLogged = user !== null;

  return (
    <>
      {!isUserLogged && (
        <p>
          To leave a comment, you need to
          <Link to={"/log-in"}>Log in</Link>
          or
          <Link to={"/sign-up"}>Sign up</Link>.
        </p>
      )}
    </>
  );
};

export default CommentWrite;
