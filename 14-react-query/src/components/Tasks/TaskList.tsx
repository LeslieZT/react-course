import { useContext } from "react";
import { TaskCard } from "./TaskCard";
import { TasksContext } from "../../context/taskContext/tasksContext";
import { Task } from "./Tasks.types";


export const TaskList = ({ tasks }: { tasks: Task[]}) => {
  // const {tasks} = useContext(TasksContext)

  if(!tasks?.length){
    return <div>Not tasks</div>
  }
  return (
    <div className="flex flex-col ">
      <h2>TaskList</h2>

      <div className="flex flex-col gap-4">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  );
};
