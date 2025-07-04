import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./app";

vi.mock("./home/home", () => ({
  default: () => <>This is home page</>,
}));

describe("App component", () => {
  it("should render home page by default", () => {
    render(<App />);

    const blogListText = screen.getByText("This is home page");

    expect(blogListText).toBeInTheDocument();
  });
});
