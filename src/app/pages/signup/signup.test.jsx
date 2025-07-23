import { describe } from "vitest";
import testInputTyping from "@/testing/utils/testInputTyping";
import ROUTES_PATH from "@/app/routes/path";

const mockInputValue = {
  username: "JohnJohn",
  password: "wordpass",
  confirm_password: "pordwass",
};
const routeEntries = ["/" + ROUTES_PATH.signup];

describe("Sign up page", () => {
  describe("Sign up form", () => {
    testInputTyping(
      [
        {
          inputName: "username",
          inputLabel: /username/i,
          inputValue: mockInputValue.username,
        },
        {
          inputName: "password",
          inputLabel: /^password$/i,
          inputValue: mockInputValue.password,
        },
        {
          inputName: "confirm_password",
          inputLabel: /confirm password/i,
          inputValue: mockInputValue.confirm_password,
        },
      ],
      routeEntries,
    );
  });
});
