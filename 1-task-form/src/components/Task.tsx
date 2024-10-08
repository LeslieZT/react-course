import { useState } from 'react';
import { Task, TaskCardProps } from './Task.types';
import style from "./Task.module.css"

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
    <div className={`${style.container}`}>
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
            <button className={`${style.btn} ${style['btn-edit']}`} onClick={() => setEditMode(true)}>Edit</button>
            <button className={`${style.btn} ${style['btn-delete']}`} onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};
