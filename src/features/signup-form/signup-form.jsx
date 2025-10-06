import Button from "@/components/button/button";
import Input from "@/components/input/input";
import signUpSchema from "@/constants/signup-schema";
import ranges from "@/constants/validationRanges";
import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const { errors, isFormValid } = signUpSchema.validateInputs({
    username,
    password,
    confirm_password: confirmPassword,
  });

  return (
    <Form method="post">
      <Input
        type="text"
        name="username"
        value={username}
        setValue={setUsername}
        errorMessage={errors.username}
        minLength={ranges.username.min}
        maxLength={ranges.username.max}
      >
        Username
      </Input>
      <Input
        type="password"
        name="password"
        value={password}
        setValue={setPassword}
        errorMessage={errors.password}
        minLength={ranges.password.min}
        maxLength={ranges.password.max}
      >
        Password
      </Input>
      <Input
        type="password"
        name="confirm_password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errorMessage={errors.confirm_password}
        minLength={ranges.password.min}
        maxLength={ranges.password.max}
      >
        Confirm Password
      </Input>

      <Button
        colorScheme={"dark"}
        disabled={!isFormValid || navigation.state === "submitting"}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
