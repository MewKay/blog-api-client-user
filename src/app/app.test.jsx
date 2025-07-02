import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./app";

vi.mock("./blog-list/blog-list", () => ({
  default: () => <>This is blog list</>,
}));

describe("App component", () => {
  it("should render blog list by default", () => {
    render(<App />);

    const blogListText = screen.getByText("This is blog list");

    expect(blogListText).toBeInTheDocument();
  });
});
