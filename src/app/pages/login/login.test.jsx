import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import routes from "@/app/routes/routes";
import ROUTES_PATH from "@/app/routes/path";
import authService from "@/services/auth.service";
import setupPageRender from "@/testing/utils/setupPageRender";
import testInputTyping from "@/testing/utils/testInputTyping";

vi.mock("@/app/layout/header/header.jsx");
vi.mock("../home/home.jsx");

const mockInputValue = {
  username: "JohnSlam",
  password: "wordpass",
};
const routesEntries = ["/" + ROUTES_PATH.login];

describe("Log in page", () => {
  describe("Log in form", () => {
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
      authService.login = vi.fn();

      const user = userEvent.setup();
      setupPageRender(routes, routesEntries);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(usernameInput, mockInputValue.username);
      await user.type(passwordInput, mockInputValue.password);

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      expect(authService.login).toHaveBeenCalledWith(mockInputValue);

      const homeText = await screen.findByText(/This is home/);

      expect(homeText).toBeInTheDocument();
    });
  });
});
