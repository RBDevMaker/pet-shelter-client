import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("Renders main page correctly", async () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render the main page correctly", async () => {
    // Setup
    await render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const h1 = await screen.queryByText("AnyCompany Pet Shelter");

    // Assertions
    expect(h1).not.toBeNull();
  });

  it("Should show the footer with copyrights", async () => {
    // Setup
    await render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const year = new Date().getFullYear();
    const copyrights = await screen.queryByText(
      "© " + year + " AnyCompany Pet Shelter. All rights reserved."
    );

    // Assertions
    expect(copyrights).not.toBeNull();
  });
});
