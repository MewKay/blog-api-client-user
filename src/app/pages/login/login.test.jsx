import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import routes from "@/app/routes/routes";
import ROUTES_PATH from "@/app/routes/path";
import authService from "@/services/auth.service";
import setupPageRender from "@/testing/utils/setupPageRender";
import testInputTyping from "@/testing/utils/testInputTyping";
import BadRequestError from "@/lib/errors/bad-request.error";

vi.mock("@/app/layout/header/header.jsx");
vi.mock("../home/home.jsx");
vi.mock("@/services/auth.service", () => ({
  default: {
    login: vi.fn(),
  },
}));

const mockInputValue = {
  username: "JohnSlam",
  password: "wordpass",
};
const routesEntries = ["/" + ROUTES_PATH.login];

const setup = () => {
  const user = userEvent.setup();
  setupPageRender(routes, routesEntries);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /log in/i });

  return {
    user,
    usernameInput,
    passwordInput,
    submitButton,
  };
};

describe("Log in page", () => {
  describe("Log in form", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    testInputTyping(
      [
        {
          inputName: "username",
          inputLabel: /username/i,
          inputValue: mockInputValue.username,
        },
        {
          inputName: "password",
          inputLabel: /password/i,
          inputValue: mockInputValue.password,
        },
      ],
      routesEntries,
    );

    it("should call auth service login and redirect to home when form is submitted", async () => {
      const { user, usernameInput, passwordInput, submitButton } = setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.click(submitButton);

      expect(authService.login).toHaveBeenCalledWith(mockInputValue);

      const homeText = await screen.findByText(/This is home/);

      expect(homeText).toBeInTheDocument();
    });

    it("should display one or many error message for any problem occuring during api call", async () => {
      const errorMessages = ["Username is invalid", "Password is too weak"];

      authService.login.mockImplementationOnce(() => {
        throw new BadRequestError("Validation error", { error: errorMessages });
      });
      const { user, usernameInput, passwordInput, submitButton } = setup();

      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);
      await user.click(submitButton);

      expect(authService.login).toHaveBeenCalledWith(mockInputValue);

      for (let message of errorMessages) {
        const errorText = await screen.findByText(message);
        expect(errorText).toBeInTheDocument();
      }
    });

    it("should not let user submit form if it is invalid", async () => {
      const { user, usernameInput, submitButton } = setup();

      await user.type(usernameInput, "Bot");
      await user.click(submitButton);

      expect(authService.login).not.toHaveBeenCalled();

      const homeText = screen.queryByText(/This is home/);

      expect(homeText).not.toBeInTheDocument();
    });
  });
});
