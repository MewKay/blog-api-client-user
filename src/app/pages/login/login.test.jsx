import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "@/app/routes/routes";
import ROUTES_PATH from "@/app/routes/path";
import authService from "@/services/auth.service";

vi.mock("@/app/layout/header/header.jsx");
vi.mock("../home/home.jsx");

const setupRender = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/" + ROUTES_PATH.login],
  });
  render(<RouterProvider router={router} />);
};

const mockInputValue = {
  username: "JohnSlam",
  password: "wordpass",
};

describe("Log in page", () => {
  describe("Log in form", () => {
    it("should be able to type on username input", async () => {
      const user = userEvent.setup();
      setupRender();

      const usernameInput = screen.getByLabelText(/username/i);
      await user.type(usernameInput, mockInputValue.username);

      expect(usernameInput).toHaveValue(mockInputValue.username);
    });

    it("should be able to type on password input", async () => {
      const user = userEvent.setup();
      setupRender();

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, mockInputValue.password);

      expect(passwordInput).toHaveValue(mockInputValue.password);
    });

    it("should call auth service login and redirect to home when form is submitted", async () => {
      authService.login = vi.fn();

      const user = userEvent.setup();
      setupRender();

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
