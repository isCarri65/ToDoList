import axios from "axios"
import { ISprintList } from "../types/ISprintList"
import { API_URL } from "../utils/constantes"
import { ISprint } from "../types/ISprint"
import { putSprintList } from "../http/sprintList"


export const getSprintsController = async () => {
  try{
    const response = await axios.get<ISprintList>(`${API_URL}/sprintList`)
    const responseParse = response.data.sprints
    return responseParse
  } catch(errror) {
    throw new Error("Error al obtener tareas del Backlog")
  }
}


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
