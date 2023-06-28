import { useState } from "react";
import { createContext, useContext } from "react";
import { createTaskRequest, 
         getTasksRequest, 
         deleteTaskRequest,
         getTaskIdRequest,
         updateTaskRequest } from "../api/tasks";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {

   const [tasks, setTasks] = useState([]);

   const getTasks = async () => {
    try {
        const res = await getTasksRequest()
        setTasks(res.data)
    } catch (error) {
        console.error(error)
    }
   }

   const createTask = async (task) => {
    const res = await createTaskRequest(task)
    console.log(res)
   }

   const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if(res.status === 204) setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      console.log(error)
    }
   }

   const getTaskById = async (id) => {
    try {
      const res = await getTaskIdRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
   }

   const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error)
    }
   }

  return (

     <TasksContext.Provider 
        value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTaskById,
            updateTask
        }}
        >
       {children}
     </TasksContext.Provider>
     );
}
