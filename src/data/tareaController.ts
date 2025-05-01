import axios from "axios";
import { API_URL } from "../utils/constantes";
import { ITask } from "../types/ITask";
import { ICreateTask } from "../types/ICreateTask";
import { handleAxiosError } from "../utils/handleAxiosError";

export const getTareasController = async () => {
  try {
    const response = await axios.get<ITask[]>(`${API_URL}/tasks`);
    const tareas = response.data;
    return tareas;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al obtener tareas: ", message);
  }
};
export const getTareaByIdController = async (idTask: string) => {
  try {
    const response = await axios.get<ITask>(`${API_URL}/tasks/${idTask}`);
    const task = response.data;
    return task;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al traer un tarea por su id: ", message);
  }
};
export const createTareaController = async (tareaNueva: ICreateTask) => {
  try {
    // Obtenemos la lista de proyectos actuales
    console.log(tareaNueva);
    const response = await axios.post<ITask>(`${API_URL}/tasks`, tareaNueva);
    const createdTask = response.data;
    console.log(createdTask);
    return createdTask;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al crear una tarea: ", message);
  }
};

export const updateTareaController = async (tareaActualizada: ITask) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const updateTask = await axios.put<ITask>(
      `${API_URL}/tasks/${tareaActualizada.id}`,
      tareaActualizada
    );

    if (updateTask) {
      return updateTask;
    } else {
      throw new Error("Error al actualizar una tarea");
    } // Retornamos el proyecto actualizado
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al actulizar una tarea: ", message);
  }
};

// Función para eliminar una tarea por su ID
export const deleteTareaController = async (idTarea: string) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${idTarea}`);
    return response;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Error al eliminar una tarea: ", message);
  }
};
/*
export const getTareasSprintController = async (idSprint: String) => {
  try {
    const sprintsBd = await getSprintsController();
    const sprint = sprintsBd.find((sprint) => sprint.id === idSprint);

    if (sprint) {
      return sprint.tareas;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error al obtener tareas del Backlog");
  }
};

export const updateTareaSprintController = async (
  tareaActualizada: ITask,
  idSprint: String
) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasSprintController(idSprint);
    const sprintsBd = await getSprintsController();

    if (tareasBd) {
      // Mapeamos los proyectos y reemplazamos el que coincida con el ID del actualizado
      const result = tareasBd.map((tarea) =>
        tarea.id === tareaActualizada.id
          ? { ...tarea, ...tareaActualizada } // Actualizamos los datos de la tarea
          : tarea
      );
      const sprintsBdActulizado = sprintsBd.map((sprint) =>
        sprint.id === idSprint ? { ...sprint, tareas: result } : sprint
      );

      await putSprintList(sprintsBdActulizado); // Guardamos la nueva lista de sprints
    }
    return tareaActualizada; // Retornamos la ta actualizado
  } catch (error) {
    console.log("Error en updateProyectoController", error);
  }
};

// Función para eliminar una tarea por su ID
export const deleteTareaSprintController = async (
  idTarea: string,
  idSprint: string
) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasSprintController(idSprint);
    const sprintsBd = await getSprintsController();
    if (tareasBd) {
      // Filtramos la lista eliminando la tarea con el ID dado
      const result = tareasBd.filter((tarea) => tarea.id !== idTarea);
      const sprintsBdActulizado = sprintsBd.filter((sprint) =>
        sprint.id === idSprint ? { ...sprint, tareas: result } : sprint
      );

      await putSprintList(sprintsBdActulizado);
    }
  } catch (error) {
    console.log("Error en deleteProyectoController", error);
  }
};
//No ha sido probado aun

export const moverTareaASprintController = async (
  tarea: ITask,
  idSprint: string
) => {
  try {
    const tareasSprintBd = await getTareasSprintController(idSprint);
    const sprintsBd = await getSprintsController();
    let updateTareasSBd: ITask[] = [];
    if (tareasSprintBd) {
      updateTareasSBd = [...tareasSprintBd, tarea];
    } else {
      updateTareasSBd = [tarea];
    }
    const sprintsBdActulizado = sprintsBd.map((sprint) =>
      sprint.id === idSprint ? { ...sprint, tareas: updateTareasSBd } : sprint
    );
    await putSprintList(sprintsBdActulizado);

    await deleteTareaController(tarea.id);
  } catch (err) {
    throw new Error(
      "Ocurrio un error en la funcion de mover la tarea de un sprint al backlog"
    );
  }
};

export const moverTareaABacklogController = async (
  tarea: ITask,
  idSprint: string
) => {
  try {
    const tareasBd = await getTareasController();
    let tareasBdActulizada: ITask[] = [];
    if (tareasBd) {
      tareasBdActulizada = [...tareasBd, tarea];
    } else {
      tareasBdActulizada = [tarea];
    }
    await putBacklog(tareasBdActulizada);
    deleteTareaSprintController(tarea.id, idSprint);
  } catch (err) {
    throw new Error(
      "Ocurrio un error en la funcion de mover la tarea del al backlog"
    );
  }
}*/
