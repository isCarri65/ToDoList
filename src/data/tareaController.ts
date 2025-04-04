import axios from "axios";
import { API_URL } from "../utils/constantes";
import { IBacklog } from "../types/IBacklog";
import { ITask } from "../types/ITask";
import { putBacklog } from "../http/backlog";
import { getSprintsController } from "./sprintControllers";
import { putSprintList } from "../http/sprintList";
import { ICreateTask } from "../types/ICreateTask";

export const getTareasController = async () => {
  try {
    const response = await axios.get<IBacklog>(`${API_URL}/backlog`);
    const responseParse = response.data.tareas;
    return responseParse;
  } catch (errror) {
    throw new Error("Error al obtener tareas del Backlog");
  }
};
export const getTareaByIdController = async (idTask: string) => {
  try {
    const response = await axios.get<IBacklog>(`${API_URL}/backlog`);
    const taskParse = response.data.tareas;
    const task = taskParse.find((taskE) => taskE.id === idTask);
    return task;
  } catch (error) {
    throw new Error("Error al obtener tarea del Backlog");
  }
};
export const createTareaController = async (tareaNueva: ICreateTask) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const tareasBd = await getTareasController();
    const tareaNuevaAddedId: ITask = { ...tareaNueva, id: crypto.randomUUID() };

    if (tareasBd) {
      // Si existen tareas, agregamos el nuevo a la lista y actualizamos
      await putBacklog([...tareasBd, tareaNuevaAddedId]);
    } else {
      // Si no existen tareas, creamos la lista con la nueva tarea
      await putBacklog([tareaNuevaAddedId]);
    }

    return tareaNueva;
  } catch (error) {
    console.log("Error en createProyectoController", error);
  }
};

export const updateTareaController = async (tareaActualizada: ITask) => {
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
      const result = tareasBd.filter((tarea) => tarea.id !== idTarea);

      await putBacklog(result); // Guardamos la nueva lista sin el proyecto eliminado
    }
  } catch (error) {
    console.log("Error en deleteProyectoController", error);
  }
};

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
};
