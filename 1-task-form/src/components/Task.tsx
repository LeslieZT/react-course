import { useState } from 'react';
import { Task, TaskCardProps } from './Task.types';
import "./Task.css"

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleEdit,
  handleDelete,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, task: Task) => {
    e.preventDefault();

    const input = e.currentTarget.elements[0];

    if (input !== null && input instanceof HTMLInputElement) {
      handleEdit(task.id, {
        ...task,
        name: input.value,
      });
      setEditMode(false);
    }
  };

  return (
    <div className='container'>
      {editMode ? (
        <form onSubmit={(e) => handleSubmit(e, task)}>
          <input type="text" defaultValue={task.name} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <h3>{task.name}</h3>
          <p>{task.isDone ? 'Done' : 'Not done'}</p>
          <div>
            <button className="btn btn-edit" onClick={() => setEditMode(true)}>Edit</button>
            <button className="btn btn-delete" onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};
