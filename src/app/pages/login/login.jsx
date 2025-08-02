import LoginForm from "@/features/login-form/login-form";
import { useActionData } from "react-router-dom";

const Login = () => {
  const actionData = useActionData();

  return (
    <main>
      <p>{actionData?.error}</p>
      <LoginForm />
    </main>
  );
};

export default Login;
