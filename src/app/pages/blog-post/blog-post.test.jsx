import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "@/app/routes/routes";
import ROUTES_PATH from "@/app/routes/path";

import sqids from "@/lib/sqids";
import postService from "@/services/post.service";
import commentService from "@/services/comment.service";
import mockPosts from "@/testing/mocks/posts";
import mockComments from "@/testing/mocks/comments";

import setupPageRender from "@/testing/utils/setupPageRender";

vi.mock("@/app/layout/header/header.jsx");
vi.mock("../home/home.jsx");

vi.mock("@/lib/sqids.js", () => ({
  default: {
    decode: vi.fn(),
  },
}));
vi.mock("@/services/post.service.js", () => ({
  default: {
    getById: vi.fn(),
  },
}));
vi.mock("@/services/comment.service.js", () => ({
  default: {
    getAllByPostId: vi.fn(),
  },
}));

const mockPost = mockPosts[0];

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

const assertPostFetched = async () => {
  const postTitle = await screen.findByText(mockPost.title);
  const postAuthor = await screen.findByText(mockPost.author.username);
  const postText = await screen.findByText(mockPost.text);

  expect(postTitle).toBeInTheDocument();
  expect(postAuthor).toBeInTheDocument();
  expect(postText).toBeInTheDocument();
};

const assertCommentsFetched = async () => {
  for (let comment of mockComments) {
    const commentText = await screen.findByText(comment.text);

    expect(commentText).toBeInTheDocument();
  }
};

describe("Blog Post page", () => {
  beforeEach(() => {
    postService.getById.mockResolvedValueOnce(mockPost);
    commentService.getAllByPostId.mockResolvedValueOnce(mockComments);
    sqids.decode.mockReturnValueOnce(mockPost.id);
  });

  it("successfully fetches and display post and comments list", async () => {
    setupPageRender(routes, [
      "/" +
        ROUTES_PATH.blogPost
          .replace(":encodedId", "mockedId")
          .replace(":slug", mockPost.slug),
    ]);

    await assertPostFetched();
    await assertCommentsFetched();
  });

  it("display link back to blog list on post", async () => {
    const user = userEvent.setup();

    setupPageRender(routes, [
      "/" +
        ROUTES_PATH.blogPost
          .replace(":encodedId", "mockedId")
          .replace(":slug", mockPost.slug),
    ]);

    const homeLink = await screen.findByRole("link", { name: /to blog list/i });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    const homeText = await screen.findByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("display link to home on error boundary", async () => {
    const user = userEvent.setup();

    const testRoutes = mapRoutesArray(routes, (route) => {
      const isPathBlogPost = route.path === ROUTES_PATH.blogPost;

      if (!isPathBlogPost) {
        return route;
      }

      return {
        ...route,
        loader: () => Promise.reject(new Error("This is error")),
      };
    });

    setupPageRender(testRoutes, [
      "/" +
        ROUTES_PATH.blogPost
          .replace(":encodedId", "notAnActualId")
          .replace(":slug", mockPost.slug),
    ]);

    const homeLink = await screen.findByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    await user.click(homeLink);
    const homeText = await screen.findByText("This is home");

    expect(homeText).toBeInTheDocument();
  });

  it("display error boundary on invalid id", async () => {
    sqids.decode = vi.fn().mockImplementationOnce(() => {
      throw new Response();
    });
    const testRoutes = mapRoutesArray(routes, (route) => {
      const isPathBlogPost = route.path === ROUTES_PATH.blogPost;

      if (!isPathBlogPost) {
        return route;
      }

      const newRoute = {
        ...route,
        errorElement: <>This is error</>,
      };

      return newRoute;
    });

    setupPageRender(testRoutes, [
      "/" +
        ROUTES_PATH.blogPost
          .replace(":encodedId", "invalide")
          .replace(":slug", mockPost.slug),
    ]);

    const errorText = await screen.findByText("This is error");

    expect(errorText).toBeInTheDocument();
  });
});
