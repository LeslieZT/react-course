import React, { useReducer } from 'react';
import { TasksContext } from './tasksContext';
import { Task } from '../../components/Tasks/Tasks.types';
import { taskReducer } from '../../components/reducer/TaskReducer';

export const TasksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(taskReducer, []);

  const contextValue = {
    tasks: state,
    totalTasks: state.length,
    completedTasks: state.filter((task: Task) => task.status === 'COMPLETED').length,

    createTask: (task: Task) => {
      console.log({ taskInReducer: task });
      dispatch({ type: 'ADD_TASK', payload: { task } });
    },
    markAsCompleted : (id: number) => {
      dispatch({ type: "TOGGLE_COMPLETED", payload: { id } });
    },
  
    changeStatus : (id: number, status:  'IN_PROGRESS' | 'COMPLETED' | 'PENDING') => {
      dispatch({type: "CHANGE_STATUS", payload: { id, status }})
    },

    deleteTask: (id: number) => {
      dispatch({ type: 'DELETE_TASK', payload: { id } });
    },
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};
