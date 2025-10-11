import paths from "@/app/routes/paths";
import { Link, useActionData } from "react-router-dom";
import BackLink from "@/components/back-link/back-link";
import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import LoginForm from "@/features/login-form/login-form";
import styles from "@/styles/components/auth-form.module.css";

const Login = () => {
  const actionData = useActionData();

  return (
    <main className={styles.formMain}>
      <BackLink />
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Log in to your account</h3>
        <ActionErrorMessages actionData={actionData} />
        <LoginForm />
      </div>
      <div className={styles.prompt}>
        Don&apos;t have an account yet?{" "}
        <Link to={paths.signup.path}>Sign up here</Link>.
      </div>
    </main>
  );
};

export default Login;
