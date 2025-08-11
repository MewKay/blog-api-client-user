import SignUpForm from "@/features/signup-form/signup-form";
import { useActionData } from "react-router-dom";

const SignUp = () => {
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

      <SignUpForm />
    </main>
  );
};

export default SignUp;
