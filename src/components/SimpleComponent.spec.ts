import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/vue";
import SimpleComponent from "./SimpleComonent.vue";
import userEvent from "@testing-library/user-event";

// @vitest-environment jsdom
describe("SimpleComponent", () => {
  afterEach(cleanup);

  it("Should render given title", () => {
    render(SimpleComponent, { props: { title: "Test Title" } });
    expect(screen.getByText("Test Title")).not.toBeUndefined();
  });

  Array.from(Array(1000)).forEach((_) => {
    it("bla", () => {
      render(SimpleComponent, { props: { title: "Test Title" } });
      expect(screen.getByText("Test Title")).not.toBeUndefined();
    });
  });

  it("should increase count when button is clicked", async () => {
    render(SimpleComponent, { props: { title: "Test Title" } });
    expect(screen.getByTestId("counter").textContent).toBe("0");
    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("counter").textContent).toBe("1");
  });
});
