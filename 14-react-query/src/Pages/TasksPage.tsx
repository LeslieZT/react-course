// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskForm } from "../components/Tasks/TaskForm";
import { TaskList } from "../components/Tasks/TaskList";
import { TotalTasks } from "../components/Tasks/TotalTasks";
import { TasksContextProvider } from "../context/taskContext/TasksContextProvider";
import { useTasks } from "../hooks/useTasks";
// import { createTask, getTasks } from "../service/tasksService";

export const TasksPage = () => {

  // const queryClient = useQueryClient();

  // const { data, error, isLoading} = useQuery({
  //   queryFn: () => getTasks(),
  //   queryKey: ['tasks']
  // })

  //  const { mutateAsync: addTaskMutation } = useMutation({
  //   mutationFn: () =>
  //     createTask({
  //       id: 39,
  //       title: 'Task 39',
  //       description: 'Task 39 description',
  //       status: 'not started',
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //       userId: 1,
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['tasks']);
  //   },
  // });
  // console.log({data, error, isLoading})


  const { data, error, isLoading } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
     <h1 className="text-3xl text-center font-semibold text-gray-900 ">
        Tasks
      </h1>
      <TasksContextProvider>
        <h2>TasksPage</h2>
        <TotalTasks/>
        <TaskForm/>
        <TaskList tasks={data?.data}/>
      </TasksContextProvider>
    </div>
  );
};
