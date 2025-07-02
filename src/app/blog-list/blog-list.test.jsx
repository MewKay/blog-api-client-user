import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import BlogList from "./blog-list";

describe("Blog list component", () => {
  it("renders correclty", () => {
    const { container } = render(<BlogList />);

    expect(container).toMatchSnapshot();
  });
});
