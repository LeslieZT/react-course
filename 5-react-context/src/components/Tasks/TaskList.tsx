import { useState } from 'react';
import { TaskCard } from './TaskCard';

const data = [
  {
    id: 1,
    title: "task1",
    completed: true
  },
  {
    id: 2,
    title: "task2",
    completed: false
  },
  {
    id: 3,
    title: "task3",
    completed: true
  }
]


export const TaskList = () => {
  const [ tasks ] = useState(data)
  return (
    <div className="flex flex-col ">
      <h2>TaskList</h2>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
