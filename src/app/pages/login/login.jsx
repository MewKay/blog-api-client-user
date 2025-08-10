import LoginForm from "@/features/login-form/login-form";
import { useActionData } from "react-router-dom";

const Login = () => {
  const actionData = useActionData();

  return (
    <main>
      {actionData && (
        <ul>
          {Array.isArray(actionData.error) ? (
            actionData.error.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))
          ) : (
            <li>{actionData.error}</li>
          )}
        </ul>
      )}
      <LoginForm />
    </main>
  );
};

export default Login;
