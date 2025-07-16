import { useState } from "react";
import { Form } from "react-router-dom";
import Input from "@/components/input/input";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      <button>Log in</button>
    </Form>
  );
};

export default LoginForm;
