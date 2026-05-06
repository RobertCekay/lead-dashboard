import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { getSummary } from "./api";

vi.mock("./api", () => ({
  getSummary: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Dashboard", () => {
  test("shows placeholders before data loads", () => {
    getSummary.mockReturnValue(new Promise(() => {}));
    render(<Dashboard />);
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });

  test("renders summary cards from the API", async () => {
    getSummary.mockResolvedValue({
      total_tasks: 7,
      total_estimated_hours: 24,
      open_tasks: 3,
      in_progress: 2,
      high_risk: 1,
    });

    render(<Dashboard />);

    expect(await screen.findByText("7")).toBeInTheDocument();
    expect(screen.getByText("24h")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/total work items/i)).toBeInTheDocument();
    expect(screen.getByText(/high risk/i)).toBeInTheDocument();
  });
});
