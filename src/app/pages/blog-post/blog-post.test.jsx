import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import sqids from "@/lib/sqids";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "@/app/routes/routes";

vi.mock("../home/home.jsx", () => ({
  default: () => <p>This is home</p>,
}));

const mapRoutesArray = (routes, callback) => {
  const newRoutes = routes.map((route) => {
    if (!route.children) {
      return callback(route);
    }

    const newRoute = {
      ...route,
      children: mapRoutesArray(route.children, callback),
    };
    return callback(newRoute);
  });

  return newRoutes;
};

describe("Blog Post page", () => {
  it("display link to home on post", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/posts/mockedid/slug"],
    });

    render(<RouterProvider router={router} />);

    const homeLink = await screen.findByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    const homeText = await screen.findByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("display link to home on error boundary", async () => {
    sqids.decode = vi.fn().mockImplementationOnce(() => {
      throw new Response();
    });

    const user = userEvent.setup();

    const testRoutes = mapRoutesArray(routes, (route) => {
      const isPathBlogPost = route.path == "posts/:encodedId/:slug";

      if (!isPathBlogPost) {
        return route;
      }

      return {
        ...route,
        loader: () => Promise.reject(new Error("This is error")),
      };
    });

    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/posts/notAnActualId/slug"],
    });

    render(<RouterProvider router={router} />);

    const homeLink = await screen.findByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    const homeText = await screen.findByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("display error boundary on invalid id", async () => {
    const testRoutes = mapRoutesArray(routes, (route) => {
      const isPathBlogPost = route.path == "posts/:encodedId/:slug";

      if (!isPathBlogPost) {
        return route;
      }

      const newRoute = {
        ...route,
        errorElement: <>This is error</>,
      };

      return newRoute;
    });

    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/posts/invalidId/slug"],
    });

    render(<RouterProvider router={router} />);

    const errorText = await screen.findByText("This is error");

    expect(errorText).toBeInTheDocument();
  });
});
