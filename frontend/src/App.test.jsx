import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./Dashboard", () => ({ default: () => <div>DashboardMock</div> }));
vi.mock("./Tasks", () => ({ default: () => <div>TasksMock</div> }));
vi.mock("./Decisions", () => ({ default: () => <div>DecisionsMock</div> }));

describe("App", () => {
  test("renders the page header", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /engineering delivery dashboard/i,
      })
    ).toBeInTheDocument();
  });

  test("renders Dashboard, Tasks, and Decisions sections", () => {
    render(<App />);
    expect(screen.getByText("DashboardMock")).toBeInTheDocument();
    expect(screen.getByText("TasksMock")).toBeInTheDocument();
    expect(screen.getByText("DecisionsMock")).toBeInTheDocument();
  });
});
