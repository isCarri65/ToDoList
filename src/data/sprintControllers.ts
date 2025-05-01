import axios from "axios";
import { API_URL } from "../utils/constantes";
import { ISprint } from "../types/ISprint";
import { ICreateSprint } from "../types/ICreateSprint";
import { handleAxiosError } from "../utils/handleAxiosError";

export const getSprintsController = async () => {
  try {
    const response = await axios.get<ISprint[]>(`${API_URL}/sprints`);
    const sprints = response.data;
    return sprints;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al obtener sprints: ", message);
  }
};

export const getSprintByIdController = async (sprintId: string) => {
  try {
    const response = await axios.get<ISprint>(`${API_URL}/sprints/${sprintId}`);
    const sprint = response.data;
    return sprint;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al obtener sprint por su id: ", message);
  }
};

export const updateSprintController = async (sprintActualizado: ISprint) => {
  try {
    const response = await axios.put<ISprint>(
      `${API_URL}/sprints/${sprintActualizado.id}`,
      sprintActualizado
    );
    const updatedSprint = response.data;
    return updatedSprint;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al actulizar un sprint: ", message);
  }
};
export const createSprintController = async (newSprint: ICreateSprint) => {
  try {
    const response = await axios.post<ISprint>(`${API_URL}/sprints`, newSprint);
    const createdSprint = response.data;
    return createdSprint;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al crear un sprint: ", message);
  }
};

export const deleteSprintController = async (idSprint: string) => {
  try {
    const response = await axios.delete(`${API_URL}/sprints/${idSprint}`);
    return response;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al eliminar un sprint: ", message);
  }
};

export const addTaskSprintController = async (
  idtask: string,
  idSprint: string
) => {
  console.log("idTask: " + idtask + ", idSprint: " + idSprint);
  try {
    const response = await axios.put<ISprint>(
      `${API_URL}/sprints/${idSprint}/add-task/${idtask}`
    );
    const updatedSprint = response.data;
    return updatedSprint;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al actulizar un sprint: ", message);
  }
};
export const moveTaskBacklogSprintController = async (
  idtask: string,
  idSprint: string
) => {
  try {
    const response = await axios.put<ISprint>(
      `${API_URL}/sprints/${idSprint}/move-task-to-backlog/${idtask}`
    );
    const updatedSprint = response.data;
    return updatedSprint;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al actulizar un sprint: ", message);
  }
};
