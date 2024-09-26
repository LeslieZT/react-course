import { useState } from "react";
import { TaskForm } from "../components/Tasks/TaskForm";
import { TaskList } from "../components/Tasks/TaskList";


export const TasksPage = () => {
  const [tasks, setTasks] = useState([])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-center font-semibold text-gray-900 ">
        Tasks
      </h1>
      {/* <TasksContextProvider> */}
        <h2>TasksPage</h2>
        {/* <TotalTasks /> */}
        <TaskForm setTasks={setTasks} tasks={tasks}/>
        <TaskList tasks={tasks}/>
      {/* </TasksContextProvider> */}
    </div>
  );
};
