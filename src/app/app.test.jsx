import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "@/context/auth.context";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

vi.mock("./pages/home/home.jsx");

vi.mock("./pages/login/login.jsx", () => ({
  default: () => <>This is log in page</>,
}));

vi.mock("./pages/signup/signup.jsx", () => ({
  default: () => <>This is sign up page</>,
}));

const renderApp = () => {
  const router = createMemoryRouter(routes, { initialEntries: ["/"] });
  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  );
};

describe("App component", () => {
  it("should render home page by default", () => {
    renderApp();

    const homeText = screen.getByText(/This is home/);

    expect(homeText).toBeInTheDocument();
  });

  it("should render log in page on header link click", async () => {
    const user = userEvent.setup();
    renderApp();

    const loginLink = screen.getByRole("link", { name: /log in/i });

    await user.click(loginLink);

    const homeText = screen.queryByText(/This is home page/);
    const loginText = await screen.findByText(/This is log in page/);

    expect(homeText).not.toBeInTheDocument();
    expect(loginText).toBeInTheDocument();
  });

  it("should render sign up page on header link click", async () => {
    const user = userEvent.setup();
    renderApp();

    const signUpLink = screen.getByRole("link", { name: /sign up/i });

    await user.click(signUpLink);

    const homeText = screen.queryByText(/This is home page/);
    const signUpText = await screen.findByText(/This is sign up page/);

    expect(homeText).not.toBeInTheDocument();
    expect(signUpText).toBeInTheDocument();
  });
});
