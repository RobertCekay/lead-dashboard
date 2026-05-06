import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Decisions from "./Decisions";
import { getDecisions, createDecision, updateDecision } from "./api";

vi.mock("./api", () => ({
  getDecisions: vi.fn(),
  createDecision: vi.fn(),
  updateDecision: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Decisions", () => {
  test("shows an empty state when there are no decisions", async () => {
    getDecisions.mockResolvedValue([]);
    render(<Decisions />);
    expect(await screen.findByText(/no decisions yet/i)).toBeInTheDocument();
  });

  test("renders fetched decisions with their fields", async () => {
    getDecisions.mockResolvedValue([
      {
        id: 1,
        title: "Use Postgres",
        context: "Need a real DB",
        decision: "Adopt Postgres",
        tradeoffs: "More setup",
      },
    ]);

    render(<Decisions />);

    expect(await screen.findByText("Use Postgres")).toBeInTheDocument();
    expect(screen.getByText("Need a real DB")).toBeInTheDocument();
    expect(screen.getByText("Adopt Postgres")).toBeInTheDocument();
    expect(screen.getByText("More setup")).toBeInTheDocument();
  });

  test("creates a new decision and prepends it to the list", async () => {
    const user = userEvent.setup();
    getDecisions.mockResolvedValue([]);
    createDecision.mockResolvedValue({
      id: 42,
      title: "Adopt Vitest",
      context: "Need component tests",
      decision: "Use Vitest + RTL",
      tradeoffs: "Another tool to learn",
    });

    render(<Decisions />);
    await screen.findByText(/no decisions yet/i);

    await user.type(screen.getByPlaceholderText("Title"), "Adopt Vitest");
    await user.type(screen.getByPlaceholderText("Context"), "Need component tests");
    await user.type(screen.getByPlaceholderText("Decision"), "Use Vitest + RTL");
    await user.type(screen.getByPlaceholderText("Tradeoffs"), "Another tool to learn");

    await user.click(screen.getByRole("button", { name: /add decision/i }));

    expect(createDecision).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Adopt Vitest",
        context: "Need component tests",
        decision: "Use Vitest + RTL",
        tradeoffs: "Another tool to learn",
      })
    );
    expect(await screen.findByText("Adopt Vitest")).toBeInTheDocument();
  });

  test("edits an existing decision and updates the row in place", async () => {
    const user = userEvent.setup();
    getDecisions.mockResolvedValue([
      {
        id: 1,
        title: "Use Postgres",
        context: "Need a real DB",
        decision: "Adopt Postgres",
        tradeoffs: "More setup",
      },
    ]);
    updateDecision.mockResolvedValue({
      id: 1,
      title: "Use Postgres",
      context: "Need a real DB",
      decision: "Adopt Postgres",
      tradeoffs: "Reconsidered after onboarding pain",
    });

    render(<Decisions />);
    await screen.findByText("Use Postgres");

    await user.click(screen.getByRole("button", { name: /^edit$/i }));

    const tradeoffInputs = screen.getAllByPlaceholderText("Tradeoffs");
    const editTradeoffs = tradeoffInputs.find((i) => i.value === "More setup");
    await user.clear(editTradeoffs);
    await user.type(editTradeoffs, "Reconsidered after onboarding pain");

    await user.click(screen.getByRole("button", { name: /^save$/i }));

    expect(updateDecision).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ tradeoffs: "Reconsidered after onboarding pain" })
    );
    expect(
      await screen.findByText("Reconsidered after onboarding pain")
    ).toBeInTheDocument();
  });
});
