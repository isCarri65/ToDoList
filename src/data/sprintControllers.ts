import axios from "axios";
import { ISprintList } from "../types/ISprintList";
import { API_URL } from "../utils/constantes";
import { ISprint } from "../types/ISprint";
import { putSprintList } from "../http/sprintList";
import { ICreateSprint } from "../types/ICreateSprint";

export const getSprintsController = async () => {
  try {
    const response = await axios.get<ISprintList>(`${API_URL}/sprintList`);
    const responseParse = response.data.sprints;
    return responseParse;
  } catch (errror) {
    throw new Error("Error al obtener tareas del Backlog");
  }
};

export const updateSprintController = async (sprintActualizado: ISprint) => {
  try {
    // Obtenemos la lista de sprints actuales
    const sprintsBd = await getSprintsController();

    if (sprintsBd) {
      // Mapeamos los sprints y reemplazamos el que coincida con el ID del actualizado
      const result = sprintsBd.map((sprint) =>
        sprint.id === sprintActualizado.id
          ? { ...sprint, ...sprintActualizado } // Actualizamos los datos del sprint
          : sprint
      );

      await putSprintList(result); // Guardamos la nueva lista de proyectos
    }
    return sprintActualizado; // Retornamos el proyecto actualizado
  } catch (error) {
    console.log("Error en updateProyectoController", error);
  }
};
export const createSprintController = async (newSprint: ICreateSprint) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const sprintBd = await getSprintsController();
    const newSprintAddedId: ISprint = {
      ...newSprint,
      id: crypto.randomUUID(),
    };
    if (sprintBd) {
      // Si existen tareas, agregamos el nuevo a la lista y actualizamos
      await putSprintList([...sprintBd, newSprintAddedId]);
    } else {
      // Si no existen tareas, creamos la lista con la nueva tarea
      await putSprintList([newSprintAddedId]);
    }

    return newSprint;
  } catch (error) {
    console.log("Error en createProyectoController", error);
  }
};

export const deleteSprintController = async (idSprint: string) => {
  try {
    const sprintBd = await getSprintsController();

    if (sprintBd) {
      const result = sprintBd.filter((sprint) => sprint.id !== idSprint);
      putSprintList(result);
    }
  } catch (error) {
    console.log("Error en deleteProyectoController", error);
  }
};
