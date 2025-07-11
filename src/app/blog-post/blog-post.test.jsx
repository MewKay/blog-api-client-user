import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import sqids from "@/lib/sqids";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";

vi.mock("../home/home.jsx", () => ({
  default: () => <p>This is home</p>,
}));

describe("Blog Post page", () => {
  it("display link to home while and after fetching", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/mockedid/slug"],
    });

    render(<RouterProvider router={router} />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    const homeText = await screen.findByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("display link to home if post is not found", async () => {
    sqids.decode = vi.fn().mockReturnValueOnce(null);
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/notAnActualId/slug"],
    });

    render(<RouterProvider router={router} />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    const homeText = await screen.findByText("This is home");

    expect(homeText).toBeInTheDocument();
  });
});
