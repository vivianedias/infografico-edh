import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("Header", async () => {
  render(<Header />);

  expect(screen.getByRole("link", { name: /whatWeDo/i })).toBeInTheDocument();
});
