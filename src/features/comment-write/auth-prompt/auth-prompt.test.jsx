import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthPrompt from "./auth-prompt";

describe("AuthPrompt component", () => {
  it("renders correctly", () => {
    const { container } = render(<AuthPrompt />, { wrapper: MemoryRouter });

    expect(container).toMatchSnapshot();
  });
});
