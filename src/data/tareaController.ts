import axios from "axios";
import { API_URL } from "../utils/constantes";
import { IBacklog } from "../types/IBacklog";
import { ITarea } from "../types/ITarea";
import { putBacklog } from "../http/backlog";
import { getSprintsController } from "./sprintControllers";
import { putSprintList } from "../http/sprintList";

export const getTareasController = async () => {
  try{
    const response = await axios.get<IBacklog>(`${API_URL}/backlog`)
    const responseParse = response.data.tareas
    return responseParse
  } catch(errror) {
    throw new Error("Error al obtener tareas del Backlog")
  }
  
}

export const createTareaController = async (tareaNueva: ITarea) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasController();

    if (tareasBd) {
      // Si existen tareas, agregamos el nuevo a la lista y actualizamos
      await putBacklog([...tareasBd,  tareaNueva]);
    } else {
      // Si no existen tareas, creamos la lista con la nueva tarea
      await putBacklog([tareaNueva]);
    }

    return tareaNueva; 
  } catch (error) {
    console.log("Error en createProyectoController", error);
  }
};


export const updateTareaController = async (tareaActualizada: ITarea) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasController();

    if (tareasBd) {
      // Mapeamos los proyectos y reemplazamos el que coincida con el ID del actualizado
      const result = tareasBd.map((tarea) =>
        tarea.id === tareaActualizada.id
          ? { ...tarea, ...tareaActualizada } // Actualizamos los datos del proyecto
          : tarea
      );

      await putBacklog(result); // Guardamos la nueva lista de proyectos
    }
    return tareaActualizada; // Retornamos el proyecto actualizado
  } catch (error) {
    console.log("Error en updateProyectoController", error);
  }
};

// Función para eliminar una tarea por su ID
export const deleteTareaController = async (idTarea: string) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasController();

    if (tareasBd) {
      // Filtramos la lista eliminando el proyecto con el ID dado
      const result = tareasBd.filter(
        (tarea) => tarea.id !== idTarea
      );

      await putBacklog(result); // Guardamos la nueva lista sin el proyecto eliminado
    }
  } catch (error) {
    console.log("Error en deleteProyectoController", error);
  }
};



export const getTareasSprintController = async (idSprint:String) => {
  try{
    const sprintsBd = await getSprintsController()
    const sprint = sprintsBd.find((sprint)=> sprint.id === idSprint )

    if (sprint) {
      return sprint.tareas
    } else {
      return []
    }
  } catch(error) {
    throw new Error("Error al obtener tareas del Backlog")
  }
  
}

export const updateTareaSprintController = async (tareaActualizada: ITarea, idSprint:String) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasSprintController(idSprint);
    const sprintsBd = await getSprintsController()

    if (tareasBd) {
      // Mapeamos los proyectos y reemplazamos el que coincida con el ID del actualizado
      const result = tareasBd.map((tarea) =>
        tarea.id === tareaActualizada.id
          ? { ...tarea, ...tareaActualizada } // Actualizamos los datos del proyecto
          : tarea
      );
      const sprintsBdActulizado = sprintsBd.map((sprint)=> sprint.id === idSprint ? {...sprint, tareas: result}: sprint)

      await putSprintList(sprintsBdActulizado); // Guardamos la nueva lista de proyectos
    }
    return tareaActualizada; // Retornamos el proyecto actualizado
  } catch (error) {
    console.log("Error en updateProyectoController", error);
  }
};

// Función para eliminar una tarea por su ID
export const deleteTareaSprintController = async (idTarea: string, idSprint:string) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasSprintController(idSprint);
    const sprintsBd = await getSprintsController()
    if (tareasBd) {
      // Filtramos la lista eliminando el proyecto con el ID dado
      const result = tareasBd.filter(
        (tarea) => tarea.id !== idTarea
      );
      const sprintsBdActulizado = sprintsBd.filter((sprint)=> sprint.id === idSprint ? {...sprint, tareas: result}: sprint)

      await putSprintList(sprintsBdActulizado); // Guardamos la nueva lista sin el proyecto eliminado
    }
  } catch (error) {
    console.log("Error en deleteProyectoController", error);
  }
};

