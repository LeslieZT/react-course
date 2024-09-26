import { useContext } from "react";
import { TaskCard } from "./TaskCard";
import { TasksContext } from "../../context/taskContext/tasksContext";


export const TaskList = () => {
  const {tasks} = useContext(TasksContext)
  return (
    <div className="flex flex-col ">
      <h2>TaskList</h2>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  );
};
