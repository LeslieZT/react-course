import { useContext } from 'react';

import { Task } from './Tasks.types';
import { UserContext } from '../../context/userContext/userContext';

export const TaskCard = ({ task }: { task: Task }) => {
  const { user } = useContext(UserContext)

  return (
    <div key={task.id}>
      <h3>{task.title}</h3>
      { user?.id && <p>{ task.completed ? "completed" : "not completed" }</p>}
    </div>
  );
};
