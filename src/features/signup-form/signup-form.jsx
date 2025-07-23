import Input from "@/components/input/input";
import { useState } from "react";
import { Form } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Form method="post">
      <Input
        type="text"
        name="username"
        value={username}
        setValue={setUsername}
      >
        Username
      </Input>
      <Input
        type="password"
        name="password"
        value={password}
        setValue={setPassword}
      >
        Password
      </Input>
      <Input
        type="password"
        name="confirm_password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      >
        Confirm Password
      </Input>

      <button>Sign Up</button>
    </Form>
  );
};

export default SignUpForm;
