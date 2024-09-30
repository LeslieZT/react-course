import { useContext } from 'react';
import { Task } from './Tasks.types';
import { TasksContext } from '../../context/taskContext/tasksContext';
import { useDeleteTask } from '../../hooks/useTasks';

interface TaskCardProps {
  task: Task
  // markAsCompleted : (id: number) => void,
  // changeStatus : (id: number, string: any) => void
}

export const TaskCard = ({ task}: TaskCardProps ) => {
  const { id, title, description, status, completed } = task || {};

  // const { changeStatus, markAsCompleted, deleteTask } = useContext(TasksContext)
  const { mutateAsync: deleteTaskMutation } = useDeleteTask();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // changeStatus(id, e.target.value as Task['status']);
  };

  const handleDelete = (id: number) => {
    console.log('delete task', id);
    deleteTaskMutation(id);
  }

  return (
    <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
          {<span className=" text-red-400">{completed ? 'IS COMPLETED' : 'NOT COMPLETED'}</span>}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <div className="flex justify-between gap-4">
        <select name="status" id="status" onChange={handleSelectChange} value={status}>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
        </select>

        <button
          // onClick={() => markAsCompleted(id)}
          className="inline-flex items-center px-3 py-2 text-m font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Mark as completed
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Edit
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Delete
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
