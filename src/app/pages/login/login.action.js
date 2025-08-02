import loginSchema from "@/constants/loginSchema";
import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";

const LoginAction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const validator = loginSchema.validateInputs(credentials);
  if (!validator.isFormValid) {
    return { error: "Provided credentials are invalid" };
  }

  await authService.login(credentials);

  return redirect("/");
};

export default LoginAction;
