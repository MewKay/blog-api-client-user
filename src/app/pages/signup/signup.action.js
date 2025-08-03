import signUpSchema from "@/constants/signup-schema";
import authService from "@/services/auth.service";
import { redirect } from "react-router-dom";

const SignUpAction = async ({ request }) => {
  const formData = await request.formData();

  const signUpData = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const validator = signUpSchema.validateInputs(signUpData);

  if (!validator.isFormValid) {
    return { error: "Provided inputs are invalid" };
  }

  await authService.signup(signUpData);

  return redirect("/log-in");
};

export default SignUpAction;
