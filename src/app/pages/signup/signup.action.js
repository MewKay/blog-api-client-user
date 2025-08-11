import signUpSchema from "@/constants/signup-schema";
import authService from "@/services/auth.service";
import AuthError from "@/lib/errors/auth.error";
import BadRequestError from "@/lib/errors/bad-request.error";
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

  try {
    await authService.signup(signUpData);
    return redirect("/log-in");
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof AuthError) {
      return error.response;
    }

    throw error;
  }
};

export default SignUpAction;
