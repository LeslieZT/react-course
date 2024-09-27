import { render, screen } from '@testing-library/react';
import { TaskList } from '../../../src/components/Tasks/TaskList';
import { ITaskContext, TasksContext } from '../../../src/context/taskContext/tasksContext';
import { Task } from '../../../src/components/Tasks/Tasks.types';


describe('TaskList Component', () => {
  it('debería mostrar la lista de tareas proporcionada por el contexto', () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ] as Task[];

    render(
      <TasksContext.Provider value={{ tasks: mockTasks } as ITaskContext}>
        <TaskList />
      </TasksContext.Provider>
    );
    expect(screen.getByText('TaskList')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
