import useAuth from "@/hooks/useAuth";
import AuthPrompt from "./auth-prompt/auth-prompt";

const CommentWrite = () => {
  const { user } = useAuth();
  const isUserLogged = user !== null;

  return <>{!isUserLogged && <AuthPrompt />}</>;
};

export default CommentWrite;
