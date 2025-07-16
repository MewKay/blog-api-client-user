import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";

const LoginAction = async ({ request }) => {
  const formData = await request.formData();

  await authService.login(Object.fromEntries(formData));

  return redirect("/");
};

export default LoginAction;
