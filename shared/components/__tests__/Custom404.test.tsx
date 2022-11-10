import { ThemeProvider } from "@chakra-ui/react"
import { render, screen } from "@testing-library/react"
import Custom404 from '../Custom404'

describe("Custom 404", () => {
  it("should render on the page", () => {
    render(<ThemeProvider theme={{}}><Custom404 t={jest.fn()} /></ThemeProvider>)

    expect(screen.getByRole("heading")).toBeInTheDocument()
  })
})