import SignUpForm from "@/features/signup-form/signup-form";
import { useActionData } from "react-router-dom";

const SignUp = () => {
  const actionData = useActionData();

  return (
    <main>
      <p>{actionData?.error}</p>
      <SignUpForm />
    </main>
  );
};

export default SignUp;
