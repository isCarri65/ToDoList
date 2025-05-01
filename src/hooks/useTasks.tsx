import { useShallow } from "zustand/shallow";
import { taskStore } from "../store/taskStore";
import {
  updateTareaController,
  deleteTareaController,
  getTareasController,
  createTareaController,
} from "../data/tareaController";
import { ITask } from "../types/ITask";
import Swal from "sweetalert2";
import { ICreateTask } from "../types/ICreateTask";
import {
  addTaskBacklogController,
  getTasksBacklogController,
} from "../data/backlogController";
import {
  addTaskSprintController,
  moveTaskBacklogSprintController,
} from "../data/sprintControllers";
import { handleAxiosError } from "../utils/handleAxiosError";
import { sprintStore } from "../store/sprintBackLogStore";
import { useSprint } from "./useSprint";

export const useTask = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarUnaTarea,
    editarUnaTarea,
  } = taskStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );
  const setSprintActiva = sprintStore((state) => state.setsprintActiva);
  const { getSprints } = useSprint();
  const actionSearch = async (searchTerm: string) => {
    const data = await getTareasController();
    if (data) {
      const filtered = data.filter((task) =>
        task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setArrayTareas(filtered);
    }
  };
  const getTask = async () => {
    try {
      const tasks = await getTasksBacklogController();
      if (tasks) {
        setArrayTareas(tasks);
      } else {
        setArrayTareas([]);
      }
    } catch (error) {
      const message = handleAxiosError(error);
      console.error("Error al traer tareas del backlog: ", message);
    }
  };

  const createTask = async (nuevaTarea: ICreateTask) => {
    try {
      const createdTask = await createTareaController(nuevaTarea);
      if (!createdTask) {
        throw new Error("No se pudo crear una tarea");
      }
      const backlog = await addTaskBacklogController(createdTask.id);

      if (backlog) {
        await getTask();
      }
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      console.log("Algo salió mal al agregar una tarea al backlog");
    }
  };

  const editTask = async (tareaEditada: ITask) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    editarUnaTarea(tareaEditada);
    try {
      await updateTareaController(tareaEditada);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };

  const deleteTask = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;
    eliminarUnaTarea(idTarea);
    try {
      await deleteTareaController(idTarea);
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("Algo salió mal al editar");
    }
  };
  const moveTaskToSprint = async (taskId: string, id: string) => {
    try {
      const updatedSprint = await addTaskSprintController(taskId, id);
      if (!updatedSprint) throw new Error("Error en mover una tarea al sprint");
      await getTask();
      setSprintActiva(updatedSprint);
    } catch (error) {
      throw new Error("Error al mover tarea a un sprint");
    }
  };
  const moveTaskToBacklog = async (taskId: string, id: string) => {
    try {
      const updatedSprint = await moveTaskBacklogSprintController(taskId, id);
      if (!updatedSprint) throw new Error("Error en mover una tarea al sprint");
      console.log(updatedSprint);
      setSprintActiva(updatedSprint);
      await getTask();
      await getSprints();
      console.log("Obtener tareas");
    } catch (error) {
      throw new Error("Error al mover tarea a un sprint");
    }
  };

  return {
    getTask,
    createTask,
    editTask,
    deleteTask,
    actionSearch,
    moveTaskToSprint,
    moveTaskToBacklog,
    tareas,
  };
};
