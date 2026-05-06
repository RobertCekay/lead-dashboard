import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tasks from "./Tasks";
import { getTasks, createTask, updateTask } from "./api";

vi.mock("./api", () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Tasks", () => {
  test("shows an empty state when there are no tasks", async () => {
    getTasks.mockResolvedValue([]);
    render(<Tasks />);
    expect(await screen.findByText(/no tasks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/0 total/i)).toBeInTheDocument();
  });

  test("renders fetched tasks with status and risk badges", async () => {
    getTasks.mockResolvedValue([
      {
        id: 1,
        title: "Write tests",
        description: "Cover the React components",
        estimate_hours: 3,
        risk_level: "low",
        status: "open",
      },
      {
        id: 2,
        title: "Migrate DB",
        description: "",
        estimate_hours: 8,
        risk_level: "high",
        status: "in_progress",
      },
    ]);

    render(<Tasks />);

    expect(await screen.findByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Migrate DB")).toBeInTheDocument();
    expect(screen.getByText("Cover the React components")).toBeInTheDocument();
    expect(screen.getByText("low risk")).toBeInTheDocument();
    expect(screen.getByText("high risk")).toBeInTheDocument();

    const openBadge = screen.getAllByText("open").find((el) => el.tagName === "SPAN");
    const inProgressBadge = screen.getAllByText("in_progress").find((el) => el.tagName === "SPAN");
    expect(openBadge).toBeInTheDocument();
    expect(inProgressBadge).toBeInTheDocument();

    expect(screen.getByText(/2 total/i)).toBeInTheDocument();
  });

  test("disables Add task until a title is entered", async () => {
    const user = userEvent.setup();
    getTasks.mockResolvedValue([]);
    render(<Tasks />);
    await screen.findByText(/no tasks yet/i);

    const addBtn = screen.getByRole("button", { name: /add task/i });
    expect(addBtn).toBeDisabled();

    await user.type(screen.getByPlaceholderText("Title"), "Plan sprint");
    expect(addBtn).toBeEnabled();
  });

  test("creates a new task and prepends it to the list", async () => {
    const user = userEvent.setup();
    getTasks.mockResolvedValue([]);
    createTask.mockResolvedValue({
      id: 99,
      title: "Plan sprint",
      description: "",
      estimate_hours: 4,
      risk_level: "low",
      status: "open",
    });

    render(<Tasks />);
    await screen.findByText(/no tasks yet/i);

    await user.type(screen.getByPlaceholderText("Title"), "Plan sprint");
    await user.type(screen.getByPlaceholderText("Hours"), "4");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(createTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Plan sprint",
        estimate_hours: 4,
        risk_level: "low",
        status: "open",
      })
    );
    expect(await screen.findByText("Plan sprint")).toBeInTheDocument();
  });

  test("edits an existing task and updates the row in place", async () => {
    const user = userEvent.setup();
    getTasks.mockResolvedValue([
      {
        id: 1,
        title: "Old title",
        description: "",
        estimate_hours: 3,
        risk_level: "low",
        status: "open",
      },
    ]);
    updateTask.mockResolvedValue({
      id: 1,
      title: "New title",
      description: "",
      estimate_hours: 3,
      risk_level: "low",
      status: "open",
    });

    render(<Tasks />);
    await screen.findByText("Old title");

    await user.click(screen.getByRole("button", { name: /^edit$/i }));

    const titleInputs = screen.getAllByPlaceholderText("Title");
    const editTitle = titleInputs.find((i) => i.value === "Old title");
    await user.clear(editTitle);
    await user.type(editTitle, "New title");

    await user.click(screen.getByRole("button", { name: /^save$/i }));

    expect(updateTask).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ title: "New title" })
    );
    expect(await screen.findByText("New title")).toBeInTheDocument();
    expect(screen.queryByText("Old title")).not.toBeInTheDocument();
  });
});
