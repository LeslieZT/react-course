import { useReducer, useState } from "react";
import { TaskForm } from "../components/Tasks/TaskForm";
import { TaskList } from "../components/Tasks/TaskList";
import { taskReducer } from "../components/reducer/TaskReducer";
import { Task } from "../components/Tasks/Tasks.types";

export const TasksPage = () => {
  // const [tasks, setTasks] = useState([])
  // dispatch funcion para manejar el crud
  const [state, dispatch] = useReducer(taskReducer, []);
  
  const createTask = (task: Task) => {
    dispatch({ type: "ADD_TASK", payload: { task } });
  };

  const markAsCompleted = (id: number) => {
    dispatch({ type: "TOGGLE_COMPLETED", payload: { id } });
  }; // pop drilling estamos pasando el metodo en todos los componentes

  const changeStatus = (id: number, status:  'IN_PROGRESS' | 'COMPLETED' | 'PENDING') => {
    dispatch({type: "CHANGE_STATUS", payload: { id, status }})
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-center font-semibold text-gray-900 ">
        Tasks
      </h1>

      <h2>TasksPage</h2>

      <TaskForm createTask={createTask} />
      <TaskList tasks={state} markAsCompleted={markAsCompleted} changeStatus={changeStatus}/>
    </div>
  );
};
