import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import SignUpForm from "@/features/signup-form/signup-form";
import { Link, useActionData } from "react-router-dom";

const SignUp = () => {
  const actionData = useActionData();

  return (
    <main>
      <Link to={-1}>{"<--"} Go back</Link>
      <div>
        <h3>Create your account</h3>
        <ActionErrorMessages actionData={actionData} />
        <SignUpForm />
      </div>
      <div>
        <p>
          Already have an account? <Link to={"/log-in"}>Log in here.</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
