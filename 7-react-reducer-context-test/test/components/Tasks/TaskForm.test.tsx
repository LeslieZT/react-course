import React from "react";
import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react";
import { TasksContext } from "../../../src/context/taskContext/tasksContext";
import { TaskForm } from "../../../src/components/Tasks/TaskForm";


describe("TaskForm", () => {
  it("should call createTask with the correct values ​​when the form is submitted", () => {
    const valueMock = {
      createTask: vi.fn(),
      totalTasks: 0,
      completedTasks: 0,
      tasks: [],
      deleteTask: vi.fn(),
      changeStatus: vi.fn(),
      markAsCompleted: vi.fn(),
    };
    render(
      <TasksContext.Provider value={valueMock}>
        <TaskForm />
      </TasksContext.Provider>
    );

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });


    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(submitButton);

    expect(valueMock.createTask).toHaveBeenCalledWith({
      id: expect.any(Number), 
      title: "Test Task",
      description: "Test Description",
      completed: false,
      status: "PENDING",
    });
  });
});
