import axios from "axios";
import { API_URL } from "../utils/constantes";
import { IBacklog } from "../types/IBacklog";
import { handleAxiosError } from "../utils/handleAxiosError";

export const getTasksBacklogController = async () => {
  try {
    const response = await axios.get<IBacklog>(`${API_URL}/backlog`);
    const tasks = response.data.tareas;
    return tasks;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al obtener sprints: ", message);
  }
};
export const createBacklogController = async (backlog: IBacklog) => {
  try {
    const response = await axios.post<IBacklog>(`${API_URL}/backlog`, backlog);
    const createdBacklog = response.data;
    return createdBacklog;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al obtener sprints: ", message);
  }
};

export const addTaskBacklogController = async (idTask: string) => {
  try {
    console.log("add task: " + idTask);
    const response = await axios.put<IBacklog>(
      `${API_URL}/backlog/add-task/${idTask}`
    );
    const updatedBacklog = response.data;
    return updatedBacklog;
  } catch (err) {
    console.log("Error en la funcion addTaskBacklogController");
  }
};
