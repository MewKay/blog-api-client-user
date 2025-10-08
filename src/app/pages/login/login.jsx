import LoginForm from "@/features/login-form/login-form";
import { Link, useActionData } from "react-router-dom";
import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";

const Login = () => {
  const actionData = useActionData();

  return (
    <main>
      <Link to={-1}>{"<--"} Go back</Link>
      <div>
        <h3>Log in to your account</h3>
        <ActionErrorMessages actionData={actionData} />
        <LoginForm />
      </div>
      <div>
        Don&apos;t have an account yet ?{" "}
        <Link to={"/sign-up"}>Sign up here</Link>.
      </div>
    </main>
  );
};

export default Login;
