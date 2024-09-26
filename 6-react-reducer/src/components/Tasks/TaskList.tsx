import { TaskCard } from "./TaskCard";
import { Task } from "./Tasks.types";

interface TaskListProps {
  tasks: Task[]
  markAsCompleted : (id: number) => void
  changeStatus : (id: number, string: any) => void
}

export const TaskList = ({ tasks, markAsCompleted, changeStatus }: TaskListProps) => {
  return (
    <div className="flex flex-col ">
      <h2>TaskList</h2>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} markAsCompleted={markAsCompleted} changeStatus={changeStatus}/>
        ))}
      </div>
    </div>
  );
};
