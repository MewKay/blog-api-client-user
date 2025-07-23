import { describe, expect, it, vi } from "vitest";
import setupPageRender from "@/testing/utils/setupPageRender";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import testInputTyping from "@/testing/utils/testInputTyping";
import ROUTES_PATH from "@/app/routes/path";
import routes from "@/app/routes/routes";
import authService from "@/services/auth.service";

vi.mock("../login/login.jsx", () => ({
  default: () => <p>This is log in page</p>,
}));

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

    it("should call auth service sign up and redirect to login page", async () => {
      authService.signup = vi.fn();
      const user = userEvent.setup();
      setupPageRender(routes, routeEntries);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.type(confirmPasswordInput, mockInputValue.confirm_password);

      const submitButton = screen.getByRole("button", { name: /sign up/i });
      await user.click(submitButton);

      expect(authService.signup).toHaveBeenCalledWith(mockInputValue);

      const loginText = await screen.findByText(/This is log in page/);

      expect(loginText).toBeInTheDocument();
    });
  });
});
