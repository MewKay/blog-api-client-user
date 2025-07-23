import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./app";

vi.mock("./pages/home/home.jsx", () => ({
  default: () => <>This is home page</>,
}));

vi.mock("./pages/login/login.jsx", () => ({
  default: () => <>This is log in page</>,
}));

describe("App component", () => {
  it("should render home page by default", () => {
    render(<App />);

    const homeText = screen.getByText(/This is home page/);

    expect(homeText).toBeInTheDocument();
  });

  it("should render log in page on link click", async () => {
    const user = userEvent.setup();
    render(<App />);

    const loginLink = screen.getByRole("link", { name: /log in/i });

    await user.click(loginLink);

    const homeText = screen.queryByText(/This is home page/);
    const loginText = await screen.findByText(/This is log in page/);

    expect(homeText).not.toBeInTheDocument();
    expect(loginText).toBeInTheDocument();
  });
});
