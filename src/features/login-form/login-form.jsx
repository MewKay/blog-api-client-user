import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import Input from "@/components/input/input";
import loginSchema from "@/constants/loginSchema";
import ranges from "@/constants/validationRanges";
import Button from "@/components/button/button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const { errors, isFormValid } = loginSchema.validateInputs({
    username,
    password,
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

      <Button
        colorScheme={"dark"}
        disabled={!isFormValid || navigation.state === "submitting"}
      >
        Log in
      </Button>
    </Form>
  );
};

export default LoginForm;
